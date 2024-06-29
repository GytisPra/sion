import { FC } from 'react';
import styled, { css, keyframes } from 'styled-components';

interface PopupProps {
  popupText: string;
  showPopup: boolean;
  handlePopupAnimationEnd: () => void;
}

const slide = keyframes`
    0%, 100% {
      transform: translateX(100%);
      right: 0;
    }
    50% {
      transform: translateX(0%);
    }
`;

const StyledPopup = styled.div<{ showPopup: boolean }>`
  position: fixed;
  display: flex;

  right: -100%;
  top: 5rem;
  padding: 1rem;

  color: ${(props) => props.theme.colors.accent};
  background-color: ${(props) => props.theme.colors.lightblue};

  z-index: 1000;
  border-radius: 0.4rem 0 0 0.4rem;

  ${(props) =>
    props.showPopup &&
    css`
      animation: ${slide} 2s forwards;
    `};
`;

const Popup: FC<PopupProps> = ({
  popupText,
  showPopup,
  handlePopupAnimationEnd,
}) => {
  return (
    <StyledPopup showPopup={showPopup} onAnimationEnd={handlePopupAnimationEnd}>
      {popupText}
    </StyledPopup>
  );
};

export default Popup;
