import React, {FC, ReactElement, InputHTMLAttributes} from 'react'
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
import Icon from "../icon/Icon";

type InputSize = 'lg' | 'sm'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> { // 忽略size
  /** 是否禁用 Input  */
  disabled?: boolean
  /** 设置 Input大小 */
  size?: InputSize
  /** 添加图标，在右侧悬浮添加一个图标，用于提示 */
  icon?: IconProp
  /** 添加前缀 */
  prepend?: string | ReactElement
  /** 添加后缀 */
  append?: string | ReactElement
}

/**
 * ## Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装
 * 支持 HTMLInput 的所有基本属性
 */
const Input: FC<InputProps> = (props) => {
  const {
    disabled,
    size,
    icon,
    prepend,
    append,
    style,
    ...restProps
  } = props
  const cnames = classNames('viking-input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend
  })
  return (
    <div className={cnames} style={style} data-testid='test-input'>
      {prepend && <div className='viking-input-group-prepend'>{prepend}</div>}
      {icon && <div className='icon-wrapper'><Icon icon={icon} title={`title-${icon}`}/></div>}
      <input
        className="viking-input-inner"
        disabled={disabled}
        {...restProps}
      />
      {append && <div className='viking-input-group-append'>{append}</div>}
    </div>
  )
}

export default Input
