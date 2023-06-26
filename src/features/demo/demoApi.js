import apis from "../apis/apis";

const demoApi = apis.injectEndpoints({
    endpoints: (builder) => ({
        getDemos: builder.query({
            query: () => `/demos_list/`,
            providesTags: ["Demos"]
        }),
        getDemoById: builder.query({
            query: (id) => `/get_project_demo/${id}/`,
            providesTags: ["Demo"]
        }),
        getDemoByArtist: builder.query({
            query: (artistId) => `/get_artist_demos/${artistId}/`,
            providesTags: ["ArtistDemos"]
        }),
        createDemo: builder.mutation({
            query: (data) => ({
                url: `/demo_link_doc/`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["Demos", "ArtistDemos"]
        }),

        assignDemoToProject: builder.mutation({
            query: ({ id, data }) => ({
                url: `/assign_demos_to_project/${id}/`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ["Demo", "Project"]
        }),
        assignProjectToDemo: builder.mutation({
            query: ({ id, data }) => ({
                url: `/assign_project_to_demo/${id}/`,
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
    useAssignProjectToDemoMutation,
    useAssignArtistToDemoMutation,
    useAssignCollabToDemoMutation,
    useUnassignArtistFromDemoMutation,
    useGetDemoByArtistQuery
} = demoApi;