import React from 'react';
import { gridSize } from '../../App';
import { useNeighborsOfZero } from '../../hooks/useNeighborsOfZero';
import { OneNumber } from './oneNumber';

interface Props {
  numbers: number[];
  handleChangeNumbers: (arr: number[]) => void;
  gridSize: gridSize;
}

export function NumPad({ numbers, handleChangeNumbers, gridSize }: Props) {
  const indexZero = numbers.findIndex((number) => number === 0);
  const canMoveIndexes = useNeighborsOfZero({ indexZero, gridSize });

  const switchPosition = (index: number) => {
    const canMoveBlock = canMoveIndexes.find((movable) => movable === index);

    if (canMoveBlock === undefined) return null;

    numbers[indexZero] = numbers[index];
    numbers[index] = 0;
    handleChangeNumbers([...numbers]);
  };

  return (
    <div className={`grid ${colMap[gridSize]} gap-1 bg-slate-900 rounded-xl p-6`}>
      {numbers.map((number, i) => (
        <OneNumber key={number} number={number} onClick={() => switchPosition(i)} />
      ))}
    </div>
  );
}

const colMap = { 3: 'grid-cols-3', 4: 'grid-cols-4', 5: 'grid-cols-5', 6: 'grid-cols-6' };
