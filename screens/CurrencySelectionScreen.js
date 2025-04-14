import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import currencies from '../currencies';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrencyFrom, setCurrencyTo } from '../redux/currencySlice';

const CurrencySelectionScreen = ({ navigation, route }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();

    const { currencyFrom, currencyTo } = useSelector((state) => state.currency);

    const filteredCurrencies = currencies.filter((currency) =>
        currency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        currency.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelect = (currency) => {
        if (route.params?.currencyType === 'currencyFrom') {
            if (currencyTo.code === currency.code) {
                dispatch(setCurrencyTo(currencyFrom));
                dispatch(setCurrencyFrom(currency));
            } else {
                dispatch(setCurrencyFrom(currency));
            }
        } else if (route.params?.currencyType === 'currencyTo') {
            if (currencyFrom.code === currency.code) {
                dispatch(setCurrencyFrom(currencyTo));
                dispatch(setCurrencyTo(currency));
            } else {
                dispatch(setCurrencyTo(currency));
            }
        }
        navigation.goBack();
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.inputField} onPress={() => handleSelect(item)}>
            <View style={styles.row}>
                <Image source={item.flag} style={styles.flag} />
                <Text style={styles.currencyName}>{item.name}</Text>
                <Text style={styles.currencyCode}>{item.code}</Text>
            </View>
        </TouchableOpacity>
    );

    const separator = () => <View style={styles.separator} />;

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Пошук валюти..."
                placeholderTextColor="#aaa"
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
                keyboardAppearance="dark"
            />

            <FlatList
                data={filteredCurrencies}
                keyExtractor={(item) => item.code}
                renderItem={renderItem}
                ItemSeparatorComponent={separator}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2b2b2b',
        paddingTop: 20,
    },
    searchInput: {
        height: 40,
        backgroundColor: '#404040',
        borderRadius: 8,
        margin: 10,
        paddingHorizontal: 15,
        paddingVertical: 5,
        color: '#fff',
        fontSize: 16,
    },
    inputField: {
        width: '100%',
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        alignItems: 'center',
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
    currencyName: {
        fontSize: 17,
        color: '#fff',
        marginLeft: 10,
        flex: 1,
    },
    currencyCode: {
        fontSize: 17,
        color: '#fff',
    },
    separator: {
        width: '100%',
        height: 0.5,
        backgroundColor: '#595959',
    },
});

export default CurrencySelectionScreen;
