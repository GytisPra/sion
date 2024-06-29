import styled from 'styled-components';
import { useTranslation } from 'next-i18next';

import { useComponentVisible } from '@hooks/index';
import { Dropdown } from '@components/ui';
import { DropdownIcon, ProfileIcon } from '@assets/icons';

const MyAccountHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  color: ${(props) => props.theme.colors.accent};

  span {
    font-weight: 600;
    white-space: nowrap;
  }

  .profile-icon {
    position: absolute;
    left: -1.75rem;
  }

  .dropdown-icon {
    position: absolute;
    right: -1.75rem;
  }
`;

const MyAccountDropdown = () => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  const handleMyAccountModal = () => {
    setIsComponentVisible(!isComponentVisible);
  };

  const { t } = useTranslation('header', { keyPrefix: 'myaccount' });

  const Header = () => (
    <MyAccountHeader onClick={handleMyAccountModal}>
      <ProfileIcon className='profile-icon' />
      <span>{t('myaccount')}</span>
      <DropdownIcon className='dropdown-icon' />
    </MyAccountHeader>
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

export default MyAccountDropdown;
