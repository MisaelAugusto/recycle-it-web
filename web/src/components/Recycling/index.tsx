import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState
} from 'react';
import { FaRecycle } from 'react-icons/fa';
import api from '../../services/api';

import Paper from '../../assets/icons/paper.svg';
import Plastic from '../../assets/icons/plastic.svg';
import Glass from '../../assets/icons/glass.svg';
import Metal from '../../assets/icons/metal.svg';
import Organic from '../../assets/icons/organic.svg';

import {
  Container,
  RecyclerInfo,
  Form,
  ItemsContainer,
  Item,
  FinishRecycling
} from './styles';
import { useRecyclings } from '../../hooks/recyclings';
import { useAuth } from '../../hooks/auth';

interface Recycler {
  name: string;
  name_id: string;
  avatar_url: string;
}

interface RecyclingProps {
  id: string;
  items: string[];
  recycler_id: string;
}

const itemImages = [
  { source: Paper, alt: 'Papel' },
  { source: Plastic, alt: 'Plástico' },
  { source: Glass, alt: 'Vidro' },
  { source: Metal, alt: 'Metal' },
  { source: Organic, alt: 'Organic' }
];

const Recycling: React.FC<RecyclingProps> = ({ id, items, recycler_id }) => {
  const { userType } = useAuth();
  const { updateRecyclings } = useRecyclings();

  const [recycler, setRecycler] = useState<Recycler>({} as Recycler);

  const [errors, setErrors] = useState<boolean[]>([]);
  const [quantities, setQuantities] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    const initialQuantities = items.map(_ => 0);
    const initialErrors = items.map(_ => false);

    setErrors(initialErrors);
    setQuantities(initialQuantities);
  }, [items]);

  useEffect(() => {
    api.get(`recyclers/${recycler_id}`).then(response => {
      setRecycler(response.data);
    });
  }, [recycler_id]);

  const handleChangeItemQuantity = useCallback(
    (event: ChangeEvent<HTMLInputElement>, item: string) => {
      const index = items.indexOf(item);

      const tempQuantities = [...quantities];
      tempQuantities[index] = Number(event.target.value);

      setQuantities(tempQuantities);
    },
    [quantities, items]
  );

  const handleFinishRecycling = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      const inputErrors = quantities.map(quantity => {
        return quantity <= 0;
      });

      if (inputErrors.includes(true)) {
        setErrors(inputErrors);
        return;
      }

      const data = {
        quantities: quantities
          .reduce((quantity, result) => `${String(quantity)},${result}`, '')
          .substring(1)
      };

      await api.put(`recyclings/${id}`, data);

      setIsFinished(true);

      setTimeout(() => {
        updateRecyclings(userType);
      }, 440);
    },
    [quantities, userType, updateRecyclings, id]
  );

  return (
    <Container isFinished={isFinished}>
      <RecyclerInfo>
        <img src={recycler.avatar_url} alt={recycler.name} />
        <div>
          <span>Nome</span>
          <p>{recycler.name}</p>
        </div>
        <div>
          <span>Id</span>
          <p>{recycler.name_id}</p>
        </div>
      </RecyclerInfo>

      <Form>
        <ItemsContainer>
          {items.map((item, index) => {
            const { source, alt } = itemImages[Number(item) - 1];

            return (
              <Item key={item} isErrored={errors[index]}>
                <img src={source} alt={alt} />
                <input
                  type="number"
                  min="0"
                  placeholder="100 g"
                  onChange={event => handleChangeItemQuantity(event, item)}
                />
              </Item>
            );
          })}
        </ItemsContainer>

        <FinishRecycling type="submit" onClick={handleFinishRecycling}>
          <FaRecycle size={24} />
          <p>Reciclar</p>
        </FinishRecycling>
      </Form>
    </Container>
  );
};

export default Recycling;
