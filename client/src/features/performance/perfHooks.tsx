import { createSelector } from "@reduxjs/toolkit";
import { useSelector, useDispatch, useStore } from "react-redux";
import { useCallback } from "react";
import type { AppStore, AppDispatch, RootState } from "../../app/store";
import { decrement, increment, setPerf, state} from "./perfSlice";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

export const usePerfSelector = () => {
    return useAppSelector(
        createSelector([state], (state) => {
          return state.performance;
        })
    );
}; 

export const usePerfDecrement = () => {
    const dispatch = useDispatch();
    return useCallback((num: number) => {
        dispatch(decrement(num));
    }, [dispatch]);
};

export const useIncrement = () => {
    const dispatch = useDispatch();
    return useCallback((num: number) => {
        dispatch(increment(num));
    }, [dispatch]);
};

export const useSetPerf = () => {
    const dispatch = useDispatch();
    return useCallback((num: number) => {
        dispatch(setPerf(num));
    }, [dispatch]);
};