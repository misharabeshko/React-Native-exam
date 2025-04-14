import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExchangeRates } from '../redux/exchangeRatesSlice';
import { useEffect } from 'react';

const Footer = () => {
    const dispatch = useDispatch();
    const { rates, formattedDate, loading } = useSelector((state) => state.exchangeRates);
    const { currencyFrom, currencyTo } = useSelector((state) => state.currency);

    const currentCurrency = currencyFrom;
    const rate = rates ? rates[currentCurrency.code + currencyTo.code] : null;

    // useEffect(() => {
    //     dispatch(fetchExchangeRates(currencyFrom.code));
    // }, [currencyFrom]);

    const handleUpdate = () => {
        dispatch(fetchExchangeRates(currencyFrom.code));
    };

    const rateInfo = rate ? rate.toFixed(2) : '...';

    return (
        <View style={styles.footer}>
            <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                {loading ? (
                    <ActivityIndicator color="white" size="small" />
                ) : (
                    <MaterialIcons name="autorenew" size={24} color="white" />
                )}
            </TouchableOpacity>

            <View style={styles.currencyInfo}>
                <Text style={styles.dateText}>
                    {formattedDate || 'Завантаження...'}
                </Text>
                <Text style={styles.rateText}>
                    1 {currencyFrom.code} = {rateInfo} {currencyTo.code}
                </Text>
            </View>

            <TouchableOpacity style={styles.moreButton}>
                <MaterialIcons name="more-vert" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#2b2b2b',
    },
    updateButton: {
        color: '#cccccc',
        padding: 4,
        borderRadius: 50,
    },
    currencyInfo: {
        alignItems: 'center',
        flex: 1,
    },
    dateText: {
        color: '#41ab5d',
        fontSize: 12,
        fontWeight: 'bold',
    },
    rateText: {
        color: '#cccccc',
        fontSize: 11,
        fontWeight: 'bold',
        marginTop: 5,
    },
    moreButton: {
        padding: 4,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#cccccc',
        color: '#cccccc',
    },
});

export default Footer;
