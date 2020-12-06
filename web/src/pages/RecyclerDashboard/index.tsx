import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { FiPower } from 'react-icons/fi';
import { FaSearchLocation } from 'react-icons/fa';
import {
  Recycler,
  CollectPoint as CollectPointType,
  useAuth
} from '../../hooks/auth';
import {
  Recycling as RecyclingType,
  useRecyclings
} from '../../hooks/recyclings';

import LogoImg from '../../assets/recycle-logo.png';

import Paper from '../../assets/icons/paper.svg';
import Plastic from '../../assets/icons/plastic.svg';
import Glass from '../../assets/icons/glass.svg';
import Metal from '../../assets/icons/metal.svg';
import Organic from '../../assets/icons/organic.svg';

import {
  Container,
  Header,
  Logo,
  RecyclerProfile,
  LogoutButton,
  Content,
  ItemsDashboard,
  ItemsContainer,
  Item,
  FiltersContainer,
  Form,
  NameInput,
  ItemsInputsContainer,
  ItemInput,
  LocationCheckbox,
  SubmitButton,
  CollectPoints,
  CollectPointsContainer
} from './styles';
import api from '../../services/api';
import CollectPoint from '../../components/CollectPoint';

const itemImages = [
  { source: Paper, alt: 'Papel' },
  { source: Plastic, alt: 'Plástico' },
  { source: Glass, alt: 'Vidro' },
  { source: Metal, alt: 'Metal' },
  { source: Organic, alt: 'Orgânico' }
];

const RecyclerDashboard: React.FC = () => {
  const { user, userType, signOut } = useAuth();
  const typedUser = user as Recycler;

  const { recyclings, updateRecyclings } = useRecyclings();

  const [quantities, setQuantities] = useState([0, 0, 0, 0, 0]);
  const [closedRecyclings, setClosedRecyclings] = useState<RecyclingType[]>([]);

  const [name, setName] = useState('');
  const [nameInputFocused, setNameInputFocused] = useState(false);
  const [selectedItems, setSelectedItems] = useState([0, 0, 0, 0, 0]);
  const [useRecyclerLocation, setUseRecyclerLocation] = useState(false);

  const [collectPoints, setCollectPoints] = useState<CollectPointType[]>([]);

  useEffect(() => {
    updateRecyclings(userType);
  }, [updateRecyclings, userType]);

  useEffect(() => {
    const closed = recyclings.filter(recycling => recycling.finished);

    setClosedRecyclings(closed);
  }, [recyclings]);

  useEffect(() => {
    const tempQuantities = [0, 0, 0, 0, 0];

    closedRecyclings.forEach(recycling => {
      const items = recycling.items.split(',').map(item => Number(item));
      const itemsQuantities = recycling.quantities
        .split(',')
        .map(quantity => Number(quantity));

      items.forEach((item, index) => {
        tempQuantities[item - 1] += itemsQuantities[index];
      });
    });

    setQuantities(tempQuantities);
  }, [closedRecyclings]);

  const handleAddItem = useCallback(
    (event: FormEvent, item: number) => {
      event.preventDefault();

      const items = [...selectedItems];

      items[item] = (items[item] + 1) % 2;

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
    async (event: FormEvent) => {
      event.preventDefault();

      const response = await api.get('collect-points', {
        params: {
          name,
          city: useRecyclerLocation ? typedUser.city : '',
          state: useRecyclerLocation ? typedUser.state : '',
          items: getSelectedItemsInString()
        }
      });

      setCollectPoints(response.data);
    },
    [name, typedUser, useRecyclerLocation, getSelectedItemsInString]
  );

  return (
    <Container>
      <Header>
        <Logo>
          <img src={LogoImg} alt="Recycle" />
          <p>Recycle it</p>
        </Logo>

        <RecyclerProfile>
          <img src={typedUser.avatar_url} alt="Imagem do ponto de coleta" />

          <div>
            <p className="name">{`${typedUser.name} #${typedUser.name_id}`}</p>
            <p className="location">{`${typedUser.city} - ${typedUser.state}`}</p>
          </div>
        </RecyclerProfile>
        <LogoutButton type="button" onClick={signOut}>
          <FiPower size={24} />
        </LogoutButton>
      </Header>
      <Content>
        <ItemsDashboard>
          <p>Items reciclados</p>

          <ItemsContainer>
            {itemImages.map((itemImage, index) => {
              const { source, alt } = itemImage;

              return (
                <Item key={alt}>
                  <div>
                    <img src={source} alt={alt} />
                    <strong>{`${quantities[index]} g`}</strong>
                  </div>
                  <p>{alt}</p>
                </Item>
              );
            })}
          </ItemsContainer>
        </ItemsDashboard>
        <FiltersContainer>
          <p>Pontos de coleta</p>

          <Form onSubmit={handleSubmit}>
            <NameInput isFocused={nameInputFocused} isFilled={name !== ''}>
              <span>Nome</span>
              <input
                name="name"
                type="text"
                placeholder="Ponto de coleta"
                onChange={event => setName(event.target.value)}
                onFocus={() => setNameInputFocused(true)}
                onBlur={() => setNameInputFocused(false)}
              />
            </NameInput>

            <ItemsInputsContainer>
              <span>Items</span>
              <div>
                {itemImages.map((item, index) => {
                  return (
                    <ItemInput
                      key={item.alt}
                      type="button"
                      itemImage={item.source}
                      selected={!!selectedItems[index]}
                      onClick={event => handleAddItem(event, index)}
                    />
                  );
                })}
              </div>
            </ItemsInputsContainer>

            <LocationCheckbox>
              <label className="container">
                <p>Usar minha localização</p>
                <input
                  type="checkbox"
                  onChange={() => setUseRecyclerLocation(!useRecyclerLocation)}
                />
                <span className="checkmark">
                  <div />
                </span>
              </label>
            </LocationCheckbox>

            <SubmitButton type="submit">
              <FaSearchLocation size={32} color="#228112" />
            </SubmitButton>
          </Form>

          <CollectPoints>
            {collectPoints.length > 0 ? (
              <>
                <CollectPointsContainer>
                  {collectPoints.map(collectPoint => {
                    return (
                      <CollectPoint
                        key={collectPoint.id}
                        collectPoint={collectPoint}
                      />
                    );
                  })}
                </CollectPointsContainer>
                <span>{`${collectPoints.length} resultados`}</span>
              </>
            ) : (
              <p>Preencha os campos acima para encontrar pontos de coleta</p>
            )}
          </CollectPoints>
        </FiltersContainer>
      </Content>
    </Container>
  );
};

export default RecyclerDashboard;
