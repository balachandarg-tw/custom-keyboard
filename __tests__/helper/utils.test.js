import { formatINR } from '../../src/helper/utils';

describe('formatINR helper', () => {
    it('should return "0" for empty, null, or undefined inputs', () => {
        expect(formatINR('')).toBe('0');
        expect(formatINR(null)).toBe('0');
        expect(formatINR(undefined)).toBe('0');
    });

    it('should return "0" for the string "0"', () => {
        expect(formatINR('0')).toBe('0');
    });

    it('should return "0" for invalid numeric strings (NaN branch)', () => {
        expect(formatINR('abc')).toBe('0');
        expect(formatINR('---')).toBe('0');
    });

    it('should format standard numbers correctly', () => {
        expect(formatINR('100')).toBe('100');
        expect(formatINR('1000')).toBe('1,000');
    });

    it('should format large numbers using the Indian Numbering System (Lakhs/Crores)', () => {
        expect(formatINR('100000')).toBe('1,00,000');
        expect(formatINR('10000000')).toBe('1,00,00,000');
    });

    it('should handle decimals correctly up to 2 places', () => {
        expect(formatINR('1234.5')).toBe('1,234.5');
        expect(formatINR('1234.567')).toBe('1,234.57');
    });

    it('should handle numeric types in addition to strings', () => {
        expect(formatINR(5000)).toBe('5,000');
    });
});
