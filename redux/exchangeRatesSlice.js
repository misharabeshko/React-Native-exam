import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchExchangeRates = createAsyncThunk(
  'exchangeRates/fetchExchangeRates',
  async (currencyFrom) => {
    const response = await axios.get(`https://api.exchangerate.host/live`, {
      params: {
        access_key: '3208eacd33a02bd6c87e6454bcbc1d28',
        source: currencyFrom,
      }
    });
    return response.data;
  }
);


const exchangeRatesSlice = createSlice({
  name: 'exchangeRates',
  initialState: {
    rates: {},
    timestamp: null,
    formattedDate: '',
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExchangeRates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExchangeRates.fulfilled, (state, action) => {
        state.rates = action.payload.quotes;

        const timestamp = action.payload.timestamp;
        const date = new Date(timestamp * 1000);
        state.formattedDate = date.toLocaleString();
        state.timestamp = timestamp;
        state.loading = false;
      })
      .addCase(fetchExchangeRates.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default exchangeRatesSlice.reducer;
