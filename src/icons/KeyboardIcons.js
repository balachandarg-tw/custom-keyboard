import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const PlusIcon = ({ size = 26, color = '#000' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill={color} />
    </Svg>
);

export const MinusIcon = ({ size = 26, color = '#000' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path d="M5 11H19V13H5V11Z" fill={color} />
    </Svg>
);

export const BackspaceIcon = ({ size = 32, color = '#000' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path
            fill={color}
            d="M22 7H9L4 12l5 5h13V7zm-4.59 8.41L15 13.83l-2.41 2.58L11 15.41l2.59-2.58L11 10.24l1.59-1.59L15 11.83l2.41-2.58L19 10.24l-2.59 2.59L19 15.41z"
        />
    </Svg>
);






export const TickIcon = ({ size = 26, color = '#fff' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path
            d="M9 16.2L4.8 12L3.4 13.4L9 19L21 7L19.6 5.6L9 16.2Z"
            fill={color}
        />
    </Svg>
);
