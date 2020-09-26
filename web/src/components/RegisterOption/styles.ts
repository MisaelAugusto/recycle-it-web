import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface OptionProps {
  image: string;
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  p {
    margin-bottom: 0.8rem;
  }

  & + div {
    margin-left: 8rem;
  }
`;

export const Option = styled(Link)<OptionProps>`
  width: 22.5rem;
  height: 32rem;
  border-radius: 0.6rem;
  border: 4px solid #c2c2c2;
  transition: transform 0.2s;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);
  background: url(${props => props.image}) no-repeat top;

  div {
    display: flex;
    justify-content: center;

    top: 70%;
    position: relative;

    img {
      width: 102%;
    }
  }

  p {
    left: 0.6rem;
    color: #000000;
    bottom: -0.2rem;
    font-size: 1.4rem;
    position: absolute;
    width: 100%;
  }

  &:hover {
    & {
      transform: scale(1.01);
      border: 4px solid #388e3c;
    }
  }
`;
