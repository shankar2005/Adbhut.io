import { useEffect, useState } from 'react';
import { useRootContext } from '../../../contexts/RootProvider';
import { Link, useParams } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import ShortlistedArtistRow from './Components/ShortlistedArtistRow';
import AssignedArtistRow from './Components/AssignedArtistRow';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProjectQuery } from '../../../features/project/projectApi';
import { showLogin } from '../../../features/dropdown/dropdownSlice';
import { addChatLog, setProjectData } from '../../../features/project/projectSlice';
import { BsFilePdf, BsFilePdfFill, BsMusicNoteBeamed } from 'react-icons/bs';
import logo from "../../../assets/logos/adbeta.jpeg"

import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import FileUpload from './Components/FileUpload';
import Demo from '../../Project/Components/Demo';
import ArtistRequest from './ArtistRequest';
import Modal from '../../../Components/Modal/Modal';
import Alert from '../../../Components/Badge/Alert';

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
                    <Link to={`/projects/edit-project/${currentProject?.pk}`}>
                        <Status>Edit</Status>
                    </Link>
                </div>
                <section class="font-hero">
                    <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                        <div class="w-full overflow-x-auto">
                            <table class="w-full">
                                <tbody class="bg-white">
                                    <TableRow label="Client" content={<>{user.email ? currentProject?.client_details?.name : "ADBHUT.IO"} <br /> <span className='bg-gray-200 px-2 text-sm rounded-full'>{user.email ? currentProject?.client_details?.email : "servicing@adbhut.io"}</span></>} />
                                    <TableRow label="Stage" content={<Status type="success">{currentProject?.stage}</Status>} />
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
                                    <tr class="text-md font-semibold text-left text-gray-900 bg-gray-100 border-b border-gray-600">
                                        <th class="px-4 py-3">Estimate Fee #</th>
                                        <th class="px-4 py-3">Amount</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white">
                                    <TableRow label="Assigned artist payouts" content={currentProject?.assigned_artist_payouts} />
                                    <TableRow label="Negotiated Advance" content={currentProject?.negotiated_advance} />
                                    <TableRow label="Final Advance" content={currentProject?.final_advance} />
                                    <TableRow label="Post-Project Client’s Total Payout" content={currentProject?.post_project_client_total_payout} />

                                    <TableRow label="Solution Fee" content={currentProject?.solution_fee || "WIP"} />
                                    <TableRow label="Production Advance" content={currentProject?.production_advance || "WIP"} />

                                    <TableRow label="Project fee Status" content={<Status>{currentProject?.project_fee_Status || "N/A"}</Status>} />
                                    <TableRow label="Advance Status" content={<Status>{"Pending"}</Status>} />
                                    <TableRow label="Artist payout status" content={<Status>{currentProject?.artist_payout_status || 'N/A'}</Status>} />

                                    <TableRow label="Final fee settlement" content={<Status type="success">Done</Status>} />
                                    <TableRow label="Contract status" content={<Status type="success">Done</Status>} />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {
                    <div className="mb-4 mt-8">
                        <div className='flex justify-between mb-1'>
                            <label className="block mb-2 text-sm font-medium text-gray-900">{
                                currentProject.shortlisted_artists_details?.length ? 'Shortlisted Artists' : 'Shortlist Artists'
                            }</label>
                            <div className="flex gap-1">
                                <Link to="/artists">
                                    <button type='button' className='bg-sky-400 hover:bg-sky-500 drop-shadow text-white p-1 px-2 rounded-lg text-sm font-meidum flex items-center gap-0.5'>Add Artist <AiOutlinePlus size={18} /></button>
                                </Link>
                                {user?.role === "PM" &&
                                    <button onClick={() => setArtistRequestModal(true)} type='button' className='bg-gray-400 hover:bg-gray-500 drop-shadow text-white p-1 px-2 rounded-lg text-sm font-meidum flex items-center gap-0.5'>Request for Artist</button>}
                            </div>
                        </div>
                        {
                            currentProject.shortlisted_artists_details?.length > 0 ?
                                currentProject.shortlisted_artists_details?.map(artist => <ShortlistedArtistRow
                                    key={artist.id}
                                    artist={artist}
                                    projectId={currentProject.pk}
                                />)
                                : <Alert>No artist selected!</Alert>
                        }
                    </div>
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
                                {/* <div>
                                        <iframe width="100%" height={166} scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1496260810&color=%230ea5e9&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true" /><div style={{ fontSize: '10px', color: '#cccccc', lineBreak: 'anywhere', wordBreak: 'normal', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontFamily: 'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif', fontWeight: 100 }}><a href="https://soundcloud.com/adbhut-188302011" title="Adbhut" target="_blank" style={{ color: '#cccccc', textDecoration: 'none' }}>Adbhut</a> · <a href="https://soundcloud.com/adbhut-188302011/demo-121-temp-vox-reference-nsnco-prodbykeerteesh" title="Demo 1.2.1 Temp Vox REFERENCE NsNCo ProdByKeerteesh" target="_blank" style={{ color: '#cccccc', textDecoration: 'none' }}>Demo 1.2.1 Temp Vox REFERENCE NsNCo ProdByKeerteesh</a></div>
                                    </div>
                                    <div>
                                        <iframe width="100%" height={166} scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1496330755&color=%230ea5e9&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true" /><div style={{ fontSize: '10px', color: '#cccccc', lineBreak: 'anywhere', wordBreak: 'normal', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontFamily: 'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif', fontWeight: 100 }}><a href="https://soundcloud.com/adbhut-188302011" title="Adbhut" target="_blank" style={{ color: '#cccccc', textDecoration: 'none' }}>Adbhut</a> · <a href="https://soundcloud.com/adbhut-188302011/echmkt-final-master-v2-nsnco-prodbykeerteesh" title="ECHMKT FINAL MASTER V2 NsNCo ProdByKeerteesh" target="_blank" style={{ color: '#cccccc', textDecoration: 'none' }}>ECHMKT FINAL MASTER V2 NsNCo ProdByKeerteesh</a></div>
                                    </div> */}
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

            </div>

            {
                artistRequestModal &&
                <Modal onClick={() => setArtistRequestModal(false)}>
                    <ArtistRequest setArtistRequestModal={setArtistRequestModal} />
                </Modal>
            }

        </div>
    );
};

export default ProjectDashboard;

const TableRow = ({ label, content }) => {
    return (
        <tr class="text-gray-700">
            <td class="px-4 py-3 border w-3/12">
                <div class="flex items-center text-sm">
                    <p class="font-semibold text-black">{label}</p>
                </div>
            </td>
            <td class="px-4 py-3 text-sm border">
                <span>{content}</span>
            </td>
        </tr>
    );
};

const Status = ({ type, children }) => {
    const statusTypes = {
        error: "text-red-700 bg-red-100",
        success: "text-green-700 bg-green-100"
    }
    return (
        <span class={`px-2 py-1 font-semibold leading-tight rounded-sm
            ${statusTypes[type] || statusTypes.error}
        `}>{children}</span>
    )
}