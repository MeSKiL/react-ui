import React, {FC} from 'react'
import classNames from "classnames"
import {FontAwesomeIcon, FontAwesomeIconProps} from "@fortawesome/react-fontawesome"

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'

export interface IconProps extends FontAwesomeIconProps {
  /** 主题 */
  theme?: ThemeProps
}

/**
 * ## Icon组件
 * 基于react-fontawesome封装
 * */
const Icon: FC<IconProps> = (props) => {
  const {className, theme, ...restProps} = props
  const classes = classNames('viking-icon', className, {
    [`icon-${theme}`]: theme
  })
  return (
    <FontAwesomeIcon className={classes} {...restProps} />
  )
}

export default Icon
