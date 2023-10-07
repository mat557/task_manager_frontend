import { createApi , fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    name:'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:7000`,
    }) ,
    endpoints: () => ({}),
})
