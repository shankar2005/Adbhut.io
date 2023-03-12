import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchText: ""
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.searchText = action.payload;
        },
    }
});

export const { setSearch } = filterSlice.actions;
export default filterSlice.reducer;