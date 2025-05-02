import React from "react";

const DiagonalSVG: React.FC = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 32 32"
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
    <line x1="0" y1="32" x2="32" y2="0" stroke="#888" strokeWidth="1" strokeDasharray="2,2" />
  </svg>
);

export default DiagonalSVG;
