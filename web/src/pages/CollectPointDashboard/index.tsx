import React, { useEffect, useState } from 'react';
import { FiPower } from 'react-icons/fi';
import { CollectPoint, useAuth } from '../../hooks/auth';
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

import Recycling from '../../components/Recycling';

import {
  Container,
  Header,
  Logo,
  CollectPointProfile,
  LogoutButton,
  ItemsDashboard,
  ItemsContainer,
  Item,
  Recyclings,
  RecyclingsContainer
} from './styles';

const itemImages = [
  { source: Paper, alt: 'Papel' },
  { source: Plastic, alt: 'Plástico' },
  { source: Glass, alt: 'Vidro' },
  { source: Metal, alt: 'Metal' },
  { source: Organic, alt: 'Orgânico' }
];

const CollectPointDashboard: React.FC = () => {
  const { user, userType, signOut } = useAuth();

  const typedUser = user as CollectPoint;

  const { recyclings, updateRecyclings } = useRecyclings();

  const [quantities, setQuantities] = useState([0, 0, 0, 0, 0]);
  const [openRecyclings, setOpenRecyclings] = useState<RecyclingType[]>([]);
  const [closedRecyclings, setClosedRecyclings] = useState<RecyclingType[]>([]);

  useEffect(() => {
    updateRecyclings(userType);
  }, [updateRecyclings, userType]);

  useEffect(() => {
    const open = recyclings.filter(recycling => !recycling.finished);
    const closed = recyclings.filter(recycling => recycling.finished);

    setOpenRecyclings(open);
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

  return (
    <Container>
      <Header>
        <Logo>
          <img src={LogoImg} alt="Recycle" />
          <p>Recycle it</p>
        </Logo>

        <CollectPointProfile>
          <img src={typedUser.image_url} alt="Imagem do ponto de coleta" />
          <p>{typedUser.name}</p>
        </CollectPointProfile>
        <LogoutButton type="button" onClick={signOut}>
          <FiPower size={24} />
        </LogoutButton>
      </Header>
      <ItemsDashboard>
        <p>Items coletados</p>

        <ItemsContainer>
          {itemImages.map((itemImage, index) => {
            const { source, alt } = itemImage;

            return (
              <Item
                key={alt}
                isEnabled={typedUser.items.includes(String(index + 1))}
              >
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
      <Recyclings>
        <p>Solicitações de reciclagem</p>

        <RecyclingsContainer>
          {openRecyclings.map(recycling => {
            return (
              <Recycling
                key={recycling.id}
                id={recycling.id}
                items={recycling.items.split(',')}
                recycler_id={recycling.recycler_id}
              />
            );
          })}
        </RecyclingsContainer>
      </Recyclings>
    </Container>
  );
};

export default CollectPointDashboard;
