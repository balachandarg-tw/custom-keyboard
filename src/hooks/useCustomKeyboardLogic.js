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

        const normalized = exp
            .replace(/\s/g, '')
            .replace(/,/g, '')
            .replace(/[.+]$/, '');

        const total = normalized
            .split('+')
            .filter(Boolean)
            .reduce((sum, val) => sum + Number(val), 0);

        return total.toString();
    };

    const showExpression = expression.includes('+');

    const handleKeyPress = (key) => {
        const lastChar = expression.slice(-1);
        const parts = expression.split('+');
        const currentPart = parts[parts.length - 1];

        if (key === 'tick') {
            setPaymentKeyboardVisible(false);
            return;
        }

        if (key === 'backspace') {
            const updated = expression.endsWith(' + ')
                ? expression.slice(0, -3)
                : expression.slice(0, -1);

            setExpression(updated);
            setAmount(calculateAmount(updated));
            return;
        }

        if (key === 'plus') {
            if (!expression) return;
            if (lastChar === '+' || lastChar === '.' || lastChar === ' ') return;

            const updated = expression + ' + ';
            setExpression(updated);
            setAmount(calculateAmount(updated));
            return;
        }

        if (key === 'minus') {
            if (!expression) return;
            if (lastChar === '+' || lastChar === '.' || lastChar === ' ') return;

            const updated = expression + ' - ';
            setExpression(updated);
            setAmount(calculateAmount(updated));
            return;
        }

        if (key === 'dot') {
            if (!expression) return;
            if (lastChar === '+' || lastChar === ' ') return;
            if (currentPart.includes('.')) return;

            const updated = expression + '.';
            setExpression(updated);
            setAmount(calculateAmount(updated));
            return;
        }

        if (/^\d$/.test(key)) {
            if (currentPart.includes('.') && getDecimalCount(currentPart) >= 2) return;

            const updated = expression + key;
            setExpression(updated);
            setAmount(calculateAmount(updated));
        }
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
        showExpression,
        slideAnim,
        isPaymentKeyboardVisible,
        setPaymentKeyboardVisible,
        handleKeyPress,
    };
};
