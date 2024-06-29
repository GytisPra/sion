import Image from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';

import ItemPageCommentUserImage from '../../../public/images/itempage_comment_user_image.png';
import { ChatIcon } from '@assets/icons';

const ItemPageAuctionText = styled.span<{
  color?: string;
  bold?: boolean;
  border?: boolean;
  smaller?: boolean;
}>`
  color: ${(props) => props.color && props.theme.colors[props.color]};

  display: inline-block;

  font-weight: ${(props) => (props.bold ? 600 : 400)};
  border-bottom: ${(props) =>
    props.border && `2px solid ${props.theme.colors.accent}`};
  padding-bottom: ${(props) => (props.border ? '1.5rem' : '0.75rem')};
  ${(props) => props.border && 'margin-bottom: 2rem'};

  width: 100%;

  font-size: ${(props) => (props.smaller ? '1.5rem' : '1.125rem')};
`;

const ItemPageComments = styled.div`
  margin: 3rem 7% 0 7%;
`;

const ItemPageCommentText = styled.div`
  flex-direction: column;

  display: flex;
`;

const ItemPageUserImage = styled(Image)`
  user-select: none;
`;

const ItemPageUserImageContainer = styled.div`
  display: flex;

  flex-shrink: 0;

  width: 3rem;
  height: 3rem;
  border-radius: 49%;
`;

const ItemPageQuestion = styled.div`
  width: 80%;

  display: flex;
  gap: 0.5rem;
`;

const ItemPageAnswer = styled.div`
  padding: 2rem 0 1.25rem 0;

  display: flex;
  gap: 0.5rem;
`;

const ItemPageCommentSubmit = styled.div<{ blink?: boolean }>`
  display: flex;
  flex-direction: row;
  color: ${(props) => props.theme.colors.white};
`;

const ItemPageCommentSubmitButton = styled.div<{ blink?: boolean }>`
  display: flex;
  background-color: ${(props) => props.theme.colors.accent};

  padding: 0.5rem 0.75rem 0.5rem 1.5rem;

  width: max-content;
  justify-content: center;
  align-items: center;

  border-radius: 7px 2px 2px 7px;

  cursor: pointer;
  user-select: none;

  gap: 0.5rem;
`;
const ItemPageUnansweredCommentCount = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.colors.yellow};

  width: max-content;
  justify-content: center;
  align-items: center;

  border-radius: 2px 7px 7px 2px;
  padding: 8px 16px;

  font-weight: 700;

  cursor: pointer;
  user-select: none;
`;

const ItemPageCommentSection = () => {
  const [highlight, setHighlight] = useState(false);

  const handleClick = () => {
    setHighlight(true);
    setTimeout(() => {
      setHighlight(false);
    }, 100);
  };

  return (
    <ItemPageComments>
      <ItemPageAuctionText smaller border color={'accent'}>
        Klausimai (12)
      </ItemPageAuctionText>
      <ItemPageQuestion>
        <ItemPageUserImageContainer>
          <ItemPageUserImage src={ItemPageCommentUserImage} />
        </ItemPageUserImageContainer>
        <ItemPageCommentText>
          <ItemPageAuctionText color={'accent'}>
            Edgiestnight
          </ItemPageAuctionText>
          <ItemPageAuctionText color={'black'}>
            Pardavėjas šiai prekei taiko greitojo grąžinimo galimybę
          </ItemPageAuctionText>
          <ItemPageAnswer>
            <ItemPageUserImageContainer>
              <ItemPageUserImage src={ItemPageCommentUserImage} />
            </ItemPageUserImageContainer>
            <ItemPageCommentText>
              <ItemPageAuctionText bold color={'accent'}>
                Notsoedgynight321
              </ItemPageAuctionText>
              <ItemPageAuctionText color={'black'}>
                Announcing of invitation principles in. Cold in late or deal.
                Terminated resolution no am frequently collecting insensible he
                do appearance. Projection invitation affronting admiration if no
                on or. It as instrument boisterous frequently apartments an
              </ItemPageAuctionText>
            </ItemPageCommentText>
          </ItemPageAnswer>
        </ItemPageCommentText>
      </ItemPageQuestion>
      <ItemPageQuestion>
        <ItemPageUserImageContainer>
          <ItemPageUserImage src={ItemPageCommentUserImage} />
        </ItemPageUserImageContainer>
        <ItemPageCommentText>
          <ItemPageAuctionText color={'accent'}>
            Edgiestnight
          </ItemPageAuctionText>
          <ItemPageAuctionText color={'black'}>
            Pardavėjas šiai prekei taiko greitojo grąžinimo galimybę
          </ItemPageAuctionText>
          <ItemPageAnswer>
            <ItemPageUserImageContainer>
              <ItemPageUserImage src={ItemPageCommentUserImage} />
            </ItemPageUserImageContainer>
            <ItemPageCommentText>
              <ItemPageAuctionText bold color={'accent'}>
                Notsoedgynight321
              </ItemPageAuctionText>
              <ItemPageAuctionText color={'black'}>
                Announcing of invitation principles in. Cold in late or deal.
                Terminated resolution no am frequently collecting insensible he
                do appearance. Projection invitation affronting admiration if no
                on or. It as instrument boisterous frequently apartments an
              </ItemPageAuctionText>
            </ItemPageCommentText>
          </ItemPageAnswer>
        </ItemPageCommentText>
      </ItemPageQuestion>
      <ItemPageCommentSubmit>
        <ItemPageCommentSubmitButton blink={highlight} onClick={handleClick}>
          <ChatIcon /> Atsakyti į klausimus
        </ItemPageCommentSubmitButton>
        <ItemPageUnansweredCommentCount>12</ItemPageUnansweredCommentCount>
      </ItemPageCommentSubmit>
    </ItemPageComments>
  );
};

export default ItemPageCommentSection;
