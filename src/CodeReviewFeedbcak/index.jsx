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
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Code Review Feedback</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div className="bg-white border border-gray-200 rounded-lg p-6" key={item.key}>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">{item.label}</h2>
            
            <div className="flex justify-center gap-3 mb-4">
              <button
                className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                data-testid={`upvote-btn-${index}`}
                onClick={() => update(item.key, true)}
              >
                👍 Upvote
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                data-testid={`downvote-btn-${index}`}
                onClick={() => update(item.key, false)}
              >
                👎 Downvote
              </button>
            </div>
            
            <div className="space-y-2 text-center text-sm">
              <p className="text-gray-600" data-testid={`upvote-count-${index}`}>
                Upvotes: <span className="font-semibold text-green-600">{item.upvote}</span>
              </p>
              <p className="text-gray-600" data-testid={`downvote-count-${index}`}>
                Downvotes: <span className="font-semibold text-red-600">{item.downvote}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
