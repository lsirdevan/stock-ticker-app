import { createSlice } from "@reduxjs/toolkit";
import { api } from './api';

export const QuerySlice = createSlice({
    name: "results",
    initialState: {
        bestMatches: [],
        details: [],
    },
    reducers: {
        resetMatches: (state, {payload}) => {
            state.bestMatches = []
        },
        setTickerDetails: (state, {payload}) => {
            state.details = payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                api.endpoints.searchBySymbol.matchFulfilled,
                (state, { payload }) => {
                    state.bestMatches = payload.bestMatches;
                })
    },
});

export const { resetMatches, setTickerDetails } = QuerySlice.actions;
export default QuerySlice.reducer;
