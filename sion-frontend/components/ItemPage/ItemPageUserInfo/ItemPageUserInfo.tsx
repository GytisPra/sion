import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import UserImage from '../../../public/images/followed-user.png';

const ItemPageUser = styled.div`
  display: grid;

  width: fit-content;

  grid-gap: 2.25rem;
  padding: 3rem 7% 0 7%;

  align-items: flex-start;
  grid-auto-flow: column;
`;

const ItemPageUserStats = styled.div`
  display: flex;

  padding-top: 1.75rem;

  flex-direction: column;
`;

const ItemPageUserName = styled.div`
  display: flex;
  flex-direction: column;

  padding: 0 2.25rem 0 0;

  gap: 0.5rem;
`;
const ItemPageUserImageAndName = styled.div`
  display: flex;

  gap: 0.75rem;
`;

const ItemPageText = styled.span<{
  color?: string;
  smaller?: boolean;
}>`
  color: ${(props) => props.color && props.theme.colors[props.color]};

  font-size: ${(props) => (props.smaller ? '0.875rem' : '1.125rem')};

  max-width: 8rem;
`;

const ItemPageUserInfoText = styled.span`
  color: ${(props) => props.theme.colors.black};

  font-weight: 600;
  font-size: 2.25rem;
`;

const ItemPageUserImage = styled(Image)`
  user-select: none;
  border-radius: 49%;
  flex-shrink: 0;
`;

const ItemPageUserInfo = () => {
  return (
    <ItemPageUser>
      <ItemPageUserName>
        <ItemPageText color={'accent'}>Pardavėjas</ItemPageText>
        <ItemPageUserInfoText>
          <ItemPageUserImageAndName>
            <ItemPageUserImage height={'72px'} width={'72px'} src={UserImage} />
            Edgynight323
          </ItemPageUserImageAndName>
        </ItemPageUserInfoText>
      </ItemPageUserName>
      <ItemPageUserStats>
        <ItemPageUserInfoText>
          4,5<span style={{ fontSize: '1.125rem' }}>/5</span>
        </ItemPageUserInfoText>
        <ItemPageText color={'grey'} smaller>
          Įvertinimas
        </ItemPageText>
      </ItemPageUserStats>
      <ItemPageUserStats>
        <ItemPageUserInfoText>10</ItemPageUserInfoText>
        <ItemPageText color={'grey'} smaller>
          Sėkmingų sandorių skaičius
        </ItemPageText>
      </ItemPageUserStats>
    </ItemPageUser>
  );
};

export default ItemPageUserInfo;
