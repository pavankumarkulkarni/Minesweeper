import React, { useState } from "react";
import Timer from "./Timer";
import Configs from "./Configs";

export default function GameHeader({
  gameWon,
  diff,
  gameover,
  guesses,
  totalBombs,
  pause,
  setPause,
  setSize,
  gameon,
  setGameon,
  setStart,
  setGameover,
  start,
  setGuesses,
}) {
  let correct = 0;
  let incorrect = 0;
  for (let i = 0; i < guesses.length; i++) {
    if (guesses[i] === "correct") {
      correct++;
    } else if (guesses[i] === "incorrect") {
      incorrect++;
    }
  }
  let message;
  let p1 = null;
  const [lapsed, setLapsed] = useState(null);
  // const [seconds, setSeconds] = useState(0);

  // console.log(gameover);
  if (gameWon) {
    message = "CONGRATULATIONS !!!";
    p1 = `YOU TAMED IT IN ${lapsed}`;
  } else if (gameover) {
    message = `You Lost ....`;
    p1 = ` ${correct} correct &
     ${incorrect} incorrect predictions. Lapsed time ${lapsed}`;
  } else if (diff >= 0) {
    message = null;
    p1 = ` more bombs to detect ...`;
  } else {
    message = "GAME ON";
    p1 = `You guessed ${diff * -1} access bombs !!`;
  }

  return (
    <div>
      <div id="header">
        <h1>Minecraft</h1>
        {gameon ? (
          <Timer
            gameover={gameover}
            pause={pause}
            gameon={gameon}
            start={start}
            setLapsed={setLapsed}
          />
        ) : null}
      </div>
      <Configs
        setPause={setPause}
        pause={pause}
        setSize={setSize}
        gameon={gameon}
        setGameon={setGameon}
        setStart={setStart}
        setGameover={setGameover}
        setGuesses={setGuesses}
      />
      <div id="result">
        {message && <span>{message}</span>}
        <p style={{ textAlign: "center" }}>
          {!gameover && <span> {diff} </span>}
          {p1}
        </p>
      </div>
    </div>
  );
}
