export const dropdownInitialState = {
    skillDropdown: false,
    locationDropdown: false,
    loginModal: false,
    accountModal: false,
    searchAndFilterModal: false
}

export const dropdownReducers = (state, action) => {
    switch (action.type) {
        case "SHOW_SKILL":
            return {
                ...state,
                skillDropdown: !state.skillDropdown,
                locationDropdown: false,
            }
        case "SHOW_LOCATION":
            return {
                ...state,
                skillDropdown: false,
                locationDropdown: !state.locationDropdown,
            }
        case "SHOW_LOGIN":
            return {
                ...state,
                loginModal: !state.loginModal,
            }
        case "SHOW_ACCOUNT":
            return {
                ...state,
                accountModal: !state.accountModal,
            }
        // case "SHOW_SEARCH_AND_FILTER_MODAL":
        //     return {
        //         ...state,
        //         searchAndFilterModal: !state.searchAndFilterModal,
        //     }
        case "BODY_TAP_ALL_MODAL_CLOSE":
            return dropdownInitialState;
        default:
            return state;
    }
}