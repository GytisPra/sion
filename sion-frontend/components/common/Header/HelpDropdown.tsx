import styled from 'styled-components';
import { useTranslation } from 'next-i18next';

import { useComponentVisible } from '@hooks/index';
import { Dropdown } from '@components/ui';
import { DropdownIcon, HelpIcon } from '@assets/icons';

const HelpDropdownHeader = styled.div`
  display: flex;
  align-items: center;

  color: ${(props) => props.theme.colors.accent};

  span {
    font-weight: 600;
    margin-left: 0.25rem;
  }

  path {
    fill: ${(props) => props.theme.colors.accent};
  }
`;

const HelpDropdown = () => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  const handleHelpModal = () => {
    setIsComponentVisible(!isComponentVisible);
  };

  const { t } = useTranslation('header', { keyPrefix: 'help' });

  const Header = () => (
    <HelpDropdownHeader onClick={handleHelpModal}>
      <HelpIcon />
      <span>{t('help')}</span>
      <DropdownIcon />
    </HelpDropdownHeader>
  );

  const options = [
    {
      label: t('faq'),
    },
    {
      label: t('about'),
    },
    {
      label: t('how'),
    },
  ];

  return (
    <Dropdown
      isComponentVisible={isComponentVisible}
      ref={ref}
      header={Header}
      options={options}
    />
  );
};

export default HelpDropdown;
