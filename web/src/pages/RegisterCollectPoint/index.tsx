import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

import LogoImg from '../../assets/recycle-logo.png';
import CollectPointImg from '../../assets/collect-point-foreground.png';

import {
  Container,
  Content,
  Header,
  Logo,
  Form,
  Nav,
  Foreground
} from './styles';

const Login: React.FC = () => {
  return (
    <Container>
      <Content>
        <Header>
          <Logo>
            <img src={LogoImg} alt="Recycle" />
            <p>Recycle it</p>
          </Logo>
          <p>É sua responsabilidade reciclar o lixo que produz.</p>
        </Header>
        <Form>
          <Input icon={FiMail} name="email" type="email" placeholder="E-mail" />
          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Senha"
          />
          <Button>Entrar</Button>
        </Form>
        <Nav>
          <Link className="forgot-password" to="/">
            Esqueci minha senha
          </Link>
          <Link className="create-account" to="/register">
            <FiLogIn size={32} />
            <p>Criar conta</p>
          </Link>
        </Nav>
      </Content>
      <Foreground src={CollectPointImg} alt="Ponto de coleta" />
    </Container>
  );
};

export default Login;
