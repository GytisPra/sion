import { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';

import CategoriesDropdown from './CategoriesDropdown';

const NavbarContainer = styled.nav`
  display: none;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    display: block;
  }

  background-color: ${(props) => props.theme.colors.accent};

  height: 2.25rem;
`;

const NavbarList = styled.ul`
  width: 90%;
  height: 100%;
  margin: 0 auto;
  padding: 0;

  list-style: none;

  display: flex;
  flex-direction: row;

  align-items: center;
`;

interface NavbarListItemProps {
  bold?: boolean;
}

const NavbarListItem = styled.li<NavbarListItemProps>`
  color: ${(props) => props.theme.colors.white};
  margin-right: 2rem;

  font-weight: ${(props) => (props.bold ? 600 : 400)};
`;

const Navbar: FC = () => {
  const { t } = useTranslation('header', { keyPrefix: 'navbar' });

  return (
    <NavbarContainer>
      <NavbarList>
        <NavbarListItem>{t('shop')}</NavbarListItem>
        <CategoriesDropdown />
        <NavbarListItem>{t('hotOffers')}</NavbarListItem>
        <NavbarListItem>{t('hotSellers')}</NavbarListItem>
        <NavbarListItem bold>{t('buy')}</NavbarListItem>
        <NavbarListItem bold>{t('sell')}</NavbarListItem>
      </NavbarList>
    </NavbarContainer>
  );
};

export default Navbar;
