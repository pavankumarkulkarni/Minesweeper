import React, { useState } from "react";
import MinesweepGame from "./Components/MinesweepGame";

function App() {
  const [size, setSize] = useState(10);
  const [start, setStart] = useState(false);
  const totalBombs = size * 2.5;
  const bombArray = Array(totalBombs).fill("bomb");
  const validArray = Array(size * size - totalBombs).fill("valid");
  const gameArray = bombArray.concat(validArray);
  gameArray.sort(() => Math.random() - 0.5);
  const checkedArray = Array(size * size).fill(false);
  const flagArray = Array(size * size).fill(false);
  let guessedBombs = 0;
  return (
    <div className="app">
      <MinesweepGame
        gameArray={gameArray}
        size={size}
        checkedArray={checkedArray}
        flagArray={flagArray}
        totalBombs={totalBombs}
        guessedBombs={guessedBombs}
        setSize={setSize}
        start={start}
        setStart={setStart}
      />
    </div>
  );
}

export default App;
