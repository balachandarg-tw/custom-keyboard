export const formatINR = (numStr) => {
    if (!numStr || numStr === '0') return '0';

    const value = parseFloat(numStr);
    if (isNaN(value)) return '0';

    return new Intl.NumberFormat('en-IN', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 0,
    }).format(value);
};

export const numberToWordsINR = (num) => {
    if (!num || isNaN(num) || num === "0") return "";

    const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    const makeWords = (n) => {
        if (n < 20) return a[n];
        let digit = n % 10;
        return b[Math.floor(n / 10)] + (digit !== 0 ? " " + a[digit] : "");
    };

    let n = Math.floor(Number(num));
    if (n === 0) return "Zero";

    let str = "";
    str += n >= 10000000 ? makeWords(Math.floor(n / 10000000)) + "Crore " : "";
    n %= 10000000;
    str += n >= 100000 ? makeWords(Math.floor(n / 100000)) + "Lakh " : "";
    n %= 100000;
    str += n >= 1000 ? makeWords(Math.floor(n / 1000)) + "Thousand " : "";
    n %= 1000;
    str += n >= 100 ? makeWords(Math.floor(n / 100)) + "Hundred " : "";
    n %= 100;
    if (n > 0) str += (str !== "" ? "and " : "") + makeWords(n);

    return str.trim() + " Rupees Only";
};
