import React from 'react';
import Svg, { Path, Rect, Circle } from 'react-native-svg';

const HBanana = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" {...props}>
    <Path
      fill="#ffe44d"  // Directly using color for cls-3
      d="m420.24,398.43s-14.18-181.08,20.77-173.48c0,0,33.43-21.27,53.94,38.75s39.51,120.81,39.51,120.81c0,0,72.18,30.39,97.25,61.54,25.07,31.15,66.1,81.04,48.88,91.68,0,0-16.21,33.43-86.62-66.86,0,0-27.35-18.74-42.55-21.27,0,0,25.33,32.42,25.33,43.05,0,0,19.25,73.45-4.05,75.98-23.3,2.53-43.05-64.83-43.05-64.83,0,0-33.94-44.07-54.7-58.76-20.77-14.69-128.66,48.12-128.66,48.12,0,0-33.94,12.16-29.88-18.23,4.05-30.39,103.84-76.48,103.84-76.48Z"
    />
    <Rect
      fill="#755019"  // Directly using color for cls-1
      x="435.61"
      y="196.83"
      width="22.29"
      height="37.99"
      rx="11.14"
      ry="11.14"
      transform="translate(-13.08 29.49) rotate(-3.73)"
    />
    <Path
      fill="none"
      stroke="#755019"  // Directly using color for cls-2
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="12"
      d="m471.96,274.15s15.7,26.85,16.21,65.85"
    />
    <Circle
      fill="#755019"  // Directly using color for cls-1
      cx="495.19"
      cy="370.37"
      r="9.19"
    />
  </Svg>
);

export default HBanana;
