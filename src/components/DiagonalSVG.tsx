import React from "react";

const LongDivisionSVG: React.FC = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 100 40"
    style={{
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: 1,
    }}
    aria-hidden="true"
    focusable="false"
  >
    {/* Horizontal line */}
    <line x1="0" y1="15" x2="80" y2="15" stroke="#000" strokeWidth="2" />
    {/* Right parenthesis */}
    <path 
      d="M 85 5 Q 95 5 95 15 Q 95 25 85 25" 
      stroke="#000" 
      strokeWidth="2" 
      fill="none"
    />
  </svg>
);

export default LongDivisionSVG;
