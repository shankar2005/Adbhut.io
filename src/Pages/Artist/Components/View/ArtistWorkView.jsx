import { useState } from 'react';
import { useRootContext } from '../../../../contexts/RootProvider';
import { GiCheckMark } from "react-icons/gi";
import { useSelector } from 'react-redux';
import WorkDemo from './WorkDemo';
import { IoLocationSharp } from 'react-icons/io5';
import { BsLightningChargeFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import ShortlistArtistBtn from '../ShortlistArtistBtn';

const ArtistWorkView = ({ artist }) => {
    const { user } = useSelector(state => state.auth);
    const { avatar, setArtistProfile } = useRootContext();

    const [imageSrc, setImageSrc] = useState(artist.profile_pic);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const handleImageError = () => {
        setIsImageLoaded(true);
        setImageSrc(avatar);
    };

    return (
        <div className='mb-5 bg-white rounded-lg shadow-md'>
            <div className='p-3 flex items-start gap-2'>
                <div>
                    <img
                        onClick={() => setArtistProfile(artist.id)}
                        className='w-12 h-12 object-cover object-top rounded-full cursor-pointer placeholder:bg-black'
                        src={imageSrc}
                        alt="Profile Image"
                        onError={handleImageError}
                        onLoad={() => setIsImageLoaded(true)}
                        style={{ display: isImageLoaded ? 'block' : 'none' }}
                    />
                </div>
                <div className='flex-1'>
                    <p className='font-medium flex items-center gap-2 text-sm'>
                        <button type='button' onClick={() => setArtistProfile(artist.id)}>{artist.name}</button>
                        {artist.full_time && <span className='border rounded-full border-blue-600 text-blue-600 text-xs px-2 py-0.5 font-medium flex items-center gap-1'><BsLightningChargeFill size={15} /> Full Time</span>}
                    </p>
                    {artist?.artist_intro && <p className='w-fit mb-1 px-0.5 text-xs font-sans text-gray-700'>{artist.artist_intro}</p>}
                    {artist.location && <p className='flex mb-1 items-center gap-1 text-xs text-gray-700'><IoLocationSharp /> {artist.location}</p>}

                    {
                        (artist.skill?.length > 0 || artist.genre?.length > 0) &&
                        <div className='flex items-center flex-wrap gap-1 font-medium mt-1'>
                            {artist?.skill?.map((skill, idx) => <p key={idx} className='text-xs px-2 py-1 bg-blue-500 text-white rounded-full'>{skill}</p>)}
                            {artist?.genre?.map((genre, idx) => <div key={idx} className='text-xs px-1 border text-gray-500 border-gray-500 rounded-full'>{genre}</div>)}
                        </div>
                    }
                </div>
                <div className='space-x-1'>
                    {user?.role === "AM" &&
                        <Link to={`/artists/edit-artist/${artist.id}`}>
                            <button className="bg-blue-500 py-1.5 px-4 text-white rounded text-sm font-hero">Edit</button>
                        </Link>}
                    <ShortlistArtistBtn artistId={artist.id} />
                </div>
            </div>
            <div>
                <WorkDemo demo_type={artist?.works_links[0]?.demo_type} demo_link={artist?.works_links[0]?.weblink} />
            </div>
        </div>
    );
};

export default ArtistWorkView;