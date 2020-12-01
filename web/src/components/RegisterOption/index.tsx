/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useCallback } from 'react';

import OptionFooterImg from '../../assets/option-footer.png';
import HighlightedOptionFooterImg from '../../assets/highlighted-option-footer.png';

import { Container, Option } from './styles';

interface RegisterOptionProps {
  to: string;
  image: string;
  color: string;
  title: string;
  text: string[];
}

const RegisterOption: React.FC<RegisterOptionProps> = ({
  to,
  image,
  color,
  title,
  text
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleOptionFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleOptionBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <Container>
      <p>
        Quero ser um
        <span style={{ color: `${color}` }}> {title} </span>
      </p>
      <Option
        to={to}
        image={image}
        onMouseOver={handleOptionFocus}
        onMouseOut={handleOptionBlur}
      >
        <div>
          <p>
            {text[0]}
            <br />
            {text[1]}
            <br />
            {text[2]}
            <span style={{ color: '#1dbc5c' }}> {text[3]} </span>
            {text[4]}
            <span style={{ color: '#1dbc5c' }}> {text[5]}</span>.
          </p>
          <img
            src={isFocused ? HighlightedOptionFooterImg : OptionFooterImg}
            alt="Fundo do texto"
          />
        </div>
      </Option>
    </Container>
  );
};

export default RegisterOption;
