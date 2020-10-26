import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMail, FiLock, FiLogOut, FiUser } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

import Return from '../../assets/icons/return.svg';
import LogoImg from '../../assets/recycle-logo.png';
import RecyclerImg from '../../assets/recycler-foreground.png';
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

interface UserType {
  type: string;
  text: string;
  image: string;
  altImg: string;
}

const recycler = {
  image: RecyclerImg,
  altImg: 'Pessoas reciclando juntas'
} as UserType;

const collectPoint = {
  image: CollectPointImg,
  altImg: 'Ponto de coleta'
} as UserType;

const Register: React.FC = () => {
  const [userType, setUserType] = useState<UserType>(recycler);

  const location = useLocation();

  useEffect(() => {
    const user = location.search.replace('?user=', '');

    if (user !== 'recycler') {
      setUserType(collectPoint);
    }
  }, [location]);

  return (
    <div style={{}}>
      <Container>
        <Link to="/pre-register">
          <img src={Return} alt="Voltar" />
        </Link>
        <Content>
          <Header>
            <Logo>
              <img src={LogoImg} alt="Recycle" />
              <p>Recycle it</p>
            </Logo>
          </Header>
          <Form>
            <Input icon={FiUser} name="name" type="text" placeholder="Name" />
            <Input
              icon={FiMail}
              name="email"
              type="email"
              placeholder="E-mail"
            />
            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="Senha"
            />
            <Button>Cadastrar</Button>
          </Form>
          <Nav>
            <Link className="back-to-login" to="/">
              <FiLogOut size={32} />
              <p>Voltar para login</p>
            </Link>
          </Nav>
        </Content>
        <Foreground src={userType.image} alt={userType.altImg} />
      </Container>
    </div>
  );
};

export default Register;
