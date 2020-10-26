import React, { SelectHTMLAttributes } from 'react';

import { Container } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  defaultOption: string;
  options: Array<{
    name: string;
    value: string;
  }>;
  selected: boolean;
}

const Select: React.FC<SelectProps> = ({ defaultOption, options, ...rest }) => {
  return (
    <Container {...rest}>
      <option value="">{defaultOption}</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </Container>
  );
};

export default Select;
