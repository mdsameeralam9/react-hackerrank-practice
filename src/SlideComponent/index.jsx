import React, { useState, useCallback, useMemo } from "react";
import Slides from './Slides';
import { SLIDES_DATA } from "./constants";

const slidesLength = SLIDES_DATA.length;
function App() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlide = useCallback((actionType = "") => {
    setActiveIndex(p => {
      if (actionType === "next") {
        return p + 1
      } else if (actionType === "prev") {
        return p - 1
      } else {
        return 0
      }
    })
  }, []);

  const currentSlideData = useMemo(() => {
    return SLIDES_DATA[activeIndex]
  }, [activeIndex])


  return (
    <>
      <div className="App">
        <Slides slides={currentSlideData}
          handleSlide={handleSlide}
          activeIndex={activeIndex}
          slidesLength={slidesLength}
        />
      </div>
    </>
  );
}

export default App;
