import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isFullTime: false,
};

const viewModeSlice = createSlice({
    name: 'viewMode',
    initialState,
    reducers: {
        setViewMode: (state) => {
            state.isFullTime = !state.isFullTime
        },
    },
});

export const { setViewMode } = viewModeSlice.actions;
export default viewModeSlice.reducer;