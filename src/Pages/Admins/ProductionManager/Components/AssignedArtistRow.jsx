import { BsBoxArrowUpRight } from "react-icons/bs";
import { useRootContext } from "../../../../contexts/RootProvider";
import { useUnAssignArtistMutation } from "../../../../features/artist/artistApi";

const AssignedArtistRow = ({ artist, projectId }) => {
    const { setArtistProfile } = useRootContext();
    const [unAssignArtist] = useUnAssignArtistMutation();

    const handleUnassignArtist = () => {
        unAssignArtist({ projectId, artistId: artist.id })
    }

    return (
        <div className=' text-sm bg-green-100 p-2 mb-1 border border-blue-300 rounded-lg'>
            <div className='flex items-center gap-2'>
                <img className='w-10 h-10 rounded-full' src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" alt="" />
                <div>
                    <button onClick={() => setArtistProfile(artist.id)}><p className='font-medium hover:underline'>{artist.name}</p></button>
                    <p className='text-xs'>Status: <span className='bg-gray-400 p-0.5 px-1 rounded text-gray-50'>available</span></p>
                </div>
                <div className='flex ml-auto pr-2 gap-1'>
                    <button onClick={handleUnassignArtist} className='bg-red-500 text-xs text-white px-2 py-0.5 rounded-full font-medium scale-95 active:scale-90 cursor-pointer select-none duration-200'>Unassigned</button>
                </div>
            </div>
            {
                artist.name === "Neelabja Debnath" &&
                <div className="mt-2 ml-12">
                    <a className="font-medium flex items-center gap-2 hover:underline text-blue-500 w-fit" href="https://drive.google.com/file/d/1-EshWLh4nuzBdQffHrLXq-lbKQPRqJ2j/view?usp=share_link" target="_blank">Submission <BsBoxArrowUpRight /></a>
                </div>
            }
        </div>
    )
}

export default AssignedArtistRow;