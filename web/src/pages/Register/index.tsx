import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FiMail, FiLock, FiLogOut, FiUser } from 'react-icons/fi';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';

import Return from '../../assets/icons/return.svg';
import LogoImg from '../../assets/recycle-logo.png';
import RecyclerImg from '../../assets/recycler-foreground.png';
import CollectPointImg from '../../assets/collect-point-foreground.png';

import { Container, Content, Header, Logo, Nav, Foreground } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

interface UserType {
  type: string;
  image: string;
  altImg: string;
}

const recycler = {
  type: 'recycler',
  image: RecyclerImg,
  altImg: 'Pessoas reciclando juntas'
} as UserType;

const collectPoint = {
  type: 'collect-point',
  image: CollectPointImg,
  altImg: 'Ponto de coleta'
} as UserType;

const Register: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const formRef = useRef<FormHandles>(null);

  const [userType, setUserType] = useState<UserType>(recycler);

  useEffect(() => {
    const user = location.search.replace('?user=', '');

    if (user !== 'recycler') {
      setUserType(collectPoint);
    }
  }, [location]);

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
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

        await api.post(`/${userType.type}s`, data);

        history.push(`/${userType.type}-register`);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        } else {
          alert('Erro ao criar usuário, e-mail já cadastrado!');
        }
      }
    },
    [history, userType]
  );

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
          <Form ref={formRef} onSubmit={handleSubmit}>
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
            <Button type="submit">Cadastrar</Button>
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
