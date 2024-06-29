import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { ArrowLeft, ArrowRight } from '@assets/icons';
import { useFormContext } from 'react-hook-form';

interface StepButtonProps {
  nextStep?: string;
}

const StyledStepButton = styled.button<{
  isNextStep?: boolean;
}>`
  background-color: ${(props) =>
    props.isNextStep ? props.theme.colors.accent : 'white'};
  color: ${(props) => (props.isNextStep ? 'white' : props.theme.colors.accent)};

  padding: ${(props) =>
    props.isNextStep ? '0.625rem 1.5rem' : '0.5rem 1.375rem'};
  margin: 0;

  border: ${(props) =>
    props.isNextStep ? 'none' : `1px solid ${props.theme.colors.accent}`};
  border-radius: 7px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  svg {
    ${(props) =>
      props.isNextStep ? 'margin-left: 0.5rem' : 'margin-right: 0.5rem'};
    path {
      fill: ${(props) =>
        props.isNextStep ? 'white' : props.theme.colors.accent};
    }
  }
`;

const NextStep = ({ nextStep }: StepButtonProps) => {
  const router = useRouter();

  const { trigger } = useFormContext();

  const handleNextStep = async () => {
    const isValid = await trigger();

    if (isValid) {
      router.push(`/auctioncreation/${nextStep}`);
    }
  };

  return (
    <StyledStepButton isNextStep type='submit' onClick={handleNextStep}>
      Kitas <ArrowRight />
    </StyledStepButton>
  );
};

const PreviousStep = () => {
  const router = useRouter();

  const handlePreviousStep = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <StyledStepButton onClick={handlePreviousStep}>
      <ArrowLeft /> Atgal
    </StyledStepButton>
  );
};

const StepButton = ({ nextStep }: StepButtonProps) => {
  return nextStep ? <NextStep nextStep={nextStep} /> : <PreviousStep />;
};

export default StepButton;
