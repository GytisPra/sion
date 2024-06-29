import styled from 'styled-components';

const StrengthBar = styled.div`
  display: flex;
  flex-direction: row;
  height: 0.25rem;

  margin: 0.25rem 0 2.25rem 0;
`;

type BarProps = {
  isActive: boolean;
};

const RedBar = styled.div<BarProps>`
  position: relative;

  background-color: ${(props) =>
    props.isActive ? `rgba(247, 23, 53, 1)` : 'rgba(247, 23, 53, 0.3)'};
  width: 100%;

  span {
    position: absolute;
    top: 6px;
    left: 0px;

    font-size: 0.75rem;
    color: ${(props) => props.theme.colors.accent};
  }
`;

const YellowBar = styled.div<BarProps>`
  position: relative;

  background-color: ${(props) =>
    props.isActive ? 'rgba(232, 184, 53, 1)' : 'rgba(232, 184, 53, 0.3)'};
  width: 100%;

  span {
    position: absolute;
    top: 6px;
    transform: translateX(-50%);

    font-size: 0.75rem;
    color: ${(props) => props.theme.colors.accent};
  }
`;

const GreenBar = styled.div<BarProps>`
  position: relative;

  background-color: ${(props) =>
    props.isActive ? 'rgba(8, 145, 86, 1)' : 'rgba(8, 145, 86, 0.3)'};
  width: 100%;

  span {
    position: absolute;
    top: 6px;
    right: 0px;

    font-size: 0.75rem;
    color: ${(props) => props.theme.colors.accent};
  }
`;

const PasswordStrengthBar = ({
  strength,
  active = false,
}: {
  strength: number;
  active?: boolean;
}) => {
  return (
    <StrengthBar>
      <RedBar isActive={strength === 1 || (active && strength === 0)}>
        {(strength === 1 || (active && strength === 0)) && <span>Silpnas</span>}
      </RedBar>
      <YellowBar isActive={strength === 2}>
        {strength === 2 && <span>Vidutiniškas</span>}
      </YellowBar>
      <GreenBar isActive={strength > 2}>
        {strength > 2 && <span>Stiprus</span>}
      </GreenBar>
    </StrengthBar>
  );
};

export default PasswordStrengthBar;
