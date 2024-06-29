import { useWatch } from 'react-hook-form';
import styled from 'styled-components';

interface FormCharacterCountProps {
  maxLength?: number;
  name: string;
}

const LabelCharacterCount = styled.p`
  font-size: 0.75rem;

  @media (min-width: ${(props) => props.theme.breakpoints.phone}) {
    font-size: 1.125rem;
  }
`;

const FormCharacterCount = ({ maxLength, name }: FormCharacterCountProps) => {
  const title = useWatch({ name, defaultValue: '' });
  const characterCount = title.length;

  return (
    <LabelCharacterCount>
      {characterCount && maxLength ? maxLength - characterCount : maxLength}
    </LabelCharacterCount>
  );
};

export default FormCharacterCount;
