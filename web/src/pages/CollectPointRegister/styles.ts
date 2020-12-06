import styled, { css } from 'styled-components';
import BackgroundImg from '../../assets/background.png';

interface ItemProps {
  selected: boolean;
  isErrored: boolean;
}

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
    width: 40rem;
    display: flex;
    margin: 1.6rem 0;
    align-items: center;
    flex-direction: column;
  }
`;

export const FormContent = styled.div`
  display: flex;
  padding: 0 1rem;
  align-items: center;
`;

export const LeftForm = styled.div`
  width: 16rem;
  display: flex;
  align-items: center;
  margin-right: 2.4rem;
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
`;

export const RightForm = styled.div``;

export const ItemsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.4rem;
`;

export const Item = styled.button<ItemProps>`
  border: 0;
  width: 3.6rem;
  height: 4.4rem;
  border-radius: 0.4rem;
  background: #f6f6f6;
  transition: transform 0.2s;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);

  p {
    font-size: 0.7rem;
  }

  img {
    width: 2.4rem;
    height: 2.4rem;
  }

  ${props =>
    props.selected &&
    css`
      border: 2px solid #1dbc5c;
      background-color: #ddffdd;
    `}

  ${props =>
    props.isErrored &&
    css`
      border: 2px solid #c53030;
    `}

  &:hover {
    transform: scale(1.1);
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
