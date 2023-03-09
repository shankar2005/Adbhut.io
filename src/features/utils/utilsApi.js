import apis from "../apis/apis";

const utilsApi = apis.injectEndpoints({
    endpoints: (builder) => ({
        getSkills: builder.query({
            query: () => `/get_skill/`
        }),
        getLocations: builder.query({
            query: () => `/get_location/`
        }),
        getContentProducts: builder.query({
            query: () => `/get_content_products/`
        }),
    })
});

export const { useGetSkillsQuery, useGetLocationsQuery, useGetContentProductsQuery } = utilsApi;