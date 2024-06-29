import React from 'react';
import styled from 'styled-components';

import { ItemCard } from '@components/common';
import ItemCardImage from '../../../public/images/itemcard_image.png';

const ItemPageRecommendations = styled.div`
  display: flex;
  flex-direction: column;

  margin: 3rem 7% 0 7%;
`;

const ItemPageAuctionText = styled.span<{
  color?: string;
  bold?: boolean;
  border?: boolean;
  smaller?: boolean;
  italic?: boolean;
}>`
  color: ${(props) => props.color && props.theme.colors[props.color]};

  display: inline-block;

  ${(props) => props.italic && 'font-style: italic'};

  font-weight: ${(props) => (props.bold ? 600 : 400)};
  border-bottom: ${(props) =>
    props.border && `2px solid ${props.theme.colors.accent}`};
  padding-bottom: ${(props) => props.border && '1.5rem'};
  ${(props) => props.border && 'margin-bottom: 2.4rem'};

  width: 100%;

  font-size: ${(props) => (props.smaller ? '1.5rem' : '1.125')};
`;

const ItemPageAllSellerAuctions = styled.div`
  display: flex;
  position: absolute;

  right: 0;
  margin: -0.75rem 7% 0 0;

  background-color: ${(props) => props.theme.colors.lightblue};

  border-radius: 7px;
  padding: 8px 24px;
  width: fit-content;

  &:hover {
    cursor: pointer;
  }

  justify-content: center;
  align-items: center;
`;

const ItemPageRecommendedItemCards = styled.div`
  display: flex;
  flex-wrap: wrap;

  flex-direction: row;

  overflow: hidden;

  height: 24.5rem;
  justify-content: space-between;

  gap: 1rem;

  padding: 1rem 0 0 0;
`;

const ItemPageRecommended = () => {
  const numberOfSellerItemCards = 20;
  const numberOfRecommendedItemCards = 10;

  return (
    <div>
      <ItemPageRecommendations>
        <ItemPageAuctionText smaller border color={'accent'}>
          Susijusios prekęs
        </ItemPageAuctionText>

        <ItemPageAuctionText bold>
          <ItemPageAllSellerAuctions>
            <ItemPageAuctionText color={'accent'}>
              visos prekės
            </ItemPageAuctionText>
          </ItemPageAllSellerAuctions>
          Kitos šio pardavėjo prekės
        </ItemPageAuctionText>
        <ItemPageRecommendedItemCards>
          {[...Array(numberOfSellerItemCards)].map((itemcard, index) => (
            <ItemCard
              // userImage={UserImage} // OPTIONAL
              // userImageAlt='User' // OPTIONAL
              buyNowPrice={200} // OPTIONAL
              additionalCosts={2} // OPTIONAL
              // place={3} // OPTIONAL
              itemImage={ItemCardImage}
              itemImageAlt='Microsoft Computer'
              title='SellerItemCards'
              lastBid={72}
              bidAmount={10}
              auctionEndDate={new Date(Date.now() + 1000000)}
              key={index}
            />
          ))}
        </ItemPageRecommendedItemCards>
        <section style={{ height: '2rem' }}></section>
        <ItemPageAuctionText italic bold>
          Kitos Nešiojami kompiuteriai kategorijos prekės
        </ItemPageAuctionText>
        <ItemPageRecommendedItemCards>
          {[...Array(numberOfRecommendedItemCards)].map((itemcard, index) => (
            <ItemCard
              // userImage={UserImage} // OPTIONAL
              // userImageAlt='User' // OPTIONAL
              buyNowPrice={200} // OPTIONAL
              additionalCosts={2} // OPTIONAL
              // place={3} // OPTIONAL
              itemImage={ItemCardImage}
              itemImageAlt='Microsoft Computer'
              title='RecommendedItemCards'
              lastBid={72}
              bidAmount={10}
              auctionEndDate={new Date(Date.now() + 1000000)}
              key={index}
            />
          ))}
        </ItemPageRecommendedItemCards>
      </ItemPageRecommendations>
    </div>
  );
};

export default ItemPageRecommended;
