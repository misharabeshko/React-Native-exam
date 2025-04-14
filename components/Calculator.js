import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrencyFrom, setCurrencyTo } from '../redux/currencySlice';

const screenWidth = Dimensions.get('window').width;
const buttonSize = screenWidth / 4;

const Calculator = ({ onInputChange }) => {
    const dispatch = useDispatch();

    const [input, setInput] = useState('');
    const [currentOperator, setCurrentOperator] = useState('');
    const [previousInput, setPreviousInput] = useState('');

    const { currencyFrom, currencyTo } = useSelector((state) => state.currency);


    const updateInput = (newInput) => {
        setInput(newInput);
        onInputChange(newInput.replace(',', '.'));
    };

    const handleNumberPress = (num) => {
        const updated = input + num;
        updateInput(updated);
    };

    const handleOperatorPress = (operator) => {
        if (input === '') return;

        if (previousInput !== '' && currentOperator !== '') {
            const prev = parseFloat(previousInput);
            const current = parseFloat(input);
            let result;

            switch (currentOperator) {
                case '+':
                    result = prev + current;
                    break;
                case '-':
                    result = prev - current;
                    break;
                case '*':
                    result = prev * current;
                    break;
                case '/':
                    result = prev / current;
                    break;
                default:
                    result = current;
            }

            setPreviousInput(result.toString());
            onInputChange(result.toString());
            setInput('');
        } else {
            setPreviousInput(input);
            setInput('');
        }

        setCurrentOperator(operator);
    };

    const handleEqualPress = () => {
        if (previousInput === '' || input === '' || currentOperator === '') return;

        const prev = parseFloat(previousInput);
        const current = parseFloat(input);
        let result;

        switch (currentOperator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                result = current;
        }

        setInput(result.toString());
        setPreviousInput('');
        setCurrentOperator('');
        onInputChange(result.toString());
    };

    const handleClearPress = () => {
        setInput('');
        setPreviousInput('');
        setCurrentOperator('');
        onInputChange('');
    };

    const handleSwapCurrencies = () => {
        dispatch(setCurrencyFrom(currencyTo));
        dispatch(setCurrencyTo(currencyFrom));
    };

    const renderButton = (title, onPress, color) => (
        <TouchableOpacity
            style={[styles.button, { width: buttonSize, height: buttonSize - 5, backgroundColor: color }]}
            onPress={onPress}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.grid}>
                <View style={styles.row}>
                    {renderButton('C', handleClearPress, '#424242')}
                    {renderButton('⭠', () => updateInput(input.slice(0, -1)), '#424242')}
                    {renderButton('⮃', () => handleSwapCurrencies(), '#424242')}
                    {renderButton('÷', () => handleOperatorPress('/'), '#ff9412')}
                </View>

                <View style={styles.row}>
                    {renderButton('9', () => handleNumberPress('9'), '#595959')}
                    {renderButton('8', () => handleNumberPress('8'), '#595959')}
                    {renderButton('7', () => handleNumberPress('7'), '#595959')}
                    {renderButton('x', () => handleOperatorPress('*'), '#ff9412')}
                </View>

                <View style={styles.row}>
                    {renderButton('4', () => handleNumberPress('4'), '#595959')}
                    {renderButton('5', () => handleNumberPress('5'), '#595959')}
                    {renderButton('6', () => handleNumberPress('6'), '#595959')}
                    {renderButton('-', () => handleOperatorPress('-'), '#ff9412')}
                </View>

                <View style={styles.row}>
                    {renderButton('1', () => handleNumberPress('1'), '#595959')}
                    {renderButton('2', () => handleNumberPress('2'), '#595959')}
                    {renderButton('3', () => handleNumberPress('3'), '#595959')}
                    {renderButton('+', () => handleOperatorPress('+'), '#ff9412')}
                </View>

                <View style={styles.row}>
                    {renderButton('0', () => handleNumberPress('0'), '#595959')}
                    {renderButton('.', () => handleNumberPress('.'), '#595959')}
                    {renderButton('', () => { }, '#595959')}
                    {renderButton('=', handleEqualPress, '#ff9412')}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#2b2b2b',
    },
    grid: {
        justifyContent: 'space-around',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0.5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default Calculator;
