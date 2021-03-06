import React, { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container>
    <button type="button" {...rest}>
      {loading ? 'carregando...' : children}
    </button>
  </Container>
);

export default Button;
