import React from 'react';

export default function Helix({ offset = 3, period = 13, size = 50 }) {
  return Array.from(Array(99)).map((_, i) => (
    <div
      key={i}
      className="absolute rainbow-gradient"
      style={{
        left: i * size * 1.8,
        top: `${50 + 30 * Math.sin(((2 * Math.PI) / period) * (i + offset))}%`,
        transform: `translateY(-50%) scale(${Math.abs(
          1 - (((i + offset) % period) / period) * 2
        ) *
          0.4 +
          0.8})`,
        borderRadius: '50%',
        width: size,
        height: size,
        opacity:
          Math.abs(1 - (((i + offset) % period) / period) * 2) * 0.3 + 0.7,
      }}
    />
  ));
}
