import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { useSession } from 'next-auth/react';

import { Logo } from '@components/ui';
import {
  Searchbar,
  NotificationsModal,
  FollowedItemsModal,
} from '@components/common';
import { routes } from '@utils/routes';

import LanguageDropdown from './LanguageDropdown';
import HelpDropdown from './HelpDropdown';
import MyAccountDropdown from './MyAccountDropdown';

interface IsScrolledProps {
  isScrolled: boolean;
}

const StyledDesktopHeader = styled.header<IsScrolledProps>`
  display: none;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    display: block;
  }

  background-color: white;
  z-index: 10;
  ${(props) => props.isScrolled && 'position: sticky'};
  top: ${(props) => (props.isScrolled ? '0' : '-100px')};
  transition: top 0.2s ease-in-out;
`;

const StyledContainerRowOne = styled.div<IsScrolledProps>`
  display: ${(props) => (props.isScrolled ? 'none' : 'grid')};

  width: 86%;
  margin: auto;

  grid-template-columns: auto 2rem auto 2rem auto;
  grid-template-rows: 3rem;

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    grid-template-columns: 13rem auto 10rem 4.5rem 12.5rem;
    grid-template-rows: 3rem;
  }

  align-items: center;
  justify-items: center;
`;

const StyledContainerRowTwo = styled.div<IsScrolledProps>`
  width: 86%;
  margin: auto;
  padding: ${(props) => (props.isScrolled ? '24px 0' : '0 0 24px 0')};

  display: grid;
  grid-template-columns: 8rem 1rem auto 1rem 8rem;
  grid-template-rows: 36px;

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    grid-template-columns: 10rem auto 10rem 2.5rem 12.5rem;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.ldesktop}) {
    grid-template-columns: 13rem auto 10rem 4.5rem 12.5rem;
  }

  align-items: center;
  justify-items: center;
`;

const AuthenticationActions = styled.div`
  display: none;

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    grid-column: 5;

    width: 100%;

    display: flex;
    justify-content: space-between;
    justify-self: flex-end;

    .authentication-action {
      color: ${(props) => props.theme.colors.accent};
    }
  }
`;

const AuthenticationActionsMobile = styled.div`
  grid-row: 1;
  grid-column: 5;

  width: 90%;

  display: flex;
  justify-content: space-between;
  justify-self: flex-end;

  .authentication-action {
    color: ${(props) => props.theme.colors.accent};
  }

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    display: none;
  }
`;

const AuthenticationLink = styled.a`
  color: ${(props) => props.theme.colors.accent};
  text-decoration: none;
`;

const Register = styled(AuthenticationLink)`
  font-weight: 600;
`;

const LogoContainer = styled.div`
  grid-column: 1;

  position: relative;

  width: 100%;
  height: 100%;

  .pikensel-logo {
    position: absolute;
    bottom: -1.5px;

    width: 90%;

    @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
      width: 100%;
    }
  }
`;

const HelpAndLanguageContainer = styled.div`
  grid-row: 1;
  grid-column: 1;

  width: 80%;

  display: flex;
  justify-content: space-between;
  justify-self: flex-start;

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    grid-row: 1;
    grid-column: 5;

    width: 100%;
    justify-self: flex-end;
  }
`;

const UploadItemButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  grid-column: 5;
  background-color: ${(props) => props.theme.colors.accent};

  min-width: 7.5rem;

  justify-self: end;
  height: 100%;

  cursor: pointer;

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    grid-column: 3;
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.white};
    font-weight: 600;
  }
`;

const MainSection = styled.div`
  grid-column: 3;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    grid-column: 2;
  }
`;

const NotificationsAndFollowingActions = styled.div`
  display: none;

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    position: relative;
    grid-column: 5;

    width: 100%;
    font-size: 1.75rem;

    display: flex;
    justify-content: space-between;
    color: ${(props) => props.theme.colors.accent};

    justify-self: start;
  }
`;

const NotificationsAndFollowingActionsMobile = styled.div`
  position: relative;
  grid-column: 5;

  width: 60%;
  font-size: 1.75rem;

  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.accent};

  justify-self: end;

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    display: none;
  }
`;

const MyAccount = styled.div`
  grid-column: 3;
  grid-row: 1;

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    grid-column: 3;
    grid-row: 1;

    justify-self: end;
  }
`;

const ItemPageTestButton = styled.div<{ isScrolled?: boolean }>`
  display: flex;
  background-color: ${(props) => props.theme.colors.lightblue};

  width: 10rem;

  justify-content: center;

  ${(props) => props.isScrolled && 'display: none'};

  cursor: pointer;

  a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.black};
  }
`;

const DesktopHeader: FC = () => {
  const { t } = useTranslation('header');
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.pageYOffset > 160);

    if (typeof window !== undefined) {
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <StyledDesktopHeader isScrolled={isScrolled}>
      <StyledContainerRowOne isScrolled={isScrolled}>
        <MyAccount>
          <MyAccountDropdown />
        </MyAccount>

        <HelpAndLanguageContainer>
          <HelpDropdown />
          <LanguageDropdown />
        </HelpAndLanguageContainer>

        {session ? (
          <NotificationsAndFollowingActionsMobile>
            <NotificationsModal />
            <FollowedItemsModal />
          </NotificationsAndFollowingActionsMobile>
        ) : (
          <AuthenticationActionsMobile>
            <Link href={routes.login} passHref>
              <AuthenticationLink>{t('login')}</AuthenticationLink>
            </Link>
            <Link href={routes.register} passHref>
              <Register>{t('register')}</Register>
            </Link>
          </AuthenticationActionsMobile>
        )}
      </StyledContainerRowOne>
      <StyledContainerRowTwo isScrolled={isScrolled}>
        <LogoContainer>
          <Link href='/'>
            <a aria-label='Logo'>
              <Logo className='pikensel-logo' />
            </a>
          </Link>
        </LogoContainer>

        <MainSection>
          <Searchbar />
        </MainSection>

        <UploadItemButton>
          <Link href={'/auctioncreation/description'}>
            <a>{t('searchbar.upload')}</a>
          </Link>
        </UploadItemButton>

        {session ? (
          <NotificationsAndFollowingActions>
            <NotificationsModal />
            <FollowedItemsModal />
          </NotificationsAndFollowingActions>
        ) : (
          <AuthenticationActions>
            <Link href={routes.login} passHref>
              <AuthenticationLink>{t('login')}</AuthenticationLink>
            </Link>
            <Link href={routes.register} passHref>
              <Register>{t('register')}</Register>
            </Link>
          </AuthenticationActions>
        )}
        <ItemPageTestButton>
          <Link href={'/itempage/1'}>
            <a>ITEMPAGE TEST</a>
          </Link>
        </ItemPageTestButton>
      </StyledContainerRowTwo>
    </StyledDesktopHeader>
  );
};

export default DesktopHeader;
