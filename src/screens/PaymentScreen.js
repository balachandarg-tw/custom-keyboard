import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useKeyboardLogic } from "../hooks/useCustomKeyboardLogic";
import AmountRemarks from "../components/AmountRemarks";
import CustomKeyboard from "../components/CustomKeyboard";
import { numberToWordsINR } from "../helper/utils";

export default function PaymentScreen() {
    const inputRef = useRef(null);
    const [remarks, setRemarks] = useState('');

    const {
        expression,
        amount,
        isPaymentKeyboardVisible,
        setPaymentKeyboardVisible,
        slideAnim,
        handleKeyPress,
        showExpression
    } = useKeyboardLogic();

    // Auto-focus the expression input if needed
    useEffect(() => {
        if (showExpression && isPaymentKeyboardVisible) {
            const timer = setTimeout(() => inputRef.current?.focus(), 50);
            return () => clearTimeout(timer);
        }
    }, [showExpression, isPaymentKeyboardVisible]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.fullScreen}
        >
            <ScrollView contentContainerStyle={styles.content}>
                {/* Backdrop to close keyboard when tapping outside */}
                {isPaymentKeyboardVisible && (
                    <Pressable
                        style={StyleSheet.absoluteFill}
                        onPress={() => setPaymentKeyboardVisible(false)}
                    />
                )}

                <AmountRemarks
                    amount={amount}
                    expression={expression}
                    showExpression={showExpression}
                    inputRef={inputRef}

                    isPaymentKeyboardVisible={isPaymentKeyboardVisible}
                    setPaymentKeyboardVisible={setPaymentKeyboardVisible}
                    onFocus={() => setPaymentKeyboardVisible(true)}

                    remarks={remarks}
                    setRemarks={setRemarks}
                    amountWords={numberToWordsINR(amount)}
                />
            </ScrollView>

            <CustomKeyboard
                slideAnim={slideAnim}
                onKeyPress={handleKeyPress}
            />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    fullScreen: { flex: 1, backgroundColor: '#ADD8E6' },
    content: { flex: 1, paddingTop: 60 }
});
