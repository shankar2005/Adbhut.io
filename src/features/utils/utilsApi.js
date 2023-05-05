import apis from "../apis/apis";

const utilsApi = apis.injectEndpoints({
    endpoints: (builder) => ({
        getSkills: builder.query({
            query: () => `/get_skill/`
        }),
        getLocations: builder.query({
            query: () => `/get_location/`
        }),
        getLanguages: builder.query({
            query: () => `/get_languages/`
        }),
        getContentProducts: builder.query({
            query: () => `/get_content_products/`
        }),

        getSkillsOnProductSelect: builder.mutation({
            query: (data) => ({
                url: `/chatflow_skills/`,
                method: 'POST',
                body: data
            })
        }),
    })
});

export const { useGetSkillsQuery, useGetLocationsQuery, useGetLanguagesQuery, useGetContentProductsQuery, useGetSkillsOnProductSelectMutation } = utilsApi;