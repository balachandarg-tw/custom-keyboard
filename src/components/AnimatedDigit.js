import React, {useEffect, useRef} from "react";
import {Animated} from "react-native";

export const AnimatedDigit = ({ char, style }) => {
    const slideAnim = useRef(new Animated.Value(-20)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        slideAnim.setValue(-20);
        opacityAnim.setValue(0);

        Animated.parallel([
            Animated.spring(slideAnim, {
                toValue: 0,
                tension: 50,
                friction: 8,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 250,
                useNativeDriver: true,
            }),
        ]).start();
    }, [char]);

    return (
        <Animated.Text
            style={[
                style,
                {
                    transform: [{ translateY: slideAnim }],
                    opacity: opacityAnim,
                },
            ]}
        >
            {char}
        </Animated.Text>
    );
};
