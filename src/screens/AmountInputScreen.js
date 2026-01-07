import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import {formatINR} from "../helper/utils";
import {useKeyboardLogic} from "../hooks/useCustomKeyboardLogic";
import CustomKeyboard from "../components/CustomKeyboard";

export default function AmountInputScreen() {
    const {
        expression,
        amount,
        showKeyboard,
        setShowKeyboard,
        slideAnim,
        handleKeyPress,
        showExpression
    } = useKeyboardLogic();

    return (
        <View style={styles.container}>
            {showKeyboard && (
                <Pressable
                    testID="keyboard-backdrop"
                    style={StyleSheet.absoluteFill}
                    onPress={() => setShowKeyboard(false)}
                />
            )}

            <TouchableOpacity onPress={() => setShowKeyboard(true)}>
                <View style={styles.amountBox}>
                    <Text style={styles.amountText}>₹ {formatINR(amount)}</Text>
                </View>
            </TouchableOpacity>

            {showExpression && <Text style={styles.expression}>{expression}</Text>}

            <CustomKeyboard
                slideAnim={slideAnim}
                onKeyPress={handleKeyPress}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#ADD8E6' },
    amountBox: {
        height: 64, borderWidth: 1, borderColor: '#ddd',
        borderRadius: 12, justifyContent: 'center', paddingHorizontal: 16,
    },
    amountText: { fontSize: 30, fontWeight: '700' },
    expression: { fontSize: 24, color: 'gray', marginBottom: 20 },
});
