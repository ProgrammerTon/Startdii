import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

const HFlower = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" {...props}>
    <Path
      d="m690.07,444.52l24.66-6.78c43.77-12.04,78.88,36.9,53.45,74.51l-14.33,21.19,14.07,21.36c24.97,37.91-10.72,86.42-54.35,73.85l-24.58-7.08-15.97,19.98c-28.34,35.47-85.51,16.51-87.03-28.86l-.86-25.56-23.94-9.01c-42.49-15.99-42.12-76.22.56-91.69l24.05-8.72,1.17-25.55c2.08-45.35,59.47-63.61,87.38-27.8l15.72,20.18Z"
      fill="#f2ec83"
    />
    <Circle
      cx="653.14"
      cy="532.72"
      r="38.75"
      fill="#ef9d65"
    />
  </Svg>
);

export default HFlower;
