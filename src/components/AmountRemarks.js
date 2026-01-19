import React from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import AmountInput from './AmountInput';

const AmountRemarks = ({
                           amount,
                           expression,
                           showExpression,
                           onFocus,
                           setPaymentKeyboardVisible,
                           isPaymentKeyboardVisible,
                           inputRef,
                           remarks,
                           setRemarks,
                           amountWords
                       }) => {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.label}>SENDING AMOUNT</Text>
                <TouchableOpacity
                    onPress={() => setPaymentKeyboardVisible(!isPaymentKeyboardVisible)}
                    style={styles.editButton}
                >
                    <Text style={styles.editButtonText}>
                        {isPaymentKeyboardVisible ? 'Done' : 'Edit'}
                    </Text>
                </TouchableOpacity>
            </View>

            <AmountInput
                amount={amount}
                expression={expression}
                showExpression={showExpression}
                onFocus={onFocus}
                showKeyboard={isPaymentKeyboardVisible}
                inputRef={inputRef}
            />

            {amountWords ? (
                <Text style={styles.wordsText}>{amountWords}</Text>
            ) : null}

            <View style={styles.divider} />

            <View style={styles.remarksSection}>
                <Text style={styles.label}>REMARKS</Text>
                <TextInput
                    style={styles.remarksInput}
                    placeholder="What is this for?"
                    value={remarks}
                    onChangeText={setRemarks}
                    placeholderTextColor="#999"
                    onFocus={() => setPaymentKeyboardVisible(false)} // Hide custom keyboard when system keyboard opens
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 16,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 15,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    label: {
        fontSize: 11,
        fontWeight: '700',
        color: '#A0A0A0',
        letterSpacing: 0.5,
    },
    editButton: { padding: 4 },
    editButtonText: { color: '#007AFF', fontWeight: '600', fontSize: 14 },
    wordsText: {
        fontSize: 13,
        color: '#666',
        fontStyle: 'italic',
        marginTop: 4,
        paddingHorizontal: 4,
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginVertical: 16,
    },
    remarksSection: { paddingBottom: 4 },
    remarksInput: {
        fontSize: 16,
        color: '#333',
        marginTop: 4,
        paddingVertical: 4,
    },
});

export default AmountRemarks;
