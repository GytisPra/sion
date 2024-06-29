import { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

interface FormRadioButtonProps {
  children: ReactNode;
  name: string;
  className?: string;
}

const Container = styled.label`
  display: flex;
  flex-direction: row;

  align-items: center;
`;

const HiddenRadioButton = styled.input`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const RadioButton = styled.div<{ isSelected?: boolean; name?: string }>`
  height: 20px;
  width: 20px;
  border: 2px solid ${(props) => props.theme.colors.accent};
  background-color: white;
  border-radius: 50%;
  margin-right: 0.5rem;
  position: relative;
  cursor: pointer;

  &:after {
    content: ' ';
    display: block;
    height: 9px;
    width: 9px;
    background-color: ${(props) =>
      props.isSelected ? props.theme.colors.accent : 'white'};
    border-radius: 50%;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Label = styled.p`
  font-weight: 600;
  color: ${(props) => props.theme.colors.black};
  white-space: nowrap;
`;

const FormRadioButton = ({
  children,
  className,
  name,
}: FormRadioButtonProps) => {
  const { register } = useFormContext();

  return (
    <Container className={className}>
      <HiddenRadioButton type='radio' {...register(name)} />
      <RadioButton {...register(name)} />
      <Label>{children}</Label>
    </Container>
  );
};

export default FormRadioButton;
