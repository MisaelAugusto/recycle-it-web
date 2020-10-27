import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;
  display: flex;
`;
export const SideBar = styled.div`
  width: 12.8rem;
  padding: 1rem;
  color: #ffffff;
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
    font-size: 0.9rem;
    margin-bottom: 0.6rem;
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
    width: 1.2rem;
    height: 1.2rem;
    margin: 0 0.4rem 0 1rem;
  }

  & + a {
    margin-top: 0.6rem;
  }

  &:hover {
    color: ${shade(0.05, '#ffffff')};
  }
`;

export const Logout = styled.button`
  border: 0;
  bottom: 1rem;
  display: flex;
  color: #2e2e2e;
  font-size: 1rem;
  background: none;
  position: absolute;
  align-items: center;

  svg {
    width: 1.6rem;
    height: 1.6rem;
    margin-right: 0.8rem;
  }

  &:hover {
    color: ${shade(0.8, '#2e2e2e')};
  }
`;

export const Content = styled.div`
  flex: 1;
  background-color: #f6f6f6;
`;
