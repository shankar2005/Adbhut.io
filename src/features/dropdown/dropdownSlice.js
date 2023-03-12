import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    skillDropdown: false,
    locationDropdown: false,
    loginModal: false,
    accountModal: false,
}

const dropdownSlice = createSlice({
    name: 'dropdown',
    initialState,
    reducers: {
        showSkill: (state) => {
            state.skillDropdown = !state.skillDropdown
            state.locationDropdown = false
        },
        showLocation: (state) => {
            state.skillDropdown = false
            state.locationDropdown = !state.locationDropdown
        },
        showAccount: (state) => {
            state.accountModal = !state.accountModal
        },
        closeAllDropdown: (state) => {
            state.skillDropdown = false
            state.locationDropdown = false
            state.loginModal = false
            state.accountModal = false
        },
        showLogin: (state) => {
            state.loginModal = true
        },
        closeLogin: (state) => {
            state.loginModal = false
        },
    }
})

export const { showSkill, showLocation, showAccount, closeAllDropdown, showLogin, closeLogin } = dropdownSlice.actions;
export default dropdownSlice.reducer;