import {createSlice} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface InitialStateType {
    performance: number;
}

const initialState: InitialStateType = {
    performance: 30,
};
 
export const perfSlice = createSlice({
    name: 'performance',
    initialState,
    reducers: {
        setPerf: (state, action: {payload: number}) => {
            state.performance = action.payload; 
        },
        decrement: (state, action: {payload: number}) => {
            console.log(state.performance);
            state.performance = state.performance - action.payload
        },
        increment: (state, action: {payload: number}) => {
            console.log(state.performance);
            state.performance = state.performance + action.payload
        },
    },
});

export const perfState = (state: RootState) => state.perfReducer.performance;
export const state = (state: RootState) => state.perfReducer;

export const {decrement, setPerf, increment} = perfSlice.actions;

export default perfSlice.reducer;
