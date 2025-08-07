import { createSlice } from "@reduxjs/toolkit";

const adminProfileSlice = createSlice({
    name:"admin",
    initialState : null,
    reducers :{
        adminProfile : (state , action) =>{
             return action.payload
        },
        removeProfile : (state , action) =>{
             return null
        }
    }
})

export const { adminProfile , removeProfile } = adminProfileSlice.actions;


export default adminProfileSlice.reducer;