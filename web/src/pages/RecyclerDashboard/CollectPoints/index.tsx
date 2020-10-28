import React from 'react';
import DropDownImg from '../../../assets/icons/dropdown.svg';

import {
  Container,
  Title,
  Content,
  Filters,
  FilterCategory,
  Category,
  CategoryOptions,
  Option,
  Results
} from './styles';

// Filtrar por nome, items, horário de funcionamento

const CollectPoints: React.FC = () => {
  return (
    <Container>
      <Title>Pontos de coleta</Title>

      <Content>
        <Filters>
          <p>Filtrar por</p>

          <FilterCategory>
            <Category>
              <p>Itens</p>
              <img src={DropDownImg} alt="DropDown" />
            </Category>

            <CategoryOptions>
              <Option>Metal</Option>
              <Option>Papel</Option>
              <Option>Vidro</Option>
              <Option>Plástico</Option>
              <Option>Eletrônicos</Option>
            </CategoryOptions>
          </FilterCategory>
        </Filters>
        <Results>Results</Results>
      </Content>
    </Container>
  );
};

export default CollectPoints;
