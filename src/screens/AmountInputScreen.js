import React, {useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Pressable, TextInput} from 'react-native';
import {formatINR} from "../helper/utils";
import {useKeyboardLogic} from "../hooks/useCustomKeyboardLogic";
import CustomKeyboard from "../components/CustomKeyboard";

export default function AmountInputScreen() {
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

    useEffect(() => {
        if (showExpression) {
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [showExpression]);

    const renderFormattedAmount = (rawAmount) => {
        const formatted = formatINR(rawAmount);
        const [integerPart, fractionalPart] = formatted.split('.');

        return (
            <Text style={styles.amountText}>
                ₹ {integerPart}
                {fractionalPart !== undefined && (
                    <Text style={styles.decimalText}>.{fractionalPart}</Text>
                )}
            </Text>
        );
    };

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
                    {renderFormattedAmount(amount)}
                </View>
            </TouchableOpacity>


            <View style={styles.inputWrapper}>
                {showExpression && (
                    <TextInput
                        ref={inputRef}
                        style={styles.expressionInput}
                        value={expression}
                        showSoftInputOnFocus={false}
                        caretHidden={!showKeyboard}
                        cursorColor="#007AFF"
                        editable={true}
                        selection={{
                            start: expression.length,
                            end: expression.length
                        }}
                        onSelectionChange={(event) => {
                        }}
                    />
                )}
            </View>

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
    decimalText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#444'
    },
});
