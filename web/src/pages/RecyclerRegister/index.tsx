import React, {
  useState,
  useCallback,
  useEffect,
  ChangeEvent,
  FormEvent
} from 'react';
import { FiCamera } from 'react-icons/fi';
import axios from 'axios';

import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import Select from '../../components/Select';

import LogoImg from '../../assets/recycle-logo.png';
import UserAvatar from '../../assets/icons/avatar.svg';

import { Container, Content, Header, Logo, Form, AvatarInput } from './styles';
import { useAuth, Recycler } from '../../hooks/auth';
import api from '../../services/api';

interface IBGECityResponse {
  nome: string;
}

interface IBGEStateResponse {
  nome: string;
  sigla: string;
}

const RecyclerRegister: React.FC = () => {
  const history = useHistory();
  const { user, updateUser } = useAuth();

  const typedUser = user as Recycler;

  const [cities, setCities] = useState<IBGECityResponse[]>([]);
  const [states, setStates] = useState<IBGEStateResponse[]>([]);

  const [selectedUF, setSelectedUF] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const [submited, setSubmited] = useState(false);

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
      setSubmited(false);
      setSelectedCity('');
    },
    []
  );
  const handleSelectCity = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const city = event.target.value;

      setSubmited(false);
      setSelectedCity(city);
    },
    []
  );

  const handleAvatarChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const data = new FormData();

        data.append('avatar', event.target.files[0]);

        api.patch('recyclers/avatar', data).then(response => {
          updateUser(response.data);
        });
      }
    },
    [updateUser]
  );

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      if (selectedUF && selectedCity) {
        const data = {
          city: selectedCity,
          state: states.find(state => state.sigla === selectedUF)?.nome
        };

        await api.put('/recyclers', data).then(response => {
          updateUser(response.data);
        });

        history.push('/recycler/dashboard');
      }

      setSubmited(true);
    },
    [selectedUF, selectedCity, states, history, updateUser]
  );

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
        <Form onSubmit={handleSubmit}>
          <AvatarInput>
            <img
              src={typedUser.avatar_url || UserAvatar}
              alt="Avatar do usuário"
            />
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>

          <Select
            error={selectedUF === '' && submited}
            selected={selectedUF !== ''}
            defaultOption="Selecione seu estado"
            value={selectedUF}
            options={states.map(state => {
              return { name: state.nome, value: state.sigla };
            })}
            onChange={event => handleSelectState(event)}
          />

          <Select
            error={selectedCity === '' && submited}
            selected={selectedCity !== ''}
            defaultOption="Selecione sua cidade"
            value={selectedCity}
            options={cities.map(city => {
              return { name: city.nome, value: city.nome };
            })}
            onChange={event => handleSelectCity(event)}
          />
          <Button type="submit">Confirmar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default RecyclerRegister;
