import React, {useState} from "react";

const MyCustomUseEffect = () => {
  const [counter, setCounter] = useState(1);
  return (
    <div>
      <h1>MyCustomUseEffect</h1>
      <button
        className="px-3 py-1 cursor-pointer"
        onClick={() => setCounter((p) => p + 1)}
      >
        Increment: {counter}
      </button>
    </div>
  );
};

export default MyCustomUseEffect;
