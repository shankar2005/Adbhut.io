import { useRootContext } from '../../../../contexts/RootProvider';
import { GiCheckMark } from "react-icons/gi";
import { useSelector } from 'react-redux';
import WorkDemo from './WorkDemo';

const ArtistWorkView = ({ artist = {} }) => {
    const { handleShortlist, avatar, setArtistProfile } = useRootContext();
    const { shortlistedArtists } = useSelector(state => state.project);

    return (
        <div className='mb-5 p-5 bg-white rounded-lg shadow-md'>
            <div className='flex items-center gap-2 mb-3'>
                <button onClick={() => setArtistProfile(artist.owner_id)}>
                    <img className='w-12 h-12 rounded-full' src={artist.profile_pic || avatar} alt="" />
                </button>
                <div className='text-sm'>
                    <button onClick={() => setArtistProfile(artist.owner_id)}><span className='font-medium'>{artist.owner_name}</span></button>
                    <p>
                        {
                            artist.skills.join(", ").length >= 40
                                ? artist.skills.join(", ").slice(0, 41) + '...'
                                : artist.skills.join(", ")
                        }
                    </p>
                </div>
                {
                    shortlistedArtists?.includes(artist.owner_id)
                        ? <button className='ml-auto text-green-600 border-2 bg-sky-100 border-sky-100 py-2.5 px-4 rounded-lg font-medium'><GiCheckMark /></button>
                        : <button onClick={() => handleShortlist(artist.owner_id, artist.owner_name, artist.profile_pic)} className='ml-auto text-blue-500 border-2 border-blue-500 hover:bg-sky-100 hover:border-sky-100 py-2.5 px-4 rounded-lg font-medium'>Shortlist</button>
                }
            </div>
            <div>
                <WorkDemo demo_type={artist.demo_type} demo_link={artist.weblink} />
            </div>
        </div>
    );
};

export default ArtistWorkView;