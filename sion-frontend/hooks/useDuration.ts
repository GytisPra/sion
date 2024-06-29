import { useEffect, useState } from 'react';

const useDuration = (auctionEndDate: Date) => {
  const auctionEndInMs = auctionEndDate.getTime() - Date.now();

  let seconds = Math.trunc(
    Math.abs(auctionEndDate.getTime() - Date.now()) / 1000,
  );

  const days = Math.trunc(seconds / 86400);
  seconds -= days * 86400;

  const hours = Math.trunc(seconds / 3600) % 24;
  seconds -= hours * 3600;

  const minutes = Math.trunc(seconds / 60) % 60;
  seconds -= minutes * 60;

  const [time, setTime] = useState({
    seconds: seconds,
    minutes: minutes,
    hours: hours,
    days: days,
    auctionEndInMs: auctionEndInMs,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime({
        seconds: seconds,
        minutes: minutes,
        hours: hours,
        days: days,
        auctionEndInMs: auctionEndInMs,
      });
    }, 1000);

    if (time.auctionEndInMs <= 999) clearInterval(interval);

    return () => {
      clearInterval(interval);
    };
  }, [time]);

  return time;
};

export default useDuration;
