import styled from 'styled-components';
import { memo, ReactNode } from 'react';
import { FormCharacterCount } from '..';

interface FormLabelProps {
  required?: boolean;
  children: ReactNode;
  maxLength?: number;
  count?: boolean;
  name: string;
}

const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Label = styled.label<{ required?: boolean }>`
  font-weight: 600;
  margin-bottom: 0.25rem;

  ${(props) =>
    props.required &&
    `
  &::after {
    content: '*';
    margin-left: 0.5rem;
    color: ${props.theme.colors.accent};
  }
  `}
`;

const FormLabel = memo(
  ({ required, children, maxLength, count, name }: FormLabelProps) => {
    return (
      <LabelContainer>
        <Label required={required}>{children}</Label>
        {count && <FormCharacterCount maxLength={maxLength} name={name} />}
      </LabelContainer>
    );
  },
);

FormLabel.displayName = 'FormLabel';

export default FormLabel;
