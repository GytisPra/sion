import styled from 'styled-components';
import Link from 'next/link';
import { forwardRef, RefObject, useState } from 'react';
import Select, {
  components,
  ClearIndicatorProps,
  DropdownIndicatorProps,
  StylesConfig,
} from 'react-select';

import { useTranslation } from 'next-i18next';

import { Logo } from '@components/ui';
import { Bell, CloseIcon, Menu, SearchIcon } from '@assets/icons';
import useComponentVisible from '@hooks/useComponentVisible';
import Drawer from './Drawer';

const MobileHeaderContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;

  background-color: white;
`;

const StyledMobileHeader = styled.header`
  width: 90%;
  margin: 0 auto;
  padding: 1rem 0;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const SearchAndNotifications = styled.div`
  width: 4.5rem;

  display: flex;
  justify-content: space-between;
`;

const SearchbarContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;

  width: 100%;
  margin: auto;
`;

export interface SearchbarProps {
  isComponentVisible: boolean;
}

type OptionType = {
  label: string;
  value: string;
};

type IsMulti = false;

const SearchbarStyles: StylesConfig<OptionType, IsMulti> = {
  control: (provided) => ({
    ...provided,
    background: '#fff',
    borderColor: '#006D77',
    borderWidth: '1px',
    borderRadius: '7px',
    minHeight: '32px',
    height: '100%',
    width: '90%',
    margin: 'auto',
    boxShadow: 'none',

    '&:hover': {
      borderColor: '#006D77',
    },
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    margin: 0,
    backgroundColor: '#006D77',
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    height: '100%',
    padding: 0,
    backgroundColor: state.selectProps.menuIsOpen ? '#006D77' : 'white',
    borderTopRightRadius: '7px',
    borderBottomRightRadius: '7px',
    svg: {
      path: {
        fill: state.selectProps.menuIsOpen ? 'white' : '#006D77',
      },
    },
  }),
  input: (provided) => ({
    ...provided,
    margin: '0px',
  }),
  container: () => ({
    boxSizing: 'border-box',
  }),
  menu: () => ({
    position: 'absolute',
    right: 0,
    left: 0,

    boxSizing: 'border-box',

    backgroundColor: 'white',
    minHeight: '100vh',
  }),
  menuList: (provided) => ({
    ...provided,
    width: '82.4%',
    margin: '0.5rem auto 0 auto',
  }),
  option: () => ({
    padding: '0.25rem 0',
  }),
  clearIndicator: () => ({
    marginRight: '0.5rem',
  }),
};

const SearchIconContainer = styled.div`
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
`;

const ClearIndicatorText = styled.p`
  color: ${(props) => props.theme.colors.disabled};
  font-size: 11px;
  font-weight: 500;
`;

const ClearIndicator = (props: ClearIndicatorProps<OptionType, IsMulti>) => {
  const { t } = useTranslation('header', { keyPrefix: 'searchbar' });

  return (
    <components.ClearIndicator {...props}>
      <ClearIndicatorText>{t('clear')}</ClearIndicatorText>
    </components.ClearIndicator>
  );
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

const Searchbar = forwardRef(({ isComponentVisible }: SearchbarProps, ref) => {
  return (
    <SearchbarContainer ref={ref as RefObject<HTMLDivElement>}>
      {isComponentVisible && (
        <>
          <Select
            styles={SearchbarStyles}
            isClearable={true}
            components={{
              DropdownIndicator,
              ClearIndicator,
            }}
            options={options}
          />
        </>
      )}
    </SearchbarContainer>
  );
});

Searchbar.displayName = 'Searchbar';

const MobileHeader = () => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSearchBar = () => {
    setIsComponentVisible(!isComponentVisible);
  };

  const handleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <MobileHeaderContainer>
        <StyledMobileHeader>
          {isComponentVisible ? (
            <CloseIcon onClick={handleSearchBar} />
          ) : (
            <Menu onClick={handleDrawer} />
          )}

          <Link href='/'>
            <a aria-label='Logo'>
              <Logo className='pikensel-logo' />
            </a>
          </Link>

          <SearchAndNotifications>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              onClick={handleSearchBar}
            >
              <path
                d='M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z'
                fill={isComponentVisible ? '#FFFFFF' : '#006D77'}
              />
            </svg>
            <Bell />
          </SearchAndNotifications>
        </StyledMobileHeader>
        <Searchbar ref={ref} isComponentVisible={isComponentVisible} />
      </MobileHeaderContainer>
      <Drawer isDrawerOpen={isDrawerOpen} handleDrawer={handleDrawer} />
    </>
  );
};

export default MobileHeader;
