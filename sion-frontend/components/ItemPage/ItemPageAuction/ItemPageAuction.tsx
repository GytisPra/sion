import Image, { StaticImageData } from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';
import { ArrowRight } from '@assets/icons';

interface ItemPageAuctionProps {
  title: string;
  auctionType: string;
  auctionEndDate: Date;
  ItemPageAuctionImages: StaticImageData[];
}

const ItemPageAuctionContainer = styled.div`
  display: flex;

  flex-direction: column;

  padding: 0 7% 0 7%;
`;

const ItemPageAuctionContainerTitle = styled.span`
  display: flex;

  padding-top: 2rem;

  font-weight: 600;
  font-size: 3rem;
  line-height: 3rem;
`;

const ItemPageAuctionContainerDetailedInfo = styled.div`
  display: grid;
  list-style: none;
  grid-auto-flow: column;
  flex-shrink: 0;

  width: max-content;

  grid-gap: 1.5rem;

  padding: 1rem 0 0 0;
`;
const ItemPageAuctionText = styled.span<{
  color?: string;
  bold?: boolean;
}>`
  color: ${(props) => props.color && props.theme.colors[props.color]};

  display: inline-block;

  font-weight: ${(props) => (props.bold ? 600 : 400)};
`;

const ItemPageAuctionImageContainer = styled(Image)`
  user-select: none;

  flex-shrink: 0;
`;

const ItemPageMainInfoContainer = styled.div`
  display: flex;

  padding: 1.5rem 0 3rem 0;
`;

const ItemPageAuctionContainerMainImageContainer = styled.div`
  display: flex;

  justify-content: right;

  flex-shrink: 0;

  .arrow-right {
    position: absolute;
    margin: 15rem 0 15rem 0;
    width: 3rem;
    height: 3rem;
    cursor: pointer;
  }
  path {
    fill: ${(props) => props.theme.colors.white};
  }
`;

const ItemPageAuctionSideImageContainer = styled.ul`
  display: flex;
  padding: 0 0 0 1rem;

  gap: 1rem;

  flex-direction: column;
  flex-shrink: 0;
  flex-wrap: wrap;
  overflow: hidden;
  justify-content: space-between;
  align-items: center;

  max-height: 34rem;
`;
const ItemPageButtonsContainer = styled.ul`
  display: flex;
  padding: 0;
  gap: 1rem;

  height: min-content;
  width: min-content;
`;

const ItemPageBidButton = styled.li`
  display: flex;
  background-color: ${(props) => props.theme.colors.lightblue};
  color: ${(props) => props.theme.colors.accent};

  padding: 1rem;

  transition-duration: 100ms;
  &:hover {
    transform: scale(1.02);
  }

  justify-content: center;
  align-items: center;

  border-radius: 0.438rem;

  gap: 0.5rem;

  cursor: pointer;
`;

const ItemPageBidButtonPrice = styled.span`
  display: flex;
  font-weight: 400;
  font-size: 1.5rem;

  height: 3rem;

  justify-content: center;
  align-items: center;

  padding-right: 2rem;

  border-right: 0.063rem solid ${(props) => props.theme.colors.accent};
`;

const ItemPageBuyNowButton = styled.li`
  display: flex;
  background-color: ${(props) => props.theme.colors.accent};
  color: ${(props) => props.theme.colors.white};

  padding: 0 1.75rem 0 1.75rem;

  transition-duration: 100ms;
  &:hover {
    transform: scale(1.02);
  }

  justify-content: center;
  align-items: center;

  border-radius: 0.438rem;

  gap: 0.5rem;

  cursor: pointer;
`;

const ItemPageBuyNowButtonPrice = styled.span`
  display: flex;
  font-weight: 400;
  font-size: 1.5rem;

  height: 3rem;

  justify-content: center;
  align-items: center;

  padding-right: 2rem;

  border-right: 0.063rem solid ${(props) => props.theme.colors.white};
`;

const ItemPageBidAmount = styled.span`
  display: flex;
  text-decoration: underline;
  color: ${(props) => props.theme.colors.grey};

  padding-top: 0.4rem;
`;

const ItemPageButtonsDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 40%;

  padding-left: 2.25rem;
`;

const ItemPageDescriptionTitle = styled.span`
  color: ${(props) => props.theme.colors.accent};

  font-weight: 400;
  font-size: 1.125rem;

  padding-bottom: 0.75rem;
`;

const ItemPageAuctionDescrpition = styled.span`
  display: flex;

  font-weight: 400;
  max-height: 26.1rem;
  line-height: 1.5rem;

  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;

  flex-direction: column;
  padding-top: 1.5rem;
`;

const ItemPageAuction = ({
  title,
  auctionType,
  ItemPageAuctionImages,
}: ItemPageAuctionProps) => {
  const [currentImageNumber, setCurrentImageNumber] = useState(0);
  const numberOfImages = ItemPageAuctionImages.length;
  const handleClick = () => {
    if (currentImageNumber + 1 < numberOfImages)
      setCurrentImageNumber(currentImageNumber + 1);
    else setCurrentImageNumber(0);
  };

  return (
    <div>
      <ItemPageAuctionContainer>
        <ItemPageAuctionContainerTitle>{title}</ItemPageAuctionContainerTitle>
        <ItemPageAuctionContainerDetailedInfo>
          <ItemPageAuctionText color={'grey'}>
            Aukcionas:&nbsp;
            <ItemPageAuctionText color={'accent'} bold>
              {auctionType}
            </ItemPageAuctionText>
          </ItemPageAuctionText>
          <ItemPageAuctionText color={'grey'}>
            Baigiasi:&nbsp;
            <ItemPageAuctionText color={'accent'} bold>
              liepos 11d.
            </ItemPageAuctionText>
          </ItemPageAuctionText>
          <ItemPageAuctionText color={'grey'}>
            Miestas:&nbsp;
            <ItemPageAuctionText color={'accent'} bold>
              Kaunas
            </ItemPageAuctionText>
          </ItemPageAuctionText>
          <ItemPageAuctionText color={'grey'}>
            Aukciono kodas:&nbsp;
            <ItemPageAuctionText color={'accent'} bold>
              PS-XVTWTBK
            </ItemPageAuctionText>
          </ItemPageAuctionText>
        </ItemPageAuctionContainerDetailedInfo>
        <ItemPageMainInfoContainer>
          <ItemPageAuctionContainerMainImageContainer>
            <ItemPageAuctionImageContainer
              src={ItemPageAuctionImages[currentImageNumber]}
              width={'560px'}
              height={'525px'}
              key={currentImageNumber}
            />
            <ArrowRight className='arrow-right' onClick={handleClick} />
          </ItemPageAuctionContainerMainImageContainer>
          <ItemPageAuctionSideImageContainer>
            {[...Array(numberOfImages - 1)].map((image, index) => (
              <ItemPageAuctionImageContainer
                src={
                  ItemPageAuctionImages[
                    currentImageNumber + 1 < numberOfImages
                      ? currentImageNumber + 1
                      : currentImageNumber
                  ]
                }
                width={'125px'}
                height={'120px'}
                key={index}
              />
            ))}
          </ItemPageAuctionSideImageContainer>
          <ItemPageButtonsDescriptionContainer>
            <ItemPageButtonsContainer>
              <ItemPageBidButton>
                <ItemPageBidButtonPrice>73€</ItemPageBidButtonPrice>
                <ItemPageAuctionText bold>Statyti</ItemPageAuctionText>
              </ItemPageBidButton>
              <ItemPageBuyNowButton>
                <ItemPageBuyNowButtonPrice>100€</ItemPageBuyNowButtonPrice>
                <ItemPageAuctionText bold>Pirkti</ItemPageAuctionText>
              </ItemPageBuyNowButton>
            </ItemPageButtonsContainer>

            <ItemPageBidAmount>Atlikta statymų: 7</ItemPageBidAmount>

            <ItemPageAuctionDescrpition>
              <ItemPageDescriptionTitle>
                Prekės aprašymas
              </ItemPageDescriptionTitle>
              PANORAMIC SURVEILLANCE IN 3 MP SUPER HD WITH ADVANCED NIGHT
              VISION: Live-stream and record videos in crystal clear 3MP
              resolution (2304 x 1296P) – Wide-angle lens with 4x digital zoom –
              Pan-tilt rotation with remote control for 360° coverage – Advanced
              night vision with adjustable IR lights and status LEDs via app YI
              Home (ideal for undisrupted sleep). PANORAMIC SURVEILLANCE IN 3 MP
              SUPER HD WITH ADVANCED NIGHT VISION: Live-stream and record videos
              in crystal clear 3MP resolution (2304 x 1296P) – Wide-angle lens
              with 4x digital zoom – Pan-tilt rotation with remote control for
              360° coverage – Advanced night vision with adjustable IR lights
              and status LEDs via app YI Home (ideal for undisrupted
              sleep)PANORAMIC SURVEILLANCE IN 3 MP SUPER HD WITH ADVANCED NIGHT
              VISION: Live-stream and record videos in crystal clear 3MP
              resolution (2304 x 1296P) –
            </ItemPageAuctionDescrpition>
          </ItemPageButtonsDescriptionContainer>
        </ItemPageMainInfoContainer>
      </ItemPageAuctionContainer>
    </div>
  );
};

export default ItemPageAuction;
