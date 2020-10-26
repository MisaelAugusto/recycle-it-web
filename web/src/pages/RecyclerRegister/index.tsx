import React, { useState, useCallback, useEffect, ChangeEvent } from 'react';
import { FiCamera } from 'react-icons/fi';
import axios from 'axios';

import Button from '../../components/Button';
import Select from '../../components/Select';

import LogoImg from '../../assets/recycle-logo.png';
import UserAvatar from '../../assets/icons/avatar.svg';

import { Container, Content, Header, Logo, Form, AvatarInput } from './styles';

interface IBGECityResponse {
  nome: string;
}

interface IBGEStateResponse {
  nome: string;
  sigla: string;
}

const RecyclerRegister: React.FC = () => {
  const [cities, setCities] = useState<IBGECityResponse[]>([]);
  const [states, setStates] = useState<IBGEStateResponse[]>([]);

  const [selectedUF, setSelectedUF] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    axios
      .get<IBGEStateResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
      )
      .then(response => setStates(response.data));
  }, []);

  useEffect(() => {
    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`
      )
      .then(response => setCities(response.data));
  }, [selectedUF]);

  const handleSelectState = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const uf = event.target.value;

      setSelectedUF(uf);
      setSelectedCity('');
    },
    []
  );
  const handleSelectCity = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const city = event.target.value;

      setSelectedCity(city);
    },
    []
  );

  const handleAvatarChange = useCallback(() => {
    // TODO
  }, []);

  return (
    <Container>
      <Content>
        <Header>
          <Logo>
            <img src={LogoImg} alt="Recycle" />
            <p>Recycle it</p>
          </Logo>
          <p>Seja a mudança que deseja ver no mundo.</p>
        </Header>
        <Form>
          <AvatarInput>
            <img src={UserAvatar} alt="Avatar do usuário" />
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>

          <Select
            selected={selectedUF !== ''}
            defaultOption="Selecione seu estado"
            value={selectedUF}
            options={states.map(state => {
              return { name: state.nome, value: state.sigla };
            })}
            onChange={event => handleSelectState(event)}
          />

          <Select
            selected={selectedCity !== ''}
            defaultOption="Selecione sua cidade"
            value={selectedCity}
            options={cities.map(city => {
              return { name: city.nome, value: city.nome };
            })}
            onChange={event => handleSelectCity(event)}
          />
          <Button>Confirmar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default RecyclerRegister;
