import React, { useMemo, useRef, useState, useEffect } from "react";

const ITEM_HEIGHT = 32; // px
const CONTAINER_HEIGHT = 400; // px
const OVERSCAN = 5;

function Virtualisation() {
  const count = 10000;
  const data = useMemo(
    () => Array.from({ length: count }, (_, i) => i + 1),
    [count]
  );

  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = count * ITEM_HEIGHT;
  const visibleCount = Math.ceil(CONTAINER_HEIGHT / ITEM_HEIGHT);

  const rawStart = Math.floor(scrollTop / ITEM_HEIGHT);
  const startIndex = Math.max(0, rawStart - OVERSCAN);
  const endIndex = Math.min(count - 1, rawStart + visibleCount + OVERSCAN);
  const offsetY = startIndex * ITEM_HEIGHT;

  const visibleItems = useMemo(
    () => data.slice(startIndex, endIndex + 1),
    [data, startIndex, endIndex]
  );

  const onScroll = (e) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  useEffect(() => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      onScroll={onScroll}
      style={{
        height: CONTAINER_HEIGHT,
        overflowY: "auto",
        border: "1px solid #ccc",
        position: "relative",
      }}
    >
      {/* Spacer to create full scroll range */}
      <div style={{ height: totalHeight, position: "relative" }}>
        {/* Visible slice positioned into place */}
        <ul
          style={{
            margin: 0,
            padding: 0,
            listStyle: "none",
            transform: `translateY(${offsetY}px)`,
          }}
        >
          {visibleItems.map((val, i) => {
            const index = startIndex + i;
            return (
              <li
                key={index}
                style={{
                  height: ITEM_HEIGHT,
                  lineHeight: `${ITEM_HEIGHT}px`,
                  borderBottom: "1px solid #eee",
                  padding: "0 8px",
                }}
              >
                {val}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Virtualisation;
