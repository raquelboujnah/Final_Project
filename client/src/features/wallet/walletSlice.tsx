import {createSlice} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface InitialStateType {
    wallet: number;
}

const initialState: InitialStateType = {
    wallet: 0,
};
 
export const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        setWallet: (state, action: {payload: number}) => {
            state.wallet = action.payload; 
        },
        decrement: (state, action: {payload: number}) => {
            state.wallet = state.wallet - action.payload
        },
        increment: (state, action: {payload: number}) => {            
            state.wallet = state.wallet + action.payload
        },
    },
});

export const walletState = (state: RootState) => state.walletReducer.wallet;
export const state = (state: RootState) => state.walletReducer;

export const {setWallet, decrement, increment} = walletSlice.actions;

export default walletSlice.reducer;
