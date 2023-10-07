import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../feature/authSlice'
import { apiSlice } from './api/apiSclice'

export const store = configureStore({
    reducer : {
        [apiSlice.reducerPath] : apiSlice.reducer,
        auth : authSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools : true
})

