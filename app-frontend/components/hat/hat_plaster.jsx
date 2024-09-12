import React from 'react';
import Svg, { Path, Polygon, Circle } from 'react-native-svg';

const HPlaster = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" {...props}>
    <Path
      d="m504.07,531.89s45.08-54.91,177.03,50.82c0,0,96.99,70.21,67.48,109.55-29.51,39.34-87.29-16.55-99.45-26.23-14.16-11.27-79.09-51.36-120.21-60.65-38.51-8.7-46.99-56.28-24.86-73.49Z"
      fill="#e1be6a"
    />
    <Polygon
      points="577.75 600.74 605.7 555.66 683.16 608.12 652.42 645.82 577.75 600.74"
      fill="#a86e24"
    />
    <Circle cx="527.74" cy="554.23" r="8.81" fill="#a86e24" />
    <Circle cx="567.39" cy="555.66" r="8.81" fill="#a86e24" />
    <Circle cx="549.77" cy="583.32" r="8.81" fill="#a86e24" />
    <Circle cx="686.03" cy="643.77" r="8.81" fill="#a86e24" />
    <Circle cx="719.02" cy="657.91" r="8.81" fill="#a86e24" />
    <Circle cx="697.22" cy="677.17" r="8.81" fill="#a86e24" />
  </Svg>
);

export default HPlaster;
