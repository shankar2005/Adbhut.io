import apis from "../apis/apis";

const projectApi = apis.injectEndpoints({
    endpoints: (builder) => ({
        getDreamProjects: builder.query({
            query: () => `/get_dreamproject/`
        }),
        getProject: builder.query({
            query: (id) => `/edit_project/${id}/`
        })
    }),
});

export const { useGetDreamProjectsQuery, useGetProjectQuery } = projectApi;