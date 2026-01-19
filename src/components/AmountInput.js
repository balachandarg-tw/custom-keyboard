import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TextInput } from 'react-native';
import { formatINR } from "../helper/utils";
import { AnimatedDigit } from "./AnimatedDigit";

const AmountInput = ({
                         amount,
                         expression,
                         showExpression,
                         onFocus,
                         showKeyboard,
                         inputRef,
                         containerStyle
                     }) => {

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
        <View style={[styles.container, containerStyle]}>
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
                        // Keeps cursor at the end for expressions
                        selection={{ start: expression.length, end: expression.length }}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { width: '100%', padding: 16 },
    amountRow: { flexDirection: 'row', alignItems: 'baseline' },
    amountBox: {
        height: 80,
        justifyContent: 'center',
        paddingHorizontal: 12,
        backgroundColor: 'transparent'
    },
    amountText: { fontSize: 42, fontWeight: '700', color: '#000' },
    decimalText: { fontSize: 28, fontWeight: '600', color: '#444' },
    expressionInput: { fontSize: 20, color: '#666', height: 40, paddingLeft: 12 },
    inputWrapper: { marginTop: 4, minHeight: 40 },
});

export default AmountInput;
