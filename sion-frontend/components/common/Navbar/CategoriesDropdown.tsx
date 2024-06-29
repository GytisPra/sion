import styled from 'styled-components';
import { useTranslation } from 'next-i18next';

import { useComponentVisible } from '@hooks/index';
import { Dropdown } from '@components/ui';
import { DropdownIcon } from '@assets/icons';

const CategoriesDropdownHeader = styled.div`
  display: flex;
  align-items: center;

  margin-right: 1.75rem;

  span {
    color: ${(props) => props.theme.colors.white};
    margin-right: 0.25rem;
  }

  path {
    fill: ${(props) => props.theme.colors.white};
  }
`;

const CategoriesDropdown = () => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  const handleCategoriesModal = () => {
    setIsComponentVisible(!isComponentVisible);
  };

  const { t } = useTranslation('header', { keyPrefix: 'navbar' });

  const Header = () => (
    <CategoriesDropdownHeader onClick={handleCategoriesModal}>
      <span>{t('categories')}</span>
      <DropdownIcon />
    </CategoriesDropdownHeader>
  );

  const options = [
    {
      label: 'Avalynė',
    },
    {
      label: 'Striukės',
    },
    {
      label: 'Kompiuteriniai žaidimai',
    },
    {
      label: 'Kompiuteriniai žaidimai',
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

export default CategoriesDropdown;
