import apis from "../apis/apis";

const demoApi = apis.injectEndpoints({
    endpoints: (builder) => ({
        getDemos: builder.query({
            query: () => `/demo_link_doc/`,
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
    }),
});

export const {
    useGetDemosQuery,
    useCreateDemoMutation,
    useAssignDemoToProjectMutation
} = demoApi;