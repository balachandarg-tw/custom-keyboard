// import React, { useState, useRef, useEffect } from 'react';
// import {
//     View,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     StyleSheet,
//     Animated,
//     Pressable,
// } from 'react-native';
//
// const KEYBOARD_HEIGHT = 320;
//
// const MAIN_KEYS = [
//     ['1', '2', '3'],
//     ['4', '5', '6'],
//     ['7', '8', '9'],
//     ['+', '0', '.'],
// ];
//
// export default function AmountInputScreen() {
//     const [expression, setExpression] = useState('');
//     const [amount, setAmount] = useState('0');
//     const [showKeyboard, setShowKeyboard] = useState(false);
//
//     const slideAnim = useRef(new Animated.Value(KEYBOARD_HEIGHT)).current;
//
//
//     const getDecimalCount = (num) =>
//         num.includes('.') ? num.split('.')[1].length : 0;
//
//     const calculateAmount = (exp) => {
//         if (!exp) return '0';
//
//         let normalized = exp.replace(/[.+]$/, '');
//         if (!normalized) return '0';
//
//         return normalized
//             .split('+')
//             .filter(Boolean)
//             .reduce((sum, val) => sum + parseFloat(val), 0)
//             .toString();
//     };
//
//
//     const handleKeyPress = (key) => {
//         const lastChar = expression.slice(-1);
//         const parts = expression.split('+');
//         const currentPart = parts[parts.length - 1];
//
//         if (key === '✔') {
//             setShowKeyboard(false);
//             return;
//         }
//
//         if (key === '⌫') {
//             const updated = expression.slice(0, -1);
//             setExpression(updated);
//             setAmount(calculateAmount(updated));
//             return;
//         }
//
//         if (!expression && (key === '.' || key === '+')) return;
//
//         if (key === '+') {
//             if (lastChar === '+' || lastChar === '.') return;
//         }
//
//         if (key === '.') {
//             if (lastChar === '+') return;
//             if (currentPart.includes('.')) return;
//             if (!/\d/.test(lastChar)) return;
//         }
//
//         if (/\d/.test(key) && currentPart.includes('.')) {
//             if (getDecimalCount(currentPart) >= 2) return;
//         }
//
//         const updated = expression + key;
//         setExpression(updated);
//         setAmount(calculateAmount(updated));
//     };
//
//     useEffect(() => {
//         Animated.timing(slideAnim, {
//             toValue: showKeyboard ? 0 : KEYBOARD_HEIGHT,
//             duration: 220,
//             useNativeDriver: true,
//         }).start();
//     }, [showKeyboard]);
//
//     return (
//         <View style={styles.container}>
//             {showKeyboard && (
//                 <Pressable
//                     style={StyleSheet.absoluteFill}
//                     onPress={() => setShowKeyboard(false)}
//                 />
//             )}
//
//             <TouchableOpacity onPress={() => setShowKeyboard(true)}>
//                 <View style={styles.amountBox}>
//                     <Text style={styles.amountText}>₹ {amount}</Text>
//                 </View>
//             </TouchableOpacity>
//
//             <TextInput
//                 style={styles.description}
//                 value={expression}
//                 placeholder="Description"
//                 editable={false}
//             />
//
//             <Animated.View
//                 style={[
//                     styles.keyboard,
//                     { transform: [{ translateY: slideAnim }] },
//                 ]}
//             >
//                 <View style={{ flexDirection: 'row' }}>
//                     <View style={{ flex: 1 }}>
//                         {MAIN_KEYS.map((row, rowIndex) => (
//                             <View key={rowIndex} style={styles.row}>
//                                 {row.map((key) => (
//                                     <TouchableOpacity
//                                         key={key}
//                                         style={styles.key}
//                                         onPress={() => handleKeyPress(key)}
//                                     >
//                                         <Text style={styles.keyText}>{key}</Text>
//                                     </TouchableOpacity>
//                                 ))}
//                             </View>
//                         ))}
//                     </View>
//
//                     <View style={styles.sideColumn}>
//                         <TouchableOpacity
//                             style={styles.sideKey}
//                             onPress={() => handleKeyPress('⌫')}
//                         >
//                             <Text style={styles.keyText}>⌫</Text>
//                         </TouchableOpacity>
//
//                         <TouchableOpacity
//                             style={styles.sideKey}
//                             onPress={() => handleKeyPress('✔')}
//                         >
//                             <Text style={styles.keyText}>✔</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </Animated.View>
//         </View>
//     );
// }
//
// const styles = StyleSheet.create({
//     container: { flex: 1, padding: 16, backgroundColor: '#fff' },
//     amountBox: {
//         height: 64,
//         borderWidth: 1,
//         borderColor: '#ddd',
//         borderRadius: 12,
//         justifyContent: 'center',
//         paddingHorizontal: 16,
//     },
//     amountText: { fontSize: 30, fontWeight: '700' },
//     description: {
//         marginTop: 10,
//         height: 52,
//         borderWidth: 1,
//         borderColor: '#ddd',
//         borderRadius: 12,
//         paddingHorizontal: 14,
//         fontSize: 16,
//     },
//     keyboard: {
//         position: 'absolute',
//         left: 0,
//         right: 0,
//         bottom: 0,
//         height: KEYBOARD_HEIGHT,
//         padding: 16,
//         backgroundColor: '#fafafa',
//         borderTopLeftRadius: 20,
//         borderTopRightRadius: 20,
//     },
//     row: { flexDirection: 'row', marginBottom: 12 },
//     key: {
//         flex: 1,
//         marginHorizontal: 6,
//         height: 56,
//         backgroundColor: '#f3f3f3',
//         borderRadius: 12,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     keyText: { fontSize: 20, fontWeight: '600' },
//     sideColumn: { justifyContent: 'space-between', marginLeft: 8 },
//     sideKey: {
//         width: 56,
//         height: 120,
//         backgroundColor: '#f3f3f3',
//         borderRadius: 12,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: 12,
//     },
// });
