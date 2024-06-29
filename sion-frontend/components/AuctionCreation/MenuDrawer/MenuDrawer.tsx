import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo } from 'react';

interface MenuListItemProps {
  active?: boolean;
}

const StyledMenuDrawer = styled.div`
  display: none;

  @media (min-width: ${(props) => props.theme.breakpoints.phone}) {
    display: block;

    grid-column: 1;
    grid-row: 2;
  }
`;

const StyledMenuDrawerList = styled.ul`
  list-style: none;
  padding: 0;
`;

const MenuListItem = styled.li<MenuListItemProps>`
  width: 100%;
  padding: 1rem 0;
  ${(props) =>
    props.active && `background-color: ${props.theme.colors.lightblue};`};

  a {
    font-weight: 600;
    color: ${(props) => props.theme.colors.accent};
    text-decoration: none;
    padding-left: 1.5rem;
  }
`;

const menuItems = [
  {
    value: 'description',
  },
  {
    value: 'price',
  },
  {
    value: 'duration',
  },
  // TODO: update MenuDrawer when these options will be available
  // {
  //   value: 'delivery',
  // },
  // {
  //   value: 'additionalservices',
  // },
  {
    value: 'notifications',
  },
];

const MenuDrawer = memo(() => {
  const { t } = useTranslation('auctioncreation', { keyPrefix: 'drawermenu' });
  const router = useRouter();

  const step = router.pathname.split('/')[2];

  return (
    <StyledMenuDrawer>
      <StyledMenuDrawerList>
        {menuItems.map((menuItem) => (
          <MenuListItem active={step === menuItem.value} key={menuItem.value}>
            <Link href={`/auctioncreation/${menuItem.value}`} passHref>
              <a>{t(`${menuItem.value}`)}</a>
            </Link>
          </MenuListItem>
        ))}
      </StyledMenuDrawerList>
    </StyledMenuDrawer>
  );
});

MenuDrawer.displayName = 'MenuDrawer';

export default MenuDrawer;
