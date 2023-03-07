import { FaRegEnvelope } from 'react-icons/fa';
import { HiPhone } from 'react-icons/hi';
import { IoLanguageSharp, IoLocationSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useRootContext } from '../../../../contexts/RootProvider';

const ArtistRowView = ({ artist }) => {
    const { avatar } = useRootContext();

    return (
        <div className='bg-white border flex gap-3 p-3 rounded-lg'>
            <div className='w-1/6'>
                <img className='w-16 border p-0.5 bg-white rounded-full' src={artist.profile_pic || avatar} alt="" />
            </div>
            <div>
                <Link className='hover:underline' to={`/artists/${artist.owner_id}/`}><p className='font-medium'>{artist.owner_name}</p></Link>
                <p className='text-xs mb-2'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur, aliquida dipisicing elit. Consequuntur, aliquid?</p>
                <div className='text-xs mb-2'>
                    {artist.email && <p className='flex items-center gap-2'><FaRegEnvelope />{artist.email}</p>}
                    {artist.phone && <p className='flex items-center gap-2'><HiPhone />{artist.phone}</p>}
                    {
                        artist.languages &&
                        <p className='flex items-center gap-2'><IoLanguageSharp /> {artist.languages.join(", ")}</p>
                    }
                    <p className='flex items-center gap-2'><IoLocationSharp /> Test {artist.location}</p>
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