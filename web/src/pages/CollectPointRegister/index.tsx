import React, {
  useState,
  useCallback,
  useEffect,
  ChangeEvent,
  useRef,
  FormEvent
} from 'react';
import { SiWhatsapp } from 'react-icons/si';
import axios from 'axios';

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

import * as Yup from 'yup';
import { Form } from '@unform/web';

import { useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { LeafletMouseEvent } from 'leaflet';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Select from '../../components/Select';

import LogoImg from '../../assets/recycle-logo.png';
import UserImage from '../../assets/icons/image.svg';

import Paper from '../../assets/icons/paper.svg';
import Plastic from '../../assets/icons/plastic.svg';
import Glass from '../../assets/icons/glass.svg';
import Metal from '../../assets/icons/metal.svg';
import Organic from '../../assets/icons/organic.svg';

import {
  Container,
  Content,
  Header,
  FormContent,
  RightForm,
  LeftForm,
  ItemsContainer,
  Item,
  Logo,
  ImageInput
} from './styles';
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

interface Position {
  lat: number;
  lng: number;
}

const itemImages = [
  { source: Paper, alt: 'Papel' },
  { source: Plastic, alt: 'Plástico' },
  { source: Glass, alt: 'Vidro' },
  { source: Metal, alt: 'Metal' },
  { source: Organic, alt: 'Orgânico' }
];

const CollectPointRegister: React.FC = () => {
  const history = useHistory();
  const { user, updateUser } = useAuth();

  const typedUser = user as CollectPoint;

  const formRef = useRef<FormHandles>(null);

  const [cities, setCities] = useState<IBGECityResponse[]>([]);
  const [states, setStates] = useState<IBGEStateResponse[]>([]);

  const [selectedUF, setSelectedUF] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedItems, setSelectedItems] = useState([0, 0, 0, 0, 0]);

  const [submited, setSubmited] = useState(false);

  const [initialPosition, setInitialPosition] = useState<Position>({
    lat: -7.2171315,
    lng: -35.911943
  });

  const [selectedPosition, setSelectedPosition] = useState<Position>({
    lat: -7.2171315,
    lng: -35.911943
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      setInitialPosition({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    axios
      .get<IBGEStateResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
      )
      .then(response => {
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

  function LocationMarker() {
    useMapEvents({
      click(e: LeafletMouseEvent) {
        const { lat, lng } = e.latlng;

        setSelectedPosition({ lat, lng });
      }
    });

    return <Marker position={selectedPosition} />;
  }

  const handleAddItem = useCallback(
    (event: FormEvent, item: number) => {
      event.preventDefault();

      const items = [...selectedItems];

      items[item] = (items[item] + 1) % 2;

      setSubmited(false);
      setSelectedItems(items);
    },
    [selectedItems]
  );

  const getSelectedItemsInString = useCallback(() => {
    let itemsString = '';

    selectedItems.forEach((item, index) => {
      itemsString += item ? `${String(index + 1)},` : '';
    });

    return itemsString.substring(0, itemsString.length - 1);
  }, [selectedItems]);

  const handleSubmit = useCallback(
    async ({ whatsapp }: FormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          whatsapp: Yup.string().required('Whatsapp obrigatório')
        });

        const hasItems = selectedItems.includes(1);

        if (selectedUF && selectedCity && whatsapp && hasItems) {
          const data = {
            whatsapp,
            items: getSelectedItemsInString(),
            latitude: selectedPosition.lat,
            longitude: selectedPosition.lng,
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
    [
      selectedUF,
      selectedCity,
      states,
      selectedItems,
      selectedPosition,
      history,
      updateUser,
      getSelectedItemsInString
    ]
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
          <FormContent>
            <LeftForm>
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
            </LeftForm>

            <RightForm>
              <ItemsContainer>
                {itemImages.map((item, index) => {
                  return (
                    <Item
                      key={item.alt}
                      type="button"
                      selected={!!selectedItems[index]}
                      onClick={event => handleAddItem(event, index)}
                      isErrored={!selectedItems.includes(1) && submited}
                    >
                      <img src={item.source} alt={item.alt} />
                      <p>{item.alt}</p>
                    </Item>
                  );
                })}
              </ItemsContainer>

              <MapContainer
                center={initialPosition}
                zoom={15}
                style={{
                  width: '320px',
                  height: '250px',
                  fontSize: '8px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.25)'
                }}
              >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <LocationMarker />
              </MapContainer>
            </RightForm>
          </FormContent>

          <Button type="submit" style={{ width: '16rem', marginTop: '1.6rem' }}>
            Confirmar
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default CollectPointRegister;
