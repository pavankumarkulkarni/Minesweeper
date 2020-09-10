import React, { useState, useEffect } from "react";

export default function Timer({ gameover, pause, gameon, start, setLapsed }) {
  const [seconds, setSeconds] = useState(0);

  let ss = seconds % 60;
  let mm = parseInt(seconds / 60);
  let hh = parseInt(seconds / 60 / 60);
  let s = ss < 10 ? "0" + ss : ss.toString();
  let m = mm < 10 ? "0" + mm : mm.toString();
  let h = hh < 10 ? "0" + hh : hh.toString();
  // console.log(gameonProp.current);
  useEffect(() => {
    let t;
    if (!gameover && !pause && gameon) {
      t = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else {
      clearInterval(t);
    }

    return () => {
      clearInterval(t);
    };
  }, [gameover, pause, gameon]);
  useEffect(() => {
    setLapsed(`${h}:${m}:${s}`);
  }, [h, m, s, setLapsed]);

  return (
    <span id="timer">
      Time: {h}:{m}:{s}
    </span>
  );
}
