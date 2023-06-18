import apis from "../apis/apis";

const demoApi = apis.injectEndpoints({
    endpoints: (builder) => ({
        getDemos: builder.query({
            query: () => `/demos_list/`,
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
        }),
        assignArtistToDemo: builder.mutation({
            query: ({ demoId, artistId }) => ({
                url: `/assign_demo_artist/${demoId}/`,
                method: 'PUT',
                body: {
                    artist: artistId
                }
            }),
        }),
    }),
});

export const {
    useGetDemosQuery,
    useCreateDemoMutation,
    useAssignDemoToProjectMutation,
    useAssignArtistToDemoMutation
} = demoApi;