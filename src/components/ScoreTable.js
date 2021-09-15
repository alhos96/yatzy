import React, { useEffect, useState } from "react";
import RuleRow from "./RuleRow";
import {
  ones,
  twos,
  threes,
  fours,
  fives,
  sixes,
  threeOfKind,
  fourOfKind,
  fullHouse,
  smallStraight,
  largeStraight,
  yahtzee,
  chance,
} from "./Rules";

function ScoreTable({ scores, doScore, count, start }) {
  const [highScore, setHighScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  console.log(count);

  useEffect(() => {
    getTotalScore();
  }, [count]);

  function getTotalScore() {
    let score = 0;
    for (let key in scores) {
      if (scores[key]) score += scores[key];
    }

    setTotalScore(score);
  }
  const [newGame] = useState("");

  useEffect(() => {
    const newHighScore = localStorage.getItem("highScore");
    if (newHighScore) setHighScore(newHighScore);
  }, []);

  useEffect(() => {
    const score = localStorage.getItem("totalScore");
    if (!score) localStorage.setItem("totalScore", totalScore);
  });

  useEffect(() => {
    console.log(totalScore, "ovo je totalscore");
    console.log(highScore, "ovo je highscore");
    console.log(count, "ovo je count");
    if (totalScore > highScore && count === 0) {
      localStorage.setItem("highScore", totalScore);
      setHighScore(totalScore);
      console.log("reci mi kad ovo uradis");
    }
  }, [totalScore, highScore, count]);

  useEffect(() => {
    if (count === 0) localStorage.setItem("totalScore", totalScore);
  }, [count]);

  return (
    <div className="ScoreTable">
      <section className="section">
        <h2>Upper</h2>
        <table cellSpacing="0">
          <tbody>
            <RuleRow
              name="Ones"
              score={scores.ones}
              description={ones.description}
              doScore={(evt) => doScore("ones", ones.evalRoll)}
              start={start}
            />
            <RuleRow
              name="Twos"
              score={scores.twos}
              description={twos.description}
              doScore={(evt) => doScore("twos", twos.evalRoll)}
              start={start}
            />
            <RuleRow
              name="Threes"
              score={scores.threes}
              description={threes.description}
              doScore={(evt) => doScore("threes", threes.evalRoll)}
              start={start}
            />
            <RuleRow
              name="Fours"
              score={scores.fours}
              description={fours.description}
              doScore={(evt) => doScore("fours", fours.evalRoll)}
              start={start}
            />
            <RuleRow
              name="Fives"
              score={scores.fives}
              description={fives.description}
              doScore={(evt) => doScore("fives", fives.evalRoll)}
              start={start}
            />
            <RuleRow
              name="Sixes"
              score={scores.sixes}
              description={sixes.description}
              doScore={(evt) => doScore("sixes", sixes.evalRoll)}
              start={start}
            />
          </tbody>
        </table>
      </section>
      <section className="section section-lower">
        <h2>Lower</h2>
        <table cellSpacing="0">
          <tbody>
            <RuleRow
              name="Three of Kind"
              score={scores.threeOfKind}
              description={threeOfKind.description}
              doScore={(evt) => doScore("threeOfKind", threeOfKind.evalRoll)}
              start={start}
            />
            <RuleRow
              name="Four of Kind"
              score={scores.fourOfKind}
              description={fourOfKind.description}
              doScore={(evt) => doScore("fourOfKind", fourOfKind.evalRoll)}
              start={start}
            />

            <RuleRow
              name="Full House"
              score={scores.fullHouse}
              description={fullHouse.description}
              doScore={(evt) => doScore("fullHouse", fullHouse.evalRoll)}
              start={start}
            />
            <RuleRow
              name="Small Straight"
              score={scores.smallStraight}
              description={smallStraight.description}
              doScore={(evt) => doScore("smallStraight", smallStraight.evalRoll)}
              start={start}
            />
            <RuleRow
              name="Large Straight"
              score={scores.largeStraight}
              description={largeStraight.description}
              doScore={(evt) => doScore("largeStraight", largeStraight.evalRoll)}
              start={start}
            />
            <RuleRow
              name="Yahtzee"
              score={scores.yahtzee}
              description={yahtzee.description}
              doScore={(evt) => doScore("yahtzee", yahtzee.evalRoll)}
              start={start}
            />
            <RuleRow
              name="Chance"
              score={scores.chance}
              description={chance.description}
              doScore={(evt) => doScore("chance", chance.evalRoll)}
              start={start}
            />
          </tbody>
        </table>
      </section>
      <h2>Total Score: {totalScore}</h2>
      <h2>High Score: {highScore}</h2>

      {
        <div>
          <button className="reroll" onClick={() => window.location.reload()}>
            New Game
          </button>{" "}
          {newGame}
        </div>
      }
    </div>
  );
}

export default ScoreTable;
