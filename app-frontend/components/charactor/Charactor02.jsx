import React from 'react';
import Svg, { Path, Ellipse, Circle } from 'react-native-svg';

const Char2 = ({color = "#d9d9d9",...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1000 1000"
    {...props}  
  >
    <Path
      fill={color}
      d="m785.45,719.69c-1.61-71.32,3.92-189.33-17.32-279.66-16.58-70.49-47.98-137.2-89.26-183.11-50.7-56.39-126.96-62.98-230.31-53.27-189.1,17.76-226.58,227.12-232.52,373.44-3.34,82.2,0,142.61,0,142.61v7.83c0,40.07,32.25,72.55,72.04,72.55h0c39.79,0,72.04-32.48,72.04-72.55v-7.83s0,8.52,0,8.52c0,39.69,31.95,71.86,71.35,71.86h0c39.41,0,71.35-32.17,71.35-71.86v-8.52s0,8.57,0,8.57c0,39.66,31.93,71.81,71.31,71.81h0c39.38,0,71.31-32.15,71.31-71.81v-8.57,9.64c0,39.03,31.49,70.63,70.24,70.5h0c38.57-.13,69.77-31.66,69.77-70.5v-9.64Z"
    />
    <Ellipse
      fill="#fff"
      cx="448.57"
      cy="461.68"
      rx="54.36"
      ry="75.12"
    />
    <Ellipse
      fill="#151517"
      cx="438.04"
      cy="465.26"
      rx="30.97"
      ry="44.31"
    />
    <Circle
      fill="#fff"
      cx="427.21"
      cy="463.02"
      r="10.54"
    />
    <Ellipse
      fill="#fff"
      cx="578.93"
      cy="461.68"
      rx="54.36"
      ry="75.12"
    />
    <Ellipse
      fill="#151517"
      cx="568.4"
      cy="465.26"
      rx="30.97"
      ry="44.31"
    />
    <Circle
      fill="#fff"
      cx="557.57"
      cy="463.02"
      r="10.54"
    />
  </Svg>
);

export default Char2;
