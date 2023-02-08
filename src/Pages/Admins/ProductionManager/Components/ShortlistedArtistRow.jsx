import { useContext } from 'react';
import { FcCheckmark } from 'react-icons/fc'
import { RxCross2 } from 'react-icons/rx'
import { Link } from "react-router-dom";
import { AuthContext } from '../../../../contexts/AuthProvider';

const ShortlistedArtistRow = ({ artist }) => {
    const { isAuthenticated } = useContext(AuthContext);

    const handleAssignArtist = () => { }
    const handleRejectArtist = () => { }

    return (
        <div className='flex items-center gap-2 text-sm bg-gray-100 p-2 mb-1 border border-blue-300 rounded-lg'>
            <img className='w-10 h-10 rounded-full' src="https://flowbite.com/docs/images/people/profile-picture-4.jpg" alt="" />
            <div>
                <Link to={`/artist/${artist.id}`}><p className='font-medium hover:underline'>{artist.name}</p></Link>
                <p className='text-xs'>Status: <span className='bg-gray-400 p-0.5 px-1 rounded text-gray-50'>available</span></p>
            </div>
            {
                isAuthenticated &&
                <div className='flex ml-auto pr-2 gap-1'>
                    <button type='button' onClick={() => handleRejectArtist(artist.artistID)}><RxCross2 size={20} color='red' /></button>
                    <button type='button' onClick={() => handleAssignArtist(artist.artistID)}><FcCheckmark size={20} /></button>
                </div>
            }
        </div>
    )
}

export default ShortlistedArtistRow;