import React from 'react';
import Svg, { Path } from 'react-native-svg';
import colors from "../constants/color";

const HiFolder = (props) => {
    const { fill = colors.white, ...restProps } = props;

    return (
        <Svg viewBox="0 0 20 20" fill={fill} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" {...restProps}>
            <Path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
        </Svg>
    );
};

export default HiFolder;
