import React from 'react';
import Svg, { Path, Ellipse } from 'react-native-svg';

const HCap = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" {...props}>
    <Path
      fill="#0270ed"  // Directly using color for cls-2
      d="m704.63,525.8s217.67,19.37,170.94,126.5c-46.72,107.12-379.49-49-379.49-49l208.55-77.49Z"
    />
    <Path
      fill="#f44d19"  // Directly using color for cls-3
      d="m751.36,559.99c-245.02,129.92-459.27,0-459.27,0,0,0,5.7-238.18,229.63-238.18s229.63,238.18,229.63,238.18Z"
    />
    <Path
      fill="#fedd3a"  // Directly using color for cls-1
      d="m418.84,606.44c60.93,13.16,139.56,18.41,226.32-4.61-12.49-130.35-69.2-230.93-101.85-279.24-6.97-.51-14.15-.79-21.59-.79-6.49,0-12.78.22-18.91.61-28.12,54.5-81.19,171.65-83.97,284.03Z"
    />
    <Ellipse
      fill="#0270ed"  // Directly using color for cls-2
      cx="519.97"
      cy="326.37"
      rx="30.58"
      ry="26.21"
    />
  </Svg>
);

export default HCap;
