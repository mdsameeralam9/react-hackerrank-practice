import React, { useCallback, useMemo, useState } from "react";

const INITIAL = {
  readability: { key: "readability", label: "Readability", upvote: 0, downvote: 0 },
  performance: { key: "performance", label: "Performance", upvote: 0, downvote: 0 },
  security: { key: "security", label: "Security", upvote: 0, downvote: 0 },
  documentation: { key: "documentation", label: "Documentation", upvote: 0, downvote: 0 },
  testing: { key: "testing", label: "Testing", upvote: 0, downvote: 0 },
};

const KEYS = ["readability", "performance", "security", "documentation", "testing"];

export default function FeedbackSystem() {
  const [state, setState] = useState(INITIAL);

  const update = useCallback((k, isUp) => {
    setState((prev) => {
      const item = prev[k];
      const next = isUp
        ? { ...item, upvote: item.upvote + 1 }
        : { ...item, downvote: item.downvote + 1 };
      return { ...prev, [k]: next };
    });
  }, []);

  const items = useMemo(() => KEYS.map((k) => state[k]), [state]);

  return (
    <div className="my-0 mx-auto text-center w-mx-1200">
      <div className="flex wrap justify-content-center mt-30 gap-30">
        {items.map((item, index) => (
          <div className="pa-10 w-300 card" key={item.key} style={{border: "1px solid"}}>
            <h2>{item.label}</h2>
            <div className="flex my-30 mx-0 justify-content-around">
              <button
              style={{border: "1px solid"}}
                className="py-10 px-15"
                data-testid={`upvote-btn-${index}`}
                onClick={() => update(item.key, true)}
              >
                👍 Upvote
              </button>
              <button
              style={{border: "1px solid"}}
                className="py-10 px-15 danger"
                data-testid={`downvote-btn-${index}`}
                onClick={() => update(item.key, false)}
              >
                👎 Downvote
              </button>
            </div>
            <p className="my-10 mx-0" data-testid={`upvote-count-${index}`}>
              Upvotes: <strong>{item.upvote}</strong>
            </p>
            <p className="my-10 mx-0" data-testid={`downvote-count-${index}`}>
              Downvotes: <strong>{item.downvote}</strong>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
