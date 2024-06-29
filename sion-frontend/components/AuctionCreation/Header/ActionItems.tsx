import { Trashcan, Upload } from '@assets/icons';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';

interface ActionButtonProps {
  readonly enabled?: boolean;
}

const ActionItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ActionButton = styled.div<ActionButtonProps>`
  display: flex;
  flex-direction: row;

  padding: 0.625rem 1.5rem;
  background-color: ${(props) => props.theme.colors.buttongrey};
  color: ${(props) => props.theme.colors.offwhite};

  ${(props) =>
    props.enabled &&
    `
    border: 1px solid ${props.theme.colors.accent};
    background-color: transparent;
    color: ${props.theme.colors.accent}
    `};

  border-radius: 7px;

  &:first-child {
    margin-right: 0.75rem;
  }

  &:last-child {
    margin-left: 0.75rem;
  }

  p {
    margin-right: 0.5rem;
  }
`;

const ActionItems = () => {
  const { t } = useTranslation('auctioncreation');

  return (
    <ActionItemsContainer>
      <ActionButton enabled>
        <p>{t('cancel')}</p> <Trashcan />
      </ActionButton>
      <ActionButton>
        <p>{t('save')}</p> <Upload />
      </ActionButton>
      <ActionButton>
        <p>{t('upload')}</p> <Upload />
      </ActionButton>
    </ActionItemsContainer>
  );
};

export default ActionItems;
