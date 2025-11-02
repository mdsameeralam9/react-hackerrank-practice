// src/Game.jsx
import React from "react";

const WORD_LENGTH = 5;
const MAX_TURNS = 6;

function evaluateGuess(guess, solution) {
  const res = Array(WORD_LENGTH).fill("gray");
  const solChars = solution.split("");
  const used = Array(WORD_LENGTH).fill(false);

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guess[i] === solution[i]) {
      res[i] = "green";
      used[i] = true;
    }
  }

  const counts = {};
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (!used[i]) {
      const ch = solChars[i];
      counts[ch] = (counts[ch] || 0) + 1;
    }
  }

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (res[i] === "green") continue;
    const ch = guess[i];
    if (counts[ch] > 0) {
      res[i] = "yellow";
      counts[ch] -= 1;
    } else {
      res[i] = "gray";
    }
  }
  return res;
}

function useKeyboard(onKey) {
  React.useEffect(() => {
    const handler = (e) => {
      const key = e.key;
      if (/^[a-z]$/i.test(key)) onKey(key.toUpperCase());
      else if (key === "Backspace") onKey("BACKSPACE");
      else if (key === "Enter") onKey("ENTER");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onKey]);
}

function Tile({ letter, status }) {
  const base =
    "flex h-14 w-14 items-center justify-center rounded-md border text-2xl font-bold uppercase select-none transition-colors duration-200";
  const byStatus = {
    empty:
      "border-gray-300 text-gray-900 dark:border-gray-700 dark:text-gray-100",
    tbd: "border-gray-400 text-gray-900 dark:border-gray-600 dark:text-gray-100",
    gray: "bg-gray-300 border-gray-300 text-gray-800 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-200",
    yellow: "bg-yellow-400 border-yellow-400 text-yellow-900",
    green: "bg-green-500 border-green-500 text-white",
  }[status || "empty"];
  return <div className={`${base} ${byStatus}`}>{letter}</div>;
}

function Row({ value, statuses = [] }) {
  const cells = Array.from({ length: WORD_LENGTH }, (_, i) => ({
    ch: value[i] || "",
    status: statuses[i] || (value[i] ? "tbd" : "empty"),
  }));
  return (
    <div className="grid grid-cols-5 gap-2">
      {cells.map((c, i) => (
        <Tile key={i} letter={c.ch} status={c.status} />
      ))}
    </div>
  );
}

function Keyboard({ onKey, keyStatuses }) {
  const rows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
  const keyBase =
    "min-w-8 h-12 px-3 rounded-md text-sm font-semibold uppercase flex items-center justify-center transition-colors duration-150";
  const statusClass = (k) =>
    ({
      green: "bg-green-600 text-white",
      yellow: "bg-yellow-500 text-white",
      gray: "bg-gray-400 text-white dark:bg-gray-600",
      undefined:
        "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100",
    }[keyStatuses[k]]);

  return (
    <div className=" mt-6 space-y-2">
      <div className="flex justify-center gap-1">
        {rows[0].split("").map((k) => (
          <button
            key={k}
            className={`${keyBase} ${statusClass(k)}`}
            onClick={() => onKey(k)}
          >
            {k}
          </button>
        ))}
      </div>
      <div className="flex justify-center gap-1">
        {rows[1].split("").map((k) => (
          <button
            key={k}
            className={`${keyBase} ${statusClass(k)}`}
            onClick={() => onKey(k)}
          >
            {k}
          </button>
        ))}
      </div>
      <div className="flex justify-center gap-1">
        <button
          className={`${keyBase} ${"bg-gray-300 dark:bg-gray-700 dark:text-gray-100"} px-4`}
          onClick={() => onKey("ENTER")}
        >
          Enter
        </button>
        {rows[2].split("").map((k) => (
          <button
            key={k}
            className={`${keyBase} ${statusClass(k)}`}
            onClick={() => onKey(k)}
          >
            {k}
          </button>
        ))}
        <button
          className={`${keyBase} ${"bg-gray-300 dark:bg-gray-700 dark:text-gray-100"} px-4`}
          onClick={() => onKey("BACKSPACE")}
        >
          ⌫
        </button>
      </div>
    </div>
  );
}

export default function Game({
  solution = "REACT",
  dictionary = new Set(["REACT", "TRACE", "CRATE", "TEACH", "REBEL"]),
}) {
  const [guesses, setGuesses] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [current, setCurrent] = React.useState("");
  const [keyStatuses, setKeyStatuses] = React.useState({});
  const [status, setStatus] = React.useState("IN_PROGRESS");

  const updateKeys = (guess, evals) => {
    setKeyStatuses((prev) => {
      const next = { ...prev };
      const rank = { gray: 0, yellow: 1, green: 2 };
      for (let i = 0; i < WORD_LENGTH; i++) {
        const k = guess[i];
        const s = evals[i];
        const prevRank = rank[next[k]] ?? -1;
        if (rank[s] > prevRank) next[k] = s;
      }
      return next;
    });
  };

  const submit = () => {
    if (current.length !== WORD_LENGTH) return;
    if (!dictionary.has(current)) return;
    const evals = evaluateGuess(current, solution);
    setGuesses((g) => [...g, current]);
    setRows((r) => [...r, evals]);
    updateKeys(current, evals);
    setCurrent("");
    if (current === solution) setStatus("WON");
    else if (guesses.length + 1 >= MAX_TURNS) setStatus("LOST");
  };

  const onKey = React.useCallback(
    (k) => {
      if (status !== "IN_PROGRESS") return;
      if (k === "ENTER") submit();
      else if (k === "BACKSPACE") setCurrent((c) => c.slice(0, -1));
      else if (/^[A-Z]$/.test(k))
        setCurrent((c) => (c.length < WORD_LENGTH ? c + k : c));
    },
    [status, current]
  );

  useKeyboard(onKey);

  const boardRows = [];
  for (let i = 0; i < MAX_TURNS; i++) {
    if (i < rows.length) {
      boardRows.push(<Row key={i} value={guesses[i]} statuses={rows[i]} />);
    } else if (i === rows.length) {
      boardRows.push(<Row key={i} value={current} />);
    } else {
      boardRows.push(<Row key={i} value="" />);
    }
  }

  return (
    <div
      style={{ width: "500px" }}
      className="max-mx-auto flex min-h-screen flex-col items-center bg-white px-4 py-8 text-gray-900 dark:bg-gray-900 dark:text-gray-100 max-w-[70%]"
    >
      <h1 className="mb-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Wordle (React)
      </h1>

      <div
        style={{ width: "400px !important" }}
        className="grid  max-w-md grid-rows-6 gap-2"
      >
        {boardRows}
      </div>

      <div className="wrap w-[350px]" style={{ width: "400px !important" }}>
        <Keyboard onKey={onKey} keyStatuses={keyStatuses} />
      </div>

      {status !== "IN_PROGRESS" && (
        <div className="mt-6 rounded-md bg-gray-100 px-4 py-2 text-center text-sm font-semibold text-gray-800 dark:bg-gray-800 dark:text-gray-100">
          {status === "WON" ? "You won!" : `Answer: ${solution}`}
        </div>
      )}
    </div>
  );
}
