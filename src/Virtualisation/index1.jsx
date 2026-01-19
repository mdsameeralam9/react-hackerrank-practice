import React, { useState } from "react";

const VirtualList2 = ({ items = {}, rowHeight = 35, height = 400 }) => {
  {
    /**
     
    const [indices, setIndices] = useState([0, Math.floor(height / itemHeight)]);

    const handleScroll = (e) => {
    const { scrollTop } = e.target;
    const newStartIndex = Math.floor(scrollTop / itemHeight);
    const newEndIndex = newStartIndex + Math.floor(height / itemHeight);
    setIndices([newStartIndex, newEndIndex]);
    };
    
    const visibleList = list.slice(indices[0], indices[1] + 1);

    # item style top
    top: (indices[0] + index) * itemHeight,
    
  */
  }
  const [scrollTop, setScrollTop] = useState(0);
  const handleScroll = (e) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  const totalHeight = items.length * rowHeight;
  const visibleCount = Math.ceil(height / rowHeight);
  const startIndex2 = Math.floor(scrollTop / rowHeight);

  const endIndex2 = Math.min(startIndex2 + visibleCount, items.length);
  // const BUFFER = 5  => To prevent blank space and flickering during fast scrolling
  // const endIndex2 = Math.min(startIndex2 + visibleCount, items.length)+BUFFER;

  const containerStyle = {
    // marginTop: "2rem",
    border: "solid 2px red",
    height: `${height}px`,
    overflowY: "auto",
  };

  const innerContainer = {
    height: `${totalHeight}px`,
   // backgroundColor: "lightblue",
   position: "relative",
  };

  const itemStyle = (index) => ({
    height: `${rowHeight}px`,
    // border: "1px solid",
    position: "absolute",
    //top: `${(startIndex2 + index) * rowHeight}px`,
    transform: `translateY(${(startIndex2 + index) * rowHeight}px)`,
    // width: "100%",
  });

  const visibleItmeList = items.slice(startIndex2, endIndex2);

  return (
    <div style={containerStyle} onScroll={handleScroll}>
      <div className="innerContainer" style={innerContainer}>
        {visibleItmeList.map((item, index) => (
          <p style={itemStyle(index)}>{item}</p>
        ))}
      </div>
    </div>
  );
};

export default VirtualList2;
