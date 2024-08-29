import { configureStore, combineReducers } from '@reduxjs/toolkit';
import walletReducer from '../features/wallet/walletSlice'
import perfReducer from '../features/performance/perfSlice';

const combineReducersApp = combineReducers({ walletReducer, perfReducer });

const store = configureStore({
  reducer: combineReducersApp,
});


export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export default store;