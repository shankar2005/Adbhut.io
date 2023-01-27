import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useRootContext } from '../../contexts/RootProvider';
import { FaRegEnvelope } from 'react-icons/fa';
import { HiPhone } from 'react-icons/hi';
import { IoLanguageSharp, IoLocationSharp } from 'react-icons/io5';

const ShortlistedArtists = () => {
    const { shortlistedArtist } = useRootContext();

    const [viewAs, setViewAs] = useState("large");
    const handleViewAs = e => {
        setViewAs(e.target.value);
    }

    return (
        <div className=''>
            <div className='flex justify-end mb-2'>
                <select className='text-sm p-1 rounded shadow outline-gray-100' onChange={handleViewAs}>
                    <option value="large">Large</option>
                    <option value="details">Details</option>
                </select>
            </div>
            <div className={`rounded-lg grid ${viewAs === "details" ? 'grid-cols-1' : 'grid-cols-2'} gap-5`}>
                {
                    shortlistedArtist &&
                    shortlistedArtist?.map((artistID, idx) => <ArtistDetails key={`artistDetails${idx}`} artistID={artistID} viewAs={viewAs} />)
                }
            </div>
        </div>
    );
};

const ArtistDetails = ({ artistID, viewAs }) => {
    const [artist, setArtist] = useState({});
    useEffect(() => {
        fetch(`https://dev.nsnco.in/api/v1/get_artist/${artistID}/`)
            .then(res => res.json())
            .then(data => setArtist(data));
    }, [artistID])

    return (
        <>
            {
                viewAs === "details"
                    ? <div className="bg-white border flex gap-3 p-3 rounded-lg" >
                        <div className='w-1/6'>
                            <img className='w-16 h-16 border bg-white p-1 rounded-full' src={artist.profile_pic} alt="" />
                        </div>
                        <div>
                            <Link className='hover:underline' to={`/artist/${artist.artistID}`}><p className='font-medium'>{artist.name}</p></Link>
                            <p className='text-xs mb-2'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur, aliquida dipisicing elit. Consequuntur, aliquid?</p>
                            <div className='text-xs mb-2'>
                                {artist.email && <p className='flex items-center gap-2'><FaRegEnvelope />{artist.email}</p>}
                                {artist.phone && <p className='flex items-center gap-2'><HiPhone />{artist.phone}</p>}
                                {
                                    artist.languages &&
                                    <p className='flex items-center gap-2'><IoLanguageSharp /> {artist.languages.join(", ")}</p>
                                }
                                <p className='flex items-center gap-2'><IoLocationSharp /> {artist.location}</p>
                            </div>
                            <div className='text-xs flex flex-wrap gap-2'>
                                {
                                    artist?.skills?.map((skill, idx) => <div key={idx} className='bg-sky-400 p-1 rounded text-white'>{skill}</div>)
                                }
                            </div>
                        </div>
                    </div>
                    : <div className="bg-white border flex flex-col items-center p-3 text-center rounded-lg" >
                        <img className='w-24 h-24 border bg-white p-1 rounded-full' src={artist.profile_pic} alt="" />
                        <p className='mt-2 font-medium'>{artist.name}</p>
                        <div className='text-xs mb-2 flex flex-col items-center'>
                            {artist.email && <p className='flex items-center gap-1'><FaRegEnvelope />{artist.email}</p>}
                            {artist.phone && <p className='flex items-center gap-1'><HiPhone />{artist.phone}</p>}
                            {
                                artist.languages &&
                                <p className='flex items-center gap-1'><IoLanguageSharp /> {artist.languages.join(", ")}</p>
                            }
                            <p className='flex items-center gap-1'><IoLocationSharp /> {artist.location}</p>
                        </div>
                        <div className='text-xs flex justify-center flex-wrap gap-1 mb-4'>
                            {
                                artist?.skills?.map((skill, idx) => <div key={idx} className='bg-sky-400 p-1 rounded text-white'>{skill}</div>)
                            }
                        </div>
                        <Link className='mt-auto w-full' to={`/artist/${artist.artistID}`}>
                            <button className='w-full border-2 border-sky-100 hover:border-blue-500 font-medium bg-sky-100 text-blue-500 py-2 rounded-lg'>View Profile</button>
                        </Link>
                    </div>
            }
        </>
    )
}

export default ShortlistedArtists;