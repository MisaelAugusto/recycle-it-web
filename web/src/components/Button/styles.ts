import styled from 'styled-components';

export const Container = styled.button`
  border: 0;
  width: 100%;
  height: 4.4rem;
  color: #ffffff;
  margin-top: 0.8rem;
  background: #388e3c;
  border-radius: 0.8rem;
  transition: transform 0.2s;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

  &:hover {
    background: #43a047;
    transform: scale(1.05);
  }
`;
