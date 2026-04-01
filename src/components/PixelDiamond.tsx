'use client';

/**
 * Pixelated diamond logo built on an 8x8 grid.
 * Each "pixel" is a rect; colors use the app's cyan/blue palette.
 */
export function PixelDiamond({ size = 32 }: { size?: number }) {
  // 8x8 pixel grid - each cell is 1 unit
  // 0 = empty, 1 = highlight (light cyan), 2 = mid, 3 = dark/shadow
  const grid = [
    [0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 2, 1, 0, 0],
    [0, 1, 1, 2, 2, 2, 1, 0],
    [1, 1, 2, 2, 3, 2, 2, 1],
    [1, 2, 2, 3, 3, 3, 2, 1],
    [0, 1, 2, 2, 3, 2, 1, 0],
    [0, 0, 1, 2, 2, 1, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0],
  ];

  const colors: Record<number, string> = {
    1: '#67e8f9', // light cyan
    2: '#22d3ee', // cyan
    3: '#0891b2', // dark cyan / shadow
  };

  const cellSize = size / 8;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 8 8"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
    >
      {grid.map((row, y) =>
        row.map((cell, x) =>
          cell > 0 ? (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={1}
              height={1}
              fill={colors[cell]}
            />
          ) : null
        )
      )}
    </svg>
  );
}
