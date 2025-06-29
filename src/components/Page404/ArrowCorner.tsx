import React from 'react';

type ArrowCornerProps = {
  color?: string;
  size?: number;
};

const ArrowCorner: React.FC<ArrowCornerProps> = ({ color = 'black', size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.5 1.5L12.5 12.5M12.5 12.5H3.5M12.5 12.5V3.5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ArrowCorner;
