import styled from 'styled-components';

import DropDown from '../../assets/icons/dropdown.svg';
import SelectedDropDown from '../../assets/icons/selected-dropdown.svg';

interface SelectProps {
  selected: boolean;
}

export const Container = styled.select<SelectProps>`
  border: 0;
  width: 100%;
  color: ${props => (props.selected ? '#1dbc5c' : '#818181')};
  height: 3.2rem;
  font-size: 1rem;
  padding: 0 0.8rem;
  margin-top: 0.8rem;
  position: relative;
  background: #f6f6f6;
  border-radius: 0.6rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  background: url(${props => (props.selected ? SelectedDropDown : DropDown)})
    no-repeat 96% 50%;
  background-size: 1rem;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  &::-ms-expand {
    display: none;
  }
`;
