import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

const HPlant = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" {...props}>
    <Path
      d="m508.74,355.81s-44.44-156.64-262.45-145.31c-7.72.4-13.1,7.79-11.27,15.3,10.99,45.01,60.52,178.69,257.77,148.25l15.96-18.23Z"
      fill="#277252"
    />
    <Path
      d="m479.11,345.17s24.99-166.38,235.59-180.01c10.69-.69,19.03,9.13,16.76,19.59-13.22,60.86-67.82,233.54-255.39,179.41l3.04-18.99Z"
      fill="#277252"
    />
    <Rect
      x="468.47"
      y="349.73"
      width="40.27"
      height="123.09"
      rx="20.13"
      ry="20.13"
      fill="#277252"
    />
  </Svg>
);

export default HPlant;
