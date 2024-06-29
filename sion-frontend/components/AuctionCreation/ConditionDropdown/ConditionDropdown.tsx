import Select, { StylesConfig, components, OptionProps } from 'react-select';
import styled from 'styled-components';
import { FieldError, useController, useFormContext } from 'react-hook-form';

import { FormLabel } from '@components/AuctionCreation';

type OptionType = {
  label: string;
  value: string;
  description: string;
};

type IsMulti = false;

interface CondtinionDropdownProps {
  name: string;
  error?: FieldError;
}

const StyledConditionDropdown = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  margin: 1.5rem 0;

  @media (min-width: ${(props) => props.theme.breakpoints.phone}) {
    width: 54%;
    font-size: 1rem;
  }

  .condition-dropdown__placeholder {
    font-size: 0.75rem;

    @media (min-width: ${(props) => props.theme.breakpoints.phone}) {
      font-size: 1rem;
    }
  }
`;

const FormDropdownStyles: StylesConfig<OptionType, IsMulti> = {
  indicatorSeparator: () => ({
    display: 'none',
  }),
  control: (provided, state) => ({
    ...provided,
    borderColor: state.selectProps.error ? '#F71735' : '#979797',
    borderWidth: '1px',
    borderRadius: '7px',
    boxShadow: 'none',
    height: '2.5rem',

    '&:focus, &:hover': {
      borderColor: state.selectProps.error ? '#F71735' : '#006D77',
      borderWidth: '1px',
      boxShadow: `0 0 0 1px ${state.selectProps.error ? '#F71735' : '#006D77'}`,
    },
  }),
  option: (provided) => ({
    ...provided,
    position: 'relative',
    padding: '8px 1rem 4px 1rem',
    color: 'black',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: '#EDF6F9',
    },
  }),
  menu: (provided) => ({
    ...provided,
    border: '1px solid #979797',
    borderRadius: '7px',
    boxShadow: 'none',
  }),
  menuList: (provided) => ({
    ...provided,
    padding: '4px 0',
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '2px 12px',
  }),
};

const RadioButton = styled.div<{ selected?: boolean }>`
  height: 18px;
  width: 18px;
  border: 2px solid ${(props) => props.theme.colors.accent};
  background-color: white;
  border-radius: 50%;
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:after {
    content: ' ';
    display: block;
    height: 12px;
    width: 12px;
    background-color: ${(props) =>
      props.selected ? props.theme.colors.accent : 'white'};
    border-radius: 50%;
  }
`;

const StyledOption = styled.div`
  display: flex;
  align-items: center;

  &:hover {
    ${RadioButton}:after {
      background-color: ${(props) => props.theme.colors.accent};
    }
  }
`;

const ConditionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ConditionDescription = styled.p`
  color: ${(props) => props.theme.colors.grey};
`;

const Option = ({ children, ...rest }: OptionProps<OptionType, IsMulti>) => {
  return (
    <components.Option {...rest}>
      <StyledOption>
        <RadioButton selected={rest.isSelected} />
        <ConditionContainer>
          {children}
          <ConditionDescription
            dangerouslySetInnerHTML={{ __html: rest.data.description }}
          />
        </ConditionContainer>
      </StyledOption>
    </components.Option>
  );
};

const options = [
  {
    label: 'Labai gera',
    description:
      'Prekė, kaip nauja. Naudota labai mažai,<br />idealios būklės, nepažeista.',
    value: 'excellent',
  },
  {
    label: 'Gera',
    value: 'good',
    description:
      'Prekė, kaip nauja. Naudota labai mažai,<br />idealios būklės, nepažeista.',
  },
];

const ConditionDropdown = ({ name, error }: CondtinionDropdownProps) => {
  const { control } = useFormContext();

  const {
    field: { onChange, name: inputName, value: inputValue, ref },
  } = useController({
    name,
    control,
    defaultValue: '',
  });

  const handleChange = (value: OptionType | null) => {
    if (value) {
      onChange(value.value);
    }
  };

  const selectedValue = options.find((option) => option.value === inputValue);

  return (
    <StyledConditionDropdown>
      <FormLabel name='condition' required>
        Būklė
      </FormLabel>
      <Select
        styles={FormDropdownStyles}
        options={options}
        placeholder='Būklė'
        components={{ Option }}
        onChange={handleChange}
        instanceId={name}
        name={inputName}
        value={selectedValue}
        ref={ref}
        classNamePrefix='condition-dropdown'
        error={!!error}
      />
    </StyledConditionDropdown>
  );
};

export default ConditionDropdown;
