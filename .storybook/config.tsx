import '../src/styles/index.scss'
import React from 'react'
import {withInfo} from "@storybook/addon-info"
import {addDecorator, addParameters} from "@storybook/react"
import {library} from "@fortawesome/fontawesome-svg-core"
import {fas} from "@fortawesome/free-solid-svg-icons"
library.add(fas)

const wrapperStyle: React.CSSProperties = {
  padding: '20px 40px'
}
const storyWrapper = (storyFn: any) => (
  <div style={wrapperStyle}>
    <h3>组件演示</h3>
    {storyFn()}
  </div>
)

addDecorator(storyWrapper)
addDecorator(withInfo)
addParameters({info: {inline: true, header: false}})
