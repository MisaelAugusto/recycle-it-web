import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  FaAward,
  FaBox,
  FaTrophy,
  FaWarehouse,
  FaHistory,
  FaFolderOpen,
  FaUser,
  FaUserPlus,
  FaMoneyCheck
} from 'react-icons/fa';
import { FiPower } from 'react-icons/fi';

import CollectPoints from './CollectPoints';

import {
  Container,
  SideBar,
  Profile,
  Menu,
  MenuCategory,
  MenuItem,
  Logout,
  Content
} from './styles';

const currentPath = '/recycler/dashboard';

const routes = [
  {
    path: `${currentPath}/collect-points`,
    component: () => <CollectPoints />
  }
];

const RecyclerDashboard: React.FC = () => {
  return (
    <Router>
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
              <p>Reciclagem</p>

              <MenuItem to={`${currentPath}/collect-points`}>
                <FaWarehouse />
                <p>Pontos de coleta</p>
              </MenuItem>
              <MenuItem to="/">
                <FaHistory />
                <p>Histórico</p>
              </MenuItem>
              <MenuItem to="/">
                <FaFolderOpen />
                <p>Relatório</p>
              </MenuItem>
            </MenuCategory>
            <MenuCategory>
              <p>Conquistas</p>

              <MenuItem to="/">
                <FaAward />
                <p>Prêmios</p>
              </MenuItem>
              <MenuItem to="/">
                <FaBox />
                <p>Itens reciclados</p>
              </MenuItem>
              <MenuItem to="/">
                <FaTrophy />
                <p>Ranking</p>
              </MenuItem>
            </MenuCategory>
            <MenuCategory>
              <p>Configurações</p>

              <MenuItem to="/">
                <FaUser />
                <p>Perfil</p>
              </MenuItem>
              <MenuItem to="/">
                <FaMoneyCheck />
                <p>Apoiar o projeto</p>
              </MenuItem>
              <MenuItem to="/">
                <FaUserPlus />
                <p>Convidar amigos</p>
              </MenuItem>
            </MenuCategory>
          </Menu>
          <Logout>
            <FiPower />
            <p>Sair</p>
          </Logout>
        </SideBar>
        <Content>
          <Switch>
            {routes.map(route => {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  children={<route.component />}
                />
              );
            })}
          </Switch>
        </Content>
      </Container>
    </Router>
  );
};

export default RecyclerDashboard;
