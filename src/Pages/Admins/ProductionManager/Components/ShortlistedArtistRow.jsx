import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FcCheckmark } from 'react-icons/fc'
import { RxCross2 } from 'react-icons/rx'
import { Link } from "react-router-dom";

const ShortlistedArtistRow = ({ artistID, handleAssignArtist, handleRejectArtist, assignedArtist, rejectedArtist, user }) => {
    const { data: artist = [] } = useQuery({
        queryKey: ['artist', artistID],
        queryFn: () => axios(`https://dev.nsnco.in/api/v1/get_artist/${artistID}/`)
            .then(response => response.data)
    })

    let content = <>
        <button type='button' onClick={() => handleRejectArtist(artist.artistID)}><RxCross2 size={20} color='red' /></button>
        <button type='button' onClick={() => handleAssignArtist(artist.artistID)}><FcCheckmark size={20} /></button>
    </>;

    if (assignedArtist.includes(artistID)) {
        content = <span className='bg-green-500 text-xs text-white px-2 py-0.5 rounded-full font-medium scale-95 active:scale-100 cursor-pointer select-none duration-200'>Assigned</span>
    } else if (rejectedArtist.includes(artistID)) {
        content = <span className='bg-red-500 text-xs text-white px-2 py-0.5 rounded-full font-medium scale-95 active:scale-100 cursor-pointer select-none duration-200'>Rejected</span>
    }

    return (
        <div className='flex items-center gap-2 text-sm bg-gray-100 p-2 mb-1 border border-blue-300 rounded-lg'>
            <img className='w-10 h-10 rounded-full' src="https://flowbite.com/docs/images/people/profile-picture-4.jpg" alt="" />
            <div>
                <Link to={`/artist/${artistID}`}><p className='font-medium hover:underline'>{artist.name}</p></Link>
                <p className='text-xs'>Status: <span className='bg-gray-400 p-0.5 px-1 rounded text-gray-50'>available</span></p>
            </div>
            {
                user.role === "Product Manager" &&
                <div className='flex ml-auto pr-2 gap-1'>
                    {
                        content
                    }
                </div>
            }
        </div>
    )
}

export default ShortlistedArtistRow;