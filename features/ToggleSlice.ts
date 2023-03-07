import { createSlice } from "@reduxjs/toolkit";

export const toggleSlice = createSlice({
  name: "toggleSlice",
  initialState: {
    chooseTrending: "",
    choosePopular: "",
    chooseTrailers: "",
  },
  reducers: {
    setChooseStore(state, action) {
      if (action.payload.type === "trending")
        state.chooseTrending = action.payload.value;
      if (action.payload.type === "popular")
        state.choosePopular = action.payload.value;
      if (action.payload.type === "trailers")
        state.chooseTrailers = action.payload.value;
    },
  },
});

export const { setChooseStore } = toggleSlice.actions;
export default toggleSlice.reducer;
