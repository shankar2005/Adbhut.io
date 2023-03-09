import apis from "../apis/apis";

const authApi = apis.injectEndpoints({
    endpoints: (builder) => ({
        verifyUser: builder.mutation({
            query: (data) => ({
                url: `/auth/verify/`,
                method: 'POST',
                body: data
            })
        })
    })
});

export const { useVerifyUserMutation } = authApi;
export default authApi;