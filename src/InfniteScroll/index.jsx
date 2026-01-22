import React, { useState, useEffect, useRef } from "react";

const InfniteScrolling = () => {
  const [listData, setListData] = useState([]);
  const [page, setPage] = useState(1);
  const lastElement = useRef(null);

  useEffect(() => {
    const generateData = () =>
      Array.from({ length: "10" }, (_, i) => `Itme ${i + Date.now()}`);

    setListData((p) => [...p, ...generateData()]);
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const isIsIntersecting = entries[0]?.isIntersecting;
        if (isIsIntersecting) {
          setPage((p) => p + 1);
        }
      },
      { threshold: 1, rootMargin: "-10px" },
    );

    if (lastElement.current) observer.observe(lastElement.current);

    return () => observer.disconnect();
  }, []);

  const listWrapperStyle = {
    width: "350px",
    height: "400px",
    overflowY: "auto",
    border: "1px solid",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  };

  return (
    <div style={{ margin: "1rem" }}>
      <h1>InfniteScrolling List</h1>
      <div className="listWrapper" style={listWrapperStyle}>
        {listData.map((item) => (
          <p key={item} style={{ background: "lightBlue", padding: "1rem" }}>
            {item}
          </p>
        ))}
        <h1 style={{ textAlign: "center" }} ref={lastElement}>
          Loading...
        </h1>
      </div>
    </div>
  );
};

export default InfniteScrolling;
