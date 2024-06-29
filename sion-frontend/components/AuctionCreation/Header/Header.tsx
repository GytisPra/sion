import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useWatch } from 'react-hook-form';

import { ArrowLeftCircle } from '@assets/icons';

import ActionItems from './ActionItems';

const StyledHeaderContainer = styled.div`
  display: none;

  @media (min-width: ${(props) => props.theme.breakpoints.phone}) {
    display: block;

    height: 6rem;
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.05);
  }
`;

const StyledHeader = styled.div`
  width: 92%;
  margin: auto;

  display: flex;
  justify-content: space-between;
`;

const HeaderTitleContainer = styled.div`
  display: flex;
  align-items: center;
  padding-top: 2.5rem;
`;

const StyledHeaderTitle = styled.p`
  color: ${(props) => props.theme.colors.grey};
  margin-left: 0.5rem;
`;

const StyledArrowLeftCircle = styled(ArrowLeftCircle)`
  cursor: pointer;
`;

const HeaderTitle = () => {
  const { t } = useTranslation('auctioncreation');
  const title = useWatch({ name: 'title', defaultValue: t('defaultitemname') });

  return (
    <StyledHeaderTitle>
      {t('createauction')} / {title}
    </StyledHeaderTitle>
  );
};

const Header = () => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <StyledHeaderContainer>
      <StyledHeader>
        <HeaderTitleContainer>
          <StyledArrowLeftCircle onClick={handleClick} />
          <HeaderTitle />
        </HeaderTitleContainer>
        <ActionItems />
      </StyledHeader>
    </StyledHeaderContainer>
  );
};

export default Header;
