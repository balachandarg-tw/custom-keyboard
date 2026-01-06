import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Dimensions,
    Pressable,
} from 'react-native';

const { height } = Dimensions.get('window');

const KEYS = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['+', '.', '0', '⌫'],
];

export default function AmountInputScreen() {
    const [expression, setExpression] = useState('');
    const [amount, setAmount] = useState('0');
    const [showKeyboard, setShowKeyboard] = useState(false);

    const slideAnim = useRef(new Animated.Value(height)).current;

    const getDecimalCount = (num: string) => {
        const [, decimals] = num.split('.');
        return decimals ? decimals.length : 0;
    };

    const calculateAmount = (exp: string) => {
        if (!exp) return '0';

        let normalized = exp.replace(/\.\+$/, '');
        if (normalized.endsWith('+')) {
            normalized = normalized.slice(0, -1);
        }

        if (!normalized) return '0';

        if (!normalized.includes('+')) {
            return normalized;
        }

        return normalized
            .split('+')
            .filter(Boolean)
            .reduce((sum, val) => sum + parseFloat(val), 0)
            .toString();
    };

    const handleKeyPress = (key: string) => {
        const lastChar = expression.slice(-1);
        const parts = expression.split('+');
        const currentPart = parts[parts.length - 1];

        if (key === '⌫') {
            const updated = expression.slice(0, -1);
            setExpression(updated);
            setAmount(calculateAmount(updated));
            return;
        }

        if (!expression && (key === '.' || key === '+')) return;

        if (key === '+') {
            if (lastChar === '+' || lastChar === '.') return;
        }

        if (key === '.') {
            if (lastChar === '+') return;

            if (currentPart.includes('.')) return;

            if (currentPart === '0') return;

            if (!/\d/.test(lastChar)) return;
        }

        if (/\d/.test(key) && currentPart.includes('.')) {
            if (getDecimalCount(currentPart) >= 2) return;
        }


        const updated = expression + key;
        setExpression(updated);
        setAmount(calculateAmount(updated));
    };


    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: showKeyboard ? 0 : height,
            duration: 250,
            useNativeDriver: true,
        }).start();
    }, [showKeyboard]);


    return (
        <View style={styles.container}>
            <Pressable
                style={{ flex: 1 }}
                onPress={() => showKeyboard && setShowKeyboard(false)}
            >
                <TouchableOpacity onPress={() => setShowKeyboard(true)}>
                    <View style={styles.amountBox}>
                        <Text style={styles.amountText}>₹ {amount}</Text>
                    </View>
                </TouchableOpacity>

                <TextInput
                    style={styles.description}
                    placeholder="Description"
                    value={expression}
                    editable={false}
                />
            </Pressable>

            <Animated.View
                style={[
                    styles.keyboard,
                    { transform: [{ translateY: slideAnim }] },
                ]}
            >
                {KEYS.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map((key) => (
                            <TouchableOpacity
                                key={key}
                                style={styles.key}
                                onPress={() => handleKeyPress(key)}
                            >
                                <Text style={styles.keyText}>{key}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}

                <TouchableOpacity
                    style={styles.tickButton}
                    onPress={() => setShowKeyboard(false)}
                >
                    <Text style={styles.tickText}>✔</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    amountBox: {
        height: 64,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    amountText: {
        fontSize: 30,
        fontWeight: '700',
    },
    description: {
        marginTop: 10,
        height: 52,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        paddingHorizontal: 14,
        fontSize: 16,
    },
    keyboard: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        padding: 16,
        backgroundColor: '#fafafa',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    key: {
        flex: 1,
        marginHorizontal: 6,
        height: 56,
        backgroundColor: '#f3f3f3',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    keyText: {
        fontSize: 20,
        fontWeight: '600',
    },
    tickButton: {
        marginTop: 12,
        height: 54,
        backgroundColor: '#2e7d32',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tickText: {
        fontSize: 22,
        color: '#fff',
        fontWeight: '700',
    },
});
