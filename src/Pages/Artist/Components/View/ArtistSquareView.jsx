import { FaRegEnvelope } from 'react-icons/fa';
import { HiPhone } from 'react-icons/hi';
import { IoLanguageSharp, IoLocationSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useRootContext } from '../../../../contexts/RootProvider';

const ArtistSquareView = ({ artist }) => {
    const { avatar } = useRootContext();

    return (
        <div className="bg-white border flex flex-col items-center p-3 text-center rounded-lg">
            <img className='w-24 h-24 border bg-white p-1 rounded-full' src={artist.profile_pic || avatar} alt="" />
            <p className='mt-2 font-medium'>{artist.owner_name}</p>
            <div className='text-xs mb-2 flex flex-col items-center'>
                {artist.email && <p className='flex items-center gap-1'><FaRegEnvelope />{artist.email}</p>}
                {artist.phone && <p className='flex items-center gap-1'><HiPhone />{artist.phone}</p>}
                {
                    artist.languages &&
                    <p className='flex items-center gap-1'><IoLanguageSharp /> {artist.languages.join(", ")}</p>
                }
                <p className='flex items-center gap-1'><IoLocationSharp /> {artist.location} Test</p>
            </div>
            <div className='text-xs flex justify-center flex-wrap gap-1 mb-4'>
                {
                    artist?.skills?.map((skill, idx) => <div key={idx} className='bg-sky-400 p-1 rounded text-white'>{skill}</div>)
                }
            </div>
            <Link className='mt-auto w-full' to={`/artists/${artist.owner_id}/`}>
                <button className='w-full border-2 border-sky-100 hover:border-blue-500 font-medium bg-sky-100 text-blue-500 py-2 rounded-lg'>View Profile</button>
            </Link>
        </div>
    );
};

export default ArtistSquareView;