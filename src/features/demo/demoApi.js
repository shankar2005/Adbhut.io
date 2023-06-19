import apis from "../apis/apis";

const demoApi = apis.injectEndpoints({
    endpoints: (builder) => ({
        getDemos: builder.query({
            query: () => `/demos_list/`
        }),
        getDemoById: builder.query({
            query: (id) => `/get_project_demo/${id}/`,
            providesTags: ["Demo"]
        }),
        createDemo: builder.mutation({
            query: (data) => ({
                url: `/demo_link_doc/`,
                method: 'POST',
                body: data
            }),
        }),

        assignDemoToProject: builder.mutation({
            query: ({ id, data }) => ({
                url: `/assign_demo_project/${id}/`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ["Demo", "Project"]
        }),
        assignArtistToDemo: builder.mutation({
            query: ({ demoId, artistId }) => ({
                url: `/assign_demo_artist/${demoId}/`,
                method: 'PUT',
                body: {
                    artist: artistId
                }
            }),
            invalidatesTags: ["Demo"]
        }),
        assignCollabToDemo: builder.mutation({
            query: ({ demoId, artistId }) => ({
                url: `/assign_demo_artist/${demoId}/`,
                method: 'PUT',
                body: {
                    assigned_artists: [artistId]
                }
            }),
            invalidatesTags: ["Demo"]
        }),
        unassignArtistFromDemo: builder.mutation({
            query: ({ demoId, artistId }) => ({
                url: `/un_assign_demo_artist/${demoId}/`,
                method: 'PUT',
                body: {
                    artist_ids: [artistId]
                }
            }),
            invalidatesTags: ["Demo"]
        }),
    }),
});

export const {
    useGetDemosQuery,
    useGetDemoByIdQuery,
    useCreateDemoMutation,
    useAssignDemoToProjectMutation,
    useAssignArtistToDemoMutation,
    useAssignCollabToDemoMutation,
    useUnassignArtistFromDemoMutation
} = demoApi;