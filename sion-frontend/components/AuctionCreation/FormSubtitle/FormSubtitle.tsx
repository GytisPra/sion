import { ReactNode } from 'react';
import styled from 'styled-components';

const StyledFormSubtitle = styled.p`
  font-weight: 600;
  margin-bottom: 1rem;
`;

const FormSubtitle = ({ children }: { children: ReactNode }) => {
  return <StyledFormSubtitle>{children}</StyledFormSubtitle>;
};

export default FormSubtitle;
