import styled, { css } from 'styled-components';

import BackgroundImg from '../../assets/background.png';

interface NameInputProps {
  isFocused: boolean;
  isFilled: boolean;
}

interface ItemInputProps {
  selected: boolean;
  itemImage: string;
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

export const RecyclerProfile = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 3.2rem;
    height: 3.2rem;
    margin-right: 0.8rem;
    border-radius: 0.4rem;
  }

  div {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;

    .name {
      font-size: 1.2rem;
    }

    .location {
      color: #515151;
      font-size: 0.8rem;
    }
  }
`;

export const LogoutButton = styled.button`
  border: 0;
  width: 2.4rem;
  height: 2.4rem;
  background: transparent;
  transition: transform 0.2s;

  &:hover {
    color: #c53030;
    transform: scale(1.1);
  }
`;

export const Content = styled.div`
  display: flex;
  margin: 1.6rem;
  align-items: center;
  justify-content: space-between;
`;

export const ItemsDashboard = styled.header`
  display: flex;
  align-items: center;
  flex-direction: column;

  > p {
    font-size: 1.4rem;
    margin-bottom: 1.2rem;
  }
`;

export const ItemsContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const Item = styled.div`
  display: flex;
  font-size: 1.2rem;
  align-items: center;
  background: #f0f0f0;
  border-radius: 0.4rem;
  flex-direction: column;
  transition: transform 0.2s;
  padding: 0.6rem 0.4rem 0.4rem 0.4rem;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.3);

  div {
    display: flex;
    font-size: 1.4rem;
    align-items: center;
    margin-right: 0.4rem;

    img {
      width: 2.8rem;
      height: 2.8rem;
    }
  }

  p {
    font-size: 1rem;
    margin-top: 0.2rem;
  }

  & + div {
    margin-top: 1rem;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

export const FiltersContainer = styled.div`
  flex: 1;
  height: 34rem;
  margin-left: 1.2rem;
  padding-left: 1.2rem;
  border-left: 1px solid #818181;

  > p {
    margin-bottom: 0.8rem;
  }
`;

export const Form = styled.form`
  display: flex;
  padding: 0 1.4rem;
  align-items: center;
  justify-content: space-between;
`;

export const NameInput = styled.div<NameInputProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  color: #212121;
  font-size: 1.2rem;

  input {
    border: 0;
    width: 16rem;
    height: 3.2rem;
    padding: 0.8rem;
    font-size: 1.4rem;
    margin-top: 0.4rem;
    border-radius: 0.4rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);

    ${props =>
      (props.isFocused || props.isFilled) &&
      css`
        border: 2px solid #1dbc5c;
      `}
  }
`;

export const ItemsInputsContainer = styled.div`
  display: flex;
  color: #212121;
  font-size: 1.2rem;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  > div {
    display: flex;
    align-items: center;
  }

  span {
    margin-bottom: 0.4rem;
  }
`;

export const ItemInput = styled.button<ItemInputProps>`
  border: 0;
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);

  ${props =>
    css`
      background: url(${props.itemImage}) no-repeat center;
      background-size: 64%;
    `}

  ${props =>
    props.selected &&
    css`
      border: 2px solid #1dbc5c;
      background-color: #ddffdd;
    `}

  & + button {
    margin-left: 0.4rem;
  }
`;

export const LocationCheckbox = styled.div`
  width: 17rem;
  display: flex;
  color: #212121;
  padding: 0.4rem;
  font-size: 1.2rem;
  align-items: center;
  justify-content: space-between;

  .container {
    display: flex;
    align-items: center;

    p {
      margin-left: 2.4rem;
    }

    input {
      width: 0;
      height: 0;
      opacity: 0;
    }

    .checkmark {
      width: 1.6rem;
      height: 1.6rem;
      border-radius: 50%;
      position: absolute;
      border: 2px solid #1dbc5c;
      background-color: #f6f6f6;
    }

    input:checked ~ .checkmark {
      div {
        position: relative;
        top: 0.155rem;
        left: 0.155rem;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background-color: #1dbc5c;
      }
    }
  }
`;

export const SubmitButton = styled.button`
  border: 0;
  display: flex;
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  align-items: center;
  background: transparent;
  justify-content: center;

  svg {
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.2);
    }
  }
`;

export const CollectPoints = styled.div`
  width: 96%;
  display: flex;
  height: 24rem;
  margin: 1.6rem 1.2rem;
  justify-content: space-around;

  > p {
    z-index: -5;
    width: 40rem;
    color: #818181;
    font-size: 2.4rem;
    text-align: center;
    align-self: center;
  }

  span {
    font-size: 1.4rem;
  }
`;

export const CollectPointsContainer = styled.div`
  overflow: scroll;
  overflow-x: hidden;
  padding: 0.4rem 0.8rem;
`;
