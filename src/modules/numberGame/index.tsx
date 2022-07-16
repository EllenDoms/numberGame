import React, { useEffect, useState } from 'react';
import { gridSize } from '../../App';
import { NumPad } from './numPad';

interface Props {
  startNumbers: number[];
  handleShuffle: () => void;
  setFinished: () => void;
  gridSize: gridSize;
}

export function NumberGame({ startNumbers, handleShuffle, setFinished, gridSize }: Props) {
  const [numbers, setNumbers] = useState<number[]>([]);

  useEffect(() => {
    setNumbers([...startNumbers]);
  }, [startNumbers]);

  const handleReset = () => {
    setNumbers([...startNumbers]);
  };

  const handleChangeNumbers = (arr: number[]) => {
    setNumbers(arr);
    const isFinished = checkIfFinished({ numbers: arr, gridSize });
    isFinished && setFinished();
  };

  return (
    <div className="flex flex-col gap-4">
      {numbers && (
        <NumPad numbers={numbers} handleChangeNumbers={handleChangeNumbers} gridSize={gridSize} />
      )}
      <div className="flex flex-row gap-4 items-center justify-center">
        <button
          className="bg-teal-400 text-teal-900 text-base px-3 py-2 rounded-sm hover:bg-teal-300 hover:shadow-md focus:ring-4 outline-none ring-teal-800 "
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          className="bg-teal-400 text-teal-900 text-base px-3 py-2 rounded-sm hover:bg-teal-300 hover:shadow-md focus:ring-4 outline-none ring-teal-800 "
          onClick={handleShuffle}
        >
          Shuffle
        </button>
      </div>
    </div>
  );
}

type props = {
  numbers: number[];
  gridSize: gridSize;
};

const checkIfFinished = ({ numbers, gridSize }: props) => {
  const totalNumbers = gridSize * gridSize;
  for (let i = 0; i < totalNumbers - 1; i++) {
    if (numbers[i] !== i + 1) return false;
  }
  if (numbers[totalNumbers - 1] !== 0) return false;

  return true;
};
