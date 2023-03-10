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
    })
});

export const { useGetArtistByIdQuery, useAddArtistMutation, useShortlistArtistMutation } = artistApi;