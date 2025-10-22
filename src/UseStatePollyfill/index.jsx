import React from 'react'
import useState_Pollyfill from "./useState_Pollyfill";

const CounterWithMyUseState = () => {
  const [count, setCount] = useState_Pollyfill(10);

  return (
    <div>
        <h1>Counter With MyUseState</h1>
        <p>Count: {count}</p>
        <button style={{marginBottom: "10px"}} onClick={() => setCount(p => p+1)}>Increment</button>
        <button onClick={() => setCount(p => p-1)}>Decrement</button>
    </div>
  )
}

export default CounterWithMyUseState