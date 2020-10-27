import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
`;
export const SideBar = styled.div`
  width: 12.8rem;
  color: #ffffff;
  padding: 1rem;
  background-color: #1dbc5c;
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  img {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
  }

  p {
    margin-top: 0.5rem;
    font-size: 1.2rem;
  }
`;

export const Menu = styled.div``;

export const MenuCategory = styled.div`
  margin-top: 1rem;

  > p {
    opacity: 0.8;
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
`;

export const MenuItem = styled(Link)`
  color: white;
  display: flex;
  align-items: center;
  text-decoration: none;

  p {
    font-size: 1rem;
  }

  svg {
    margin: 0 1rem;
  }
`;

export const Content = styled.div`
  flex: 1;
  background-color: #f6f6f6;
`;
