import React, { useState, useRef, useEffect } from "react";

const LIMIT = 3; // max bars running in parallel

const ProgressBar = ({ value }) => (
  <div
    style={{
      border: "2px solid #000",
      height: 18,
      margin: "6px 0",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        height: "100%",
        width: `${value}%`,
        background: "pink",
        transition: "width 120ms linear",
      }}
    />
  </div>
);

const ProgressPattern = () => {
  // bars: [] at start → no UI bars
  const [bars, setBars] = useState([]); // {id, progress, status: 'waiting'|'running'|'done'}
  const timersRef = useRef({});

  // scheduler: ensures at most LIMIT bars are "running"
  const schedule = () => {
    setBars((prev) => {
      const running = prev.filter((b) => b.status === "running").length;
      if (running >= LIMIT) return prev;

      const idx = prev.findIndex((b) => b.status === "waiting");
      if (idx === -1) return prev;

      const copy = prev.map((b, i) =>
        i === idx ? { ...b, status: "running" } : b
      );

      const id = copy[idx].id;

      // simulate work
      const intervalId = setInterval(() => {
        setBars((curr) => {
          const next = [...curr];
          const barIndex = next.findIndex((b) => b.id === id);
          if (barIndex === -1) return curr;

          const bar = next[barIndex];
          if (bar.status !== "running") return curr;

          const inc = Math.random() * 10 + 5;
          const value = Math.min(100, bar.progress + inc);

          next[barIndex] = { ...bar, progress: value };

          if (value === 100) {
            next[barIndex] = { ...next[barIndex], status: "done" };
            clearInterval(timersRef.current[id]);
            delete timersRef.current[id];
            // when one finishes, try to start next waiting bar
            setTimeout(schedule, 0);
          }
          return next;
        });
      }, 150);

      timersRef.current[id] = intervalId;
      return copy;
    });
  };

  const handleClick = () => {
    const id = Date.now() + Math.random();
    setBars((prev) => [...prev, { id, progress: 0, status: "waiting" }]);
    // after adding, try to start it if we’re under the limit
    setTimeout(schedule, 0);
  };

  const handleReset = () => {
    Object.values(timersRef.current).forEach(clearInterval);
    timersRef.current = {};
    setBars([]); // back to “no progress bars”
  };

  // cleanup on unmount
  useEffect(
    () => () => {
      Object.values(timersRef.current).forEach(clearInterval);
    },
    []
  );

  const runningCount = bars.filter((b) => b.status === "running").length;

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button
          onClick={handleClick}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            cursor: "pointer",
            borderRadius: 4,
          }}
        >
          Click Me
        </button>
        <button
          onClick={handleReset}
          style={{
            background: "#ef4444",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            cursor: "pointer",
            borderRadius: 4,
          }}
        >
          Reset
        </button>

        <span>Limit - {LIMIT}</span>
        <span>Running: {runningCount}</span>
      </div>

      <div style={{ marginTop: 16 }}>
        {bars.map((bar) => (
          <ProgressBar key={bar.id} value={bar.progress} />
        ))}
      </div>
    </div>
  );
};

export default ProgressPattern;
