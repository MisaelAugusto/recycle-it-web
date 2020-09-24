import React from 'react';

import RegisterOption from '../../components/RegisterOption';

import { Container } from './styles';

const PreRegister: React.FC = () => {
  return (
    <Container>
      <RegisterOption />
      <RegisterOption />
    </Container>
  );
};

export default PreRegister;
