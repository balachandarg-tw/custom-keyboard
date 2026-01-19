import React from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const KEYS = [
    '1', '2', '3', '-',
    '4', '5', '6', '+',
    '7', '8', '9', '⌫',
    '.', '0', '00', '✔'
];

const CustomKeyboard = ({ slideAnim, onKeyPress, height = 320 }) => {

    const isActionKey = (key) => ['-', '+', '⌫', '✔'].includes(key);
    const isDoneKey = (key) => key === '✔';

    return (
        <Animated.View
            style={[
                styles.keyboard,
                { height, transform: [{ translateY: slideAnim }] },
            ]}
        >
            <View style={styles.keyGrid}>
                {KEYS.map((key) => (
                    <TouchableOpacity
                        key={key}
                        activeOpacity={0.6}
                        style={[
                            styles.key,
                            isActionKey(key) && styles.actionKey,
                            isDoneKey(key) && styles.doneKey
                        ]}
                        onPress={() => onKeyPress(key)}
                    >
                        <Text style={[
                            styles.keyText,
                            isDoneKey(key) && styles.doneText
                        ]}>
                            {key}
                        </Text>
                    </TouchableOpacity>
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
        backgroundColor: '#F2F2F7',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 12,
        // Shadow
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    keyGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    key: {
        width: (width - 48) / 4, // 4 columns layout
        height: 60,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    actionKey: {
        backgroundColor: '#E5E5EA',
    },
    doneKey: {
        backgroundColor: '#007AFF',
    },
    keyText: {
        fontSize: 24,
        fontWeight: '500',
        color: '#000',
    },
    doneText: {
        color: '#FFF',
    }
});

export default CustomKeyboard;
