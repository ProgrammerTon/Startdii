import React from 'react';
import Svg, { Path } from 'react-native-svg';
import colors from "../constants/color";

const HiSearch = (props) => {
    const { fill = colors.white, ...restProps } = props;

    return (
        <Svg viewBox="0 0 20 20" fill={fill} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" {...restProps}>
            <Path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </Svg>
    );
};

export default HiSearch;
