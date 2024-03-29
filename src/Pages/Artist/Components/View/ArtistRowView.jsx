import { useState } from 'react';
import { FaRegEnvelope } from 'react-icons/fa';
import { HiPhone } from 'react-icons/hi';
import { IoLanguageSharp, IoLocationSharp } from 'react-icons/io5';
import { useRootContext } from '../../../../contexts/RootProvider';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsLightningChargeFill } from 'react-icons/bs';
import { GiCheckMark } from 'react-icons/gi';
import ShortlistArtistBtn from '../ShortlistArtistBtn';

const ArtistRowView = ({ artist }) => {
    const { avatar } = useRootContext();

    const { setArtistProfile } = useRootContext();
    const { user } = useSelector(state => state.auth);

    const [imageSrc, setImageSrc] = useState(artist.profile_pic);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const handleImageError = () => {
        setIsImageLoaded(true);
        setImageSrc(avatar);
    };

    return (
        <div className='bg-white border-b flex gap-3 p-3'>
            <div>
                <img
                    onClick={() => setArtistProfile(artist.id)}
                    className='w-16 h-16 object-cover object-top rounded-full cursor-pointer placeholder:bg-black'
                    src={imageSrc}
                    alt="Profile Image"
                    onError={handleImageError}
                    onLoad={() => setIsImageLoaded(true)}
                    style={{ display: isImageLoaded ? 'block' : 'none' }}
                />
            </div>
            <div className='flex-1'>
                <div>
                    <p className='font-medium flex items-center gap-2'>
                        <button type='button' onClick={() => setArtistProfile(artist.id)}>{artist.name}</button>
                        {artist.full_time && <span className='border rounded-full border-blue-600 text-blue-600 text-xs px-2 py-0.5 font-medium flex items-center gap-1'><BsLightningChargeFill size={15} /> Full Time</span>}
                    </p>
                    {artist?.artist_intro && <p className='w-fit mb-1 px-0.5 text-xs font-sans text-gray-700'>{artist.artist_intro}</p>}
                    {artist.location && <p className='flex mb-1 items-center gap-1 text-sm text-gray-700'><IoLocationSharp /> {artist.location}</p>}
                </div>

                <div className='text-xs'>
                    {(user?.role === "AM" || user?.role === "PM") && artist.email && <p className='flex items-center gap-2'><FaRegEnvelope />{artist.email}</p>}
                    {(user?.role === "AM" || user?.role === "PM") && artist.phone && <p className='flex items-center gap-2'><HiPhone />{artist.phone}</p>}
                    {
                        artist.languages?.length > 0 &&
                        <p className='flex items-center gap-2'><IoLanguageSharp /> {artist.languages.join(", ")}</p>
                    }
                </div>

                {
                    artist.skill?.length > 0 &&
                    <div className='flex items-center flex-wrap gap-1 font-medium mt-2'>
                        {
                            artist?.skill?.map((skill, idx) => <p key={idx} className='text-xs px-2 py-1 bg-blue-500 text-white rounded-full'>{skill}</p>)
                        }
                    </div>
                }
                {
                    artist.genre?.length > 0 &&
                    <div className='flex items-center flex-wrap gap-1 font-medium mt-2'>
                        {
                            artist?.genre?.map((genre, idx) => <div key={idx} className='text-xs px-1 border text-gray-500 border-gray-500 rounded-full'>{genre}</div>)
                        }
                    </div>
                }
            </div>

            <div className='space-x-2'>
                <ShortlistArtistBtn artistId={artist.id} />
                {
                    user?.role === "AM" &&
                    <Link to={`/artists/edit-artist/${artist.id}`}>
                        <button className="bg-blue-500 py-1.5 px-4 text-white rounded text-sm font-hero">Edit</button>
                    </Link>
                }
            </div>
        </div>
    );
};

export default ArtistRowView;