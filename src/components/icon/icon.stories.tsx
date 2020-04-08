import React from 'react'
import {storiesOf} from "@storybook/react"
import Icon from './Icon'

const defaultIcon = () => (
  <Icon icon="angle-down" size='3x' theme='danger'/>
)

storiesOf('Icon Component', module)
  .add('Icon', defaultIcon)
