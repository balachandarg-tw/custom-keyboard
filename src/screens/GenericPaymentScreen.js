import React, { useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useKeyboardLogic } from "../hooks/useCustomKeyboardLogic";
import AmountInput from "../components/AmountInput";
import CustomKeyboard from "../components/CustomKeyboard";
import { numberToWordsINR } from "../helper/utils";

export default function GenericPaymentScreen() {
    const inputRef = useRef(null);
    const {
        expression, amount, showKeyboard,
        setShowKeyboard, slideAnim, handleKeyPress, showExpression
    } = useKeyboardLogic();

    return (
        <View style={styles.container}>
            <AmountInput
                amount={amount}
                expression={expression}
                showExpression={showExpression}
                showKeyboard={showKeyboard}
                onFocus={() => setShowKeyboard(true)}
                inputRef={inputRef}
            />

            {parseFloat(amount) > 0 && (
                <Text style={styles.words}>
                    {numberToWordsINR(amount)}
                </Text>
            )}

            <CustomKeyboard
                slideAnim={slideAnim}
                onKeyPress={handleKeyPress}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
    words: { paddingHorizontal: 28, color: '#666', fontStyle: 'italic' }
});
