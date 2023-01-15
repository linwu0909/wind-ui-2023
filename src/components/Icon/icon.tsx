import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'danger'

export interface IconProps extends FontAwesomeIconProps {
    theme? : ThemeProps
}

const Icon: React.FC<IconProps> = (props) => {
    const { className, theme, ...restProps } = props
    const classes = classNames('lw-icon', className, {
        [`icon-${theme}`]: theme
    })
    return (
        <FontAwesomeIcon className={classes} {...restProps} />
    )
}

export default Icon