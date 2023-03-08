import apis from "../apis/apis";

const projectApi = apis.injectEndpoints({
    endpoints: (builder) => ({
        getDreamProjects: builder.query({
            query: () => `/get_dreamproject/`
        })
    }),
});

export const { useGetDreamProjectsQuery } = projectApi;