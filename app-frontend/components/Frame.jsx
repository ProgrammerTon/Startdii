import React from 'react';
import Svg, { Path } from 'react-native-svg';
import colors from "../constants/color";

const Frame = (props) => {
    const { fill = colors.pink, width = 265, height = 45, ...restProps } = props;

    return (
        <Svg width={width} height={height} viewBox="0 0 195 35" fill={fill} xmlns="http://www.w3.org/2000/svg" {...restProps}>
            <Path fill-rule="evenodd" clip-rule="evenodd" d="M2.58567 0H22.3968C22.4533 0 22.5093 0.00234774 22.5647 0.00695109V0H172.793V0.00695222C172.848 0.00234813 172.904 0 172.961 0H192.772C194.749 0 195.527 2.56279 193.884 3.66224L174.073 16.9177C173.667 17.189 173.219 17.2889 172.793 17.2511V17.7489C173.219 17.7111 173.667 17.811 174.073 18.0823L193.884 31.3378C195.527 32.4372 194.749 35 192.772 35H172.961C172.904 35 172.848 34.9977 172.793 34.993V35H22.5647V34.993C22.5093 34.9977 22.4533 35 22.3968 35H2.58567C0.608584 35 -0.16972 32.4372 1.47347 31.3378L21.2846 18.0823C21.6902 17.811 22.1381 17.7111 22.5647 17.7489V17.2511C22.1381 17.2889 21.6902 17.189 21.2846 16.9177L1.47347 3.66224C-0.16972 2.56279 0.608584 0 2.58567 0Z" fill="#FCA3E3" />
        </Svg>

    );
};

export default Frame;
