import { createSlice } from "@reduxjs/toolkit";

const workerDataSchema = createSlice({
  name: "Workers Data",
  initialState: [],
  reducers: {
    addWorkerData: (state, action) => {
      return action.payload;
    }
  }
});

export const { addWorkerData } = workerDataSchema.actions;
export default workerDataSchema.reducer;
