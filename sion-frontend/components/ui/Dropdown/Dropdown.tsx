import styled from 'styled-components';
import { forwardRef, RefObject } from 'react';

import { Overlay } from '@components/ui';
import { ArrowRight } from '@assets/icons';

import { OptionProps, DropdownProps } from './Dropdown.props';

const DropdownContainer = styled.div`
  position: relative;
`;

export const StyledDropdown = styled.div`
  position: absolute;
  padding: 1.5rem;
  width: 10.5625rem;
  background-color: white;
  left: 50%;
  top: 125%;
  transform: translateX(-50%);
  z-index: 1000;
`;

const OptionsList = styled.ul`
  list-style: none;
  padding: 0;

  color: ${(props) => props.theme.colors.black};

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:not(:last-child) {
      margin-bottom: 0.25rem;
    }

    &:hover {
      color: ${(props) => props.theme.colors.accentorange};

      path {
        fill: ${(props) => props.theme.colors.accentorange};
      }
    }
  }
`;

const DefaultOption = ({ option, withArrow = true }: OptionProps) => {
  return (
    <li>
      <p>{option.label}</p>
      {withArrow && <ArrowRight />}
    </li>
  );
};

const Dropdown = forwardRef(
  (
    {
      isComponentVisible,
      className,
      header,
      options = [],
      withArrow = true,
      OptionComponent = undefined,
    }: DropdownProps,
    ref,
  ) => {
    const Option = ({ option, withArrow }: OptionProps) => {
      return OptionComponent ? (
        <OptionComponent option={option} withArrow={withArrow} />
      ) : (
        <DefaultOption option={option} withArrow={withArrow} />
      );
    };

    return (
      <DropdownContainer className={className}>
        {header}
        {isComponentVisible && (
          <>
            <StyledDropdown ref={ref as RefObject<HTMLDivElement>}>
              <OptionsList>
                {options.map((option) => (
                  <Option
                    key={option.value || option.label}
                    option={option}
                    withArrow={withArrow}
                  />
                ))}
              </OptionsList>
            </StyledDropdown>
            <Overlay />
          </>
        )}
      </DropdownContainer>
    );
  },
);

Dropdown.displayName = 'Dropdown';

export default Dropdown;
