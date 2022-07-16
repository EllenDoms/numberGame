import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';

function getAnimationSettings(angle: number, originX: number) {
  return {
    particleCount: 3,
    angle,
    spread: 55,
    origin: { x: originX },
    colors: ['#5eead4', '#f87171'],
  };
}

type Props = {
  handleReset: () => void;
};

export default function Confetti({ handleReset }: Props) {
  const refAnimationInstance = useRef(null);
  const [intervalId, setIntervalId] = useState<any>();

  const getInstance = useCallback((instance: any) => {
    refAnimationInstance.current = instance;
  }, []);

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      //@ts-ignore
      refAnimationInstance.current(getAnimationSettings(60, 0));
      //@ts-ignore
      refAnimationInstance.current(getAnimationSettings(120, 1));
    }
  }, []);

  useEffect(() => {
    if (!intervalId) {
      setIntervalId(setInterval(nextTickAnimation, 20));
    }
  }, [nextTickAnimation, intervalId]);

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <div className="w-screen h-screen absolute bg-slate-800 bg-opacity-20">
      <div className="z-20 absolute w-screen h-screen flex items-center justify-center">
        <button
          className="bg-teal-400 text-teal-900 text-base px-3 py-2 rounded-sm hover:bg-teal-300 hover:shadow-md focus:ring-4 outline-none ring-teal-800 "
          onClick={handleReset}
        >
          Start over
        </button>
      </div>
      <ReactCanvasConfetti
        refConfetti={getInstance}
        width="100%"
        height="100%"
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
}
