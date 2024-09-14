import React from 'react';
import Svg, { Path } from 'react-native-svg';
import colors from "../constants/color";

const PencilIcon = (props) => {
    const { fill = colors.black, width = 20, height = 20, ...restProps } = props;

    return (
        <Svg viewBox="0 0 20 20" fill={fill} width={width} height={height} aria-hidden="true" {...restProps}>
            <Path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </Svg>
    );
};

export default PencilIcon;
