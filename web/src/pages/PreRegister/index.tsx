import React from 'react';
import { Link } from 'react-router-dom';

import RegisterOption from '../../components/RegisterOption';

import Return from '../../assets/return.png';
import RecyclerImg from '../../assets/recycler.png';
import CollectPointImg from '../../assets/collect-point.png';

import { Container, Content } from './styles';

const PreRegister: React.FC = () => {
  return (
    <Container>
      <Link to="/">
        <img src={Return} alt="Voltar" />
      </Link>
      <Content>
        <RegisterOption
          to="/"
          image={RecyclerImg}
          color="#388e3c"
          title="reciclador"
          text={[ "Seja responsável",
          "pelo lixo que você produz,",
          "torne a", "reciclagem", "um", "hábito"]}
          />
        <RegisterOption
          to="/register/collect-point"
          image={CollectPointImg}
          color="#ffffff"
          title="ponto de coleta"
          text={[ "Seja a entidade",
          "que torna possível a conexão",
          "entre as", "pessoas", "e a", "reciclagem"]}
          />
      </Content>
    </Container>
  );
};

export default PreRegister;
