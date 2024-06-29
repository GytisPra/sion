import { ReactNode } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import styled from 'styled-components';

interface CheckboxProps {
  isChecked: boolean;
}

interface FormCheckboxProps {
  className?: string;
  name: string;
  children: ReactNode;
  handleChange?: () => void;
}

export const Container = styled.label`
  display: flex;
  flex-direction: row;

  align-items: center;
`;

const StyledHiddenCheckbox = styled.input`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const Checkbox = styled.svg<CheckboxProps>`
  display: inline-block;
  height: 18px;
  width: 18px;
  background: #fff;
  border: 2px solid ${(props) => props.theme.colors.accent};
  border-radius: 3px;
  margin-right: 1rem;

  cursor: pointer;

  ${(props) =>
    props.isChecked && `background-color: ${props.theme.colors.accent};`}
`;

const Label = styled.p`
  font-weight: 600;
  color: ${(props) => props.theme.colors.black};
`;

const HiddenCheckbox = ({ name }: { name: string }) => {
  const { register } = useFormContext();

  return <StyledHiddenCheckbox type='checkbox' id={name} {...register(name)} />;
};

const VisibleCheckbox = ({
  name,
  handleChange,
}: {
  name: string;
  handleChange?: () => void;
}) => {
  const isChecked = useWatch({ name });
  // console.log(name, isChecked);

  return (
    <Checkbox
      isChecked={!!isChecked}
      aria-hidden='true'
      viewBox='0 0 15 11'
      fill='none'
      onChange={handleChange}
    >
      <path
        d='M1 4.5L5 9L14 1'
        strokeWidth='2'
        stroke={isChecked ? '#fff' : 'none'}
      />
    </Checkbox>
  );
};

const FormCheckbox = ({ className, name, children }: FormCheckboxProps) => {
  return (
    <Container className={className}>
      <HiddenCheckbox name={name} />
      <VisibleCheckbox name={name} />
      <Label>{children}</Label>
    </Container>
  );
};

export default FormCheckbox;
