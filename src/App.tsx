import React, {useState} from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
import Button, {ButtonType, ButtonSize} from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Transition from './components/Transition/transition';
import Icon from './components/Icon/icon';
library.add(fas)

const App: React.FC = () => {
  const [show, setShow] = useState(false)
  return (
    <div className="App">
      <header className="App-header">
        <Icon icon="coffee" theme="primary" size="10x"/>
        <Menu defaultIndex={'0'} onSelect={(index) => {alert(index)}} defaultOpenSubMenus={['2']}>
          <MenuItem>
            cool link
          </MenuItem>
          <MenuItem disabled>
            cool link 2
          </MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>dropdown1</MenuItem>
            <MenuItem>dropdown2</MenuItem>
          </SubMenu>
          <MenuItem>
            cool link 3
          </MenuItem>
        </Menu>
        <Button size="lg" onClick={() => setShow(!show)}>Toggle</Button>
        <Transition
          in={show}
          timeout={300}
          animation="zoom-in-left"
        >
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
        </Transition>

      </header>
    </div>
  );
}

export default App;
