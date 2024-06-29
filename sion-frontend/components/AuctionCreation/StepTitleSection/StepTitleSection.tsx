import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { memo } from 'react';

import { Info } from '@assets/icons';
import { Tooltip } from '@components/ui';

import { StepTitleSectionProps } from './StepTitleSection.props';

const StyledStepTitleSection = styled.div`
  border-bottom: 2px solid ${(props) => props.theme.colors.accent};
  margin-bottom: 1.5rem;
`;

const StepTitle = styled.p`
  color: ${(props) => props.theme.colors.accent};
  font-weight: 600;
  display: inline-block;

  margin-right: 0.75rem;
`;

const StepSubtitle = styled.p`
  color: ${(props) => props.theme.colors.grey};
  margin-bottom: 0.875rem;

  @media (min-width: ${(props) => props.theme.breakpoints.phone}) {
    margin-bottom: 1.5rem;
  }
`;

const StepTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-bottom: 0.5rem;

  @media (min-width: ${(props) => props.theme.breakpoints.phone}) {
    margin-bottom: 0.75rem;
  }
`;

const StepTitleSection = memo(
  ({ title, subtitle, className }: StepTitleSectionProps) => {
    const { t } = useTranslation('auctioncreation', {
      keyPrefix: 'descriptionStep',
    });
    return (
      <StyledStepTitleSection className={className}>
        <StepTitleContainer>
          <StepTitle>{title}</StepTitle>
          <Tooltip direction='right' content={t('tooltip')}>
            <Info />
          </Tooltip>
        </StepTitleContainer>
        <StepSubtitle>{subtitle}</StepSubtitle>
      </StyledStepTitleSection>
    );
  },
);

StepTitleSection.displayName = 'StepTitleSection';

export default StepTitleSection;
