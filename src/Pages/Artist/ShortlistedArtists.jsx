import React from 'react';
import { useSelector } from 'react-redux';
import { useGetShortlistedArtistsQuery } from '../../features/artist/artistApi';
import ArtistSquareView from './Components/View/ArtistSquareView';

const ShortlistedArtists = () => {
    const { shortlistedArtists } = useSelector(state => state.project);
    const { data } = useGetShortlistedArtistsQuery(shortlistedArtists.join(","));

    console.log(data?.artists);

    return (
        <div className='grid grid-cols-2 gap-2'>
            {
                shortlistedArtists?.map((artist, idx) => <ArtistSquareView key={idx} artist={artist} />)
            }
        </div>
    );
};

export default ShortlistedArtists;