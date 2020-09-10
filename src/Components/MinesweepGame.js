import React, { useState } from "react";
import Square from "./Squares";
import { countNeighborBombs, neighborCells } from "./countNeighborBombs";
import GameHeader from "./GameHeader";

const MinesweepGame = ({
  gameArray,
  size,
  checkedArray,
  flagArray,
  totalBombs,
  setStart,
  setSize,
  start,
}) => {
  const [pause, setPause] = useState(false);
  const [gameon, setGameon] = useState(false);
  const [reload, setReload] = useState(false);
  const [guesses, setGuesses] = useState([]);
  const [gameover, setGameover] = useState(false);
  const [guessedBombs, setGuessedBombs] = useState(0);
  let neighborBombs = [...countNeighborBombs(size, gameArray)];
  const squares = [];
  const expandNeighbors = (id) => {
    if (!flagArray[id]) {
      checkedArray[id] = true;
      let neighborArray = neighborCells(id, size);
      for (let i = 0; i < neighborArray.length; i++) {
        if (
          neighborBombs[neighborArray[i]] === null &&
          !checkedArray[neighborArray[i]]
        ) {
          expandNeighbors(neighborArray[i]);
        } else {
          if (!flagArray[neighborArray[i]]) {
            checkedArray[neighborArray[i]] = true;
          }
        }
      }
    }
  };
  const squareClicked = (id) => {
    checkedArray[id] = true;
    if (gameArray[id] === "bomb") {
      revealBombs();
      setGameover(true);
      setGameon(false);
      setGuessedBombs(0);
    } else if (!neighborBombs[id]) {
      expandNeighbors(id);
    }
    setReload(!reload);
  };

  const setFlag = (id) => {
    setReload(!reload);
    flagArray[id] = !flagArray[id];
    if (flagArray[id]) {
      setGuessedBombs((guessedBombs) => guessedBombs + 1);
    } else {
      setGuessedBombs((guessedBombs) => guessedBombs - 1);
    }
    if (isGamewon()) {
      setGameover(true);
      setGameon(false);
      setGuessedBombs(0);
      // setGameon(false);
    }
  };

  const revealBombs = () => {
    let g = Array(size * size).fill(null);
    for (let i = 0; i < size * size; i++) {
      if (flagArray[i] && gameArray[i] === "bomb") {
        g[i] = "correct";
        flagArray[i] = false;
      } else if (flagArray[i]) {
        g[i] = "incorrect";
        flagArray[i] = false;
      }
      if (gameArray[i] === "bomb") {
        checkedArray[i] = true;
      }
    }
    setGuesses([...g]);
    setReload(!reload);
  };

  const isGamewon = () => {
    let matches = 0;
    let guessBombs = 0;
    for (let i = 0; i < gameArray.length; i++) {
      if (flagArray[i]) {
        guessBombs++;
      }
      if (gameArray[i] === "bomb" && flagArray[i]) {
        matches++;
      }
    }

    return matches === totalBombs && guessBombs === totalBombs;
  };
  for (let i = 0; i < size * size; i++) {
    squares.push(
      <Square
        squareClicked={squareClicked}
        squareid={i}
        key={i}
        squareType={gameArray[i]}
        neighborBombs={neighborBombs[i]}
        checked={checkedArray[i]}
        setFlag={setFlag}
        flagged={flagArray[i]}
        gameover={gameover}
        guess={guesses[i]}
        pause={pause}
        setPause={setPause}
        gameon={gameon}
      />
    );
  }

  return (
    <>
      <GameHeader
        diff={totalBombs - guessedBombs}
        gameWon={isGamewon()}
        gameover={gameover}
        guesses={guesses}
        totalBombs={totalBombs}
        pause={pause}
        setPause={setPause}
        setSize={setSize}
        gameon={gameon}
        setGameon={setGameon}
        setStart={setStart}
        setGameover={setGameover}
        start={start}
        setGuesses={setGuesses}
      />
      <div className="board">{squares}</div>
    </>
  );
};

export default MinesweepGame;
