import { useState } from 'react';
import { FaRegEnvelope } from 'react-icons/fa';
import { HiPhone } from 'react-icons/hi';
import { IoLanguageSharp, IoLocationSharp } from 'react-icons/io5';
import { useRootContext } from '../../../../contexts/RootProvider';
import brokenImage from "../../../../assets/placeholders/broken.jpg";

const ArtistRowView = ({ artist }) => {
    const { setArtistProfile } = useRootContext();

    const [imageSrc, setImageSrc] = useState(artist.profile_image);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const handleImageError = () => {
        setIsImageLoaded(true);
        setImageSrc(brokenImage);
    };

    return (
        <div className='bg-white border-b flex gap-3 p-3'>
            <div className='relative h-fit'>
                <img
                    onClick={() => setArtistProfile(artist.id)}
                    className='w-[70px] h-[70px] object-cover object-top rounded-full cursor-pointer placeholder:bg-black'
                    src={imageSrc}
                    alt="Profile Image"
                    onError={handleImageError}
                    onLoad={() => setIsImageLoaded(true)}
                    style={{ display: isImageLoaded ? 'block' : 'none' }}
                />
            </div>
            <div>
                <p onClick={() => setArtistProfile(artist.id)} className='font-medium cursor-pointer'>
                    {artist.name}
                </p>
                <div className='text-xs flex flex-wrap gap-2'>
                    {
                        artist?.skill?.map((skill, idx) => <div key={idx} className='bg-sky-400 p-1 rounded-full text-white'>{skill}</div>)
                    }
                </div>
                {artist.artist_intro && <div className='w-fit my-1 px-0.5 text-sm font-normal font-sans italic text-gray-700 bg-yellow-100'>&#9679; {artist.artist_intro}</div>}
                <div className='text-xs'>
                    {artist.email && <p className='flex items-center gap-2'><FaRegEnvelope />{artist.email}</p>}
                    {artist.phone && <p className='flex items-center gap-2'><HiPhone />{artist.phone}</p>}
                    {
                        artist.languages &&
                        <p className='flex items-center gap-2'><IoLanguageSharp /> {artist.languages.join(", ")}</p>
                    }
                    <p className='flex items-center gap-2'><IoLocationSharp /> {artist.location}</p>
                </div>
            </div>
        </div>
    );
};

export default ArtistRowView;