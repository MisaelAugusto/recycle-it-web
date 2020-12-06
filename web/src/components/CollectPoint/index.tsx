/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

import { FaRecycle } from 'react-icons/fa';
import { CollectPoint as CollectPointType } from '../../hooks/auth';

import Paper from '../../assets/icons/paper.svg';
import Plastic from '../../assets/icons/plastic.svg';
import Glass from '../../assets/icons/glass.svg';
import Metal from '../../assets/icons/metal.svg';
import Organic from '../../assets/icons/organic.svg';

import {
  Container,
  ImagesContainer,
  MapFooter,
  Button,
  CollectPointInfo,
  ItemsContainer,
  Item,
  CreateRecycling
} from './styles';
import api from '../../services/api';

interface CollectPointProps {
  collectPoint: CollectPointType;
}

const itemImages = [
  { source: Paper, alt: 'Papel' },
  { source: Plastic, alt: 'Plástico' },
  { source: Glass, alt: 'Vidro' },
  { source: Metal, alt: 'Metal' },
  { source: Organic, alt: 'Orgânico' }
];

const CollectPoint: React.FC<CollectPointProps> = ({ collectPoint }) => {
  const [selectedImage, setSelectedImage] = useState(1);

  const [submited, setSubmited] = useState(false);
  const [selectedItems, setSelectedItems] = useState([0, 0, 0, 0, 0]);

  const handleAddItem = useCallback(
    (item: number) => {
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

  const handleCreateRecycling = useCallback(async () => {
    try {
      const hasSelectedItem = selectedItems.includes(1);

      if (hasSelectedItem) {
        const data = {
          collect_point_id: collectPoint.id,
          items: getSelectedItemsInString()
        };

        await api.post('recyclings', data);

        alert('Reciclagem criada com sucesso!');
      }
    } catch (err) {
      alert(
        'Já existe alguma reciclagem com algum dos itens selecionados para este mesmo ponto de coleta !'
      );

      setSelectedItems([0, 0, 0, 0, 0]);

      setSubmited(true);
      setTimeout(() => {
        setSubmited(false);
      }, 500);
    }
  }, [selectedItems, setSubmited, collectPoint.id, getSelectedItemsInString]);

  return (
    <Container>
      <ImagesContainer selected={selectedImage}>
        {selectedImage ? (
          <img src={collectPoint.image_url} alt="Imagem do ponto de coleta" />
        ) : (
          <div>
            <MapContainer
              center={[collectPoint.latitude, collectPoint.longitude]}
              zoom={15}
              style={{
                width: '160px',
                height: '150px',
                fontSize: '8px',
                borderRadius: '8px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.25)'
              }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              <Marker
                position={[collectPoint.latitude, collectPoint.longitude]}
              />
            </MapContainer>

            <MapFooter>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.google.com/maps/dir/?api=1&destination=${collectPoint.latitude},${collectPoint.longitude}`}
              >
                Ver rota no Google Maps
              </a>
            </MapFooter>
          </div>
        )}

        <div className="buttons-container">
          <Button
            type="button"
            onClick={() => setSelectedImage(1)}
            selected={!!selectedImage}
          >
            <div />
          </Button>
          <Button
            type="button"
            onClick={() => setSelectedImage(0)}
            selected={!selectedImage}
          >
            <div />
          </Button>
        </div>
      </ImagesContainer>

      <CollectPointInfo>
        <strong>{collectPoint.name}</strong>
        <p>{`${collectPoint.city} - ${collectPoint.state}`}</p>

        <ItemsContainer>
          <span>Items</span>
          <div>
            {collectPoint.items.split(',').map(item => {
              const index = Number(item) - 1;

              return (
                <Item
                  key={itemImages[index].alt}
                  type="button"
                  selected={!!selectedItems[index]}
                  isErrored={!selectedItems[index] && submited}
                  itemImage={itemImages[index].source}
                  onClick={() => handleAddItem(index)}
                />
              );
            })}
          </div>
        </ItemsContainer>
      </CollectPointInfo>

      <CreateRecycling type="submit" onClick={handleCreateRecycling}>
        <FaRecycle size={24} />
        <p>Reciclar</p>
      </CreateRecycling>
    </Container>
  );
};

export default CollectPoint;
