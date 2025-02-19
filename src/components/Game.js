import { useState, useEffect } from "react";
import Dice from "./Dice";
import ScoreTable from "./ScoreTable";
import "../game.css";

const NUM_DICE = 5;
const NUM_ROLLS = 3;

function Game() {
  const [start, setStart] = useState(false);
  const [count, setCount] = useState(13);
  const [gameState, setGameState] = useState({
    dice: Array.from({ length: NUM_DICE }),
    locked: Array(NUM_DICE).fill(false),
    rollsLeft: NUM_ROLLS,
    rolling: false,
    scores: {
      ones: undefined,
      twos: undefined,
      threes: undefined,
      fours: undefined,
      fives: undefined,
      sixes: undefined,
      threeOfKind: undefined,
      fourOfKind: undefined,
      fullHouse: undefined,
      smallStraight: undefined,
      largeStraight: undefined,
      yahtzee: undefined,
      chance: undefined,
    },
  });

  useEffect(() => {
    if (count === 0) return;
    if (count < 13) {
      animateRoll();
    }
  }, [count]);

  useEffect(() => {
    animateRoll();
    setTimeout(() => {
      setStart(true);
    }, 1500);
  }, []);

  function roll(event) {
    setGameState((gs) => ({
      ...gameState,
      dice: gs.dice.map((d, i) => (gs.locked[i] ? d : Math.ceil(Math.random() * 6))),
      locked: gs.rollsLeft > 1 ? gs.locked : Array(NUM_DICE).fill(true),
      rollsLeft: gs.rollsLeft > 0 ? gs.rollsLeft - 1 : 0,
      rolling: false,
    }));
  }

  function animateRoll() {
    setGameState(() => ({
      ...gameState,
      rolling: true,
    }));
    setTimeout(roll, 1000);
  }

  function toggleLocked(idx) {
    if (gameState.rollsLeft > 0 && !gameState.rolling) {
      setGameState((gs) => ({
        ...gameState,
        locked: [...gs.locked.slice(0, idx), !gs.locked[idx], ...gs.locked.slice(idx + 1)],
      }));
    }
  }

  function doScore(ruleName, ruleFn) {
    setCount((prevCount) => prevCount - 1);
    setGameState((gs) => ({
      ...gameState,
      scores: { ...gs.scores, [ruleName]: ruleFn(gameState.dice) },
      rollsLeft: NUM_ROLLS,
      locked: Array(NUM_DICE).fill(false),
    }));
    //animateRoll();
  }

  function displayRollInfo() {
    const messages = ["0 Rolls Left", "1 Roll Left", "2 Rolls Left", "Starting Round"];
    return messages[gameState.rollsLeft];
  }

  return (
    <div className="Game" style={{ width: "100%" }}>
      <header className="header">
        <h1 className="title">
          Yatzy! <i className="fas fa-dice-six"></i>
        </h1>
        <section className="dice-section">
          <Dice
            dice={gameState.dice}
            locked={gameState.locked}
            handleClick={toggleLocked}
            disabled={gameState.rollsLeft === 0}
            rolling={gameState.rolling}
          />
          <div className="button-wrapper">
            <button
              disabled={count === 0 || gameState.locked.every((x) => x) || gameState.rollsLeft === 0 || gameState.rolling}
              onClick={animateRoll}
              className="reroll"
            >
              {count === 0 ? "Game is finished" : displayRollInfo()}
            </button>
          </div>
        </section>
      </header>
      <ScoreTable doScore={doScore} scores={gameState.scores} count={count} start={start} />
    </div>
  );
}

export default Game;
