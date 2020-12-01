import styled, { css } from 'styled-components';

import BackgroundImg from '../../assets/background.png';

interface ToggleProps {
  checked: boolean;
}

interface ContainerProps {
  changed: boolean;
}

export const Container = styled.div<ContainerProps>`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: url(${BackgroundImg}) no-repeat center;
  background-position-x: 100px;

  ${props =>
    props.changed &&
    css`
      > img {
        animation: fadeIn 0.2s;
      }

      > div {
        animation: fadeIn 0.2s;
      }
    `}
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  a {
    color: #000000;
    text-decoration: none;
  }

  form {
    display: flex;
    align-items: center;
    margin: 2.4rem 0 0 0;
    flex-direction: column;
  }
`;

export const Header = styled.header`
  > p {
    width: 20rem;
    margin-top: 1.6rem;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;

  p {
    font-size: 3.2rem;
    margin-left: 1.6rem;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  flex-direction: column;

  .forgot-password {
    font-size: 1.2rem;
    margin-top: 0.8rem;
    transition: color 0.2s;

    &:hover {
      color: rgba(0, 0, 0, 0.7);
    }
  }

  .create-account {
    display: flex;
    color: #f6f6f6;
    margin-top: 4rem;
    font-weight: bold;
    font-size: 1.4rem;
    align-items: center;
    transition: transform 0.2s;

    svg {
      margin-right: 0.8rem;
    }

    &:hover {
      transform: translateX(0.8rem);
    }
  }
`;

export const ToggleContainer = styled.button`
  display: flex;
  width: 3.2rem;
  height: 1.6rem;
  padding: 0.2rem;
  border: 0;
  box-shadow: 1px 1px 2px rgba(0, 1, 0, 0.3);
  background: #1dbc5c;
  align-items: center;
  justify-content: center;
  border-radius: 1.2rem;
  align-self: flex-start;
  margin: 4.6rem 0 0 2.4rem;

  position: relative;

  span {
    width: 10rem;
    color: #ffffff;
    font-size: 0.8rem;
    padding: 0.5rem 0;
    visibility: hidden;
    text-align: center;
    background: #1dbc5c;
    border-radius: 0.6rem;
    top: calc(100% + 0.8rem);
    left: 0%;

    position: absolute;
    z-index: 1;

    &::after {
      content: '';
      border-style: solid;
      border-color: #1dbc5c transparent;
      border-width: 0 0.6rem 0.6rem 0.6rem;
      top: -0.5rem;
      left: 8%;
      position: absolute;
    }
  }

  &:hover {
    span {
      visibility: visible;
    }
  }
`;

export const Toggle = styled.div<ToggleProps>`
  width: 1.2rem;
  height: 1.2rem;
  background: #ffffff;
  border-radius: 0.8rem;
  transition: transform 0.2s;

  ${props =>
    props.checked
      ? css`
          transform: translateX(0.8rem);
        `
      : css`
          transform: translateX(-0.8rem);
        `}
`;

export const Foreground = styled.img``;
