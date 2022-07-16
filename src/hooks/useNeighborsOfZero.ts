type neighborProps = {
  indexZero: number;
  gridSize: number;
};

export function useNeighborsOfZero({ indexZero, gridSize }: neighborProps) {
  // grid starts from 1
  // indexing starts from 0
  let neighbors: number[] = [];

  const totalIndexes = gridSize * gridSize - 1;
  const aboveNumber = indexZero - gridSize;
  const belowNumber = indexZero + gridSize;
  const hasLeftNumber = indexZero % gridSize !== 0;
  const hasRightNumber = (indexZero + 1) % gridSize !== 0;

  if (aboveNumber >= 0) neighbors.push(aboveNumber);
  if (hasLeftNumber) neighbors.push(indexZero - 1);
  if (hasRightNumber) neighbors.push(indexZero + 1);
  if (belowNumber <= totalIndexes) neighbors.push(belowNumber);

  return neighbors;
}
