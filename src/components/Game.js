import React, { useState } from "react";
import Dice from "./Dice";
import ScoreTable from "./ScoreTable";

const NUM_DICE = 5;
const NUM_ROLLS = 3;

function Game() {
  const [gameState, setGameState] = useState({
    dice: Array.from({ length: NUM_DICE }),
    locked: Array(5).fill(false),
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
    setGameState((gs) => ({
      ...gameState,
      scores: { ...gs.scores, [ruleName]: ruleFn(gameState.dice) },
      rollsLeft: NUM_ROLLS,
      locked: Array(NUM_DICE).fill(false),
    }));
  }

  function displayRollInfo() {
    const messages = ["0 Rolls Left", "1 Roll Left", "2 Rolls Left", "Starting Round"];
    return messages[gameState.rollsLeft];
  }

  return (
    <div className="game-wrapp">
      <div className="dice-wrapp">
        <h1 className="title">Yahtzee!</h1>
        <div className="dices">
          <Dice></Dice>
          <button>3 rolls left</button>
        </div>
      </div>
      <ScoreTable></ScoreTable>
    </div>
  );
}

export default Game;
