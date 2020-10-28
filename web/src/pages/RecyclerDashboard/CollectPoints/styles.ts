import styled from 'styled-components';

import BackgroundImg from '../../../assets/background.png';

export const Container = styled.div`
  height: 100vh;
  color: #212121;
  padding: 1.2rem 1.6rem;
  /* background: url(${BackgroundImg}) no-repeat 280px center;
  background-size: 90%; */

  &:after {
    //TODO
    content: '';
    background: url(${BackgroundImg}) no-repeat center;
    opacity: 0.5;
    position: absolute;
    top: 50%;
  }
`;

export const Title = styled.p`
  font-size: 2.4rem;
`;

export const Content = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 1.6rem;
`;

export const Filters = styled.div`
  padding: 0 1rem;

  > p {
    margin-bottom: 1rem;
  }
`;

export const FilterCategory = styled.button`
  border: 0;
  width: 16rem;
  color: #515151;
  height: 3.2rem;
  padding: 0 1rem;
  font-size: 1.2rem;
  background: #fefefe;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);

  display: flex;
  flex-direction: column;
`;

export const Category = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    width: 1.2rem;
    height: 1.2rem;
  }
`;

export const CategoryOptions = styled.div``;

export const Option = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 16rem;
  height: 3.2rem;
  background: #fefefe;
  padding: 0 1rem;
  border-bottom: 1px solid #e1e1e1;
`;

export const Results = styled.div`
  background: #818181;
`;
