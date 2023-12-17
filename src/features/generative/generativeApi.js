import apis from "../apis/apis";

export const generativeApi = apis.injectEndpoints({
    endpoints: (builder) => ({
        generateText: builder.mutation({
            query: (data) => ({
                url: `/generate_description/`,
                method: 'POST',
                body: data
            })
        }),
    })
});

export const { useGenerateTextMutation } = generativeApi;