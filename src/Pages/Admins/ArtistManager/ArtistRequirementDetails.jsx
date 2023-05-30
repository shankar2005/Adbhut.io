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
import TableRow from "../../../Components/Table/TableRow";
import Badge from "../../../Components/Badge/Badge";

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

    const handleDelete = () => {
        const isConfirm = confirm("Are you sure want to delete this?");
        if (isConfirm) {
            deleteArtistRequest(id);
        }
    }

    const { data: currentProject } = useGetProjectQuery(project_details?.id, { skip: !project_details?.id });
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (currentProject?.pk) {
    //         dispatch(setProjectData({
    //             // chatLog: JSON.parse(currentProject.brief),
    //             chatLog: [],
    //             shortlistedArtists: currentProject.shortlisted_artists_details?.map(artist => artist.id),
    //             selectedContentProduct: currentProject.project_template,
    //             ...currentProject
    //         }))
    //         sessionStorage.setItem("CURRENT_PROJECT", currentProject.pk);
    //     }
    // }, [currentProject])

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

            <div class="w-full overflow-hidden rounded-lg shadow-lg font-hero">
                <div class="w-full overflow-x-auto">
                    <table class="w-full">
                        <tbody class="bg-white">
                            <TableRow label="Skills" content={skills_details?.join(",  ")} />
                            <TableRow label="Genre" content={genre_details?.map(genre => <span key={genre?.id}>{genre.name},  </span>)} />
                            <TableRow label="Budget Range" content={budget_range} />
                            <TableRow label="Production Hiring" content={production_hiring} />
                            <TableRow label="Service Hiring" content={service_hiring} />
                            <TableRow label="Target" content={target} />
                            <TableRow label="Location" content={location_details?.name} />
                            <TableRow label="Language" content={languages_details?.join(",")} />
                        </tbody>
                    </table>

                    <table class="w-full">
                        <thead>
                            <tr class="text-md font-semibold text-left text-gray-900 bg-gray-100 border-b">
                                <th class="px-4 py-3 flex items-center gap-2">
                                    Shortlisted Artist
                                    <Link to="/artists">
                                        <Badge className="block border border-gray-200 bg-blue-100 text-blue-700">Add Artist</Badge>
                                    </Link>
                                </th>
                                <th class="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white">{
                            currentProject?.shortlisted_artists_details?.map(artist => (
                                <ShortlistedArtistRow
                                    key={artist.id}
                                    artist={artist}
                                    projectId={project_details?.id}
                                />))
                        }</tbody>
                    </table>

                    <table class="w-full">
                        <tbody class="bg-white">
                            <TableRow label="Production solution" content={currentProject?.production_solution} />
                            <TableRow label="Artist discussion updates" content={currentProject?.artist_discussion_updates} />
                            <TableRow label="Client Briefing" content={currentProject?.post_project_client_feedback} />
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default ArtistRequirementDetails;