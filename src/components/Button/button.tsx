import React, { ReactNode, FC, ButtonHTMLAttributes, AnchorHTMLAttributes} from 'react'
import classNames from 'classnames';

export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps {
    className ?: string;
    /**设置按钮禁用 */
    disabled ?: boolean;
    size ?: ButtonSize;
    btnType ?: ButtonType;
    children : ReactNode;
    href ?: string;
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
/*Partial让类型里的所有参数都变成可选*/
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

/**
 * 这是Button组件
 * ## Button doc ##
 * ~~~js
 * import { Button } from 'lw-ui'
 * ~~~
 */
export const Button: FC<ButtonProps> = (props) => {
    const {
        btnType,
        className,
        disabled,
        size,
        children,
        href,
        ...restProps
    } = props
    const classes = classNames('btn', className, {
        [`btn-${btnType}`] : btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === 'link') && disabled
    })
    if (btnType === 'link' && href) {
        return (
            <a
                className={classes}
                href={href}
                {...restProps}
            >
                {children}
            </a>
        )
    } else {
        return (
            <button
                className={classes}
                disabled={disabled}
                {...restProps}
            >
                {children}
            </button>
        )
    }
}

Button.defaultProps = {
    disabled: false,
    btnType: 'default'
}

export default Button;