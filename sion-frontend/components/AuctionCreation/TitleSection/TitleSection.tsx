import styled from 'styled-components';
import { useWatch } from 'react-hook-form';

const TitleContainer = styled.div`
  display: none;

  @media (min-width: ${(props) => props.theme.breakpoints.phone}) {
    display: block;

    grid-row: 1;
    grid-column: 3;
  }
`;

const StyledTitle = styled.h1`
  grid-row: 1;
  grid-column: 3;

  font-size: 2.25rem;
  font-weight: 600;
`;

const Title = () => {
  const title = useWatch({ name: 'title' });

  return <StyledTitle>{title ? title : 'Nepavadinta prekė'}</StyledTitle>;
};

const TitleSection = () => {
  return (
    <TitleContainer>
      <Title />
    </TitleContainer>
  );
};

export default TitleSection;
