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
