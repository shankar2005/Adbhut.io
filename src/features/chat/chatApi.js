import apis from "../apis/apis";

const chatApi = apis.injectEndpoints({
    endpoints: (builder) => ({
        toggleChatGPT: builder.mutation({
            query: (data) => ({
                url: `/chat_toggle/`,
                method: 'PATCH',
                body: data
            })
        }),
        chatbotStatus: builder.query({
            query: (id) => `/chatbot_status/${id}/`,
        }),
    }),
});

export const { useToggleChatGPTMutation, useChatbotStatusQuery } = chatApi;