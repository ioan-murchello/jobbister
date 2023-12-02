
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/userSlice';
import jobSlice from './features/jobSlice';
import allJobsSlice from './features/allJobsSlice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        job: jobSlice,
        allJobs: allJobsSlice
    },
})