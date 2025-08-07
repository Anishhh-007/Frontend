import { configureStore } from '@reduxjs/toolkit';  
import  adminProfileSlice  from './slice/AdminProfileSlice';
import workerSlice from './slice/WorkerSlice.js'
import orderSlice from './slice/OrdersSlice.js'
import analyticSlice from './slice/AnalyticsSlice.js'
import workerDataSchema from './slice/WorkersDataSlice.js'
// import kitchenSlice from './slice/KitchenSlice.js'


const store = configureStore({
  reducer: {
    admin : adminProfileSlice,
    worker: workerSlice,
    order : orderSlice,
    analytics : analyticSlice,
    workerdata : workerDataSchema
    // kitchn : kitchenSlice
  }
});

export default store;
