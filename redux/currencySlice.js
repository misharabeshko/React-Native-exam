import { createSlice } from '@reduxjs/toolkit';
import currencies from '../currencies';

const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    currencyFrom: currencies[0],
    currencyTo: currencies[1],
  },
  reducers: {
    setCurrencyFrom: (state, action) => {
      state.currencyFrom = action.payload;
    },
    setCurrencyTo: (state, action) => {
      state.currencyTo = action.payload;
    },
  },
});

export const { setCurrencyFrom, setCurrencyTo } = currencySlice.actions;
export default currencySlice.reducer;
