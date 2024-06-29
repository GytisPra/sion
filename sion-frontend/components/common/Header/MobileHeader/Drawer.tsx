import styled from 'styled-components';

import { CloseIcon } from '@assets/icons';

const DrawerContainer = styled.div<{ isOpen: boolean }>`
  height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.theme.colors.lightblue};
  transition: all 0.3s ease-in-out;
  transform: ${(props) =>
    props.isOpen ? 'translate(0)' : 'translate(-100vw)'};
  position: absolute;
  top: 0;
  z-index: 100;
`;

const NavigationItemsList = styled.ul`
  list-style: none;
  width: 90%;
  margin: 1.25rem auto 0 auto;
`;

const NavigationItem = styled.li`
  margin-bottom: 1.75rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.accent};
`;

const StyledCloseIcon = styled(CloseIcon)`
  margin: 1rem 0 0 1rem;
`;

const navigationItems = [
  { label: 'Kategorijos' },
  { label: 'Įsiminti skelbimai' },
  { label: 'Karščiausi pasiūlymai' },
  { label: 'Greitai besibaigiantys aukcionai' },
  { label: 'Parduok' },
  { label: 'Pagalba' },
  { label: 'Apie Apricot' },
];

interface DrawerProps {
  isDrawerOpen: boolean;
  handleDrawer: () => void;
}

const Drawer = ({ isDrawerOpen, handleDrawer }: DrawerProps) => {
  return (
    <DrawerContainer isOpen={isDrawerOpen}>
      <StyledCloseIcon onClick={handleDrawer} />
      <NavigationItemsList>
        {navigationItems.map((item) => (
          <NavigationItem key={item.label}>{item.label}</NavigationItem>
        ))}
      </NavigationItemsList>
    </DrawerContainer>
  );
};

export default Drawer;
