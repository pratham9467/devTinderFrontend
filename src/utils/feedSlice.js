import { createSlice } from "@reduxjs/toolkit";

const feedSice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload,
    removerFeed: () => null,
  },
});

export const { addFeed, removeFeed } = feedSice.actions;
export default feedSice.reducer;
