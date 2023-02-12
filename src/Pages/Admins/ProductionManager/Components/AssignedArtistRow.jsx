import { Link } from "react-router-dom";
import { useRootContext } from "../../../../contexts/RootProvider";

const AssignedArtistRow = ({ artist, projectId, refetch }) => {
    const { authToken } = useRootContext();

    const handleUnassignArtist = () => {
        fetch(`https://dev.nsnco.in/api/v1/unassign_artist/${projectId}/${artist.id}/`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                Authorization: `token ${authToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.project.pk) {
                    refetch();
                }
            })
    }

    return (
        <div className=' text-sm bg-green-100 p-2 mb-1 border border-blue-300 rounded-lg'>
            <div className='flex items-center gap-2'>
                <img className='w-10 h-10 rounded-full' src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" alt="" />
                <div>
                    <Link to={`/artist/${artist.id}`}><p className='font-medium hover:underline'>{artist.name}</p></Link>
                    <p className='text-xs'>Status: <span className='bg-gray-400 p-0.5 px-1 rounded text-gray-50'>available</span></p>
                </div>
                <div className='flex ml-auto pr-2 gap-1'>
                    <button onClick={handleUnassignArtist} className='bg-red-500 text-xs text-white px-2 py-0.5 rounded-full font-medium scale-95 active:scale-90 cursor-pointer select-none duration-200'>Unassigned</button>
                </div>
            </div>
            {/* <img className='w-36 rounded mt-2 ml-12' src="https://fbutube.com/media/images/play_button/play_button_added.webp" alt="" /> */}
        </div>
    )
}

export default AssignedArtistRow;