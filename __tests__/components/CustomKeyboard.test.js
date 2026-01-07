import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomKeyboard, { KEYBOARD_HEIGHT } from '../../src/components/CustomKeyboard';
import {Animated, StyleSheet} from 'react-native';

describe('CustomKeyboard', () => {
    const mockOnKeyPress = jest.fn();
    const slideAnim = new Animated.Value(KEYBOARD_HEIGHT);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders all keys from the INPUT_KEYS array', () => {
        const { getByText } = render(
            <CustomKeyboard slideAnim={slideAnim} onKeyPress={mockOnKeyPress} />
        );

        const flatKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '0', '.'];
        flatKeys.forEach(key => {
            expect(getByText(key)).toBeTruthy();
        });
    });

    it('triggers onKeyPress with the correct value for grid keys', () => {
        const { getByText } = render(
            <CustomKeyboard slideAnim={slideAnim} onKeyPress={mockOnKeyPress} />
        );

        fireEvent.press(getByText('1'));
        expect(mockOnKeyPress).toHaveBeenCalledWith('1');

        fireEvent.press(getByText('+'));
        expect(mockOnKeyPress).toHaveBeenCalledWith('+');
    });

    it('triggers onKeyPress for special side keys (Backspace and Done)', () => {
        const { getByText } = render(
            <CustomKeyboard slideAnim={slideAnim} onKeyPress={mockOnKeyPress} />
        );

        fireEvent.press(getByText('⌫'));
        expect(mockOnKeyPress).toHaveBeenCalledWith('⌫');

        fireEvent.press(getByText('✔'));
        expect(mockOnKeyPress).toHaveBeenCalledWith('✔');
    });

    it('applies the slideAnim transformation style', () => {
        const { toJSON } = render(
            <CustomKeyboard slideAnim={slideAnim} onKeyPress={mockOnKeyPress} />
        );

        const flattenedStyle = StyleSheet.flatten(toJSON().props.style);

        expect(flattenedStyle.transform).toBeDefined();

        const translateY = flattenedStyle.transform[0].translateY;

        expect(JSON.stringify(translateY)).toContain('320');
    });
});
