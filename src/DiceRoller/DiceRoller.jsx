import { useState } from "react";
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "lucide-react";
import "./style.css";

const DiceRoller = () => {
  const [dice, setDice] = useState([]);
  const [numberOfDice, setNumberOfDice] = useState(1);
  const diceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

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

      <div className="history">
        <h2>Roll History</h2>
        <div className="hisList">
          {[1, 2, 3].map((i) => (
            <div className="card">
              <span>1</span>
              <span>2</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiceRoller;
