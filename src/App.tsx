import { useState } from 'react';
import { NumberGame } from './modules/numberGame';
import { Header } from './components/header';
import Confetti from './components/confetti';
import { useNeighborsOfZero } from './hooks/useNeighborsOfZero';

export type gridSize = 3 | 4 | 5 | 6;
const gridSizes = [3, 4, 5, 6];

function App() {
  const [gridSize, setGridSize] = useState<gridSize>(3);

  const [startNumbers, setStartNumbers] = useState(loadNewNumbers(gridSize));
  const [isExploding, setIsExploding] = useState(false);

  const handleReset = () => {
    const newNums = loadNewNumbers(gridSize);
    setStartNumbers(newNums);
    setIsExploding(false);
  };

  const handleGridChange = (newSizeStr: string) => {
    const newGridSize = parseInt(newSizeStr) as gridSize;
    setGridSize(newGridSize);
    const newNums = loadNewNumbers(newGridSize);
    setStartNumbers(newNums);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-slate-800">
      {isExploding && <Confetti handleReset={handleReset} />}
      <div className={`flex flex-col gap-8 ${isExploding && 'blur-sm'}`}>
        <Header />
        <select
          className="outline-none px-4 py-2 rounded-sm border-r-8 border-transparent"
          id="sizes"
          name="sizes"
          onChange={(e) => handleGridChange(e.target.value)}
          aria-label="grid-size"
        >
          {gridSizes.map((size) => (
            <option key={size} value={size}>
              {size} x {size} grid
            </option>
          ))}
        </select>

        <NumberGame
          startNumbers={startNumbers}
          handleShuffle={() => setStartNumbers(loadNewNumbers(gridSize))}
          setFinished={() => setIsExploding(true)}
          gridSize={gridSize}
        />
      </div>
    </div>
  );
}

export default App;

export function loadNewNumbers(gridSize: number) {
  // get solution array
  const lastIndex = gridSize * gridSize - 1;
  let start: number[] = [];
  for (let i = 1; i <= lastIndex; i++) start.push(i);
  start.push(0);

  const amountOfShuffles = Math.floor(Math.random() * 100);
  const shuffledArr = ShuffleArray(amountOfShuffles, start, gridSize);

  return shuffledArr;
}

const ShuffleArray = (amount: number, arr: number[], gridSize: number) => {
  const neighBorsOfZero = useNeighborsOfZero;
  let shuffleArr = arr;
  let previousMove;

  for (let i = 0; i < amount; i++) {
    const indexZero = shuffleArr.findIndex((number) => number === 0);

    const movableIndexes = neighBorsOfZero({ indexZero, gridSize });
    previousMove && movableIndexes.splice(movableIndexes.indexOf(previousMove), 1);
    const random = movableIndexes[Math.floor(Math.random() * movableIndexes.length)];

    shuffleArr[indexZero] = shuffleArr[random];
    shuffleArr[random] = 0;
    previousMove = indexZero;
  }
  return shuffleArr;
};
