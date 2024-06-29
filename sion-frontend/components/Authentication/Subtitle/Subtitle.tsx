import { ReactNode } from 'react';
import styled from 'styled-components';

const StyledSubtitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;

  margin-bottom: 1.5rem;
`;

const Subtitle = ({ children }: { children: ReactNode }) => {
  return <StyledSubtitle>{children}</StyledSubtitle>;
};

export default Subtitle;
