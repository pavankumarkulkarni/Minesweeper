const countNeighborBombs = (size, gameArray) => {
  let neighborBombs = Array(100).fill(0);
  for (let i = 0; i < size * size; i++) {
    if (gameArray[i] === "bomb") {
      neighborBombs[i] = "💣";
    } else {
      let countBomb = 0;
      let neightbors = neighborCells(i, size);
      for (let j = 0; j < neightbors.length; j++) {
        if (gameArray[neightbors[j]] === "bomb") {
          countBomb++;
        }
      }

      neighborBombs[i] = countBomb !== 0 ? countBomb : null;
    }
  }

  return neighborBombs;
};

const neighborCells = (i, size) => {
  let neighborArray = [];
  // count iff top left
  if (i >= size && i % size !== 0) {
    neighborArray.push(i - 1 - size);
  }
  //count iff top
  if (i >= size) {
    neighborArray.push(i - size);
  }
  // count iff top right
  if (i >= size && (i + 1) % size !== 0) {
    neighborArray.push(i + 1 - size);
  }

  //count iff left
  if (i % size !== 0) {
    neighborArray.push(i - 1);
  }

  if ((i + 1) % size !== 0) {
    neighborArray.push(i + 1);
  }

  // count iff bottom left
  if (i + size < size * size && i % size !== 0) {
    neighborArray.push(i - 1 + size);
  }

  //count iff bottom
  if (i + size < size * size) {
    // console.log(i);
    neighborArray.push(i + size);
  }

  // count iff bottom right
  if (i + size < size * size && (i + 1) % size !== 0) {
    neighborArray.push(i + 1 + size);
  }

  return neighborArray;
};

export { countNeighborBombs, neighborCells };
