import React, {FC, useState} from 'react'
import {storiesOf} from "@storybook/react"
import Transition from "./Transition"

const TransitionComp: FC = (props) => {
  const [open, setOpen] = useState()
  return (
    <>
      <button onClick={() => {
        setOpen(!open)
      }}>toggle
      </button>
      <Transition in={open} timeout={300} animation='zoom-in-top'>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
        </ul>
      </Transition>
    </>
  )
}
const defaultTransition = () => (
    <TransitionComp/>
)
storiesOf('Transition Component', module)
  .add('Transition', defaultTransition)
