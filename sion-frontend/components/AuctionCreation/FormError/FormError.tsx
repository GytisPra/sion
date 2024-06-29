import { FieldError } from 'react-hook-form';
import styled from 'styled-components';

interface FormErrorProps {
  error?: FieldError;
}

const StyledFormError = styled.p`
  color: red;
  text-align: right;
  font-size: 0.9rem;
`;

const FormError = ({ error }: FormErrorProps) => {
  return <StyledFormError>{error?.message}</StyledFormError>;
};

export default FormError;
