import styled from 'styled-components';

import BackgroundImg from '../../assets/background.png';

export const Container = styled.div`
  height: 100vh;
  background: url(${BackgroundImg}) no-repeat center;
  background-size: 114%;

  > a {
    margin-top: 0.8rem;
    margin-left: 1.6rem;
    display: inline-block;
    transition: transform 0.2s;

    &:hover {
      transform: translateX(-0.4rem) scale(1.05);
    }
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
