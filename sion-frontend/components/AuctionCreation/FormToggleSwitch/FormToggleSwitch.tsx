import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

const ToggleSwitch = styled.div`
  position: relative;
  width: 40px;
  display: inline-block;
  vertical-align: middle;
  text-align: left;
`;

const ToggleSwitchLabel = styled.label`
  display: block;
  overflow: hidden;
  cursor: pointer;
  border: 0 solid #bbb;
  border-radius: 20px;
  margin: 0;
`;

const ToggleSwitchInner = styled.span`
  display: block;
  width: 200%;
  margin-left: -100%;
  transition: margin 0.3s ease-in 0s;
  &:before,
  &:after {
    display: block;
    float: left;
    width: 50%;
    height: 20px;
    padding: 0;
    box-sizing: border-box;
  }
  &:before {
    content: ' ';
    padding-left: 10px;
    background-color: ${(props) => props.theme.colors.accent};
    color: #fff;
  }

  &:after {
    content: ' ';
    padding-right: 10px;
    background-color: ${(props) => props.theme.colors.grey};
    color: #fff;
  }
`;

const Switch = styled.span`
  display: block;
  width: 12px;
  margin: 4px;
  background: #fff;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 20px;
  border-radius: 50%;
  transition: all 0.3s ease-in 0s;
`;

const ToggleSwitchInput = styled.input`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;

  &:checked + ${ToggleSwitchLabel} {
    ${ToggleSwitchInner} {
      margin-left: 0;
    }
    ${Switch} {
      right: 0px;
    }
  }
`;

interface FormToggleSwitchProps {
  name: string;
}

const HiddenCheckbox = ({ name }: { name: string }) => {
  const { register } = useFormContext();

  return (
    <ToggleSwitchInput
      type='checkbox'
      {...register(name)}
      id={name}
      name={name}
    />
  );
};

const FormToggleSwitch = ({ name }: FormToggleSwitchProps) => {
  return (
    <ToggleSwitch>
      <HiddenCheckbox name={name} />
      <ToggleSwitchLabel htmlFor={name}>
        <ToggleSwitchInner />
        <Switch />
      </ToggleSwitchLabel>
    </ToggleSwitch>
  );
};

export default FormToggleSwitch;
