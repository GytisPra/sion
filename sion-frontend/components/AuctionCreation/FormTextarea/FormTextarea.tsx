import styled from 'styled-components';
import { ReactNode } from 'react';
import { FieldError, useFormContext } from 'react-hook-form';

import { FormError, FormLabel } from '@components/AuctionCreation';

interface TextareaProps {
  name: string;
  placeholder: string;
  children: ReactNode;
  required?: boolean;
  maxLength: number;
  count?: boolean;
  error?: FieldError;
}

const StyledTextarea = styled.textarea<{ error: boolean }>`
  resize: none;

  width: 100%;
  height: 3rem;
  outline: none;
  padding: 0.625rem 0.5rem;

  border: 1px solid
    ${(props) =>
      props.error ? props.theme.colors.red : props.theme.colors.grey};
  border-radius: 7px;

  font-size: 0.75rem;

  &:focus,
  &:hover {
    border: 1px solid
      ${(props) =>
        props.error ? props.theme.colors.red : props.theme.colors.accent};
    box-shadow: 0 0 0 1px
      ${(props) =>
        props.error ? props.theme.colors.red : props.theme.colors.accent};
  }

  @media (min-width: ${(props) => props.theme.breakpoints.phone}) {
    height: 5rem;
    padding: 0.75rem;
    font-size: 1rem;
  }
`;

const StyledTextareaContainer = styled.div`
  margin-top: 1.5rem;
`;

const FormTextarea = ({
  name,
  placeholder,
  children,
  required,
  maxLength,
  count = false,
  error,
}: TextareaProps) => {
  const { register } = useFormContext();

  return (
    <StyledTextareaContainer>
      <FormLabel
        required={required}
        maxLength={maxLength}
        count={count}
        name={name}
      >
        {children}
      </FormLabel>
      <StyledTextarea
        placeholder={placeholder}
        {...register(name)}
        error={!!error}
      />
      <FormError error={error} />
    </StyledTextareaContainer>
  );
};

export default FormTextarea;
