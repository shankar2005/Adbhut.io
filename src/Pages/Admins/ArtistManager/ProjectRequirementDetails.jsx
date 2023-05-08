import { SlArrowRight } from "react-icons/sl";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { useDeleteArtistRequestMutation, useGetArtistRequestQuery } from "../../../features/artist/artistApi";
import brokenAvatar from "../../../assets/placeholders/broken.jpg";
import { useGetProjectQuery } from "../../../features/project/projectApi";
import { useEffect } from "react";

const ProjectRequirementDetails = () => {
    const { id } = useParams();
    const [deleteArtistRequest, { isSuccess: isDeleteSuccess }] = useDeleteArtistRequestMutation();
    const { data } = useGetArtistRequestQuery(id);

    const navigate = useNavigate();

    useEffect(() => {
        if (isDeleteSuccess) {
            navigate("/projects/project-requirement")
        }
    }, [isDeleteSuccess])

    const {
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
        shortlisted_artists_details,
        project
    } = data || {};

    const location = useLocation();

    return (
        <section>
            <div className="p-4">
                <ul className="flex items-center gap-2 text-sm">
                    <li>
                        <Link to="/projects/project-requirement" className="flex items-center gap-2">
                            <p className="hover:text-blue-600">All</p>
                            <SlArrowRight />
                        </Link>
                    </li>
                    <li className="flex-1 flex items-center justify-between gap-2 font-medium">
                        <p>{project_details?.project}</p>
                        <span className='w-fit px-0.5 text-sm font-normal font-sans italic text-gray-700 bg-yellow-100'>{hiring_status || "In Progress"}</span>
                    </li>
                </ul>
            </div>

            <div className='bg-white shadow-sm text-sm'>
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
                        <div className="space-y-4 border-t mt-4 pt-4">
                            <div className="flex justify-between items-center">
                                <p className="text-gray-500 font-medium">Shortlisted artist</p>
                                <div className="flex gap-1">
                                    <Link to={`/artists/artist-entry/${project}`} state={{ from: location }}>
                                        <button type='button' className='bg-sky-400 hover:bg-sky-500 drop-shadow text-white p-1 px-2 rounded-lg text-sm font-meidum flex items-center gap-0.5'>Add Artist <AiOutlinePlus size={18} /></button>
                                    </Link>
                                    {/* <button onClick={() => setArtistRequestModal(true)} type='button' className='bg-gray-400 hover:bg-gray-500 drop-shadow text-white p-1 px-2 rounded-lg text-sm font-meidum flex items-center gap-0.5'>Request for Artist</button> */}
                                </div>
                            </div>
                            <div>
                                <ShortlistedArtists project={project} />
                            </div>
                        </div>
                    }

                    <div className="border-t mt-3 pt-3">
                        <button onClick={() => deleteArtistRequest(id)} className="text-red-500 cursor-pointer">Delete</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ShortlistedArtists = ({ project }) => {
    const { data } = useGetProjectQuery(project);
    return (
        <>
            {
                data?.shortlisted_artists_details?.map(artist => (
                    <div className="flex items-center gap-2 py-1.5">
                        <img className="w-10 h-10 object-cover rounded-full border" src={brokenAvatar} alt="" />
                        <p>{artist?.name}</p>
                    </div>
                ))
            }
        </>
    )
}

export default ProjectRequirementDetails;