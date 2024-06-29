import { ReactNode } from 'react';
import styled from 'styled-components';

const LayoutPage = styled.div`
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const LayoutContainer = styled.div`
  background-color: ${(props) => props.theme.colors.lightblue};

  width: 36.5rem;
  height: 47.25rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const LayoutInnerContainer = styled.div`
  height: 22rem;
  width: 75%;

  margin: 0 auto;
  text-align: center;
`;

const Title = styled.p`
  width: 14rem;

  padding-bottom: 0.375rem;
  margin: 0 auto;

  color: ${(props) => props.theme.colors.accent};
  font-size: 1.5rem;
  font-weight: 600;

  border-bottom: 2px solid ${(props) => props.theme.colors.accent};
`;

const AuthenticationLayout = ({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) => {
  return (
    <LayoutPage>
      <LayoutContainer>
        <LayoutInnerContainer>
          {title && <Title>{title}</Title>}
          {children}
        </LayoutInnerContainer>
      </LayoutContainer>
    </LayoutPage>
  );
};

export default AuthenticationLayout;
