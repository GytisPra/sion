import styled from 'styled-components';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Logo } from '@components/ui';
import Seeker from '../public/images/Seeker.png';

const Styled404Page = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.accent};
`;

const OppsP = styled.p`
  font-weight: 600;
  font-size: 6rem;
  padding-bottom: 0.625rem;
  color: ${(props) => props.theme.colors.white};

  @media (max-width: ${(props) => props.theme.breakpoints.ldesktop}) {
    font-size: 4rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.desktop}) {
    font-size: 3.5rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: 3.25rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.phone}) {
    font-size: 3rem;
  }
`;
const ErrorP = styled.p`
  margin-top: 1.25rem;
  font-weight: 600;
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.white};

  @media (max-width: ${(props) => props.theme.breakpoints.ldesktop}) {
    font-size: 1.25rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.desktop}) {
    font-size: 1.1rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: 1.05rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.phone}) {
    font-size: 1rem;
  }
`;
const MessageP = styled.p`
  margin-top: 0.9rem;
  padding-left: 10%;
  padding-right: 10%;
  font-size: 1.5rem;
  text-align: center;
  color: ${(props) => props.theme.colors.white};

  @media (max-width: ${(props) => props.theme.breakpoints.ldesktop}) {
    font-size: 1.25rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.desktop}) {
    font-size: 1.1rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: 1.05rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.phone}) {
    font-size: 0.75rem;
  }
`;
const BackButton = styled.button`
  margin-top: 1.875rem;
  border: none;
  color: ${(props) => props.theme.colors.accent};
  background-color: ${(props) => props.theme.colors.white};
  font-weight: 600;
  font-size: 1.5rem;
  padding: 1.5rem 2.25rem;

  :hover {
    font-size: 1.3rem;
    padding: 1.3rem 2.1rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.ldesktop}) {
    font-size: 1.3rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.desktop}) {
    padding: 1.2rem 2rem;
    font-size: 1.1rem;
    :hover {
      padding: 1rem 2rem;
      font-size: 1.05rem;
    }
  }
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 1rem 2rem;
    font-size: 1.05rem;
    :hover {
      padding: 0.75rem 1.8rem;
      font-size: 1rem;
    }
  }
  @media (max-width: ${(props) => props.theme.breakpoints.phone}) {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    padding: 0.75rem 2rem;
    font-size: 1rem;
    :active {
      box-shadow: none;
      padding: 0.55rem 1.7rem;
    }
  }
`;
const Container = styled.div`
  position: absolute;
  top: 28.03%;
  left: 7.64%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 30%;

  @media (max-width: ${(props) => props.theme.breakpoints.phone}) {
    top: 18%;
    width: 90%;
    left: 5%;
  }
`;
const StyledLogo = styled(Logo)`
  position: absolute;
  left: 7%;
  top: 5%;
  path {
    fill: ${(props) => props.theme.colors.white};
  }
`;
const ImageContainer = styled.div`
  position: fixed;
  bottom: 10px;
  right: 40px;
  width: 40%;
  @media (max-width: ${(props) => props.theme.breakpoints.phone}) {
    width: 70%;
    right: 15%;
  }
`;
export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['404'])),
  },
});

const NotFound = () => {
  const { t } = useTranslation('404');

  return (
    <Styled404Page>
      <StyledLogo />
      <Container>
        <OppsP>Oops!</OppsP>
        <ErrorP>{t('error')}</ErrorP>
        <MessageP>{t('message')}</MessageP>
        <BackButton>{t('button')}</BackButton>
      </Container>
      <ImageContainer>
        <Image src={Seeker} alt='seeker' />
      </ImageContainer>
    </Styled404Page>
  );
};

export default NotFound;
