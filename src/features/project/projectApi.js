import apis from "../apis/apis";

const projectApi = apis.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentProjects: builder.query({
            query: () => `/all_projects/`,
            providesTags: ["CurrentProjects"]
        }),
        getDreamProjects: builder.query({
            query: () => `/get_dreamproject/`,
            providesTags: ["DreamProjects"]
        }),
        getProject: builder.query({
            query: (id) => `/edit_project/${id}/`
        }),
        createProject: builder.mutation({
            query: (data) => ({
                url: `/create_new_project/`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["DreamProjects", "CurrentProjects"]
        }),
        deleteProject: builder.mutation({
            query: (id) => ({
                url: `/delete_project/${id}/`,
                method: 'DELETE'
            }),
            invalidatesTags: ["DreamProjects", "CurrentProjects"]
        }),
        updateProject: builder.mutation({
            query: ({ id, data }) => ({
                url: `/edit_project/${id}/`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ["DreamProjects", "CurrentProjects"]
        }),
    }),
});

export const {
    useGetDreamProjectsQuery,
    useGetProjectQuery,
    useGetCurrentProjectsQuery,
    useCreateProjectMutation,
    useDeleteProjectMutation,
    useUpdateProjectMutation,
} = projectApi;