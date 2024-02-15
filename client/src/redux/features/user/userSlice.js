import { createSlice } from '@reduxjs/toolkit'
import { userLogin, userRegister } from './userActions'

const token = localStorage.getItem('token')
    ? localStorage.getItem('token')
    : null

const initialState = {
    loading: false,
    user: null,
    token,
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        //Login User
        builder.addCase(userLogin.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(userLogin.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.user = payload.user;
            state.token = payload.token
        })
        builder.addCase(userLogin.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        })
        //Register User
        builder.addCase(userRegister.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(userRegister.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.user = payload.user;
        })
        builder.addCase(userRegister.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        })
    },
})

export default userSlice;