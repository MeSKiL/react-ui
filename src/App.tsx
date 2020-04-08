import React, {useCallback, useState} from 'react'
import {library} from "@fortawesome/fontawesome-svg-core"
import {fas} from "@fortawesome/free-solid-svg-icons"
import './App.css'
import Menu from "./components/menu/Menu"
import MenuItem from "./components/menu/MenuItem"
import SubMenu from "./components/menu/SubMenu";
import Transition from "./components/transition/Transition";
import Button from './components/button/Button'

library.add(fas)

interface IAppPropsType {

}

const App: React.FC<IAppPropsType> = () => {
  const [show, setShow] = useState(false)
  const handleSelect = useCallback((index: string): void => {
    console.log(index)
  }, [])
  return (
    <div className="App">
      <Menu defaultIndex='0' onSelect={handleSelect} defaultOpenSubMenus={['2']}>
        <MenuItem>cool link</MenuItem>
        <MenuItem disabled>cool link2</MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>dropdown 1</MenuItem>
          <MenuItem>dropdown 2</MenuItem>
        </SubMenu>
        <MenuItem>cool link3</MenuItem>
      </Menu>
      <Button size='lg' onClick={() => {
        setShow(!show)
      }}>Toggle</Button>
      <Transition in={show} timeout={300} animation="zoom-in-left">
        <div>
          <p>
            Edit <code>src/App.tsc</code> and save to reload.
          </p>
          <p>
            Edit <code>src/App.tsc</code> and save to reload.
          </p>
          <p>
            Edit <code>src/App.tsc</code> and save to reload.
          </p>
          <p>
            Edit <code>src/App.tsc</code> and save to reload.
          </p>
          <p>
            Edit <code>src/App.tsc</code> and save to reload.
          </p>
        </div>
      </Transition>
      <Transition
        in={show}
        timeout={300}
        animation='zoom-in-left'
        wrapper
      >
        <Button btnType='primary' size='lg'>A Large Button</Button>
      </Transition>
    </div>
  )
}

export default App;
