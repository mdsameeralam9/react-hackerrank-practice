import React, { useState } from "react";
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "lucide-react";
import "./style.css";

const DiceRoller = () => {
  const [dice, setDice] = useState([]);
  const [numberOfDice, setNumberOfDice] = useState(1);
  const [historyDice, setHistoryDice] = useState([]);
  const diceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];
  const diceValue = {
    '0': 1,
    '1': 2,
    '2': 3,
    '3': 4,
    '4': 5,
    '5': 6,
  };

  const rollDice = () => {
    let randomIndex = 0;
    let count = 0;
    let arr = [];
    while (count < numberOfDice) {
      randomIndex = Math.floor(Math.random() * 6);
      arr.push(randomIndex);
      count++;
    }
    setDice(arr);
    setHistoryDice((p) => [...p, { value: arr.reduce((t, c) => t + diceValue[String(c)], 0)}]);
  };

  return (
    <div className="diceGameWrapper">
      <div className="Slider">
        <input
          type="range"
          min="1"
          max="6"
          className="w-full h-2 rounded-lg cursor-pointer slider"
          value={numberOfDice}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            setNumberOfDice(val);
            setDice(Array(val).fill(0));
          }}
        />
        <div className="flex justify-between text-slate-400 text-xs mt-2">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <span key={n}>{n}</span>
          ))}
        </div>
      </div>

      <div className="diceWrapper">
        {[...Array(numberOfDice)].map((_, index) => {
          const idx = dice[index] ?? 0;
          const DiceIcon = diceIcons[idx];
          return (
            <DiceIcon
              size={80}
              className="text-white drop-shadow-lg"
              strokeWidth={1.5}
              key={index}
            />
          );
        })}
      </div>

      <div className="btnwrap">
        <button onClick={rollDice}>Roll Dice</button>
      </div>

      {historyDice.length > 0 && (
        <div className="history">
          <h2>Roll History</h2>
          <div className="hisList">
            {historyDice.map((val, i) => (
              <div className="card">
                <span>{i + 1}</span>
                <span>{val.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiceRoller;
