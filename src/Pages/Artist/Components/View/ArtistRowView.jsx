import { FaRegEnvelope } from 'react-icons/fa';
import { HiPhone } from 'react-icons/hi';
import { IoLanguageSharp, IoLocationSharp } from 'react-icons/io5';
import { useRootContext } from '../../../../contexts/RootProvider';

const ArtistRowView = ({ artist }) => {
    const { avatar, setArtistProfile } = useRootContext();

    return (
        <div className='bg-white border flex gap-3 p-3 rounded-lg'>
            <div>
                <img onClick={() => setArtistProfile(artist.id)} className='w-16 h-16 object-cover object-top border p-0.5 bg-white rounded-full cursor-pointer' src={artist.profile_image || avatar} alt="" />
            </div>
            <div>
                <p onClick={() => setArtistProfile(artist.id)} className='font-medium cursor-pointer'>{artist.name}</p>
                {artist.artist_intro && <p className='text-xs mb-2'>{artist.artist_intro}</p>}
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
    );
};

export default ArtistRowView;