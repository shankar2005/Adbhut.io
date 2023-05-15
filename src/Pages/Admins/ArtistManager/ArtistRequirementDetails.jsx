import { SlArrowRight } from "react-icons/sl";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { useDeleteArtistRequestMutation, useGetArtistRequestQuery } from "../../../features/artist/artistApi";
import brokenAvatar from "../../../assets/placeholders/broken.jpg";
import { useGetProjectQuery } from "../../../features/project/projectApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProjectData } from "../../../features/project/projectSlice";
import ShortlistedArtistRow from "../ProductionManager/Components/ShortlistedArtistRow";
import Alert from "../../../Components/Badge/Alert";
import AssignedArtistRow from "../ProductionManager/Components/AssignedArtistRow";

const ArtistRequirementDetails = () => {
    const { id } = useParams();
    const [deleteArtistRequest, { isSuccess: isDeleteSuccess }] = useDeleteArtistRequestMutation();
    const { data } = useGetArtistRequestQuery(id);

    const navigate = useNavigate();

    useEffect(() => {
        if (isDeleteSuccess) {
            navigate("/projects/artist-requirement")
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

    const handleDelete = () => {
        const isConfirm = confirm("Are you sure want to delete this?");
        if (isConfirm) {
            deleteArtistRequest(id);
        }
    }

    return (
        <section>
            <div className="p-4">
                <ul className="flex items-center gap-2 text-sm">
                    <li>
                        <Link to="/projects/artist-requirement" className="flex items-center gap-2">
                            <p className="hover:text-blue-600">All</p>
                            <SlArrowRight />
                        </Link>
                    </li>
                    <li className="flex-1 flex items-center justify-between gap-2 font-medium">
                        <p>{project_details?.name}</p>
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

                    <table className="min-w-full text-sm mt-4">
                        <thead className="bg-gray-200">
                            <tr className="text-left">
                                <th className="p-2.5">Estimate Fee #</th>
                                <th className="p-2.5 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-opacity-20 border-gray-700">
                                <td className="p-2">
                                    <p>Budget Range:</p>
                                </td>
                                <td className="p-2 text-right">
                                    <p>{budget_range}</p>
                                </td>
                            </tr>
                            <tr className="border-b border-opacity-20 border-gray-700">
                                <td className="p-2">
                                    <p>Production Hiring:</p>
                                </td>
                                <td className="p-2 text-right">
                                    <p>{production_hiring}</p>
                                </td>
                            </tr>
                            <tr className="border-b border-opacity-20 border-gray-700">
                                <td className="p-2">
                                    <p>Service Hiring:</p>
                                </td>
                                <td className="p-2 text-right">
                                    <p>{service_hiring}</p>
                                </td>
                            </tr>
                            <tr className="border-b border-opacity-20 border-gray-700">
                                <td className="p-2">
                                    <p>Target:</p>
                                </td>
                                <td className="p-2 text-right">
                                    <p>{target}</p>
                                </td>
                            </tr>
                            <tr className="border-b border-opacity-20 border-gray-700">
                                <td className="p-2">
                                    <p>Location:</p>
                                </td>
                                <td className="p-2 text-right">
                                    <p>{location_details?.name}</p>
                                </td>
                            </tr>
                            <tr className="border-b border-opacity-20 border-gray-700">
                                <td className="p-2">
                                    <p>Language:</p>
                                </td>
                                <td className="p-2 text-right">
                                    <p>{languages_details?.join(",")}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>

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
                        <div className="space-y-4 pt-4">
                            <div className="flex justify-between items-center">
                                <p className="text-gray-500 font-medium">Shortlisted artist</p>
                                <div className="flex gap-1">
                                    <Link to={`/artists/artist-list/${project_details?.id}`} state={{ from: location }}>
                                        <button type='button' className='bg-sky-400 hover:bg-sky-500 drop-shadow text-white p-1 px-2 rounded-lg text-sm font-meidum flex items-center gap-0.5'>Add Artist <AiOutlinePlus size={18} /></button>
                                    </Link>
                                </div>
                            </div>
                            <div>
                                <ProjectDetails projectId={project_details?.id} />
                            </div>
                        </div>
                    }

                    <div className="border-t mt-3 pt-3">
                        <button onClick={handleDelete} className="text-red-500 cursor-pointer">Delete</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ProjectDetails = ({ projectId }) => {
    const { data: currentProject } = useGetProjectQuery(projectId);
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentProject?.pk) {
            dispatch(setProjectData({
                // chatLog: JSON.parse(currentProject.brief),
                chatLog: [],
                shortlistedArtists: currentProject.shortlisted_artists_details?.map(artist => artist.id),
                selectedContentProduct: currentProject.project_template,
                ...currentProject
            }))
            sessionStorage.setItem("CURRENT_PROJECT", currentProject.pk);
        }
    }, [currentProject])

    return (
        <>
            {
                currentProject?.shortlisted_artists_details?.length > 0 ?
                    currentProject.shortlisted_artists_details?.map(artist => <ShortlistedArtistRow
                        key={artist.id}
                        artist={artist}
                        projectId={currentProject.pk}
                    />)
                    : <Alert>No artist selected!</Alert>
            }
            {
                currentProject?.assigned_artists_details?.length > 0 &&
                <div className="mb-4 mt-8">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Assigned Artists</label>
                    {
                        currentProject.assigned_artists_details?.map(artist => <AssignedArtistRow
                            key={artist.id}
                            artist={artist}
                            projectId={currentProject.pk}
                        />)
                    }
                </div>
            }
            {
                currentProject?.post_project_client_feedback
                && <div className="my-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Client Briefing: </label>
                    <p className='rounded-bl-lg rounded-br-lg rounded-tr-lg rounded p-3 text-sm bg-yellow-100 font-sans'>{currentProject?.post_project_client_feedback}</p>
                </div>
            }
            {
                currentProject?.production_solution
                && <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Production solution</label>
                    <p className='rounded p-3 text-sm bg-sky-100 font-sans'>{currentProject?.production_solution}</p>
                </div>
            }
        </>
    )
}

export default ArtistRequirementDetails;