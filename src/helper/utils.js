export const formatINR = (numStr) => {
    if (!numStr || numStr === '0') return '0';

    const value = parseFloat(numStr);
    if (isNaN(value)) return '0';

    return new Intl.NumberFormat('en-IN', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 0,
    }).format(value);
};
