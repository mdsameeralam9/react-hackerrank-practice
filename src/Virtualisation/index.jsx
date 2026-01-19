import { useState } from "react";

const ROW_HEIGHT = 40;
const CONTAINER_HEIGHT = 300;
const OVERSCAN = 5;

const getItems = () =>
  [...Array(10000).keys()].map((i, index) => `item ${i}`) || [];

export default function Vitualisation({ items=getItems() }) {
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = items.length * ROW_HEIGHT;

  const startIndex = Math.max(
    0,
    Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN
  );

  const visibleCount =
    Math.ceil(CONTAINER_HEIGHT / ROW_HEIGHT) + OVERSCAN * 2;

  const endIndex = Math.min(
    items.length - 1,
    startIndex + visibleCount - 1
  );

  const visibleItems = items.slice(startIndex, endIndex + 1);

  return (
    <div
      style={{
        height: CONTAINER_HEIGHT,
        overflowY: "auto",
        border: "1px solid #ccc"
      }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      {/* Full height placeholder */}
      <div style={{ height: totalHeight, position: "relative" }}>
        {/* Translated wrapper */}
        <div
          style={{
            transform: `translateY(${startIndex * ROW_HEIGHT}px)`
          }}
        >
          {visibleItems.map((item, index) => (
            <div
              key={startIndex + index}
              style={{
                height: ROW_HEIGHT,
                padding: "8px",
                borderBottom: "1px solid #eee",
                boxSizing: "border-box"
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
