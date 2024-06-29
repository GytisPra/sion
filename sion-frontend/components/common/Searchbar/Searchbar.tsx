import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import Select, { components, StylesConfig } from 'react-select';
import { DropdownIndicatorProps } from 'react-select';

import { SearchIcon } from '@assets/icons';

const CategorySelect = styled.select`
  display: none;

  @media (min-width: ${(props) => props.theme.breakpoints.ldesktop}) {
    display: block;
  }

  padding: 0 0.25rem;

  border: 3px solid ${(props) => props.theme.colors.accent};
  border-right: none;
  background-color: ${(props) => props.theme.colors.white};

  color: ${(props) => props.theme.colors.accent};
  font-weight: 600;
`;

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
`;

const SearchIconContainer = styled.div`
  display: none;

  padding: 0 1rem;
  background-color: ${(props) => props.theme.colors.accent};

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    display: flex;
    align-items: center;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.ldesktop}) {
    padding: 0 2.125rem;
  }
`;

const options = [
  {
    value: 'plants',
    label: 'Augalai',
  },
  {
    value: 'jewelry',
    label: 'Papuošalai',
  },
];

type OptionType = {
  label: string;
  value: string;
};

type IsMulti = false;

const SearchbarStyles: StylesConfig<OptionType, IsMulti> = {
  container: (provided) => ({
    ...provided,
    width: '100%',
  }),
  control: (provided) => ({
    ...provided,
    background: '#fff',
    borderColor: '#006D77',
    borderWidth: '3px',
    borderRadius: 0,
    minHeight: '36px',
    height: '100%',
    boxShadow: 'none',

    '&:hover': {
      borderColor: '#006D77',
    },
  }),

  valueContainer: (provided) => ({
    ...provided,
    height: '100%',
    padding: '0 1rem',
  }),

  input: (provided) => ({
    ...provided,
    margin: '0px',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#006D77',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: 0,
    height: '100%',
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
      width: '98%',
      borderBottom: '1px solid #C4C4C4',
    },
    '&:hover': {
      backgroundColor: '#EDF6F9',
    },
  }),
  menu: (provided) => ({
    ...provided,
    margin: 0,
    borderRadius: 0,
  }),
  menuList: (provided) => ({
    ...provided,
    padding: '4px 0',
  }),
};

const DropdownIndicator = (
  props: DropdownIndicatorProps<OptionType, IsMulti>,
) => {
  return (
    <components.DropdownIndicator {...props}>
      <SearchIconContainer>
        <SearchIcon />
      </SearchIconContainer>
    </components.DropdownIndicator>
  );
};

const Searchbar = () => {
  const { t } = useTranslation('header', { keyPrefix: 'searchbar' });

  return (
    <SearchBarContainer>
      <CategorySelect>
        <option>visos prekės</option>
        <option value='Hujovi batai'>Hujovi batai</option>
      </CategorySelect>
      <Select
        options={options}
        styles={SearchbarStyles}
        components={{
          DropdownIndicator,
        }}
        placeholder={t('search')}
        instanceId='searchbar'
      />
    </SearchBarContainer>
  );
};

export default Searchbar;
