import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apis = createApi({
    reducerPath: 'apis',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://dev.nsnco.in/api/v1',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('Authorization', `token ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({}),
    tagTypes: ["DreamProjects", "CurrentProjects", "Project", "ArtistRequests", "Artists", "Artist", "ArtistWorkLinks"]
})

export default apis;