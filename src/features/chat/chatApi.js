import apis from "../apis/apis";

const chatApi = apis.injectEndpoints({
    endpoints: (builder) => ({
        sendMessage: builder.mutation({
            query: (data) => ({
                url: `/create_project/`,
                method: 'PATCH',
                body: data
            })
        }),
        sendMessageToGPT: builder.mutation({
            query: (data) => ({
                url: `/openai/`,
                method: 'POST',
                body: data
            })
        }),
    }),
});

export const { useSendMessageMutation, useSendMessageToGPTMutation } = chatApi;