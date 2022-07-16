import { useState } from 'react';
import { NumberGame } from './modules/numberGame';
import { Header } from './components/header';
import Confetti from './components/confetti';

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
          className="outline-none px-4 py-2 rounded-sm"
          id="sizes"
          name="sizes"
          onChange={(e) => handleGridChange(e.target.value)}
        >
          {gridSizes.map((size) => (
            <option value={size}>{size}</option>
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
  const lastIndex = gridSize * gridSize - 1;
  let start: number[] = [];
  for (let i = 0; i <= lastIndex; i++) start.push(i);
  let newArr = start.sort(() => Math.random() - 0.5);
  return newArr;
}
