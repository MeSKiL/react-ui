import React, {CSSProperties, useState} from "react"
import {storiesOf} from "@storybook/react"
import {action} from "@storybook/addon-actions"
import Input from "./Input"

let widthStyle: CSSProperties = {
  width: '300px'
}

const ControlledInput = () => {
  const [value, setValue] = useState('')
  return <Input style={widthStyle} value={value} onChange={(e) => {
    setValue(e.target.value)
  }}/>
}
const defaultInput = () => (
  <div>
    <Input
      style={widthStyle}
      placeholder='placeholder'
      onChange={action('change')}
    />
    <ControlledInput/>
  </div>
)

const disabledInput = () => (
  <Input
    style={widthStyle}
    placeholder='disabled input'
    disabled
  />
)

const iconInput = () => (
  <Input
    style={widthStyle}
    placeholder='input with icon'
    icon='search'
  />
)

const sizeInput = () => (
  <div>
    <Input style={widthStyle} defaultValue='large size' size='lg'/>
    <Input style={widthStyle} defaultValue='small size' size='sm'/>
  </div>
)

const pendInput = () => (
  <div>
    <Input style={widthStyle} defaultValue='prepend text' prepend='https://'/>
    <Input style={widthStyle} defaultValue='google' append='.com'/>
  </div>
)

storiesOf('Input Component', module)
  .add('Input', defaultInput)
  .add('被禁用的 Input', disabledInput)
  .add('带图标的 Input', iconInput)
  .add('大小不同的 Input', sizeInput)
  .add('带前后端的 Input', pendInput)
