import { useState, useEffect, ReactNode } from 'react';
import ReactDOM from 'react-dom';

import styled from 'styled-components';

const StyledOverlay = styled.div`
  position: fixed;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.25);
`;

const Overlay = ({ children }: { children?: ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  const overlayDiv = document.getElementById('overlay');

  if (!overlayDiv) {
    throw new Error('Overlay element was not found.');
  }

  return mounted
    ? ReactDOM.createPortal(
        <StyledOverlay>{children}</StyledOverlay>,
        overlayDiv,
      )
    : null;
};

export default Overlay;
