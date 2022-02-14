import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { nanoid } from "nanoid";
import Dice from "./Dice";

export default function Board() {
  const generateNewDie = () => {
    return {
      value: Math.ceil(Math.random() * 6),
      isFreezed: false,
      id: nanoid(),
    };
  };
  const fillBoard = () => {
    const boardSet = [];
    for (let i = 0; i < 10; i++) {
      boardSet.push(generateNewDie());
    }
    return boardSet;
  };
  //state
  const [board, setBoard] = useState(() => fillBoard());
  const [tenzies, setTenzies] = useState(false);

  //declare Winner
  useEffect(() => {
    const allFreezed = board.every((dice) => dice.isFreezed);
    const firstValue = board[0].value;
    const allSameValue = board.every((dice) => dice.value === firstValue);
    if (allFreezed && allSameValue) {
      setTenzies(true);
    }
  }, [board]);

  const freezeDice = (id) => {
    setBoard((prev) => {
      return prev.map((dice) => {
        return dice.id === id ? { ...dice, isFreezed: !dice.isFreezed } : dice;
      });
    });
  };
  const dice = board.map((dice) => {
    return (
      <Dice
        key={dice.id}
        value={dice.value}
        isFreezed={dice.isFreezed}
        freezeDice={() => freezeDice(dice.id)}
      />
    );
  });
  const rollDice = () => {
    // check which dies are freezed
    if (tenzies) {
      setBoard(() => fillBoard());
      setTenzies(false);
    } else {
      setBoard((prevBoard) => {
        return prevBoard.map((dice) => {
          return dice.isFreezed ? dice : generateNewDie();
        });
      });
    }
  };
  return (
    <main>
      <div className="dice-container">{dice}</div>

      <button className="btn" onClick={rollDice}>
        {tenzies ? "Reset game" : "Roll!"}
      </button>
      {tenzies && <Confetti />}
    </main>
  );
}
