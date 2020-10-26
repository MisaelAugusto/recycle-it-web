import styled from 'styled-components';
import BackgroundImg from '../../assets/background.png';

export const Container = styled.div`
  height: 100vh;
  background: url(${BackgroundImg}) no-repeat center;
  background-size: 114%;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 1.6rem;

  > p {
    font-size: 1.4rem;
    margin-top: 1.2rem;
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
  margin: 1.6rem 0;
  width: 16rem;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const AvatarInput = styled.div`
  position: relative;

  img {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
  }

  label {
    right: 0;
    bottom: 0;
    border: 0;
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    position: absolute;
    background: #388e3c;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;

    input {
      display: none;
    }

    svg {
      width: 1.4rem;
      height: 1.4rem;
      color: #ffffff;
    }
  }
`;
