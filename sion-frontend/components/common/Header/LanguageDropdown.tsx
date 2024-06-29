import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useState } from 'react';

import { useComponentVisible } from '@hooks/index';
import { Dropdown, StyledDropdown, Option, OptionProps } from '@components/ui';
import { DropdownIcon } from '@assets/icons';

const LanguageDropdownHeader = styled.div`
  height: 100%;
  display: flex;
  align-items: center;

  color: ${(props) => props.theme.colors.accent};

  span {
    margin-right: 0.25rem;
  }

  path {
    fill: ${(props) => props.theme.colors.accent};
  }
`;

const StyledLanguageDropdown = styled(Dropdown)`
  ${StyledDropdown} {
    width: 1.25rem;
  }
`;

const LanguageDropdown = () => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  const router = useRouter();

  const handleLanguageModal = () => {
    setIsComponentVisible(!isComponentVisible);
  };

  const options: Option[] | undefined =
    router.locales &&
    router.locales.map((locale) => ({
      value: locale,
      label: locale.toUpperCase(),
    }));

  const defaultLanguage =
    options && options.find((option) => option.value === router.locale);

  const [currentOption, setOption] = useState(
    defaultLanguage ?? { label: 'LT', value: 'lt' },
  );

  const Header = () => (
    <LanguageDropdownHeader onClick={handleLanguageModal}>
      <span>{currentOption.label}</span>
      <DropdownIcon />
    </LanguageDropdownHeader>
  );

  const LanguageDropdownOption = ({ option }: OptionProps) => {
    const handleSelectLanguage = () => {
      if (currentOption && currentOption.value !== option.value) {
        router.push(router.asPath, undefined, { locale: option.value });
        setOption(option);
      }
    };

    return <li onClick={handleSelectLanguage}>{option.label}</li>;
  };

  return (
    <StyledLanguageDropdown
      isComponentVisible={isComponentVisible}
      ref={ref}
      header={Header}
      options={options}
      withArrow={false}
      OptionComponent={LanguageDropdownOption}
    />
  );
};

export default LanguageDropdown;
