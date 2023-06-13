import apis from "../apis/apis";

const artistApi = apis.injectEndpoints({
    endpoints: (builder) => ({
        getArtists: builder.query({
            query: ({ page, search }) => `/artist_list/?page=${page}&search=${search}`,
            providesTags: ["Artists"]
        }),
        getArtistById: builder.query({
            query: (id) => `/get_artist/${id}/`,
            providesTags: ["Artist"]
        }),
        addArtist: builder.mutation({
            query: (data) => ({
                url: `/artist_action/`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Project"]
        }),
        updateArtist: builder.mutation({
            query: ({ id, data }) => ({
                url: `/artist_action/${id}/`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Project", "Artist"]
        }),
        deleteArtist: builder.mutation({
            query: (id) => ({
                url: `/artist_action/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Project", "Artists"]
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
        getTotalArtist: builder.query({
            query: () => `/total_artist/`,
        }),

        // work link
        getArtistWrokLinks: builder.query({
            query: (id) => `/artist_works_links/${id}/`,
            providesTags: ["ArtistWorkLinks"]
        }),
        createWrokLink: builder.mutation({
            query: ({ id, data }) => ({
                url: `/artist_create_link/${id}/`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Artist", "ArtistWorkLinks"]
        }),
        updateWrokLink: builder.mutation({
            query: ({ id, data }) => ({
                url: `/edit_tags/${id}/`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Artist"]
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
    useDeleteArtistRequestMutation,
    useDeleteArtistMutation,
    useUpdateArtistMutation,
    useGetTotalArtistQuery,
    useUpdateWrokLinkMutation,
    useCreateWrokLinkMutation,
    useGetArtistWrokLinksQuery
} = artistApi;