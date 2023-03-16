import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shortlistedArtists: [],
    selectedContentProducts: null,
    chatLog: [],
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


        clearProject: (state) => {
            state.chatLog = []
            state.shortlistedArtists = []
            state.selectedContentProducts = null
        }
    },
});

export const { addChatLog, setChatLog, removeChatLog, clearProject, addArtist, setArtist, removeArtist } = projectSlice.actions;
export default projectSlice.reducer;