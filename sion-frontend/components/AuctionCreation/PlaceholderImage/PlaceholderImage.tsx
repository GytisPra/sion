import styled from 'styled-components';

import { LargeImage } from '@assets/icons';

const StyledPlaceholderImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 7rem;
  height: 7rem;
`;

const PlaceholderImage = ({ className }: { className?: string }) => {
  return (
    <StyledPlaceholderImage className={className}>
      <LargeImage />
    </StyledPlaceholderImage>
  );
};

export default PlaceholderImage;
