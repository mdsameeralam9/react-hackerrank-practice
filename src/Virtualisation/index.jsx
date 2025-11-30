import React, { useMemo, useState } from "react";

const count = 10000;
const ITEM_HEIGHT = 40;
const CONTAINER_HEIGHT = 300;
const Virtualisation = () => {
  const [scrollTp,setScrollTp] = useState(null);
  const [scrollBtn,setScrollBtn] = useState(null);
  const startIndex = 0;
  const endIndex = 10;
  const totalHeight = count * ITEM_HEIGHT;

  // number of Item to display
  const displayItem = Math.floor((CONTAINER_HEIGHT/ITEM_HEIGHT));
  const endInd = scrollTp??0 + (displayItem+1)

  const data = useMemo(() => {
    return [...Array(count).keys()]
      .map((v) => v + 1)
      .slice(scrollTp?? 0, endInd);
  }, [scrollTp]);

  const onScroll = (e) => {
   const val = Math.floor((e.target.scrollTop/ITEM_HEIGHT)); 
   const addBo = Math.ceil((e.target.scrollTop)); 
   setScrollTp(val)
   setScrollBtn(addBo)
   console.log(e.target.scrollTop)
  }


  

  return (
    <div
      onScroll={onScroll}
      style={{
        height: `${CONTAINER_HEIGHT}px`,
        border: "1px solid #ccc",
        overflowY: "auto",
        position: "relative",
      }}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        <ul
        style={{
            margin: 0,
            padding: 0,
            listStyle: "none",
            transform: `translateY(${scrollBtn}px)`,
          }}>
          {data.map((v) => (
            <li style={{ border: "1px solid", height: `${ITEM_HEIGHT}px` }}>
              {v}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Virtualisation;
