import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // required
    shortlistedArtists: [],
    selectedContentProduct: null,
    chatLog: [],

    // optional
    title: "",
    reference_links: [],
    post_project_client_feedback: "",

    // not part of the project just confirming
    referenceLinksHasTaken: false
}

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        // chatlog
        addChatLog: (state, action) => {
            state.chatLog.push(action.payload);
        },
        setChatLog: (state, action) => {
            state.chatLog = action.payload;
        },
        removeChatLog: (state, action) => {
            state.chatLog = state.chatLog.filter(msg => msg.msgID !== action.payload);
        },

        // artist
        addArtist: (state, action) => {
            state.shortlistedArtists.push(action.payload);
        },
        setArtist: (state, action) => {
            state.shortlistedArtists = action.payload;
        },
        removeArtist: (state, action) => {
            state.shortlistedArtists = state.shortlistedArtists.pop(action.payload);
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
            state.referenceLinksHasTaken = true;
        },
        setClientFeedback: (state, action) => {
            state.post_project_client_feedback = action.payload;
        },

        setProjectData: (state, action) => {
            const { shortlistedArtists, selectedContentProduct, chatLog, ...otherFields } = action.payload;

            state.chatLog = chatLog
            state.shortlistedArtists = shortlistedArtists
            state.selectedContentProduct = selectedContentProduct

            // Merge any other fields that are not part of the initial state
            Object.keys(otherFields).forEach(key => {
                if (key === "brief" || key === "shortlisted_artists_details" || key === "project_template") return;
                state[key] = otherFields[key];
            });
        },

        setReferenceLinksHasTaken: (state) => {
            state.referenceLinksHasTaken = true;
        },

        clearProject: () => initialState
    },
});

export const { addChatLog, setChatLog, removeChatLog, clearProject, addArtist, setArtist, removeArtist, setContentProduct, setTitle, setReferenceLinks, setClientFeedback, setProjectData, setReferenceLinksHasTaken } = projectSlice.actions;
export default projectSlice.reducer;