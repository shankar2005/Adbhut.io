import apis from "../apis/apis";

export const authApi = apis.injectEndpoints({
    endpoints: (builder) => ({
        verifyUser: builder.mutation({
            query: (data) => ({
                url: `/auth/verify/`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["CurrentProjects", "DreamProjects"]
        }),
        loginUser: builder.mutation({
            query: (data) => ({
                url: `/auth/login/`,
                method: 'POST',
                body: data
            })
        }),
        registerUser: builder.mutation({
            query: (data) => ({
                url: `/auth/register/`,
                method: 'POST',
                body: data
            })
        })
    })
});

export const { useVerifyUserMutation, useLoginUserMutation, useRegisterUserMutation } = authApi;
export default authApi;