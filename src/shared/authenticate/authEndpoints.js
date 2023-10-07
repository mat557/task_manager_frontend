import { apiSlice } from "../../app/api/apiSclice";

export const authEndpoints = apiSlice.injectEndpoints({ 
    endpoints: builder => ({
        createUser : builder.mutation({
            query : (credentials) => ({
                url: `/auth/new`,
                method: 'PUT',
                body: (credentials)
            })
        }),


        loginUser : builder.mutation({
            query : (credentials) => ({
                url: `/auth/login`,
                method: 'POST',
                body: (credentials)
            })
        }),

        getUserByToken : builder.query({
            query: (token)  => ({
                url: `/user/refresh/${token}`,
                method: 'GET'
            })
        })


    })
})



export const {
    useCreateUserMutation,
    useLoginUserMutation,
    useGetUserByTokenQuery
} = authEndpoints