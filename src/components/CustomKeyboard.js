import React from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';

export const KEYBOARD_HEIGHT = 320;

const INPUT_KEYS = [
    ['1', '2', '3', "-"],
    ['4', '5', '6', "+"],
    ['7', '8', '9', "⌫"],
    [',', '0', '.', "✔"],
];

const CustomKeyboard = ({ slideAnim, onKeyPress }) => {
    return (
        <Animated.View
            style={[
                styles.keyboard,
                { transform: [{ translateY: slideAnim }] },
            ]}
        >
        <View style={{ flex: 1 }}>
            {INPUT_KEYS.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.keyRow}>
                    {row.map((key) => (
                        <TouchableOpacity
                            key={key}
                            style={styles.key}
                            onPress={() => onKeyPress(key)}
                        >
                            <Text style={styles.keyText}>{key}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            ))}
                </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    keyboard: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: KEYBOARD_HEIGHT,
        padding: 16,
        backgroundColor: '#fafafa',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    keyRow: {flexDirection: 'row', marginBottom: 12},
    key: {
        flex: 1,
        marginHorizontal: 6,
        height: 56,
        backgroundColor: '#f3f3f3',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    keyText: {fontSize: 20, fontWeight: '600'},
    sideColumn: { justifyContent: 'space-between', marginLeft: 8 },
    sideKey: {
        width: 56,
        height: 120,
        backgroundColor: '#f3f3f3',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
});

export default CustomKeyboard;
