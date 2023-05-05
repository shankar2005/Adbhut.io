import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { SlArrowDown } from "react-icons/sl";
import { useDeleteArtistRequestMutation, useGetArtistRequestsQuery } from "../../../features/artist/artistApi";

const ProjectRequirement = () => {
    const { data } = useGetArtistRequestsQuery();
    const [deleteArtistRequest] = useDeleteArtistRequestMutation();

    return (
        <div>
            {data?.map(requirement => <Row requirement={requirement} deleteArtistRequest={deleteArtistRequest} />)}
        </div>
    );
};

export default ProjectRequirement;

const Row = ({ requirement, deleteArtistRequest }) => {
    const {
        id,
        project_details,
        skills_details,
        hiring_status,
        budget_range,
        production_hiring,
        service_hiring,
        target,
        location_details,
        languages_details,
        genre_details,
        shortlisted_artists_details
    } = requirement;

    const [expanded, setExpanded] = useState(false);
    const toggleExpand = () => {
        setExpanded(!expanded)
    }

    return (
        <div className='bg-white hover:bg-yellow-50 border-b text-sm'>
            <div onClick={toggleExpand} className="flex items-center justify-between pr-4 cursor-pointer">
                <div className='font-medium flex items-center gap-1 p-3'>
                    <p>{project_details.project}</p>
                    <span>&#9679;</span>
                    <span className='w-fit my-1 px-0.5 text-sm font-normal font-sans italic text-gray-700 bg-yellow-100'>{hiring_status}</span>
                </div>
                <SlArrowDown className={` ${expanded ? "rotate-180" : ""} duration-200`} size={20} />
            </div>

            {
                expanded &&
                <div className="p-3 pt-1 border-t">
                    <div className='text-xs flex flex-wrap gap-1 my-1'>
                        {
                            skills_details?.map((skill, idx) => <div key={idx} className='bg-sky-400 p-1 px-2 rounded-full text-white'>{skill}</div>)
                        }
                    </div>
                    <p>
                        <span className="font-medium">Budget Range: </span>
                        {budget_range}
                    </p>
                    <p>
                        <span className="font-medium">Production Hiring: </span>
                        {production_hiring}
                    </p>
                    <p>
                        <span className="font-medium">Service Hiring: </span>
                        {service_hiring}
                    </p>
                    <p>
                        <span className="font-medium">Target: </span>
                        {target}
                    </p>

                    <p className="border-t pt-2 mt-2">
                        <span className="font-medium">Location: </span>
                        {location_details?.name}
                    </p>
                    <p>
                        <span className="font-medium">Language: </span>
                        {languages_details?.join(",")}
                    </p>
                    {
                        genre_details?.length > 1 &&
                        <div className='flex flex-wrap gap-1 my-1 items-center'>
                            <span className="font-medium">Genre: </span>
                            {
                                genre_details?.map(genre => <div key={genre?.id} className='text-xs bg-gray-400 p-1 px-2 rounded-full text-white'>{genre.name}</div>)
                            }
                        </div>
                    }

                    {
                        shortlisted_artists_details?.length > 0 &&
                        <div className="space-y-4 border-t mt-4 pt-4">
                            <div className="text-gray-500 font-medium">Shortlisted artist</div>
                            <div>
                                {
                                    shortlisted_artists_details?.map(artist => <div className="flex items-center gap-2 py-1.5">
                                        <img className="w-10 rounded-full" src="" alt="" />
                                        <p>{artist?.name}</p>
                                    </div>)
                                }
                            </div>
                        </div>
                    }

                    <div className="border-t mt-3 pt-3">
                        <FaTrash onClick={() => deleteArtistRequest(id)} className="text-red-500 cursor-pointer" size={15} />
                    </div>
                </div>
            }
        </div>
    )
}