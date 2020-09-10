import React, { useState } from "react";

export default function Configs({
  pause,
  setPause,
  setSize,
  gameon,
  setGameon,
  setStart,
  setGameover,
  setGuesses,
}) {
  const [mode, setMode] = useState("standard");
  const handleClick = (e) => {
    e.preventDefault();
    setPause((pause) => !pause);
    // console.log(e);
  };
  const modeHandle = (e) => {
    let root = document.documentElement;
    setMode(e.target.value);
    if (e.target.value === "standard") {
      setSize(10);
      root.style.setProperty("--size", 10);
    } else if (e.target.value === "expert") {
      setSize(20);
      root.style.setProperty("--size", 20);
    }
  };
  const btnBG = pause ? "#eee" : "#222";
  const btnFT = pause ? "#222" : "#eee";
  // console.log(`Pause:${pause}`);
  const newGame = (e) => {
    setGameon(true);
    setGuesses([]);
    setStart((s) => !s);
    setGameover(false);
  };

  return (
    <form onSubmit={handleClick}>
      <input
        type="radio"
        id="standard"
        name="mode"
        value="standard"
        onChange={modeHandle}
        checked={mode === "standard"}
        disabled={gameon}
      />
      <label htmlFor="standard">Small</label>
      <input
        type="radio"
        id="expert"
        name="mode"
        value="expert"
        checked={mode === "expert"}
        onChange={modeHandle}
        disabled={gameon}
      />
      <label htmlFor="expert">Large</label>
      {!gameon ? (
        <input type="button" name="button" onClick={newGame} value="New Game" />
      ) : (
        <button type="submit" style={{ color: btnFT, backgroundColor: btnBG }}>
          {pause ? "Resume" : "Pause"}
        </button>
      )}
    </form>
  );
}
