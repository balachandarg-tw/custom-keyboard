import React, {useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Pressable, TextInput, Animated} from 'react-native';
import {formatINR} from "../helper/utils";
import {useKeyboardLogic} from "../hooks/useCustomKeyboardLogic";
import CustomKeyboard from "../components/CustomKeyboard";

const AnimatedDigit = ({ char, style }) => {
    const slideAnim = useRef(new Animated.Value(-20)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        slideAnim.setValue(-20);
        opacityAnim.setValue(0);

        Animated.parallel([
            Animated.spring(slideAnim, {
                toValue: 0,
                tension: 50,
                friction: 8,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 250,
                useNativeDriver: true,
            }),
        ]).start();
    }, [char]);

    return (
        <Animated.Text
            style={[
                style,
                {
                    transform: [{ translateY: slideAnim }],
                    opacity: opacityAnim,
                },
            ]}
        >
            {char}
        </Animated.Text>
    );
};

export default function AmountInputScreen() {
    const inputRef = useRef(null);
    const {
        expression,
        amount,
        showKeyboard,
        setShowKeyboard,
        slideAnim: keyboardSlideAnim,
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
                        onSelectionChange={() => {}}
                    />
                )}
            </View>

            <CustomKeyboard
                slideAnim={keyboardSlideAnim}
                onKeyPress={handleKeyPress}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#ADD8E6' },
    amountRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    amountBox: {
        height: 64, borderWidth: 1, borderColor: '#ddd',
        borderRadius: 12, justifyContent: 'center', paddingHorizontal: 16,
    },
    amountText: { fontSize: 30, fontWeight: '700' },
    expressionInput: { fontSize: 24, color: 'gray', height: 50 },
    inputWrapper: { marginVertical: 20 },
    decimalText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#444'
    },
});
