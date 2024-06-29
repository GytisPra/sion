import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import Image, { StaticImageData } from 'next/image';

import { Heart, Flame, Star } from '@assets/icons';
import AuctionTimer from './AuctionTimer';
import { PlaceholderImage } from '@components/AuctionCreation';

interface ItemCardProps {
  place?: number;
  buyNowPrice?: number;
  additionalCosts?: number;
  userImage?: StaticImageData;
  userImageAlt?: string;
  itemImage?: string | StaticImageData;
  itemImageAlt: string;
  title: string;
  lastBid: number;
  bidAmount: number;
  auctionEndDate: Date;
  className?: string;
}

const StyledPlaceholderImage = styled(PlaceholderImage)`
  width: 100%;
  height: 100%;

  background-color: ${(props) => props.theme.colors.offwhite};
  border-radius: 5px;
`;

const StyledItemCard = styled.div<{
  isFinished?: boolean;
  isGrandAuction?: boolean;
}>`
  display: flex;

  background-color: ${(props) => props.theme.colors.lightblue};
  pointer-events: ${(props) => props.isFinished && 'none'};

  ${(props) =>
    props.isGrandAuction &&
    !props.isFinished &&
    ` border: 1px solid ${props.theme.colors.accent}`};
  border-radius: 7px;

  @media (min-width: ${(props) => props.theme.breakpoints.phone}) {
    background-color: ${(props) =>
      props.isGrandAuction && !props.isFinished
        ? props.theme.colors.accent
        : props.isFinished && 'rgba(0, 0, 0, 0.2)'};

    flex-direction: column;

    transition-duration: 100ms;
    &:hover {
      transform: scale(1.005);
    }

    width: 13.5rem;
  }

  padding: 0.5rem 0 0 0;
`;

const ItemCardImageContainer = styled.div`
  position: relative;

  z-index: 0;

  flex-shrink: 0;

  margin-left: 0.5rem;

  width: 7.4rem;
  height: 7.4rem;

  @media (min-width: ${(props) => props.theme.breakpoints.phone}) {
    place-self: center;
    margin: 0;

    width: 12.5rem;
    height: 12.5rem;
  }
`;

const ItemCardImage = styled(Image)`
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
`;

const ItemCardIcons = styled.div<{
  isFinished?: boolean;
  isWinning?: boolean;
  isLoosing?: boolean;
}>`
  display: ${(props) => (props.isFinished ? 'none' : 'flex')};
  position: relative;
  left: 100%;

  @media (min-width: ${(props) => props.theme.breakpoints.phone}) {
    z-index: 1;
    background-color: ${(props) => props.theme.colors.white};
    left: 0;
  }

  .grand-auction {
    ${(props) =>
      (props.isWinning || props.isLoosing) && 'margin-bottom: 0.25rem'};
  }
`;

const ItemCardContentContainer = styled.div<{ isFinished?: boolean }>`
  display: ${(props) => (props.isFinished ? 'none' : 'flex')};
  width: ${(props) => props.theme.breakpoints.phone};
  flex-direction: column;

  @media (min-width: ${(props) => props.theme.breakpoints.phone}) {
    padding-right: 0;
    width: inherit;
  }

  padding-left: 0.5rem;
  padding-right: 0.25rem;

  justify-content: space-between;
`;

const ItemCardFinishedContainer = styled.div<{ isFinished?: boolean }>`
  display: flex;
  display: ${(props) => (props.isFinished ? 'flex' : 'none')};

  flex-direction: column;
  font-size: 0.75rem;

  justify-content: space-between;

  color: ${(props) => props.theme.colors.grey};

  padding-left: 0.5rem;

  @media (min-width: ${(props) => props.theme.breakpoints.phone}) {
    place-items: center;
    padding-left: 0;
    color: ${(props) => props.theme.colors.accent};
  }
`;

const ItemCardFinishedText = styled.span`
  display: grid;
  color: ${(props) => props.theme.colors.grey};

  place-items: flex-end;
  @media (min-width: ${(props) => props.theme.breakpoints.phone}) {
    place-items: center;
    padding-right: 0;
    font-size: 0.75rem;
  }

  font-size: 0.7rem;
  padding-right: 0.5rem;
  padding-top: 1.5rem;
`;

const ItemCardTitle = styled.span<{
  isFinished?: boolean;
  isGrandAuction?: boolean;
}>`
  display: -webkit-box;

  font-size: 15px;

  color: ${(props) => props.isFinished && props.theme.colors.grey};

  max-width: 92%;
  @media (min-width: ${(props) => props.theme.breakpoints.phone}) {
    color: ${(props) =>
      props.isGrandAuction && !props.isFinished
        ? props.theme.colors.white
        : props.isFinished && props.theme.colors.black};
    padding-top: 0.375rem;
    padding-right: 0;
    font-size: 0.875rem;
    line-height: 1.16em;
    margin-bottom: ${(props) => props.isFinished && '1rem'};
  }

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    line-height: 1.19em;
  }

  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: ${(props) => props.isFinished && '0.5rem'};

  padding-right: 1rem;
`;

const ItemCardInfo = styled.div<{
  border?: boolean;
  grey?: boolean;
  isGrandAuction?: boolean;
  isWinning?: boolean;
}>`
  color: ${(props) =>
    props.grey ? props.theme.colors.disabled : props.theme.colors.accent};

  line-height: 0.75rem;
  font-size: 0.67rem;

  ${(props) =>
    props.border && `border-left: 0.06rem solid ${props.theme.colors.grey}`};

  padding: ${(props) => (props.border ? '0 0 0 0.875rem' : '0 0.875rem 0 0')};

  @media (min-width: ${(props) => props.theme.breakpoints.phone}) {
    padding: ${(props) => (props.border ? '0 0 0 0.875rem' : '0 2.8rem 0 0')};
    padding: ${(props) => props.isWinning && '0 1rem 0 0'};
    color: ${(props) => props.isGrandAuction && props.theme.colors.white};

    font-size: 0.75rem;
  }
  margin-top: 0.5rem;
`;

const ItemCardNumber = styled.div<{
  small?: boolean;
  bold?: boolean;
  grey?: boolean;
  isFinished?: boolean;
  isGrandAuction?: boolean;
}>`
  color: ${(props) => props.theme.colors.black};
  color: ${(props) =>
    (props.grey || props.isFinished) && props.theme.colors.grey};

  font-size: 1.125rem;
  @media (min-width: ${(props) => props.theme.breakpoints.phone}) {
    color: ${(props) =>
      props.isGrandAuction && !props.isFinished
        ? props.theme.colors.white
        : props.isFinished && props.theme.colors.black};

    font-size: ${(props) => (props.small ? '0.9rem' : '1.5rem')};
    font-weight: ${(props) => (props.bold ? 600 : 400)};

    line-height: ${(props) => (props.small ? '1.3rem' : '2.25rem')};
  }

  font-weight: ${(props) => (props.bold ? 800 : 400)};
  line-height: 1.375rem;

  padding-top: 0.25rem;
`;

const ItemCardAdditionalCosts = styled.div<{ isGrandAuction?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (min-width: ${(props) => props.theme.breakpoints.phone}) {
    flex-direction: column;

    color: ${(props) => props.isGrandAuction && props.theme.colors.white};
    font-size: 0.75rem;
  }

  color: ${(props) => props.theme.colors.accent};

  padding-top: 1.125rem;
  line-height: 0.75rem;
  font-size: 0.67rem;
`;

const ItemCardAuctionInfo = styled.div`
  display: flex;

  flex-direction: row;
`;

const ItemCardBidAndTimeContainer = styled.div`
  color: ${(props) => props.theme.colors.disabled};
  justify-content: space-between;

  display: flex;
  padding-right: 0.5rem;

  .clock-icon {
    margin-right: 0.5rem;
  }

  align-items: center;

  @media (min-width: ${(props) => props.theme.breakpoints.phone}) {
    padding-top: 15%;

    font-size: 0.75rem;
    padding-bottom: 0.5rem;
  }
`;

const ItemCardBidAmount = styled.div<{ isGrandAuction?: boolean }>`
  display: none;
  @media (min-width: ${(props) => props.theme.breakpoints.phone}) {
    display: flex;
    color: ${(props) => props.isGrandAuction && props.theme.colors.white};
  }
`;

const ItemCardSpecialInfoContainer = styled.div<{
  isWinning?: boolean;
  isLoosing?: boolean;
  isGrandAuction?: boolean;
}>`
  display: flex;
  flex-direction: column;

  position: absolute;
  margin-top: ${(props) =>
    (props.isWinning || props.isLoosing) && props.isGrandAuction
      ? '3rem'
      : '4rem'};

  right: 0;
`;

const ItemCardSpecialInfo = styled.div<{
  isFinished?: boolean;
  isGrandAuction?: boolean;
  isWinning?: boolean;
  isLoosing?: boolean;
}>`
  display: ${(props) =>
    !props.isFinished &&
    (props.isGrandAuction || props.isWinning || props.isLoosing)
      ? 'flex'
      : 'none'};

  padding: 0.25rem 0 0.25rem 0;

  justify-content: center;
  align-items: center;

  right: 0;

  width: 4rem;

  background-color: ${(props) =>
    props.isWinning
      ? props.theme.colors.yellow
      : props.isLoosing
      ? props.theme.colors.red
      : props.theme.colors.accent};
  color: ${(props) => props.theme.colors.white};
  font-size: 0.7rem;

  border-radius: 0.4rem 0 0 0.4rem;

  @media (min-width: ${(props) => props.theme.breakpoints.phone}) {
    display: none;
  }
`;

const ItemCardHeart = styled.a<{ isMarked?: boolean }>`
  display: flex;
  position: absolute;
  margin-right: 0.5rem;
  background-color: #fff;

  border-radius: 50%;

  right: 0;

  @media (min-width: ${(props) => props.theme.breakpoints.phone}) {
    margin: 0.25rem 0.25rem 0.25rem 11.25rem;
    right: auto;
  }

  .heart-icon {
    margin: 0.25rem 0.15rem 0.15rem 0.15rem;
    height: 1.125rem;
    width: 1.125rem;
  }
  path {
    fill: ${(props) => props.isMarked && props.theme.colors.accent};
  }
  .inside-heart-line {
    stroke: ${(props) => props.isMarked && props.theme.colors.white};
  }

  cursor: pointer;
`;

const ItemCardAutoExtend = styled.div<{
  isAutoExtend?: boolean;
  isFinished?: boolean;
}>`
  display: ${(props) =>
    props.isAutoExtend === true && props.isFinished === false
      ? 'flex'
      : 'none'};

  position: absolute;
  border-radius: 1rem;
  color: ${(props) => props.theme.colors.white};

  border: 0.06rem solid ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.red};

  font-size: 0.6rem;
  padding: 0.3rem;

  margin: 0.25rem;

  .flame {
    margin-right: 0.2rem;
    width: 0.45rem;
    height: 0.65rem;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.phone}) {
    .flame {
      width: 0.6rem;
      height: 0.8rem;
    }
    font-size: 0.75rem;
  }
`;

const ItemCardFollowedUser = styled.div`
  display: flex;
  align-items: center;

  background-color: ${(props) => props.theme.colors.lightblue};

  border-radius: 1rem;
`;

const ItemCardUserImage = styled(Image)`
  border-radius: 49%;
  cursor: pointer;
  user-select: none;
`;

const ItemCardWinningContainer = styled.div<{ isLoosing?: boolean }>`
  display: flex;
  align-items: center;

  height: 2rem;
  width: 2rem;

  @media (min-width: ${(props) => props.theme.breakpoints.phone}) {
    width: max-content;
  }
  background-color: ${(props) => props.theme.colors.lightblue};

  border-radius: 1rem;
  margin-right: 0.25rem;

  .star-icon {
    margin-left: 0.5rem;
  }
  path {
    fill: ${(props) => props.isLoosing && 'none'};
    stroke: ${(props) => props.isLoosing && props.theme.colors.red};
  }
`;

const ItemCardWinningText = styled.span<{ isLoosing?: boolean }>`
  display: none;
  color: ${(props) =>
    props.isLoosing ? props.theme.colors.red : props.theme.colors.yellow};
  font-size: 0.75rem;

  padding: 0 0.5rem 0 0.25rem;

  @media (min-width: ${(props) => props.theme.breakpoints.phone}) {
    display: flex;
  }
`;

const ItemCardAboveImageContainer = styled.div`
  display: flex;
  position: absolute;

  top: -1rem;
  left: -0.9rem;

  @media (min-width: ${(props) => props.theme.breakpoints.phone}) {
    top: -1.8rem;
    left: -1.25rem;
  }
`;

const ItemCard = ({
  itemImage,
  itemImageAlt,
  userImage,
  userImageAlt,
  title,
  lastBid,
  buyNowPrice,
  additionalCosts,
  bidAmount,
  auctionEndDate,
  place,
  className,
}: ItemCardProps) => {
  const { t } = useTranslation('itemcard');

  const [marked, setMarked] = useState(false);
  const [finished, setFinished] = useState(false);
  const [autoExtend] = useState(false);
  const [grandAuction] = useState(false);
  const [winning, setWinning] = useState(false);
  const [loosing, setLoosing] = useState(false);

  useEffect(() => {
    if (!place) {
      setWinning(false);
      setLoosing(false);
    } else if (place === 1) {
      setWinning(true);
      setLoosing(false);
    } else if (place > 1) {
      setLoosing(true);
      setWinning(false);
    }
  }, [place]);

  const handleMarkItemCard = () => {
    setMarked(!marked);
  };

  const handleAuctionFinish = () => {
    setFinished(true);
  };

  return (
    <StyledItemCard
      isGrandAuction={grandAuction}
      isFinished={finished}
      className={className}
    >
      <ItemCardIcons
        isLoosing={loosing}
        isWinning={winning}
        isFinished={finished}
      >
        <ItemCardHeart
          onClick={handleMarkItemCard}
          isMarked={marked}
          aria-label='HeartIcon'
        >
          <Heart className='heart-icon' />
        </ItemCardHeart>

        <ItemCardSpecialInfoContainer
          isLoosing={loosing}
          isWinning={winning}
          isGrandAuction={grandAuction}
        >
          <ItemCardSpecialInfo
            isGrandAuction={grandAuction}
            isFinished={finished}
            className='grand-auction'
          >
            GRAND
          </ItemCardSpecialInfo>
          <ItemCardSpecialInfo
            className='winning-auction'
            isLoosing={loosing}
            isWinning={winning}
          >
            {place} {t('place')}
          </ItemCardSpecialInfo>
        </ItemCardSpecialInfoContainer>
      </ItemCardIcons>
      <ItemCardImageContainer>
        {itemImage ? (
          <ItemCardImage
            onDoubleClick={handleMarkItemCard}
            src={itemImage}
            alt={itemImageAlt}
            layout='fill'
          />
        ) : (
          <StyledPlaceholderImage />
        )}
        <ItemCardAboveImageContainer>
          {(winning || loosing) && (
            <ItemCardWinningContainer isLoosing={loosing}>
              <Star className='star-icon' />
              <ItemCardWinningText isLoosing={loosing}>
                {winning && !finished ? (
                  t('winning')
                ) : loosing && !finished ? (
                  <span>
                    {place} {t('place')}
                  </span>
                ) : (
                  <span>
                    {t('finishedPlace')} {place} {t('place')}
                  </span>
                )}
              </ItemCardWinningText>
            </ItemCardWinningContainer>
          )}

          {userImage && (
            <ItemCardFollowedUser>
              <ItemCardUserImage
                src={userImage}
                alt={userImageAlt}
                layout='fixed'
                width='32px'
                height='32px'
              />
            </ItemCardFollowedUser>
          )}
        </ItemCardAboveImageContainer>

        <ItemCardAutoExtend isFinished={finished} isAutoExtend={autoExtend}>
          <Flame className='flame' />
          hot
        </ItemCardAutoExtend>
      </ItemCardImageContainer>

      <ItemCardFinishedContainer isFinished={finished}>
        <ItemCardTitle isFinished={finished}>{title}</ItemCardTitle>
        {t('winningBid')}
        <ItemCardNumber bold isFinished={finished}>
          {lastBid}€
        </ItemCardNumber>
        <ItemCardFinishedText>{t('finished')}</ItemCardFinishedText>
      </ItemCardFinishedContainer>

      <ItemCardContentContainer isFinished={finished}>
        <ItemCardTitle isGrandAuction={grandAuction}>{title}</ItemCardTitle>
        <ItemCardAuctionInfo>
          <ItemCardInfo isWinning={winning} isGrandAuction={grandAuction}>
            {winning ? t('current') : t('bid')}
            <ItemCardNumber isGrandAuction={grandAuction} bold>
              {lastBid}€
            </ItemCardNumber>
          </ItemCardInfo>
          {buyNowPrice && (
            <ItemCardInfo border grey>
              {t('buyNow')}
              <ItemCardNumber small grey>
                {buyNowPrice}€
              </ItemCardNumber>
            </ItemCardInfo>
          )}
        </ItemCardAuctionInfo>

        <ItemCardAdditionalCosts isGrandAuction={grandAuction}>
          {!!additionalCosts && (
            <span>
              +{additionalCosts}€ {t('referal')}
            </span>
          )}
          <ItemCardBidAndTimeContainer>
            <ItemCardBidAmount isGrandAuction={grandAuction}>
              {bidAmount} {t('bids')}
            </ItemCardBidAmount>
            <AuctionTimer
              grandAuction={grandAuction}
              auctionEndDate={auctionEndDate}
              handleAuctionFinish={handleAuctionFinish}
            />
          </ItemCardBidAndTimeContainer>
        </ItemCardAdditionalCosts>
      </ItemCardContentContainer>
    </StyledItemCard>
  );
};

export default ItemCard;
