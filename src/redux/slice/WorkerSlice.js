import { createSlice } from "@reduxjs/toolkit";

const WorkerSlice = createSlice({
    name : "worker" , 
    initialState : null,
    reducers :{
        workerProfile : (state , action ) =>{
            return action.payload
        },
        removeWorker : (state , action) => {
            return null
        }

    }
})

export const {workerProfile , removeWorker} = WorkerSlice.actions
export default WorkerSlice.reducer