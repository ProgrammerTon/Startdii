import React from 'react';
import Svg, { Path } from 'react-native-svg';
import colors from "../constants/color";

const HiUser = (props) => {
    const { fill = colors.white, ...restProps } = props;

    return (
        <Svg viewBox="0 0 20 20" fill={fill} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" {...restProps}>
            <Path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </Svg>
    );
};

export default HiUser;
