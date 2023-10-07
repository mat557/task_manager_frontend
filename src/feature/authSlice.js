import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


const initialState = {
    user  : {},
    token : ''
}


export const getAccessToken = createAsyncThunk('auth/getAccessToken' , async( token , { dispatch, getState }) => {
    const result = await fetch(`http://localhost:7000/user/refresh/${token}`)
    const data = await result.json()
    dispatch(setData({ user:  data.user, token :data.access_token}))
})


const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers: {
        setData: (state,action) => {
            const { user , token } = action.payload
            state.user = user
            state.token = token
        },
        
        logout: (state,action) => {
            state.user = null
            state.token = null
            localStorage.removeItem('refresh_token')
        },

        setToken: (state,action) => {
            const { token } = action.payload
            state.token = token
        }
    }
}) 

export const { setData , logout , setToken } = authSlice.actions

export default authSlice.reducer

export  const accessToken = (state) => state.auth.token