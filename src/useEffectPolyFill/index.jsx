import React, {useState, useEffect} from "react";
import { useEffectCustom } from "./useEffectCustom"

const MyCustomUseEffect = () => {
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    console.log("useEffect called");

    return () => {
      console.log("useEffect cleanup called")
    }
  }, [counter])

  useEffectCustom(() => {
    console.log("useEffectCustom called");

    return () => {
      console.log("useEffectCustom cleanup called")
    }
  }, [counter])

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
