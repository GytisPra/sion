import { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

interface CheckboxProps {
  isChecked: boolean;
}

interface ControlledFormCheckboxProps {
  children: ReactNode;
  isChecked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const Container = styled.label`
  display: flex;
  flex-direction: row;

  align-items: center;
`;

const HiddenCheckbox = styled.input`
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

const ControlledFormCheckbox = ({
  children,
  isChecked,
  onChange,
  className,
}: ControlledFormCheckboxProps) => {
  const { trigger } = useFormContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    trigger();
    onChange(e);
  };

  return (
    <Container className={className}>
      <HiddenCheckbox onChange={handleChange} type='checkbox' />
      <Checkbox
        isChecked={isChecked}
        aria-hidden='true'
        viewBox='0 0 15 11'
        fill='none'
      >
        <path
          d='M1 4.5L5 9L14 1'
          strokeWidth='2'
          stroke={isChecked ? '#fff' : 'none'} // only show the checkmark when `isCheck` is `true`
        />
      </Checkbox>
      <Label>{children}</Label>
    </Container>
  );
};

export default ControlledFormCheckbox;
