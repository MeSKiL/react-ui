import React from 'react'
import {render, RenderResult, fireEvent, cleanup, wait} from '@testing-library/react'
import Menu, {MenuProps} from './Menu'
import MenuItem from "./MenuItem";
import SubMenu from "./SubMenu";
import {library} from "@fortawesome/fontawesome-svg-core"
import {fas} from "@fortawesome/free-solid-svg-icons"
library.add(fas)

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'klass'
}

const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical'
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>
        active
      </MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
      <MenuItem>
        xyz
      </MenuItem>
      <SubMenu title='dropdown'>
        <MenuItem>drop1</MenuItem>
      </SubMenu>
    </Menu>
  )
}

const createStyleFile = () => {
  const cssFile: string = `
    .viking-submenu{
      display:none;
    }
    .viking-submenu.menu-opened{
      display:block
    }
  `
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = cssFile
  return style
}

let wrapper: RenderResult
let menuElement: HTMLElement
let activeElement: HTMLElement
let disabledElement: HTMLElement
describe('test Menu and MenuItem component', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    // wrapper.container HTMLElement
    wrapper.container.append(createStyleFile())
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('viking-menu klass')
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })
  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('xyz')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })
  it('click render vertical mode when mode is set to vertical', () => {
    cleanup() // 清空
    const wrapper = render(generateMenu(testVerProps))
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })
  it('should show dropdown items when hover on subMenu', async () => {
    // 只有类名，没有真实的样式，所以需要手动加上style，才能知道是否真实可以看见
    expect(wrapper.queryByText('drop1')).toBe(null)
    const dropdownElement = wrapper.getByText('dropdown')
    fireEvent.mouseEnter(dropdownElement)
    await wait(() => { // 直到通过或者超时报错
      expect(wrapper.queryByText('drop1')).toBeVisible()
    }, {timeout: 400})
    fireEvent.click(wrapper.getByText('drop1'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
    fireEvent.mouseLeave(dropdownElement)
    await wait(() => { // 直到通过或者超时报错
      expect(wrapper.queryByText('drop1')).not.toBeVisible()
    }, {timeout: 400})
  })
  it('should show dropdown items when click subMenu with vertical', () => {
    cleanup()
    const wrapper = render(generateMenu(testVerProps))
    wrapper.container.append(createStyleFile())
    const dropdownElement = wrapper.getByText('dropdown')
    expect(wrapper.queryByText('drop1')).toEqual(null)
    fireEvent.click(dropdownElement)
    expect(wrapper.queryByText('drop1')).toBeVisible()
    fireEvent.click(dropdownElement)
    expect(wrapper.queryByText('drop1')).not.toBeVisible()
  })
  it('should show dropdown items when defaultOpenSubMenus have same index', () => {
    cleanup()
    const wrapper = render(generateMenu({...testVerProps, defaultOpenSubMenus: ['3']}))
    wrapper.container.append(createStyleFile())
    expect(wrapper.queryByText('drop1')).toBeVisible()
  })
})
