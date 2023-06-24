import { AiOutlineSearch } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import ActionLoader from "../../../Components/Loader/ActionLoader";
import Badge from "../../../Components/Badge/Badge";
import { useLazyGetArtistsQuery } from "../../../features/artist/artistApi";
import { useAssignCollabToDemoMutation } from "../../../features/demo/demoApi";

const AssignArtistToDemo = ({ demoId }) => {
    const [getArtists, { data, isLoading }] = useLazyGetArtistsQuery();
    const [assignCollabToDemo] = useAssignCollabToDemoMutation();

    const handleSearch = (e) => {
        if (e.key === "Enter") {
            getArtists({ page: 1, search: e.target.value });
        }
    }

    const handleAssign = (artistId) => {
        assignCollabToDemo({
            demoId,
            artistId
        })
            .then(data => {
                console.log(data);
            })
    }

    return (
        <div className="pt-8 relative">
            {/* <RxCross1 size={20} className="absolute top-0 right-0 m-4 cursor-pointer" /> */}
            <h4 className='font-semibold text-lg'>Add collaborators</h4>
            <div className="mt-10">
                <div className="flex justify-between items-center mb-5 gap-5">
                    <h5 className="text-xl font-bold border-b flex-grow pb-1">Artists</h5>
                    <div className="flex relative">
                        <input onKeyUp={handleSearch} type="search" name="search" className='border border-gray-300 py-2 w-60 pl-10 pr-3 outline-0 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm rounded' placeholder='Search your artist here...' required />
                        <AiOutlineSearch className='w-6 h-6 text-gray-500 absolute top-1/2 -translate-y-1/2 left-2' />
                    </div>
                </div>
                {data?.results?.length && <ul className="h-64 overflow-y-auto shadow-md border">
                    {isLoading && <div className="flex justify-center mt-2">
                        <ActionLoader />
                    </div>}
                    {data?.results?.map(artist => <li onClick={() => handleAssign(artist.id)} className="hover:bg-gray-200 py-2 border-b flex items-center justify-between px-2">{artist.name} <Badge type="success" className="border border-green-200 cursor-pointer text-sm font-normal">Assign</Badge></li>)}
                </ul>}
            </div>
        </div>
    )
}

export default AssignArtistToDemo;