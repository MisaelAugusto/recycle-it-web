import React, {
  useState,
  useCallback,
  useEffect,
  ChangeEvent,
  useRef
} from 'react';
import { SiWhatsapp } from 'react-icons/si';
import axios from 'axios';

// import { Map, TileLayer, Marker } from 'react-leaflet';
// import { LeafletMouseEvent } from 'leaflet';

import * as Yup from 'yup';
import { Form } from '@unform/web';

import { useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Select from '../../components/Select';

import LogoImg from '../../assets/recycle-logo.png';
import UserImage from '../../assets/icons/image.svg';

import { Container, Content, Header, Logo, ImageInput } from './styles';
import { useAuth, CollectPoint } from '../../hooks/auth';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

interface FormData {
  whatsapp: string;
}

interface IBGECityResponse {
  nome: string;
}

interface IBGEStateResponse {
  nome: string;
  sigla: string;
}

const CollectPointRegister: React.FC = () => {
  const history = useHistory();
  const { user, updateUser } = useAuth();

  const typedUser = user as CollectPoint;

  const formRef = useRef<FormHandles>(null);

  const [cities, setCities] = useState<IBGECityResponse[]>([]);
  const [states, setStates] = useState<IBGEStateResponse[]>([]);

  const [selectedUF, setSelectedUF] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0
  ]);
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0
  ]);

  const [submited, setSubmited] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    axios
      .get<IBGEStateResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
      )
      .then(response => {
        console.log(response.data);

        setStates(response.data);
      });
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

  const handleImageChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const data = new FormData();

        data.append('image', event.target.files[0]);

        api.patch('collect-points/image', data).then(response => {
          updateUser(response.data);
        });
      }
    },
    [updateUser]
  );

  // const handleMapClick = useCallback((event: LeafletMouseEvent) => {
  //   setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  // }, []);

  const handleSubmit = useCallback(
    async ({ whatsapp }: FormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          whatsapp: Yup.string().required('Whatsapp obrigatório')
        });

        if (selectedUF && selectedCity && whatsapp) {
          const data = {
            whatsapp,
            city: selectedCity,
            state: states.find(state => state.sigla === selectedUF)?.nome
          };

          await api.put('/collect-points', data).then(response => {
            updateUser(response.data);
          });

          history.push('/collect-point/dashboard');
        }

        setSubmited(true);

        await schema.validate(
          { whatsapp },
          {
            abortEarly: false
          }
        );

        history.push('/collect-point/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
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
          <p>
            Faça parte da mudança, seja a ponte entre as pessoas e a reciclagem.
          </p>
        </Header>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <ImageInput>
            <label htmlFor="image">
              <img
                src={typedUser.image_url || UserImage}
                alt="Imagem do usuário"
              />
              <input type="file" id="image" onChange={handleImageChange} />
            </label>
          </ImageInput>

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

          <div className="whatsapp-input">
            <Input
              icon={SiWhatsapp}
              name="whatsapp"
              type="tel"
              placeholder="83900000000"
            />
          </div>

          <Button type="submit">Confirmar</Button>

          {/* <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <Marker position={selectedPosition} />
          </Map> */}
        </Form>
      </Content>
    </Container>
  );
};

export default CollectPointRegister;
