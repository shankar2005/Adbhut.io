import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const AssignedArtistRow = ({ artistID }) => {
    const { data: artist = [] } = useQuery({
        queryKey: ['artist', artistID],
        queryFn: () => axios(`https://dev.nsnco.in/api/v1/get_artist/${artistID}/`)
            .then(response => response.data)
    })

    return (
        <div className=' text-sm bg-green-100 p-2 mb-1 border border-blue-300 rounded-lg'>
            <div className='flex items-center gap-2'>
                <img className='w-10 h-10 rounded-full' src="https://flowbite.com/docs/images/people/profile-picture-4.jpg" alt="" />
                <div>
                    <Link to={`/artist/${artistID}`}><p className='font-medium hover:underline'>{artist.name}</p></Link>
                    <p className='text-xs'>Status: <span className='bg-gray-400 p-0.5 px-1 rounded text-gray-50'>available</span></p>
                </div>
                <div className='flex ml-auto pr-2 gap-1'>
                    <span className='bg-green-500 text-xs text-white px-2 py-0.5 rounded-full font-medium scale-95 active:scale-90 cursor-pointer select-none duration-200'>Unassigned</span>
                </div>
            </div>
            <img className='w-36 rounded mt-2 ml-12' src="https://fbutube.com/media/images/play_button/play_button_added.webp" alt="" />
        </div>
    )
}

export default AssignedArtistRow;