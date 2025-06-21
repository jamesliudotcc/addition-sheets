import React from 'react';

interface LatticeSVGProps {
  cellSize?: number;
  strokeWidth?: number;
  strokeColor?: string;
}

const LatticeSVG: React.FC<LatticeSVGProps> = ({
  cellSize = 60,
  strokeWidth = 2,
  strokeColor = '#000'
}) => {
  // Use the full SVG area
  const width = 300;
  const height = 300;
  const gridWidth = width;
  const gridHeight = height;
  const cellWidth = gridWidth / 3;
  const cellHeight = gridHeight / 3;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      style={{
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
      aria-hidden="true"
      focusable="false"
    >
      {/* Vertical lines */}
      {[0, 1, 2, 3].map((col) => (
        <line
          key={`v-${col}`}
          x1={col * cellWidth}
          y1={0}
          x2={col * cellWidth}
          y2={gridHeight}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      ))}

      {/* Horizontal lines */}
      {[0, 1, 2, 3].map((row) => (
        <line
          key={`h-${row}`}
          x1={0}
          y1={row * cellHeight}
          x2={gridWidth}
          y2={row * cellHeight}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      ))}

      {/* Diagonal lines for lattice multiplication - only NE to SW */}
      {/* Top row diagonals */}
      {[0, 1, 2].map((diag) => (
        <line
          key={`diag-top-${diag}`}
          x1={(diag + 1) * cellWidth}
          y1={0}
          x2={diag * cellWidth}
          y2={cellHeight}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      ))}

      {/* Middle row diagonals */}
      {[0, 1, 2].map((diag) => (
        <line
          key={`diag-middle-${diag}`}
          x1={(diag + 1) * cellWidth}
          y1={cellHeight}
          x2={diag * cellWidth}
          y2={2 * cellHeight}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      ))}

      {/* Bottom row diagonals */}
      {[0, 1, 2].map((diag) => (
        <line
          key={`diag-bottom-${diag}`}
          x1={(diag + 1) * cellWidth}
          y1={2 * cellHeight}
          x2={diag * cellWidth}
          y2={3 * cellHeight}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      ))}
    </svg>
  );
};

export default LatticeSVG; 