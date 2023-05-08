import apis from "../apis/apis";

const artistApi = apis.injectEndpoints({
    endpoints: (builder) => ({
        getArtists: builder.query({
            query: (page) => `/artist_list/?page=${page}`
        }),
        getArtistById: builder.query({
            query: (id) => `/get_artist/${id}/`
        }),
        addArtist: builder.mutation({
            query: (data) => ({
                url: `/artist_action/`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Project"]
        }),

        shortlistArtist: builder.mutation({
            query: ({ projectId, artistId }) => ({
                url: `/shortlist_artist/${projectId}/${artistId}/`,
                method: "PATCH",
            })
        }),

        assignArtist: builder.mutation({
            query: ({ projectId, artistId }) => ({
                url: `/assign_artist/${projectId}/${artistId}/`,
                method: "PATCH",
            }),
            invalidatesTags: ["Project"]
        }),
        unAssignArtist: builder.mutation({
            query: ({ projectId, artistId }) => ({
                url: `/unassign_artist/${projectId}/${artistId}/`,
                method: "PATCH",
            }),
            invalidatesTags: ["Project"]
        }),
        declineArtist: builder.mutation({
            query: ({ projectId, artistId }) => ({
                url: `/decline_artist/${projectId}/${artistId}/`,
                method: "PATCH",
            }),
            invalidatesTags: ["Project"]
        }),

        getShortlistedArtists: builder.query({
            query: (ids) => `/artist_action/?id=${ids}`
        }),

        // artist request
        getArtistRequests: builder.query({
            query: () => `/artist_request_action/`,
            providesTags: ["ArtistRequests"]
        }),
        getArtistRequest: builder.query({
            query: (id) => `/artist_request_action/${id}/`,
            providesTags: ["ArtistRequests"]
        }),
        addArtistRequest: builder.mutation({
            query: (data) => ({
                url: `/artist_request_action/`,
                method: "POST",
                body: data
            })
        }),
        deleteArtistRequest: builder.mutation({
            query: (id) => ({
                url: `/artist_request_action/${id}/`,
                method: "DELETE"
            }),
            invalidatesTags: ["ArtistRequests"]
        }),
    })
});

export const {
    useGetArtistByIdQuery,
    useAddArtistMutation,
    useShortlistArtistMutation,
    useAssignArtistMutation,
    useDeclineArtistMutation,
    useUnAssignArtistMutation,
    useGetShortlistedArtistsQuery,
    useGetArtistsQuery,
    useGetArtistRequestsQuery,
    useGetArtistRequestQuery,
    useAddArtistRequestMutation,
    useDeleteArtistRequestMutation
} = artistApi;