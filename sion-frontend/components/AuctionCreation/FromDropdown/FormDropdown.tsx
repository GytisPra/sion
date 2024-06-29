import { ReactNode } from 'react';
import { FieldError, useController, useFormContext } from 'react-hook-form';
import Select, { StylesConfig } from 'react-select';
import styled from 'styled-components';

import { FormError } from '@components/AuctionCreation';

type OptionType = {
  label: string;
  value: string | number;
};

type IsMulti = false;

interface FormDropdownProps {
  children?: ReactNode;
  required?: boolean;
  options?: OptionType[];
  placeholder: string;
  containerWidth?: number;
  name: string;
  isSearchable?: boolean;
  className?: string;
  isLoading?: boolean;
  error?: FieldError;
}

interface LabelProps {
  required?: boolean;
}

export const StyledFormDropdown = styled.div<{ containerWidth?: number }>`
  display: flex;
  flex-direction: column;
  ${(props) => props.containerWidth && `width: ${props.containerWidth}%;`}

  .form-dropdown__placeholder {
    font-size: 0.75rem;

    @media (min-width: ${(props) => props.theme.breakpoints.phone}) {
      font-size: 1rem;
    }
  }
`;

const Label = styled.label<LabelProps>`
  font-weight: 600;
  margin-bottom: 0.25rem;

  ${(props) =>
    props.required &&
    `
  &::after {
    content: '*';
    margin-left: 0.5rem;
    color: ${props.theme.colors.accent};
  }
  `}
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
  option: (provided, state) => ({
    ...provided,
    position: 'relative',
    padding: '8px 1rem 4px 1rem',
    color: 'black',
    backgroundColor: state.isSelected ? '#EDF6F9' : 'white',
    '&:after': {
      content: '""',
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      bottom: 0,
      width: '95%',
      borderBottom: '1px solid #C4C4C4',
    },
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
  placeholder: (provided) => ({
    ...provided,
    fontSize: '0.75rem',
  }),
};

const FormDropdown = ({
  children,
  required,
  options = [],
  placeholder,
  containerWidth,
  name,
  isSearchable = true,
  className,
  isLoading = false,
  error,
}: FormDropdownProps) => {
  const { control } = useFormContext();

  const {
    field: { onChange, name: inputName, value, ref },
  } = useController({
    name,
    control,
  });

  const selectedValue = options.find((option) => option.value === value);

  const handleChange = (value: OptionType | null) => {
    if (value) {
      onChange(value.value);
    }
  };

  return (
    <StyledFormDropdown containerWidth={containerWidth} className={className}>
      <Label required={required}>{children}</Label>
      <Select
        styles={FormDropdownStyles}
        options={options}
        placeholder={placeholder}
        onChange={handleChange}
        instanceId={name}
        value={selectedValue}
        ref={ref}
        name={inputName}
        isSearchable={isSearchable}
        classNamePrefix='form-dropdown'
        isLoading={isLoading}
        error={!!error}
      />
      <FormError error={error} />
    </StyledFormDropdown>
  );
};

export default FormDropdown;
