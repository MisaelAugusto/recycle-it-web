import styled from 'styled-components';

import BackgroundImg from '../../assets/background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  margin-left: 2.4rem;
  justify-content: space-between;
  background: url(${BackgroundImg}) no-repeat center;
  background-position-x: 125px;

  > a {
    align-self: flex-start;
    transition: transform 0.2s;
    margin: 0.8rem 0.8rem 0 -1.6rem;

    &:hover {
      transform: translateX(-0.4rem) scale(1.05);
    }
  }

  > img {
    animation: fadeIn 0.2s;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  animation: fadeIn 0.2s;

  a {
    color: #000000;
    text-decoration: none;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1.6rem 0 0 0;
  }
`;

export const Header = styled.header`
  margin-bottom: 1.6rem;
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

  .back-to-login {
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
      transform: translateX(0.6rem);
    }
  }
`;

export const Foreground = styled.img``;
