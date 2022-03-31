import { useEffect, useState } from 'react';

const MILLISECONDS = 1;
const SECONDS = 1000 * MILLISECONDS;
const MINUTE = 60 * SECONDS;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
/**
 * Calculates time left from endTime to now
 * @param endTime
 * @returns {
 *     days:number;
 *     hours:number;
 *     minutes:number;
 *     seconds:number;
 * } | null
 */
const useTimeLeft = (endTime: number) => {
  const calculateTimeLeft = () => {
    const dateEndTime = new Date(endTime);
    const difference = +dateEndTime - Date.now();
    let timeLeft = null;

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / DAY),
        hours: Math.floor((difference / HOUR)),
        minutes: Math.floor((difference / MINUTE) % 60),
        seconds: Math.floor((difference / SECONDS) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<any>(calculateTimeLeft());

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearTimeout(timeOut);
    };
  });

  return timeLeft;
};

export default useTimeLeft