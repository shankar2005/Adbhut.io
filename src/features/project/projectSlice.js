import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title: "",
    selectedContentProduct: null,
    reference_links: "",
    shortlistedArtists: [],
    post_project_client_feedback: "",
    project_demo: "",
}

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        // artist
        addArtist: (state, action) => {
            state.shortlistedArtists.push(action.payload);
        },
        setArtist: (state, action) => {
            state.shortlistedArtists = action.payload;
        },
        removeArtist: (state, action) => {
            const copy = [...state.shortlistedArtists];
            copy.pop(action.payload);
            state.shortlistedArtists = copy;
        },

        // content product
        setContentProduct: (state, action) => {
            state.selectedContentProduct = action.payload;
        },

        // optional project fields
        setTitle: (state, action) => {
            state.title = action.payload;
        },
        setReferenceLinks: (state, action) => {
            state.reference_links = action.payload;
        },
        setClientFeedback: (state, action) => {
            state.post_project_client_feedback = action.payload;
        },
        setDemo: (state, action) => {
            state.project_demo = action.payload;
        },

        setProjectData: (state, action) => {
            const { shortlistedArtists, selectedContentProduct, ...otherFields } = action.payload;

            state.shortlistedArtists = shortlistedArtists
            state.selectedContentProduct = selectedContentProduct

            // Merge any other fields that are not part of the initial state
            Object.keys(otherFields).forEach(key => {
                if (key === "brief" || key === "shortlisted_artists_details" || key === "project_template") return;
                state[key] = otherFields[key];
            });
        },

        clearProject: () => initialState
    },
});

export const { clearProject, addArtist, setArtist, removeArtist, setContentProduct, setTitle, setReferenceLinks, setClientFeedback, setProjectData, setDemo } = projectSlice.actions;
export default projectSlice.reducer;