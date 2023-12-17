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
        extractText: builder.mutation({
            query: (data) => ({
                url: `/extract_text/`,
                method: 'POST',
                body: data
            })
        }),
    })
});

export const { useGenerateTextMutation, useExtractTextMutation } = generativeApi;