import React, { FC, ReactNode, ReactElement, InputHTMLAttributes, ChangeEvent } from 'react'
import classNames from 'classnames';
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon/icon'

type InputSize = 'lg' | 'sm'

// omit可以忽略指定的属性
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    className ?: string;
    /**是否禁用 */
    disabled?: boolean;
    size?: InputSize;
    icon?: IconProp;
    prepend?: string | ReactElement;
    append?: string | ReactElement;
    children?: ReactNode;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * 这是Input组件
 * ## Input doc ##
 * ~~~js
 * import { Input } from 'lw-ui'
 * ~~~
 */
export const Input: FC<InputProps> = (props) => {
    // 取出各种属性
    const { disabled, size, icon, prepend, append, className, children, ...restProps } = props
    // 根据属性计算不同的className
    const classes = classNames('input-wrapper', className, {
        [`input-size-${size}`]: size,
        'is-disabled': disabled,
        'input-group': prepend || append,
        'input-group-append': !!append,
        'input-group-prepend': !!prepend
    })
    // value没传值时默认为空字符串
    const fixControlledValue = (value: any) => {
        if(typeof value === 'undefined' || value === null) {
        return ''
        }
        return value
    }

    // value和defaultValue不能同时存在
    if('value' in props) {
        delete restProps.defaultValue
        restProps.value = fixControlledValue(restProps.value)
    }
    return (
        // 根据属性判断是否要添加特定的节点
        <div className={classes}>
        {prepend && <div className="in-input-group-prepend">{prepend}</div>}
        {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`}/></div>}
        <input
          className="input-inner"
          disabled={disabled}
          {...restProps}
        />
        {append && <div className="in-input-group-append">{append}</div>}
      </div>
    )
}