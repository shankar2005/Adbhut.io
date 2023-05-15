import { Link } from "react-router-dom";
import { useGetArtistRequestsQuery } from "../../../features/artist/artistApi";
import { BsArrowRight } from "react-icons/bs";

const ArtistRequirement = () => {
    const { data } = useGetArtistRequestsQuery();
    return (
        <div>
            {data?.map(requirement => <Row requirement={requirement} />)}
        </div>
    );
};

const Row = ({ requirement }) => {
    const {
        id,
        project_details,
        hiring_status,
    } = requirement;

    return (
        <div className='bg-white hover:bg-yellow-50 border-b text-sm'>
            <Link to={`/projects/artist-requirement/${id}`}>
                <div className="flex items-center justify-between p-4 cursor-pointer">
                    <div className='font-medium space-x-2'>
                        <span>{project_details?.name}</span>
                        <span>&#9679;</span>
                        <span className='w-fit my-1 px-0.5 text-sm font-normal font-sans italic text-gray-700 bg-yellow-100'>{hiring_status || "In Progress"}</span>
                    </div>
                    <BsArrowRight size={20} />
                </div>
            </Link>
        </div>
    )
}

export default ArtistRequirement;