import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TextInput } from 'react-native';
import { formatINR } from "../helper/utils";
import {AnimatedDigit} from "./AnimatedDigit";

const AmountInput = ({ amount, expression, showExpression, onFocus, showKeyboard, inputRef }) => {

    const renderFormattedAmount = (rawAmount) => {
        const formatted = formatINR(rawAmount);
        const [integerPart, fractionalPart] = formatted.split('.');

        const renderChars = (str, style) => {
            return str.split('').map((char, index) => (
                <View key={`pos-${index}`} style={{ overflow: 'hidden' }}>
                    <AnimatedDigit char={char} style={style} />
                </View>
            ));
        };

        return (
            <View style={styles.amountRow}>
                <Text style={styles.amountText}>₹ </Text>
                {renderChars(integerPart, styles.amountText)}
                {fractionalPart !== undefined && (
                    <>
                        <Text style={styles.decimalText}>.</Text>
                        {renderChars(fractionalPart, styles.decimalText)}
                    </>
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={onFocus}>
                <View style={styles.amountBox}>
                    {renderFormattedAmount(amount)}
                </View>
            </TouchableWithoutFeedback>

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
                        selection={{ start: expression.length, end: expression.length }}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { width: '100%', padding: 16, backgroundColor: '#f9f9f9', borderRadius: 16 },
    amountRow: { flexDirection: 'row', alignItems: 'baseline' },
    amountBox: {
        height: 64, borderWidth: 1, borderColor: '#ddd',
        borderRadius: 12, justifyContent: 'center', paddingHorizontal: 16,
        backgroundColor: '#fff'
    },
    amountText: { fontSize: 30, fontWeight: '700' },
    expressionInput: { fontSize: 24, color: 'gray', height: 50 },
    inputWrapper: { marginTop: 10, minHeight: 50 },
    decimalText: { fontSize: 20, fontWeight: '600', color: '#444' },
});

export default AmountInput;
