import React from 'react';
import Svg, { Path, Ellipse } from 'react-native-svg';

const HMagic = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" {...props}>
    <Path
      d="m489.68,246.96l68.62,189.16-215.16,78.05-68.2-187.99c-7.9-21.78-3.9-46.15,10.79-63.7,25.57-30.54,74.54-69.65,152.41-57.9,23.48,3.54,43.32,19.76,51.52,42.37Z"
      fill="#141414"
    />
    <Ellipse
      cx="443.41"
      cy="457.8"
      rx="161.07"
      ry="58.89"
      transform="translate(-129.54 178.67) rotate(-19.94)"
      fill="#141414"
    />
    <Path
      d="m534.21,369.7c-95.03,86.96-184.04,79.73-217.01,72.94l13.16,36.28c109.98,18.67,187.5-46.66,215.95-75.88l-12.1-33.34Z"
      fill="#dd4e5f"
    />
  </Svg>
);

export default HMagic;
