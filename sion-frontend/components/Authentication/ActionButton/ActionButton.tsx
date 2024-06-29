import styled from 'styled-components';

const StyledActionButton = styled.button`
  width: 100%;
  height: 3rem;

  text-transform: uppercase;

  background-color: ${(props) => props.theme.colors.accent};
  color: white;

  font-size: 1.125rem;
  font-weight: 600;

  border: none;
  border-radius: 5px;

  ${(props) => props.disabled && `background-color: rgba(0, 109, 119, 0.25);`}
`;

const ActionButton = ({
  label,
  disabled = false,
}: {
  label: string;
  disabled?: boolean;
}) => {
  return (
    <StyledActionButton type='submit' disabled={disabled}>
      {label}
    </StyledActionButton>
  );
};

export default ActionButton;
