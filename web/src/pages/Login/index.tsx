import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

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
  ToggleContainer,
  Toggle,
  Foreground
} from './styles';

interface UserType {
  type: string;
  text: string;
  image: string;
  altImg: string;
}

const recycler = {
  type: 'recycler',
  text: 'É sua responsabilidade reciclar o lixo que produz.',
  image: RecyclerImg,
  altImg: 'Pessoas reciclando juntas'
} as UserType;

const collectPoint = {
  type: 'collectPoint',
  text: 'Faça parte da mudança, seja a ponte entre as pessoas e a reciclagem.',
  image: CollectPointImg,
  altImg: 'Ponto de coleta'
} as UserType;

const Login: React.FC = () => {
  const [userType, setUserType] = useState<UserType>(recycler);
  const [changed, setChanged] = useState(false);

  const handleToggleLoginUserType = useCallback(() => {
    if (userType.type === 'recycler') {
      setUserType(collectPoint);
    } else {
      setUserType(recycler);
    }

    setChanged(true);

    setTimeout(() => setChanged(false), 200);
  }, [userType]);

  return (
    <div style={{}}>
      <Container changed={changed}>
        <Content>
          <Header>
            <Logo>
              <img src={LogoImg} alt="Recycle" />
              <p>Recycle it</p>
            </Logo>
            <p>{userType.text}</p>
          </Header>
          <Form>
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
            <Button>Entrar</Button>
          </Form>
          <Nav>
            <Link className="forgot-password" to="/">
              Esqueci minha senha
            </Link>
            <Link className="create-account" to="/pre-register">
              <FiLogIn size={32} />
              <p>Criar conta</p>
            </Link>
          </Nav>
        </Content>
        <ToggleContainer type="button" onClick={handleToggleLoginUserType}>
          <Toggle checked={userType.type === 'collectPoint'} />
          <span>
            Clique para fazer login como
            {` ${
              userType.type === 'collectPoint'
                ? 'reciclador'
                : 'ponto de coleta'
            }`}
          </span>
        </ToggleContainer>
        <Foreground src={userType.image} alt={userType.altImg} />
      </Container>
    </div>
  );
};

export default Login;
