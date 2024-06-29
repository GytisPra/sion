import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ClockIcon } from '@assets/icons';
import useDuration from '@hooks/useDuration';

interface ItemCardTimerProps {
  auctionEndDate: Date;
  grandAuction: boolean;
  handleAuctionFinish: () => void;
}

const ItemCardTimeLeft = styled.a<{
  isEnding?: boolean;
  isGrandAuction?: boolean;
}>`
  display: flex;

  justify-content: center;
  align-items: center;

  .clock-icon path {
    fill: ${(props) =>
      props.isEnding ? props.theme.colors.red : props.theme.colors.disabled};
  }
  color: ${(props) =>
    props.isEnding ? props.theme.colors.red : props.theme.colors.disabled};

  @media (min-width: ${(props) => props.theme.breakpoints.phone}) {
    .clock-icon path {
      fill: ${(props) => props.isGrandAuction && props.theme.colors.white};
    }
    color: ${(props) => props.isGrandAuction && props.theme.colors.white};

    position: relative;
  }
`;

const AuctionTimer = ({
  auctionEndDate,
  handleAuctionFinish,
  grandAuction,
}: ItemCardTimerProps) => {
  const day = auctionEndDate.getDate();
  const month = auctionEndDate.getMonth();
  const time = useDuration(auctionEndDate);

  const [ending, setEnding] = useState(false);

  useEffect(() => {
    if (time.days === 0 && time.hours === 0 && time.minutes < 20)
      setEnding(true);
    else setEnding(false);

    if (time.auctionEndInMs <= 999) handleAuctionFinish();
  }, [
    time.days,
    time.hours,
    time.minutes,
    time.auctionEndInMs,
    handleAuctionFinish,
  ]);

  return (
    <div>
      {time.days >= 3 ? (
        <ItemCardTimeLeft
          isGrandAuction={grandAuction}
          isEnding={ending}
          aria-label='ClockIcon'
        >
          <ClockIcon className='clock-icon' />
          {String(month + 1).padStart(2, '0')}-{String(day).padStart(2, '0')}
        </ItemCardTimeLeft>
      ) : time.days >= 1 && time.days <= 3 ? (
        <ItemCardTimeLeft
          isGrandAuction={grandAuction}
          isEnding={ending}
          aria-label='ClockIcon'
        >
          <ClockIcon className='clock-icon' />
          {time.days} d.&nbsp;
          {time.hours !== 0 && <p>{String(time.hours).padStart(2, '0')} h.</p>}
        </ItemCardTimeLeft>
      ) : time.hours > 0 ? (
        <ItemCardTimeLeft
          isGrandAuction={grandAuction}
          isEnding={ending}
          aria-label='ClockIcon'
        >
          <ClockIcon className='clock-icon' />
          {String(time.hours).padStart(2, '0')} h.{' '}
          {String(time.minutes).padStart(2, '0')} min.
        </ItemCardTimeLeft>
      ) : (
        <ItemCardTimeLeft
          isGrandAuction={grandAuction}
          isEnding={ending}
          aria-label='ClockIcon'
        >
          <ClockIcon className='clock-icon' />
          {String(time.minutes).padStart(2, '0')}:
          {String(time.seconds).padStart(2, '0')}
        </ItemCardTimeLeft>
      )}
    </div>
  );
};

export default AuctionTimer;
