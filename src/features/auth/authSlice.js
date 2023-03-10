import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    token: null,
    isLoading: false,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    // extraReducers: (builder) => {
    //     builder.addCase(loginUser.pending, (state) => {
    //         state.isLoading = true;
    //         state.error = null
    //     })
    //     builder.addCase(loginUser.fulfilled, (state, action) => {
    //         state.isLoading = false;
    //         state.token = action.payload
    //     })
    //     builder.addCase(loginUser.rejected, (state, action) => {
    //         state.isLoading = false;
    //         state.token = null;
    //         state.error = action.error;
    //     })
    // }
});

export const { setUser, setLoading, setError, setToken } = authSlice.actions;
export default authSlice.reducer;