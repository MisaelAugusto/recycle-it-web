import React from 'react';
import { FiFolder } from 'react-icons/fi';

import {
  Container,
  SideBar,
  Profile,
  Menu,
  MenuCategory,
  MenuItem,
  Content
} from './styles';

const RecyclerDashboard: React.FC = () => {
  return (
    <Container>
      <SideBar>
        <Profile>
          <img
            src="https://avatars3.githubusercontent.com/u/30798460?s=460&v=4"
            alt="Misael Augusto"
          />
          <p>Misael Augusto</p>
        </Profile>
        <Menu>
          <MenuCategory>
            <p>Recycling</p>
            <MenuItem to="/">
              <FiFolder />
              <p>Projects</p>
            </MenuItem>
            <MenuItem to="/">
              <FiFolder />
              <p>Projects</p>
            </MenuItem>
            <MenuItem to="/">
              <FiFolder />
              <p>Projects</p>
            </MenuItem>
          </MenuCategory>
          <MenuCategory>
            <p>Recycling</p>
            <MenuItem to="/">
              <FiFolder />
              <p>Projects</p>
            </MenuItem>
            <MenuItem to="/">
              <FiFolder />
              <p>Projects</p>
            </MenuItem>
            <MenuItem to="/">
              <FiFolder />
              <p>Projects</p>
            </MenuItem>
          </MenuCategory>
        </Menu>
      </SideBar>
      <Content>
        <h1>Content</h1>
      </Content>
    </Container>
  );
};

export default RecyclerDashboard;
