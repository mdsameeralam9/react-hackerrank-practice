import { useState, useEffect } from "react";

function random() {
  let count = "";
  for (let i = 0; i < 6; i++) {
    count = count + Math.floor(Math.random() * 10);
  }
  return count;
}

const TimerWithRandom = () => {
  const [second, setSecond] = useState(30);
  const [randomNumber, setRandomNumber] = useState("");

  useEffect(() => {
    if (second === 30) {
      setRandomNumber(random());
    }

    const id = setTimeout(() => {
      setSecond((prev) => (prev === 0 ? 30 : prev - 1));
    }, 1000);
    return () => clearTimeout(id);
  }, [second]);

  const angle = (second / 30) * 360;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        flexDirection: "column",
      }}
    >
      <h1>Timer With Code</h1>
      <div
        className={`countdown`}
        style={{
          width: 160,
          height: 160,
          borderRadius: "50%",
          background: `conic-gradient(${second > 10 ? "#3498db" : "red"} ${angle}deg, #e0e0e0 0deg)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          fontWeight: "bold",
          color: "#333",
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {second}s
        </div>
      </div>
      <div className="code">{randomNumber}</div>
    </div>
  );
};

export default TimerWithRandom;
