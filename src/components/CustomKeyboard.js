import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Dimensions,
} from 'react-native';

import {
    PlusIcon,
    MinusIcon,
    BackspaceIcon,
    TickIcon,
} from '../icons/KeyboardIcons';

const { width } = Dimensions.get('window');

const KEYS = [
    '1', '2', '3', 'plus',
    '4', '5', '6', 'minus',
    '7', '8', '9', 'backspace',
    'comma', '0', 'dot', 'tick',
];

const CustomKeyboard = ({ slideAnim, onKeyPress, height = 320 }) => {
    const renderKey = (key) => {
        if (/^\d$/.test(key)) {
            return <Text style={styles.keyText}>{key}</Text>;
        }

        switch (key) {
            case 'plus':
                return <PlusIcon />;
            case 'minus':
                return <MinusIcon />;
            case 'backspace':
                return <BackspaceIcon />;
            case 'tick':
                return <TickIcon />;
            case 'dot':
                return <Text style={styles.keyText}>.</Text>;
            case 'comma':
                return <Text style={styles.keyText}>,</Text>;
            default:
                return null;
        }
    };

    return (
        <Animated.View
            style={[
                styles.keyboard,
                { height, transform: [{ translateY: slideAnim }] },
            ]}
        >
            <View style={styles.grid}>
                {KEYS.map((key) => (
                    <TouchableOpacity
                        key={key}
                        onPress={() => onKeyPress(key)}
                        activeOpacity={0.7}
                        style={[
                            styles.key,
                            key === 'tick' && styles.tickKey,
                            (key === 'plus' || key === 'minus' || key === 'backspace') &&
                            styles.actionKey,
                        ]}
                    >
                        {renderKey(key)}
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
        elevation: 20,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    key: {
        width: (width - 48) / 4,
        height: 60,
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    actionKey: {
        backgroundColor: '#E5E5EA',
    },
    tickKey: {
        backgroundColor: '#007AFF',
    },
    keyText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#000',
    },
});

export default CustomKeyboard;
