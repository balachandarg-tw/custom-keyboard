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

const MAIN_KEYS = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['+', '0', '.'],
];

export default function AmountInputScreen() {
    const [expression, setExpression] = useState('');
    const [amount, setAmount] = useState('0');
    const [showKeyboard, setShowKeyboard] = useState(false);

    const slideAnim = useRef(new Animated.Value(height)).current;

    /* ---------------- Helpers ---------------- */
    const getDecimalCount = (num) => {
        const parts = num.split('.');
        return parts[1] ? parts[1].length : 0;
    };

    const calculateAmount = (exp) => {
        if (!exp) return '0';

        // Remove trailing ".+" or "+"
        let normalized = exp.replace(/\.\+$/, '');
        if (normalized.endsWith('+')) normalized = normalized.slice(0, -1);

        if (!normalized) return '0';

        if (!normalized.includes('+')) return normalized;

        return normalized
            .split('+')
            .filter(Boolean)
            .reduce((sum, val) => sum + parseFloat(val), 0)
            .toString();
    };

    /* ---------------- Keyboard Handling ---------------- */
    const handleKeyPress = (key) => {
        const lastChar = expression.slice(-1);
        const parts = expression.split('+');
        const currentPart = parts[parts.length - 1];

        // Backspace
        if (key === '⌫') {
            const updated = expression.slice(0, -1);
            setExpression(updated);
            setAmount(calculateAmount(updated));
            return;
        }

        // Tick closes keyboard
        if (key === '✔') {
            setShowKeyboard(false);
            return;
        }

        // Prevent starting with . or +
        if (!expression && (key === '.' || key === '+')) return;

        // PLUS rules
        if (key === '+') {
            if (lastChar === '+' || lastChar === '.') return;
        }

        // DOT rules
        if (key === '.') {
            if (lastChar === '+') return; // no dot after +
            if (currentPart.includes('.')) return; // no consecutive dot
            if (currentPart === '0') return; // block 0.
            if (!/\d/.test(lastChar)) return; // must have a number before dot
        }

        // Decimal precision (only digits)
        if (/\d/.test(key) && currentPart.includes('.')) {
            if (getDecimalCount(currentPart) >= 2) return;
        }

        const updated = expression + key;
        setExpression(updated);
        setAmount(calculateAmount(updated));
    };

    /* ---------------- Keyboard Animation ---------------- */
    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: showKeyboard ? 0 : height,
            duration: 250,
            useNativeDriver: true,
        }).start();
    }, [showKeyboard]);

    /* ---------------- UI ---------------- */
    return (
        <View style={styles.container}>
            <Pressable
                style={{ flex: 1 }}
                onPress={() => showKeyboard && setShowKeyboard(false)}
            >
                {/* Amount */}
                <TouchableOpacity onPress={() => setShowKeyboard(true)}>
                    <View style={styles.amountBox}>
                        <Text style={styles.amountText}>₹ {amount}</Text>
                    </View>
                </TouchableOpacity>

                {/* Description */}
                <TextInput
                    style={styles.description}
                    placeholder="Description"
                    value={expression}
                    editable={false}
                />
            </Pressable>

            {/* Custom Keyboard */}
            <Animated.View
                style={[styles.keyboard, { transform: [{ translateY: slideAnim }] }]}
            >
                <View style={{ flexDirection: 'row' }}>
                    {/* Main keys */}
                    <View style={{ flex: 1 }}>
                        {MAIN_KEYS.map((row, rowIndex) => (
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
                    </View>

                    {/* Side column */}
                    <View style={styles.sideColumn}>
                        <TouchableOpacity
                            style={styles.sideKey}
                            onPress={() => handleKeyPress('⌫')}
                        >
                            <Text style={styles.keyText}>⌫</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.sideKey}
                            onPress={() => handleKeyPress('✔')}
                        >
                            <Text style={styles.keyText}>✔</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        </View>
    );
}

/* ---------------- Styles ---------------- */
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    amountBox: {
        height: 64,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    amountText: { fontSize: 30, fontWeight: '700' },
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
    row: { flexDirection: 'row', marginBottom: 12 },
    key: {
        flex: 1,
        marginHorizontal: 6,
        height: 56,
        backgroundColor: '#f3f3f3',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    keyText: { fontSize: 20, fontWeight: '600' },
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
