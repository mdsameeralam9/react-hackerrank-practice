import { useState, useEffect } from "react";

function DigitalClock() {
  const [time, setTime] = useState(new Date());
  const [separatorVisible, setSeparatorVisible] = useState(true);

  // Combine both intervals into a single useEffect
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      // Toggle visibility on the same tick for perfect synchronization
      setSeparatorVisible((prev) => !prev);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hour1 = Math.floor(hours / 10);
  const hour2 = hours % 10;
  const minute1 = Math.floor(minutes / 10);
  const minute2 = minutes % 10;
  const second1 = Math.floor(seconds / 10);
  const second2 = seconds % 10;

  return (
    <div className="p-4 flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="w-100 flex items-center bg-black rounded-2xl shadow-2xl p-6 sm:p-8 md:p-12 border border-gray-700">
        <Digit value={hour1} />
        <Digit value={hour2} />
        <Separator visible={separatorVisible} />
        <Digit value={minute1} />
        <Digit value={minute2} />
        <Separator visible={separatorVisible} />
        <Digit value={second1} />
        <Digit value={second2} />
      </div>
    </div>
  );
}

export default DigitalClock;

function Digit({ value }) {
  const segmentMap = {
    0: [true, true, true, true, true, true, false],
    1: [false, true, true, false, false, false, false],
    2: [true, true, false, true, true, false, true],
    3: [true, true, true, true, false, false, true],
    4: [false, true, true, false, false, true, true],
    5: [true, false, true, true, false, true, true],
    6: [true, false, true, true, true, true, true],
    7: [true, true, true, false, false, false, false],
    8: [true, true, true, true, true, true, true],
    9: [true, true, true, true, false, true, true],
  };
  const segments = segmentMap[value] || segmentMap[0]; // Fallback to 0 if value is not found

  return (
    <div className="relative w-16 h-24 sm:w-20 sm:h-32 md:w-24 md:h-36">
      <svg viewBox="0 0 100 150" className="w-full h-full">
        {/* Top segment */}
        <path
          d="M 20 10 L 30 5 L 70 5 L 80 10 L 75 15 L 25 15 Z"
          className={`transition-all duration-300 ${
            segments[0] ? "fill-red-500" : "fill-gray-800"
          }`}
        />
        {/* Top-right segment */}
        <path
          d="M 80 10 L 85 15 L 85 60 L 80 70 L 75 65 L 75 20 Z"
          className={`transition-all duration-300 ${
            segments[1] ? "fill-red-500" : "fill-gray-800"
          }`}
        />
        {/* Bottom-right segment */}
        <path
          d="M 80 80 L 85 85 L 85 130 L 80 140 L 75 135 L 75 90 Z"
          className={`transition-all duration-300 ${
            segments[2] ? "fill-red-500" : "fill-gray-800"
          }`}
        />
        {/* Bottom segment */}
        <path
          d="M 20 140 L 30 145 L 70 145 L 80 140 L 75 135 L 25 135 Z"
          className={`transition-all duration-300 ${
            segments[3] ? "fill-red-500" : "fill-gray-800"
          }`}
        />
        {/* Bottom-left segment */}
        <path
          d="M 15 80 L 20 85 L 20 130 L 15 140 L 10 135 L 10 90 Z"
          className={`transition-all duration-300 ${
            segments[4] ? "fill-red-500" : "fill-gray-800"
          }`}
        />
        {/* Top-left segment */}
        <path
          d="M 15 10 L 20 15 L 20 60 L 15 70 L 10 65 L 10 20 Z"
          className={`transition-all duration-300 ${
            segments[5] ? "fill-red-500" : "fill-gray-800"
          }`}
        />
        {/* Middle segment */}
        <path
          d="M 20 70 L 30 75 L 70 75 L 80 70 L 75 65 L 25 65 Z"
          className={`transition-all duration-300 ${
            segments[6] ? "fill-red-500" : "fill-gray-800"
          }`}
        />
      </svg>
    </div>
  );
}

function Separator({ visible }) {
  return (
    <div className="flex flex-col justify-center items-center gap-4 mx-2 sm:mx-3 md:mx-4">
      <div
        className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
          visible ? "bg-red-500" : "bg-gray-800"
        }`}
      />
      <div
        className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
          visible ? "bg-red-500" : "bg-gray-800"
        }`}
      />
    </div>
  );
}
