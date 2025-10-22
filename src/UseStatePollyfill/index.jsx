import React from 'react'
import { useMyState } from "./useMyState";

function CounterWithMyUseState() {
  const [count, setCount] = useMyState(0);
  const [on, setOn] = useMyState(false);
  const [score, setScore] = useMyState(0);

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <button onClick={() => setCount(c => c + 1)}>
        Count: {count}
      </button>

       <button onClick={() => setScore(c => c + 1)}>
        score: {score}
      </button>
      <label>
        <input
          type="checkbox"
          checked={on}
          onChange={e => setOn(e.target.checked)}
        />
        {String(on)}
      </label>
    </div>
  );
}


export default CounterWithMyUseState