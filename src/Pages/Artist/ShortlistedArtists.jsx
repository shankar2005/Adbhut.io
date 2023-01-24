import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRootContext } from '../../contexts/RootProvider';

const ShortlistedArtists = () => {
    const { shortlistedArtist } = useRootContext();

    return (
        <div className='bg-white p-5 rounded-lg grid grid-cols-2 gap-5'>
            {
                shortlistedArtist &&
                shortlistedArtist?.map((artistID, idx) => <ArtistDetails key={`artistDetails${idx}`} artistID={artistID} />)
            }
        </div>
    );
};

const ArtistDetails = ({ artistID }) => {
    const [artist, setArtist] = useState({});
    useEffect(() => {
        fetch(`https://dev.nsnco.in/api/v1/get_artist/${artistID}/`)
            .then(res => res.json())
            .then(data => setArtist(data));
    }, [artistID])

    console.log(artist);

    return (
        <div className="bg-gray-50 border flex flex-col items-center py-3 px-5 text-center rounded-lg" >
            <img className='w-24 h-24 border bg-white p-1 rounded-full' src={artist.profile_pic} alt="" />
            <p className='mt-2'>{artist.name}</p>
            <div className='text-xs mb-4 mt-2 flex flex-wrap gap-1 justify-center'>
                {
                    artist?.skills?.join(", ")
                }
            </div>
            <Link className='mt-auto w-full' to={`/artist/${artist.artistID}`}>
                <button className='w-full border bg-gray-200 py-2 rounded-lg'>View Profile</button>
            </Link>
        </div>
    )
}

export default ShortlistedArtists;