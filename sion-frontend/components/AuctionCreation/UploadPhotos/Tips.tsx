import styled from 'styled-components';

const TipsContainer = styled.div`
  margin-top: 1.75rem;
`;

const TipsHeading = styled.p`
  font-weight: 600;
`;

const TipsList = styled.ul`
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.grey};
`;

const Tips = () => {
  return (
    <TipsContainer>
      <TipsHeading>Patarimai:</TipsHeading>
      <TipsList>
        <li>
          Įvairios tikslingos bei geros kokybės nuotraukos padės sudominti
          pirkėją.
        </li>
        <li>Pasirinkite gerą apšvietimą ir foną.</li>
        <li>Kelkite savo nuotraukas ir nepažeiskite autorinių teisių.</li>
      </TipsList>
    </TipsContainer>
  );
};

export default Tips;
