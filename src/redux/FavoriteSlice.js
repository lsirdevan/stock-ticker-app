import { createSlice } from "@reduxjs/toolkit";

export const FavoriteSlice = createSlice({
    name: "FavoriteSlice",
    initialState: {
        favorites: []
    },
    reducers: {
        addFavorite: (state, action) => {
            state.favorites.push(action.payload);
        },
        removeFavorite: (state, action) => ({
            favorites: state.favorites.filter(item => item['1. symbol'] !== action.payload['1. symbol'])
        })
    }
});

export const { addFavorite, removeFavorite } = FavoriteSlice.actions;
export default FavoriteSlice.reducer;
