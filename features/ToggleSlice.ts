import { createSlice } from "@reduxjs/toolkit";

export const toggleSlice = createSlice({
  name: "toggleSlice",
  initialState: {
    chooseTrending: "",
    choosePopular: "",
  },
  reducers: {
    setChooseStore(state, action) {
      console.log(action);
      if (action.payload.type === "trending") state.chooseTrending = action.payload.value;
      if (action.payload.type === "popular") state.choosePopular = action.payload.value;
    },
  },
});

export const { setChooseStore } = toggleSlice.actions;
export default toggleSlice.reducer;
