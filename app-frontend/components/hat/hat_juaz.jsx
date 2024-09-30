import React from 'react';
import Svg, { G, Line, Path, Circle } from 'react-native-svg';

const HJuaz = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" {...props}>
    <G id="juaz">
      {/* Group 1 */}
      <G>
        <G>
          {/* Lines */}
          <Line x1="425.83" y1="301.1" x2="425.83" y2="356.68" fill= "#cc2e57" stroke="#151517" strokeLinecap="round" strokeLinejoin="round" strokeWidth="65px"/>
          <Line x1="404.13" y1="293.08" x2="447.53" y2="293.08" fill= "#cc2e57" stroke="#151517" strokeLinecap="round" strokeLinejoin="round" strokeWidth="65px"/>
          <Line x1="404.13" y1="361.98" x2="447.53" y2="361.98" fill= "#cc2e57" stroke="#151517" strokeLinecap="round" strokeLinejoin="round" strokeWidth="65px"/>
        </G>

        {/* Path and Line elements */}
        <G>
          <Path d="M375.07 417.78s14.47 92.33-27.56 58.56" stroke="#151517" strokeWidth="65px" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <Line x1="350.26" y1="410.21" x2="393.67" y2="410.21" fill= "#cc2e57" stroke="#151517" strokeLinecap="round" strokeLinejoin="round" strokeWidth="65px"/>
        </G>

        {/* Other Path elements */}
        <Path d="M425.83 410.21s-4.34 73.57 25.71 73.57c31.69 0 17.22-73.57 17.22-73.57" stroke="#151517" strokeWidth="65px" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Other paths with multiple lines */}
        <G>
          <Path d="M504.6 487.63s-4.4-76.29 26.18-76.29 21.36 80.61 21.36 80.61" stroke="#151517" strokeWidth="65px" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <Line x1="510.11" y1="455.44" x2="552.84" y2="455.44" stroke="#151517" strokeWidth="65px" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </G>

        {/* Other Paths */}
        <Path d="M587.97 411.34s26.18-8.71 33.76 3.69-33.76 72.34-33.76 72.34h34.69" stroke="#151517" strokeWidth="65px" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M517.76 372.24s-40.02-8.71-43.79-50.56c-.64-7.06 1.55-14.17 6.39-19.35 6.12-6.54 19.79-8.89 33.09 12.04 0 0 16.58-37.75 35.36-6.99s-31.06 64.87-31.06 64.87Z" fill="#fff" stroke="#151517" strokeMiterlimit="10" />

        {/* Circle */}
        <Circle cx="488.2" cy="379.03" r="32.31" fill="#151517" />

        {/* Other Paths */}
        <Path d="M309.06 454.7l12.22 5.12c2.1.88 4.29-1.03 3.72-3.23l-3.37-12.82 8.65-10.04c1.48-1.72.35-4.4-1.92-4.53l-13.23-.75-6.88-11.33c-1.18-1.95-4.08-1.69-4.91.43l-4.81 12.35-12.9 3.04c-2.21.52-2.87 3.36-1.11 4.8l10.26 8.39-1.09 13.21c-.19 2.27 2.31 3.77 4.22 2.54l11.15-7.17Z" fill="#151517" stroke="#151517" strokeWidth="22px" strokeMiterlimit="10" />
        <Path d="M667.33 460.74l13.01 7.89c2.23 1.36 5.05-.44 4.77-3.04l-1.65-15.13 11.53-9.93c1.98-1.71 1.14-4.94-1.41-5.47l-14.89-3.11-5.88-14.03c-1.01-2.41-4.34-2.61-5.64-.35l-7.56 13.2-15.16 1.26c-2.6.22-3.83 3.32-2.07 5.26l10.22 11.27-3.49 14.81c-.6 2.54 1.98 4.67 4.36 3.6l13.88-6.24Z" fill="#151517" stroke="#151517" strokeWidth="22px" strokeMiterlimit="10" />

        {/* Circle */}
        <Circle cx="332.38" cy="445.27" r="18.78" fill="#151517" />

        {/* Another Path */}
        <Path d="M337.86 565.47s124.71-121.95 294.2 0" stroke="#151517" strokeWidth="17px" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </G> 
      {/* Group 2 */}
      <G>
        <G>
          <Line x1="425.83" y1="301.1" x2="425.83" y2="356.68" strokeLinecap='round' strokeLinejoin='round' fill='none' stroke='#0270ed' strokeWidth="25px"/>
          <Line x1="404.13" y1="293.08" x2="447.53" y2="293.08" strokeLinecap='round' strokeLinejoin='round' fill='none' stroke='#0270ed' strokeWidth="25px"/>
          <Line x1="404.13" y1="361.98" x2="447.53" y2="361.98" strokeLinecap='round' strokeLinejoin='round' fill='none' stroke='#0270ed' strokeWidth="25px"/>
        </G>

        <G>
          <Path d="m375.07,417.78s14.47,92.33-27.56,58.56" strokeLinecap='round' strokeLinejoin='round' fill='none' strokeWidth="25px" stroke='#04b36e'/>
          <Line x1="350.26" y1="410.21" x2="393.67" y2="410.21" strokeLinecap='round' strokeLinejoin='round' fill='none' strokeWidth="25px" stroke='#04b36e'/>
        </G>

        <Path d="m425.83,410.21s-4.34,73.57,25.71,73.57c31.69,0,17.22-73.57,17.22-73.57" strokeLinecap='round' strokeLinejoin='round' fill='none' strokeWidth="25px" stroke='#04b36e'/>
        
        <G>
          <Path d="m504.6,487.63s-4.4-76.29,26.18-76.29,21.36,80.61,21.36,80.61" strokeLinecap='round' strokeLinejoin='round' fill='none' strokeWidth="25px" stroke='#04b36e'/>
          <Line x1="510.11" y1="455.44" x2="552.84" y2="455.44" strokeLinecap='round' strokeLinejoin='round' fill='none' strokeWidth="25px" stroke='#04b36e'/>
        </G>

        <Path d="m587.97,411.34s26.18-8.71,33.76,3.69-33.76,72.34-33.76,72.34h34.69" strokeLinecap='round' strokeLinejoin='round' fill='none' strokeWidth="25px" stroke='#04b36e'/>
        <Path d="m517.76,372.24s-40.02-8.71-43.79-50.56c-.64-7.06,1.55-14.17,6.39-19.35,6.12-6.54,19.79-8.89,33.09,12.04,0,0,16.58-37.75,35.36-6.99s-31.06,64.87-31.06,64.87Z" fill='#f44d19' />
      </G>
      <Path d="m309.06,454.7l12.22,5.12c2.1.88,4.29-1.03,3.72-3.23l-3.37-12.82,8.65-10.04c1.48-1.72.35-4.4-1.92-4.53l-13.23-.75-6.88-11.33c-1.18-1.95-4.08-1.69-4.91.43l-4.81,12.35-12.9,3.04c-2.21.52-2.87,3.36-1.11,4.8l10.26,8.39-1.09,13.21c-.19,2.27,2.31,3.77,4.22,2.54l11.15-7.17Z" fill='#fedd3a'/>
      <Path d="m667.33,460.74l13.01,7.89c2.23,1.36,5.05-.44,4.77-3.04l-1.65-15.13,11.53-9.93c1.98-1.71,1.14-4.94-1.41-5.47l-14.89-3.11-5.88-14.03c-1.01-2.41-4.34-2.61-5.64-.35l-7.56,13.2-15.16,1.26c-2.6.22-3.83,3.32-2.07,5.26l10.22,11.27-3.49,14.81c-.6,2.54,1.98,4.67,4.36,3.6l13.88-6.24Z" fill='#fedd3a'/>
    </G>
  </Svg>
);

export default HJuaz;
