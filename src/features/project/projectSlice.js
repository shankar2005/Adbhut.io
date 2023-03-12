import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title: "",
    project_template: "",
    reference_links: "",
    post_project_client_feedback: "",
}

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
    },
});

export const { } = projectSlice.actions;
export default projectSlice.reducer;