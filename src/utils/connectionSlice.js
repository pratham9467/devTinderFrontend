import { createSlice } from "@reduxjs/toolkit";

const initialState = []; // Ensure initial state is an array

const connectionSlice = createSlice({
  name: "connections",
  initialState,
  reducers: {
    addConnections: (state, action) => {
      return action.payload; // Replace the state with the new array
    },
  },
});

export const { addConnections, removeConnections } = connectionSlice.actions;
export default connectionSlice.reducer;
