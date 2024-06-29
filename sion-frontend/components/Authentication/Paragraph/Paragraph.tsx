import { ReactNode } from 'react';
import styled from 'styled-components';

const StyledParagraph = styled.p`
  font-size: 1.125rem;
`;

const Paragraph = ({ children }: { children: ReactNode }) => {
  return <StyledParagraph>{children}</StyledParagraph>;
};

export default Paragraph;
