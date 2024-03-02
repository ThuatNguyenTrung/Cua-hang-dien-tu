import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: localStorage.getItem("favorites")
    ? JSON.parse(localStorage.getItem("favorites"))
    : [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      if (
        !state.favorites.some((favorite) => favorite._id === action.payload._id)
      ) {
        state.favorites.push(action.payload);
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (favorite) => favorite._id !== action.payload._id
      );
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
