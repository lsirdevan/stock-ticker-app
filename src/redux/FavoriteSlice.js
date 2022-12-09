import { createSlice } from "@reduxjs/toolkit";

export const FavoriteSlice = createSlice({
    name: "FavoriteSlice",
    initialState: {
        //TODO: add initial state
    },
    reducers: {
        //TODO: add reducers
        setFavorites: (state, action) => {
            state = action.payload;
        }
    }
});

export const { setFavorites } = FavoriteSlice.actions;
export default FavoriteSlice.reducer;
