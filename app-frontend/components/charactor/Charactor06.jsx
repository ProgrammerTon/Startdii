import React from 'react';
import Svg, { Path, Ellipse, Circle } from 'react-native-svg';  // Use 'react-native-svg' for React Native projects
import colors from '../../constants/color';

const Char6 = ({color = "#d9d9d9",...props}) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" {...props}>
    <Path
      d="m254.59,383.61s41.5-213.14,254.64-189.88c0,0,191.76-4.4,207.48,226.97,0,0,8.8,172.9,6.92,199.31,0,0,1.26,83.62,69.16,53.44,0,0,28.92-16.98,60.99-47.78,0,0,9.43,148.07-210.94,192.08-220.37,44.01-339.62-124.97-364.66-188.93-5.13-13.11-8.62-26.48-14.95-51.06-5.37-20.84-22.09-88.25-8.63-194.14Z"
      fill={color}  // Use inline fill color
    />
    <Ellipse cx="414.84" cy="406.24" rx="54.36" ry="60.55" fill="#fff" />
    <Ellipse cx="423.48" cy="409.13" rx="30.97" ry="35.72" fill="#151517" />
    <Circle cx="412.64" cy="408.45" r="10.54" fill="#fff" />
    <Ellipse cx="545.2" cy="406.24" rx="54.36" ry="60.55" fill="#fff" />
    <Ellipse cx="553.84" cy="409.13" rx="30.97" ry="35.72" fill="#151517" />
    <Circle cx="543" cy="408.45" r="10.54" fill="#fff" />
  </Svg>
);

export default Char6;
