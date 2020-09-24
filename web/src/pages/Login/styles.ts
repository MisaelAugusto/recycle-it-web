import styled from 'styled-components';

import BackgroundImg from '../../assets/background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background: url(${BackgroundImg}) no-repeat center;
  background-position-x: 100px;
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

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2.4rem 0 0 0;
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

export const Foreground = styled.img``;
