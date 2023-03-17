import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // required
    shortlistedArtists: [],
    selectedContentProduct: null,
    chatLog: [],
    
    // optional
    title: "",
    referenceLinks: "",
    clientFeedback: "",
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
            state.referenceLinks = action.payload;
        },
        setClientFeedback: (state, action) => {
            state.clientFeedback = action.payload;
        },


        clearProject: (state) => {
            state.chatLog = []
            state.shortlistedArtists = []
            state.selectedContentProduct = null
        }
    },
});

export const { addChatLog, setChatLog, removeChatLog, clearProject, addArtist, setArtist, removeArtist, setContentProduct, setTitle, setReferenceLinks, setClientFeedback } = projectSlice.actions;
export default projectSlice.reducer;