import styled from 'styled-components';
import { FieldError, useFormContext } from 'react-hook-form';
import { ReactNode } from 'react';

import { FormLabel, FormError } from '@components/AuctionCreation';

interface FormInputProps {
  children: ReactNode;
  name: string;
  required?: boolean;
  placeholder: string;
  characterCount?: number;
  maxLength?: number;
  minLength?: number;
  width?: number;
  className?: string;
  count?: boolean;
  error?: FieldError;
  type?: string;
}

const FormInputContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 1.5rem;
`;

const Input = styled.input<{ error: boolean }>`
  height: 2.5rem;
  width: ${(props) => `${props.width}%`};

  padding: 0.625rem 0.5rem;
  font-size: 0.75rem;

  border-radius: 7px;
  border: 1px solid
    ${(props) =>
      props.error ? props.theme.colors.red : props.theme.colors.grey};

  outline: none;

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
    font-size: 1rem;
    padding: 1px 0.75rem;
  }
`;

const FormInput = ({
  children,
  name,
  required,
  placeholder,
  maxLength,
  width = 100,
  className,
  count = false,
  error,
  type = 'input',
}: FormInputProps) => {
  const { register } = useFormContext();

  return (
    <FormInputContainer className={className}>
      <FormLabel
        required={required}
        maxLength={maxLength}
        count={count}
        name={name}
      >
        {children}
      </FormLabel>
      <Input
        type={type}
        placeholder={placeholder}
        width={width}
        error={!!error}
        {...register(name, {
          valueAsNumber: type === 'number',
        })}
      />
      <FormError error={error} />
    </FormInputContainer>
  );
};

export default FormInput;
