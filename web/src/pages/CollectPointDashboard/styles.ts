import styled, { css } from 'styled-components';

import BackgroundImg from '../../assets/background.png';

interface ItemProps {
  isEnabled: boolean;
}

export const Container = styled.div`
  height: 100vh;
  background: url(${BackgroundImg}) no-repeat center;
`;

export const Header = styled.header`
  display: flex;
  padding-top: 1.2rem;
  align-items: center;
  justify-content: space-around;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;

  p {
    font-size: 1.2rem;
    margin-left: 0.8rem;
  }

  img {
    width: 2.4rem;
    height: 2.4rem;
  }
`;

export const CollectPointProfile = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 3.2rem;
    height: 3.2rem;
    margin-right: 0.8rem;
    border-radius: 0.4rem;
  }

  p {
    font-size: 1.2rem;
  }
`;

export const LogoutButton = styled.button`
  border: 0;
  width: 2.4rem;
  height: 2.4rem;
  background: #ff9000;
  background: transparent;
  transition: transform 0.2s;

  &:hover {
    color: #c53030;
    transform: scale(1.1);
  }
`;

export const ItemsDashboard = styled.header`
  > p {
    margin: 1.4rem 6rem;
    font-size: 1.4rem;
  }
`;

export const ItemsContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Item = styled.div<ItemProps>`
  display: flex;
  align-items: center;
  background: #f0f0f0;
  border-radius: 0.4rem;
  flex-direction: column;
  padding: 1.2rem 0.8rem 0.8rem 0.8rem;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.3);

  ${props =>
    props.isEnabled &&
    css`
      transition: transform 0.2s;

      &:hover {
        transform: scale(1.1);
      }
    `}

  ${props =>
    !props.isEnabled &&
    css`
      background: #e0e0e0;
    `}

  div {
    display: flex;
    align-items: center;
    margin-right: 0.4rem;

    img {
      width: 4rem;
      height: 4rem;
    }
  }

  p {
    font-size: 1.2rem;
    margin-top: 0.6rem;
  }

  & + div {
    margin-left: 2.4rem;
  }
`;

export const Recyclings = styled.div`
  > p {
    margin: 1.4rem 6rem;
    font-size: 1.4rem;
  }
`;

export const RecyclingsContainer = styled.div`
  display: flex;
  height: 19rem;
  overflow: scroll;
  overflow-x: hidden;

  align-items: center;
  flex-direction: column;
`;
