import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useKeyboardLogic } from "../hooks/useCustomKeyboardLogic";
import AmountInput from "../components/AmountInput";
import CustomKeyboard from "../components/CustomKeyboard";

export default function PaymentScreen() {
    const inputRef = useRef(null);
    const {
        expression,
        amount,
        showKeyboard,
        setShowKeyboard,
        slideAnim,
        handleKeyPress,
        showExpression
    } = useKeyboardLogic();

    // Auto-focus the hidden input when an expression (like 100 +) starts
    useEffect(() => {
        if (showExpression && showKeyboard) {
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [showExpression, showKeyboard]);

    return (
        <View style={styles.fullScreen}>
            {/* Backdrop to close keyboard when tapping outside */}
            {showKeyboard && (
                <Pressable
                    style={StyleSheet.absoluteFill}
                    onPress={() => setShowKeyboard(false)}
                />
            )}

            <View style={styles.content}>
                <AmountInput
                    amount={amount}
                    expression={expression}
                    showExpression={showExpression}
                    showKeyboard={showKeyboard}
                    onFocus={() => setShowKeyboard(true)}
                    inputRef={inputRef}
                />
            </View>

            <CustomKeyboard
                slideAnim={slideAnim}
                onKeyPress={handleKeyPress}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    fullScreen: { flex: 1, backgroundColor: '#ADD8E6' },
    content: { flex: 1, paddingTop: 60, paddingHorizontal: 16 }
});
