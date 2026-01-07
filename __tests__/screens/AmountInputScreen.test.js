import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import AmountInputScreen from '../../src/screens/AmountInputScreen';
import { useKeyboardLogic } from '../../src/hooks/useCustomKeyboardLogic';

jest.mock('../../src/hooks/useCustomKeyboardLogic');

jest.mock('../../src/components/CustomKeyboard', () => {
    const { TouchableOpacity, Text } = require('react-native');
    return ({ onKeyPress }) => (
        <TouchableOpacity testID="key-5" onPress={() => onKeyPress('5')}>
            <Text>5</Text>
        </TouchableOpacity>
    );
});

describe('AmountInputScreen Coverage', () => {
    const mockHandleKeyPress = jest.fn();
    const mockSetShowKeyboard = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        // Default state for the hook
        useKeyboardLogic.mockReturnValue({
            expression: '',
            amount: '0',
            showKeyboard: false,
            setShowKeyboard: mockSetShowKeyboard,
            slideAnim: { interpolate: jest.fn() }, // Mock animated value
            handleKeyPress: mockHandleKeyPress,
            showExpression: false,
        });
    });

    it('renders initial state correctly (Branches OFF)', () => {
        const { queryByText, getByText } = render(<AmountInputScreen />);

        expect(getByText('₹ 0')).toBeTruthy();
        // Line 25-30: Pressable backdrop should not exist
        // Line 39: Expression text should not exist
        expect(queryByText('10+5')).toBeNull();
    });

    it('renders backdrop and handles closing (showKeyboard branch ON)', () => {
        useKeyboardLogic.mockReturnValueOnce({
            expression: '',
            amount: '0',
            showKeyboard: true,
            setShowKeyboard: mockSetShowKeyboard,
            slideAnim: { interpolate: jest.fn() },
            handleKeyPress: mockHandleKeyPress,
            showExpression: false,
        });

        const { getByTestId } = render(<AmountInputScreen />);

        // Find by the testID we just added
        const backdrop = getByTestId('keyboard-backdrop');
        fireEvent.press(backdrop);

        expect(mockSetShowKeyboard).toHaveBeenCalledWith(false);
    });

    it('opens keyboard on amount box press', () => {
        const { getByText } = render(<AmountInputScreen />);
        fireEvent.press(getByText('₹ 0'));
        expect(mockSetShowKeyboard).toHaveBeenCalledWith(true);
    });

    it('renders expression text (showExpression branch ON)', () => {
        useKeyboardLogic.mockReturnValueOnce({
            expression: '10+5',
            amount: '15',
            showKeyboard: false,
            setShowKeyboard: mockSetShowKeyboard,
            slideAnim: {},
            handleKeyPress: mockHandleKeyPress,
            showExpression: true, // Turn branch ON
        });

        const { getByText } = render(<AmountInputScreen />);
        expect(getByText('10+5')).toBeTruthy();
        expect(getByText('₹ 15')).toBeTruthy();
    });

    it('triggers handleKeyPress through CustomKeyboard', () => {
        const { getByTestId } = render(<AmountInputScreen />);
        fireEvent.press(getByTestId('key-5'));
        expect(mockHandleKeyPress).toHaveBeenCalledWith('5');
    });
});
