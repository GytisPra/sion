import styled, { keyframes } from 'styled-components';

import { Overlay } from '@components/ui';

const LoaderContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
`;

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export const Loader = styled.div`
  border: 10px solid white;
  border-top: 10px solid ${(props) => props.theme.colors.buttongrey};
  border-radius: 50%;
  width: 200px;
  height: 200px;
  animation: ${spin} 0.8s linear infinite;
`;

const LoadingIndicator = ({ loading }: { loading: boolean }) => {
  return loading ? (
    <Overlay>
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    </Overlay>
  ) : null;
};

export default LoadingIndicator;
