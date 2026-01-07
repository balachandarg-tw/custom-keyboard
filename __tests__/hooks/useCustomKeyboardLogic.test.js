
import { renderHook, act } from '@testing-library/react-native';
import { useKeyboardLogic } from '../../src/hooks/useCustomKeyboardLogic';
import { Animated } from 'react-native';

jest.spyOn(Animated, 'timing').mockImplementation(() => ({
    start: jest.fn((cb) => cb && cb({ finished: true })),
}));

describe('useKeyboardLogic 100% Coverage', () => {

    it('Initial state and basic typing (Success Paths)', () => {
        const { result } = renderHook(() => useKeyboardLogic());
        act(() => { result.current.handleKeyPress('5'); });
        act(() => { result.current.handleKeyPress('0'); });

        expect(result.current.expression).toBe('50');
        expect(result.current.amount).toBe('50');
        expect(result.current.showExpression).toBe(false);
    });

    it('Blocked starting characters (Both . and +)', () => {
        const { result } = renderHook(() => useKeyboardLogic());

        act(() => { result.current.handleKeyPress('.'); });
        expect(result.current.expression).toBe('');

        act(() => { result.current.handleKeyPress('+'); });
        expect(result.current.expression).toBe('');
    });

    it('Operator and decimal validation', () => {
        const { result } = renderHook(() => useKeyboardLogic());

        act(() => { result.current.handleKeyPress('1'); });
        act(() => { result.current.handleKeyPress('+'); });

        act(() => { result.current.handleKeyPress('+'); });
        expect(result.current.expression).toBe('1+');

        act(() => { result.current.handleKeyPress('.'); });
        expect(result.current.expression).toBe('1+');

        act(() => { result.current.handleKeyPress('5'); });
        act(() => { result.current.handleKeyPress('.'); });

        act(() => { result.current.handleKeyPress('.'); });
        expect(result.current.expression).toBe('1+5.');

        act(() => { result.current.handleKeyPress('+'); });
        expect(result.current.expression).toBe('1+5.');
    });

    it('Max decimal precision and calculateAmount logic', () => {
        const { result } = renderHook(() => useKeyboardLogic());
        act(() => { result.current.handleKeyPress('1'); });
        act(() => { result.current.handleKeyPress('.'); });
        act(() => { result.current.handleKeyPress('5'); });
        act(() => { result.current.handleKeyPress('5'); });

        act(() => { result.current.handleKeyPress('9'); });
        expect(result.current.expression).toBe('1.55');

        act(() => { result.current.handleKeyPress('+'); });
        expect(result.current.showExpression).toBe(true);
    });

    it('Backspace, Done key, and Animation toggle', () => {
        const { result } = renderHook(() => useKeyboardLogic());

        act(() => { result.current.setShowKeyboard(true); });
        expect(result.current.showKeyboard).toBe(true);

        act(() => { result.current.handleKeyPress('✔'); });
        expect(result.current.showKeyboard).toBe(false);

        act(() => { result.current.handleKeyPress('9'); });
        act(() => { result.current.handleKeyPress('⌫'); });
        expect(result.current.expression).toBe('');
        expect(result.current.amount).toBe('0');
    });

    it('Prevent decimal if last char is not a digit', () => {
        const { result } = renderHook(() => useKeyboardLogic());
        act(() => { result.current.handleKeyPress('1'); });
        act(() => { result.current.handleKeyPress('+'); });

        act(() => { result.current.handleKeyPress('.'); });
        expect(result.current.expression).toBe('1+');
    });

    it('Normalized empty string branch', () => {
        const { result } = renderHook(() => useKeyboardLogic());

        act(() => { result.current.handleKeyPress('1'); });
        act(() => { result.current.handleKeyPress('⌫'); });
        expect(result.current.amount).toBe('0');
    });

    it('covers the false branch of Line 20 (Normal operation)', () => {
        const { result } = renderHook(() => useKeyboardLogic());
        act(() => { result.current.handleKeyPress('5'); });
        expect(result.current.amount).toBe('5');
    });
});
