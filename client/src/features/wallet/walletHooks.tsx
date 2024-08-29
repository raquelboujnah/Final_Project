import { createSelector } from "@reduxjs/toolkit";
import { useSelector, useDispatch, useStore } from "react-redux";
import { useCallback } from "react";
import type { AppStore, AppDispatch, RootState } from "../../app/store";
import { setWallet, decrement, increment, state } from "./walletSlice";


export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

export const useWalletSelector = () => {
    return useAppSelector(
        createSelector([state], (state) => {            
            return state.wallet;
        })
    );
}; 

export const useWalletDecrement = () => {
    const dispatch = useDispatch();
    return useCallback((num: number) => {
        dispatch(decrement(num));
    }, [dispatch]);
};


export const useWalletIncrement = () => {
    const dispatch = useDispatch();
    return useCallback((num: number) => {
        dispatch(increment(num));
    }, [dispatch]);
};

export const useSetWallet = () => {
    const dispatch = useDispatch();
    return useCallback((num: number) => {
        dispatch(setWallet(num));
    }, [dispatch]);
}