import React from "react";

const Square = ({
  squareid,
  squareType,
  squareClicked,
  neighborBombs,
  checked,
  setFlag,
  flagged,
  gameover,
  guess,
  pause,
  setPause,
  gameon,
}) => {
  const handleClick = (id) => {
    if (!flagged && !gameover && !pause && gameon) {
      squareClicked(id);
    }
  };
  const hanldeRightClick = (e, id) => {
    e.preventDefault();
    if (!checked && !gameover && !pause && gameon) {
      setFlag(id);
    }
  };

  const bgstyle = checked ? "#eee" : null;
  // const shadow = checked ? "inset 2px 2px 2px black" : null;
  const bdradius = checked ? "0" : null;
  const borderstyle =
    guess === "correct"
      ? "2px solid green"
      : guess === "incorrect"
      ? "2px solid red"
      : checked
      ? "1px solid #aaa"
      : null;

  return (
    <div
      style={{
        backgroundColor: bgstyle,
        border: borderstyle,
        borderRadius: bdradius,
        // boxShadow: shadow,
      }}
      onClick={(e) => {
        handleClick(squareid);
      }}
      onContextMenu={(e) => {
        hanldeRightClick(e, squareid);
      }}
      id={squareid}
      className={`square`}
    >
      {flagged ? "🚩" : checked ? neighborBombs : null}
    </div>
  );
};

export default Square;
