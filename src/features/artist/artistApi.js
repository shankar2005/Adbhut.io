import apis from "../apis/apis";

const artistApi = apis.injectEndpoints({
    endpoints: (builder) => ({
        getArtistById: builder.query({
            query: (id) => `/get_artist/${id}/`
        }),
        addArtist: builder.mutation({
            query: (data) => ({
                url: `/artist_action/`,
                method: "POST",
                body: data
            })
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
    })
});

export const {
    useGetArtistByIdQuery,
    useAddArtistMutation,
    useShortlistArtistMutation,
    useAssignArtistMutation,
    useDeclineArtistMutation,
    useUnAssignArtistMutation,
    useGetShortlistedArtistsQuery
} = artistApi;