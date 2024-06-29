import { FC } from 'react';
import styled from 'styled-components';
import ReactSelect, { GroupBase } from 'react-select';
import { SelectComponents } from 'react-select/dist/declarations/src/components';

const StyledSelector = styled(ReactSelect)`
  grid-row-start: 1;
  grid-column: 3;

  width: 60%;

  .Select__control {
    background-color: ${(props) => props.theme.colors.white};
    border: none;
    box-shadow: none;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

  .Select__value-container {
    padding: 0;
  }

  /* .Select__single-value {
    display: flex;
    flex-direction: row;

    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    box-sizing: border-box;

    color: ${(props) => props.theme.colors.white};
    align-items: center;

    font-size: 1.125rem;
  } */
`;

const StyledPlaceholderContainer = styled.div`
  display: flex;
  flex-direction: row;

  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  box-sizing: border-box;

  color: ${(props) => props.theme.colors.black};
  align-items: center;

  font-size: 1.125rem;
`;

export const PlaceholderContainer: FC = ({ children }) => {
  return <StyledPlaceholderContainer>{children}</StyledPlaceholderContainer>;
};

interface SelectorProps {
  instanceId: string;
  options: {
    value: string;
    label: string;
  }[];
  components?: Partial<SelectComponents<unknown, boolean, GroupBase<unknown>>>;
  isSearchable?: boolean;
}

const Selector: FC<SelectorProps> = ({
  instanceId,
  options,
  components,
  isSearchable = false,
}) => {
  return (
    <StyledSelector
      options={options}
      classNamePrefix={'Select'}
      components={components}
      instanceId={instanceId}
      isSearchable={isSearchable}
    />
  );
};

export default Selector;
