import { useState, useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export const KEYBOARD_HEIGHT = 320;

export const useKeyboardLogic = () => {
    const [expression, setExpression] = useState('');
    const [amount, setAmount] = useState('0');
    const [isPaymentKeyboardVisible, setPaymentKeyboardVisible] = useState(false);

    const slideAnim = useRef(new Animated.Value(KEYBOARD_HEIGHT)).current;

    const getDecimalCount = (num) =>
        num.includes('.') ? num.split('.')[1].length : 0;

    const calculateAmount = (exp) => {
        if (!exp) return '0';
        let normalized = exp.replace(/\s/g, '').replace(/[.+]$/, '');

        const total = normalized
            .split('+')
            .filter(Boolean)
            .reduce((sum, val) => sum + parseFloat(val), 0);

        return total.toString();
    };

    const showExpression = expression.includes('+');

    const handleKeyPress = (key) => {
        const lastChar = expression.slice(-1);
        const parts = expression.split('+');
        const currentPart = parts[parts.length - 1];

        if (key === '✔') {
            setPaymentKeyboardVisible(false);
            return;
        }

        if (key === '⌫') {
            const isOperatorWithSpaces = expression.endsWith(' + ');
            const updated = isOperatorWithSpaces
                ? expression.slice(0, -3)
                : expression.slice(0, -1);
            setExpression(updated);
            setAmount(calculateAmount(updated));
            return;
        }

        if (key === '+') {
            if (lastChar === '+' || lastChar === '.' || lastChar === ' ') return;
            const updated = expression + ' + ';
            setExpression(updated);
            setAmount(calculateAmount(updated));
            return;
        }

        if (!expression && (key === '.' || key === '+')) return;

        if (key === '.') {
            if (lastChar === '+' || lastChar === ' ') return;
            if (currentPart.includes('.')) return;
            if (!/\d/.test(lastChar)) return;
        }

        if (/\d/.test(key) && currentPart.includes('.')) {
            if (getDecimalCount(currentPart) >= 2) return;
        }

        const updated = expression + key;
        setExpression(updated);
        setAmount(calculateAmount(updated));
    };

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: isPaymentKeyboardVisible ? 0 : KEYBOARD_HEIGHT,
            duration: 220,
            useNativeDriver: true,
        }).start();
    }, [isPaymentKeyboardVisible]);

    return {
        expression,
        amount,
        isPaymentKeyboardVisible,
        setPaymentKeyboardVisible,
        slideAnim,
        handleKeyPress,
        showExpression
    };
};
