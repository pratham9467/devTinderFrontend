import { createSlice } from "@reduxjs/toolkit";

const feedSice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    addFeed: (state, action) => action.payload,
    removeFeed: (state, action) => {
      const newFeed = state.filter((user) => user._id !== action.payload);
      return newFeed;
    },
  },
});

export const { addFeed, removeFeed } = feedSice.actions;
export default feedSice.reducer;
