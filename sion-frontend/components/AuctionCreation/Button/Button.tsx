import { ReactNode } from 'react';
import styled from 'styled-components';

import { ArrowRight } from '@assets/icons';

const StyledButton = styled.button<{ isNextStep?: boolean }>`
  background-color: ${(props) => props.theme.colors.accent};
  color: white;

  padding: 0.625rem 1.5rem;
  margin: 0;

  border: none;
  border-radius: 7px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  svg {
    margin-left: 0.5rem;
    path {
      fill: white;
    }
  }
`;

interface ButtonProps {
  children: ReactNode;
  // [x: string]: any;
}

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <StyledButton {...props}>
      {children} <ArrowRight />
    </StyledButton>
  );
};

export default Button;
