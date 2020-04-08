import React,{FC} from 'react'
import {CSSTransition} from "react-transition-group"
import {CSSTransitionProps} from "react-transition-group/CSSTransition"

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right'

type TransitionProps = CSSTransitionProps & {
  /** 选择哪种动效 */
  animation?: AnimationName,
  /** 是否需要外层div包装 */
  wrapper?: boolean
}
/**
 * ## Transition组件
 * 由CSSTransition封装
 * */
const Transition: FC<TransitionProps> = (props) => {
  const {
    children,
    classNames,
    animation,
    wrapper,
    ...restProps
  } = props
  return (
    <CSSTransition
      classNames={classNames ? classNames : animation}
      {...restProps}
    >
      {
        wrapper ? <div>{children}</div> : children
      }
    </CSSTransition>
  )
}

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true
}

export default Transition
