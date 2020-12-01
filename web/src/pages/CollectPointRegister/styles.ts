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

  form {
    width: 16rem;
    display: flex;
    margin: 1.6rem 0;
    align-items: center;
    flex-direction: column;

    .whatsapp-input {
      width: 100%;
      div {
        width: 100%;
        height: 3.2rem;
        transition: scale 0s;
        margin: 0.8rem 0 0 0;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);

        input {
          width: 100%;
          font-size: 1.1rem;
        }

        &:hover {
          transform: scale(1) !important;
        }
      }
    }
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 1.4rem;

  > p {
    font-size: 1.4rem;
    margin-top: 1rem;
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

export const ImageInput = styled.div`
  position: relative;

  img {
    width: 10rem;
    height: 10rem;
    border-radius: 1rem;
  }

  label {
    > input {
      display: none;
    }
  }
`;
