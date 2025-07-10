import { configureStore } from '@reduxjs/toolkit';
import groupReducer from './GroupSlice';
// definign store
const store = configureStore({
  reducer: {
    group: groupReducer, // buat use selector
  },
});

export default store;
