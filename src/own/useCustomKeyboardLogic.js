import { useState, useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export const KEYBOARD_HEIGHT = 320;

export const useKeyboardLogic = () => {
    const [expression, setExpression] = useState('');
    const [amount, setAmount] = useState('0');
    const [showKeyboard, setShowKeyboard] = useState(false);

    const slideAnim = useRef(new Animated.Value(KEYBOARD_HEIGHT)).current;

    const getDecimalCount = (num) =>
        num.includes('.') ? num.split('.')[1].length : 0;

    const calculateAmount = (exp) => {
        if (!exp) return '0';
        let normalized = exp.replace(/[.+]$/, '');
        if (!normalized) return '0';
        return normalized
            .split('+')
            .filter(Boolean)
            .reduce((sum, val) => sum + parseFloat(val), 0)
            .toString();
    };

    const showExpression = expression.includes('+');


    const handleKeyPress = (key) => {
        const lastChar = expression.slice(-1);
        const parts = expression.split('+');
        const currentPart = parts[parts.length - 1];

        if (key === '✔') {
            setShowKeyboard(false);
            return;
        }

        if (key === '⌫') {
            const updated = expression.slice(0, -1);
            setExpression(updated);
            setAmount(calculateAmount(updated));
            return;
        }

        if (!expression && (key === '.' || key === '+')) return;

        if (key === '+') {
            if (lastChar === '+' || lastChar === '.') return;
        }

        if (key === '.') {
            if (lastChar === '+') return;
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
            toValue: showKeyboard ? 0 : KEYBOARD_HEIGHT,
            duration: 220,
            useNativeDriver: true,
        }).start();
    }, [showKeyboard]);

    return {
        expression,
        amount,
        showKeyboard,
        setShowKeyboard,
        slideAnim,
        handleKeyPress,
        showExpression
    };
};
