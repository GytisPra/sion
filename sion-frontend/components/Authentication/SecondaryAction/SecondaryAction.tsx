import { ReactNode } from 'react';
import styled from 'styled-components';

const SecondaryActionButton = styled.p`
  text-decoration: underline;
  color: ${(props) => props.theme.colors.accent};
  cursor: pointer;
`;

interface ISecondaryActionProps {
  onClick: (ev: React.MouseEvent<HTMLParagraphElement>) => void;
  children: ReactNode;
}

const SecondaryAction = (props: ISecondaryActionProps) => {
  return (
    <SecondaryActionButton {...props}>{props.children}</SecondaryActionButton>
  );
};

export default SecondaryAction;
