import React, { useCallback, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

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
  Nav,
  ToggleContainer,
  Toggle,
  Foreground
} from './styles';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';

interface UserType {
  type: 'recycler' | 'collect-point';
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
  type: 'collect-point',
  text: 'Faça parte da mudança, seja a ponte entre as pessoas e a reciclagem.',
  image: CollectPointImg,
  altImg: 'Ponto de coleta'
} as UserType;

interface SignInFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  const { user, signIn } = useAuth();

  const [changed, setChanged] = useState(false);
  const [userType, setUserType] = useState<UserType>(recycler);

  const handleToggleLoginUserType = useCallback(() => {
    if (userType.type === 'recycler') {
      setUserType(collectPoint);
    } else {
      setUserType(recycler);
    }

    setChanged(true);

    setTimeout(() => setChanged(false), 200);
  }, [userType]);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string()
            .required('Senha obrigatória')
            .min(8, 'Mínimo de 8 caracteres')
            .max(16, 'Máximo de 16 caracteres')
        });

        await schema.validate(data, {
          abortEarly: false
        });

        await signIn({
          email: data.email,
          password: data.password,
          userType: userType.type
        });

        history.push(
          `/${userType.type}${user.city ? '/dashboard' : '-register'}`
        );
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [user, signIn, history, userType]
  );

  return (
    <Container changed={changed}>
      <Content>
        <Header>
          <Logo>
            <img src={LogoImg} alt="Recycle" />
            <p>Recycle it</p>
          </Logo>
          <p>{userType.text}</p>
        </Header>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input icon={FiMail} name="email" placeholder="E-mail" />
          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Senha"
          />
          <Button type="submit">Entrar</Button>
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
        <Toggle checked={userType.type === 'collect-point'} />
        <span>
          Clique para fazer login como
          {` ${
            userType.type === 'collect-point' ? 'reciclador' : 'ponto de coleta'
          }`}
        </span>
      </ToggleContainer>
      <Foreground src={userType.image} alt={userType.altImg} />
    </Container>
  );
};

export default Login;
