import React from 'react';
import { useSelector } from 'react-redux';
import ArtistSquareView from './Components/View/ArtistSquareView';

const ShortlistedArtists = () => {
    const { shortlistedArtists } = useSelector(state => state.project);

    return (
        <div className='grid grid-cols-2 gap-2'>
            {
                shortlistedArtists?.map((artist, idx) => <ArtistSquareView key={idx} artist={artist} />)
            }
        </div>
    );
};

export default ShortlistedArtists;