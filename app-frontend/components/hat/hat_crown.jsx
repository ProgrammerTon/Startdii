import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

const HCrown = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" {...props}>
    <Path
      fill="#ffca22" // Directly using color for cls-1
      d="m408.39,405.08l-98.64-32.07c-13.68-4.45-25.72,10.18-18.72,22.75l84.09,150.94h231.34l83.31-149.96c6.94-12.5-4.93-27.06-18.57-22.78l-100.06,31.43-68.07-104.41c-6.07-9.31-19.68-9.35-25.81-.08l-68.87,104.19Z"
    />
    <Circle
      fill="#ffca22" // Directly using color for cls-1
      cx="490.22"
      cy="243.24"
      r="33.62"
    />
    <Circle
      fill="#ffca22" // Directly using color for cls-1
      cx="725.7"
      cy="345.7"
      r="33.62"
    />
    <Circle
      fill="#ffca22" // Directly using color for cls-1
      cx="253.15"
      cy="345.7"
      r="33.62"
    />
  </Svg>
);

export default HCrown;
