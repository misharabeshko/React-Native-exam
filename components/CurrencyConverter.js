import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const CurrencyConverter = ({ amount, convertedAmount }) => {
    const navigation = useNavigation();

    const { currencyFrom, currencyTo } = useSelector(state => state.currency);

    const handlePressCurrency = (currencyType) => {
        navigation.navigate('CurrencySelection', { currencyType });
    };

    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.inputField} onPress={() => handlePressCurrency('currencyFrom')}>
                <View style={styles.row}>
                    <View style={styles.countryContainer}>
                        <Image source={currencyFrom.flag} style={styles.flag} />
                        <Text style={styles.countryText}>{currencyFrom.code}</Text>
                    </View>
                    <Text style={styles.sum}>
                        {amount}
                    </Text>
                </View>
            </TouchableOpacity>

            <View style={styles.separator} />

            <TouchableOpacity style={styles.inputField} onPress={() => handlePressCurrency('currencyTo')}>
                <View style={styles.row}>
                    <View style={styles.countryContainer}>
                        <Image source={currencyTo.flag} style={styles.flag} />
                        <Text style={styles.countryText}>{currencyTo.code}</Text>
                    </View>
                    <Text style={styles.sum}>
                        {convertedAmount}
                    </Text>
                </View>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2b2b2b',
        width: '100%',
    },
    inputField: {
        width: '100%',
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        alignItems: 'center',
    },
    countryContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    flag: {
        width: 32,
        height: 32,
        resizeMode: 'cover',
        marginBottom: 4,
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 16,
    },
    countryText: {
        fontSize: 17,
        color: '#fff',
    },
    sum: {
        fontSize: 35,
        color: '#fff',
    },
    separator: {
        width: '100%',
        height: 0.5,
        backgroundColor: '#595959',
        marginVertical: 5,
    },
});

export default CurrencyConverter;
