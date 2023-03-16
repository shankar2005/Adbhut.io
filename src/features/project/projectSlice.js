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
        addChatLog: (state, action) => {
            state.chatLog.push(action.payload);
        },
        setChatLog: (state, action) => {
            state.chatLog = action.payload;
        },
        popChatLog: (state, action) => {
            state.chatLog = state.chatLog.filter(msg => msg.msgID !== action.payload);
        },
        clearProject: (state) => {
            state.chatLog = []
            state.shortlistedArtists = []
            state.selectedContentProducts = null
        }
    },
});

export const { addChatLog, setChatLog, popChatLog, clearProject } = projectSlice.actions;
export default projectSlice.reducer;