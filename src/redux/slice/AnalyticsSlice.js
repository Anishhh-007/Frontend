import { createSlice } from "@reduxjs/toolkit";

const AnalyticSlice = createSlice({
    name : "analytics",
    initialState : [] , 
    reducers:{
        addAnalytics : (state , action) =>{
            return action.payload
        }
    }
})

export const { addAnalytics } = AnalyticSlice.actions;
export default AnalyticSlice.reducer;