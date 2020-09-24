import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  height: 4.4rem;
  color: #818181;
  background: #f6f6f6;
  align-items: center;
  margin-bottom: 0.8rem;
  border-radius: 0.8rem;
  padding: 0.8rem 1.2rem 0.8rem 1.6rem;
  justify-content: center;
  transition: transform 0.2s;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

  ${props =>
    props.isFocused &&
    css`
      color: #1dbc5c;
      border: 2px solid #1dbc5c;
    `}
  ${props =>
    props.isFilled &&
    css`
      color: #1dbc5c;
    `}

  &:hover {
    transform: scale(1.01);
  }

  svg {
    margin-right: 0.8rem;
  }

  input {
    border: 0;
    color: #212121;
    font-size: 1.2rem;
    background: #f6f6f6;
  }
`;
