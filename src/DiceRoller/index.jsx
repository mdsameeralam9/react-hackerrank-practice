import { useState } from 'react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';

function DiceRoller2() {
  const [dice, setDice] = useState([1]);
  const [numDice, setNumDice] = useState(1);
  const [rolling, setRolling] = useState(false);
  const [history, setHistory] = useState([{rolls: [], total: 0, timestamp: Date}]);

  const diceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

  const rollDice = () => {
    setRolling(true);

    const rollInterval = setInterval(() => {
      const newRolls = Array.from({ length: numDice }, () =>
        Math.floor(Math.random() * 6) + 1
      );
      setDice(newRolls);
    }, 100);

    setTimeout(() => {
      clearInterval(rollInterval);
      const finalRolls = Array.from({ length: numDice }, () =>
        Math.floor(Math.random() * 6) + 1
      );
      setDice(finalRolls);
      setRolling(false);

      setHistory(prev => [{
        rolls: finalRolls,
        total: finalRolls.reduce((a, b) => a + b, 0),
        timestamp: new Date()
      }, ...prev].slice(0, 10));
    }, 600);
  };

  const total = dice.reduce((sum, die) => sum + die, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">Dice Roller</h1>
          <p className="text-slate-400 text-lg">Roll the dice and test your luck</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 mb-6">
          <div className="mb-8">
            <label className="block text-white text-sm font-medium mb-3">
              Number of Dice: {numDice}
            </label>
            <input
              type="range"
              min="1"
              max="6"
              value={numDice}
              onChange={(e) => {
                const newNum = parseInt(e.target.value);
                setNumDice(newNum);
                setDice(Array(newNum).fill(1));
              }}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
              disabled={rolling}
            />
            <div className="flex justify-between text-slate-400 text-xs mt-2">
              {[1, 2, 3, 4, 5, 6].map(n => (
                <span key={n}>{n}</span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-6 justify-center mb-8 min-h-[120px] items-center">
            {dice.map((value, index) => {
              const DiceIcon = diceIcons[value - 1];
              return (
                <div
                  key={index}
                  className={`transform transition-all duration-300 ${
                    rolling ? 'animate-bounce' : 'hover:scale-110'
                  }`}
                >
                  <DiceIcon
                    size={80}
                    className="text-white drop-shadow-lg"
                    strokeWidth={1.5}
                  />
                </div>
              );
            })}
          </div>

          <div className="text-center mb-8">
            <div className="text-slate-400 text-sm mb-1">Total</div>
            <div className="text-6xl font-bold text-white">{total}</div>
          </div>

          <button
            onClick={rollDice}
            disabled={rolling}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
          >
            {rolling ? 'Rolling...' : 'Roll Dice'}
          </button>
        </div>

        {history.length > 0 && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4">Roll History</h2>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {history.map((entry, index) => (
                <div
                  key={index}
                  className="bg-white/5 rounded-lg p-4 flex items-center justify-between hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      {entry.rolls.map((roll, i) => {
                        const DiceIcon = diceIcons[roll - 1];
                        return (
                          <DiceIcon
                            key={i}
                            size={24}
                            className="text-slate-300"
                            strokeWidth={1.5}
                          />
                        );
                      })}
                    </div>
                    <div className="text-slate-400 text-sm">
                      {entry.rolls.join(' + ')}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold text-lg">
                      {entry.total}
                    </div>
                    <div className="text-slate-500 text-xs">
                      {entry.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DiceRoller2;
