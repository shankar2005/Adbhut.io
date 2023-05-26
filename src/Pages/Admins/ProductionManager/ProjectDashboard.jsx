import { useEffect, useState } from 'react';
import { useRootContext } from '../../../contexts/RootProvider';
import { Link, useParams } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import ShortlistedArtistRow from './Components/ShortlistedArtistRow';
import AssignedArtistRow from './Components/AssignedArtistRow';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProjectQuery } from '../../../features/project/projectApi';
import { setProjectData } from '../../../features/project/projectSlice';
import { BsFilePdf } from 'react-icons/bs';

import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import FileUpload from './Components/FileUpload';
import Demo from '../../Project/Components/Demo';
import ArtistRequest from './ArtistRequest';
import Modal from '../../../Components/Modal/Modal';
import Alert from '../../../Components/Badge/Alert';
import Badge from '../../../Components/Badge/Badge';
import TableRow from '../../../Components/Table/TableRow';

const ProjectDashboard = () => {
    const { setIsModalOpen } = useRootContext();

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    const { id } = useParams();
    const { data: currentProject = {}, refetch, isLoading: getProjectLoading } = useGetProjectQuery(id);

    useEffect(() => {
        if (user?.email) {
            refetch();
        }
    }, [user])

    useEffect(() => {
        if (currentProject.pk) {
            dispatch(setProjectData({
                chatLog: JSON.parse(currentProject.brief),
                shortlistedArtists: currentProject.shortlisted_artists_details?.map(artist => artist.id),
                selectedContentProduct: currentProject.project_template,
                ...currentProject
            }))

            sessionStorage.setItem("CURRENT_PROJECT", currentProject.pk);
        }
    }, [currentProject])

    const [artistRequestModal, setArtistRequestModal] = useState(false);
    useEffect(() => {
        setIsModalOpen(artistRequestModal);
    }, [artistRequestModal]);

    return (
        <div className='bg-white rounded-b-lg shadow-lg'>
            <div className="p-4">
                <div className='mb-5 flex items-center justify-center gap-1.5'>
                    <h1 className='text-3xl font-bold font-hero text-gray-600'>{currentProject?.title}</h1>
                    {user?.email && <Link to={`/projects/edit-project/${currentProject?.pk}`}>
                        <Badge type="error">Edit</Badge>
                    </Link>}
                </div>
                <section class="font-hero">
                    <div class="w-full overflow-hidden rounded-lg shadow-lg">
                        <div class="w-full overflow-x-auto">
                            <table class="w-full">
                                <tbody class="bg-white">
                                    <TableRow label="Client" content={<>{user.email ? currentProject?.client_details?.name : "ADBHUT.IO"} <br /> <span className='bg-gray-200 px-2 text-sm rounded-full'>{user.email ? currentProject?.client_details?.email : "servicing@adbhut.io"}</span></>} />
                                    <TableRow label="Stage" content={<Badge type="success">{currentProject?.stage}</Badge>} />
                                    <TableRow label="Content Product" content={currentProject.template?.length > 0 && <span className="font-semibold">{currentProject?.template[1]}</span>} />
                                    <TableRow label="Production solution" content={currentProject?.production_solution} />
                                    <TableRow label="Artist discussion updates" content={currentProject?.artist_discussion_updates} />
                                    {/* {urrentProject?.reference_links?.startsWith("[") && currentProject?.reference_links?.endsWith("]") &&
                                        JSON.parse(currentProject?.reference_links)?.length > 0 &&} */}
                                    {/* <TableRow label="Project Reference Links" content={JSON.parse(currentProject?.reference_links)} /> */}
                                    <TableRow label="Client Briefing" content={currentProject?.post_project_client_feedback} />
                                </tbody>
                            </table>

                            <table class="w-full">
                                <thead>
                                    <tr class="text-md font-semibold text-left text-gray-900 bg-gray-100 border-x">
                                        <th class="px-4 py-3 flex items-center gap-2">
                                            Shortlisted Artist
                                            <div className="flex items-center gap-1">
                                                <Link to="/artists">
                                                    <Badge className="border border-gray-200 bg-blue-100 text-blue-700">Add Artist</Badge>
                                                </Link>
                                                {user?.role === "PM" &&
                                                    <Badge onClick={() => setArtistRequestModal(true)} className="border border-gray-200 bg-blue-100 text-blue-700 cursor-pointer">Request for Artist</Badge>}
                                            </div>
                                        </th>
                                        <th class="px-4 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white">{
                                    currentProject.shortlisted_artists_details?.map(artist => (
                                        <ShortlistedArtistRow
                                            key={artist.id}
                                            artist={artist}
                                            projectId={currentProject.pk}
                                        />))
                                }</tbody>
                            </table>

                            {currentProject.assigned_artists_details?.length > 0 &&
                                <table class="w-full">
                                    <thead>
                                        <tr class="text-md font-semibold text-left text-gray-900 bg-gray-100 border-x">
                                            <th class="px-4 py-3">Assigned Artist</th>
                                            <th class="px-4 py-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white">{
                                        currentProject.assigned_artists_details?.map(artist => (
                                            <AssignedArtistRow
                                                key={artist.id}
                                                artist={artist}
                                                projectId={currentProject.pk}
                                            />))
                                    }</tbody>
                                </table>
                            }

                            <table class="w-full">
                                <thead>
                                    <tr class="text-md font-semibold text-left text-gray-900 bg-gray-100 border-b border-gray-600">
                                        <th class="px-4 py-3">Estimate Fee #</th>
                                        <th class="px-4 py-3">Amount</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white">
                                    {user?.role === "PM" && <TableRow label="Assigned artist payouts" content={currentProject?.assigned_artist_payouts} />}
                                    {user?.role === "PM" && <TableRow label="Negotiated Advance" content={currentProject?.negotiated_advance} />}
                                    {user?.role === "PM" && <TableRow label="Final Advance" content={currentProject?.final_advance} />}
                                    {user?.role === "PM" && <TableRow label="Post-Project Client’s Total Payout" content={currentProject?.post_project_client_total_payout} />}

                                    <TableRow label="Solution Fee" content={currentProject?.solution_fee || "WIP"} />
                                    <TableRow label="Production Advance" content={currentProject?.production_advance || "WIP"} />

                                    <TableRow label="Project fee Status" content={<Badge type="warning">{currentProject?.project_fee_Status || "N/A"}</Badge>} />
                                    <TableRow label="Advance Status" content={<Badge type="warning">{"Pending"}</Badge>} />
                                    <TableRow label="Artist payout status" content={<Badge type="warning">{currentProject?.artist_payout_status || 'N/A'}</Badge>} />

                                    <TableRow label="Final fee settlement" content={<Badge type="error">Incomplete</Badge>} />
                                    <TableRow label="Contract status" content={<Badge type="error">Incomplete</Badge>} />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {
                    currentProject?.pk === 148 &&
                    <>
                        <div className="mb-4">
                            <label className="text-sm font-medium text-gray-900">Demos: </label>
                            <div className='flex gap-2 items-center'>
                                <a target="_blank" href="https://drive.google.com/file/d/1cwG-4RgV25jHHNaR0eUlSloqs5pM_AU1/view" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full flex items-center w-fit">
                                    <BsFilePdf size={25} className="mr-2" />
                                    View Demo
                                </a>
                                <a target="_blank" href="https://drive.google.com/file/d/1rF1eqirsozTPtXz2y70Q-cio-0T8ehD3/view?usp=sharing" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full flex items-center w-fit">
                                    <BsFilePdf size={25} className="mr-2" />
                                    View Demo
                                </a>
                            </div>
                        </div>
                    </>
                }

                {/* <div className="mb-4">
                        <div className="flex justify-between mb-2">
                            <p>Media, links and docs demos</p>
                            <Link to={`/projects/demos/${currentProject?.pk}`}>
                                <p className="flex items-center gap-2">{currentProject?.project_demos?.length} <IoIosArrowForward size={20} /></p>
                            </Link>
                        </div>
                        <div className="flex gap-3 overflow-hidden">
                            {
                                currentProject?.project_demos?.slice(0, 4)?.map(demo => <Demo demo={demo} />)
                            }
                        </div>
                    </div> */}
                {
                    user?.role === "PM" &&
                    <FileUpload />
                }

            </div >

            {
                artistRequestModal &&
                <Modal onClick={() => setArtistRequestModal(false)}>
                    <ArtistRequest setArtistRequestModal={setArtistRequestModal} />
                </Modal>
            }

        </div >
    );
};

export default ProjectDashboard;