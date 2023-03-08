import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    loading: true
}

const authSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
    }
});