import {
  AuthenticationLayout,
  Paragraph,
  Subtitle,
} from '@components/Authentication';

const RememberMeStarted = () => {
  return (
    <AuthenticationLayout>
      <Subtitle>Laiškas išsiųstas</Subtitle>
      <Paragraph>
        Patikrinkite el. pašto dežutę, kurią pateikėte praėjusiame žingsnyje.
        Paspauskite ant nuorodos ir atkurkite slaptažodį.
      </Paragraph>
    </AuthenticationLayout>
  );
};

export default RememberMeStarted;
