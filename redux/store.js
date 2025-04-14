import { configureStore } from '@reduxjs/toolkit';
import currencyReducer from './currencySlice';
import exchangeRatesReducer from './exchangeRatesSlice';

const store = configureStore({
  reducer: {
    currency: currencyReducer,
    exchangeRates: exchangeRatesReducer,
  },
});

export default store;
