import { useState, useRef, useEffect } from 'react';

type UseTimerReturnType = {
  time: number;
  isRunning: boolean;
  formattedTime: string;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
};

export const useTimer = (): UseTimerReturnType => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  const formatTime = (ms: number): string => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds
      .toString()
      .padStart(2, '0')}`;
  };

  const startTimer = (): void => {
    setIsRunning(true);
  };

  const stopTimer = (): void => {
    setIsRunning(false);
  };

  const resetTimer = (): void => {
    setTime(0);
    setIsRunning(false);
  };

  return {
    time,
    isRunning,
    formattedTime: formatTime(time),
    startTimer,
    stopTimer,
    resetTimer,
  };
}; 