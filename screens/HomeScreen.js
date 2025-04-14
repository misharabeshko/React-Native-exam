import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CurrencyConverter from '../components/CurrencyConverter';
import Calculator from '../components/Calculator';
import Footer from '../components/Footer';
import { fetchExchangeRates } from '../redux/exchangeRatesSlice';

const HomeScreen = () => {
    const dispatch = useDispatch();

    const [amount, setAmount] = useState('0');
    const [convertedAmount, setConvertedAmount] = useState('0');
    const { rates } = useSelector((state) => state.exchangeRates);
    const { currencyFrom, currencyTo } = useSelector((state) => state.currency);


    const rateKey = currencyFrom.code + currencyTo.code;
    const rate = rates?.[rateKey] || 0;

    useEffect(() => {
        if (currencyFrom?.code) {
            dispatch(fetchExchangeRates(currencyFrom.code));
        }
    }, [currencyFrom, dispatch]);

    const handleCalculatorChange = (value) => {
        const validValue = value === '' ? '0' : value;
        setAmount(validValue);

        const converted = parseFloat(validValue) * rate;

        setConvertedAmount(converted.toFixed(2));

        console.log(`value: ${validValue}`);
    };
    

    return (
        <View style={styles.container}>
            <CurrencyConverter
                amount={amount}
                convertedAmount={convertedAmount}
            />
            <Calculator onInputChange={handleCalculatorChange} />
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2b2b2b',
    },

});

export default HomeScreen;
