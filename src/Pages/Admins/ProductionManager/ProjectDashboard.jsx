import { useEffect, useState } from 'react';
import { useRootContext } from '../../../contexts/RootProvider';
import { Link, useLocation, useParams } from 'react-router-dom';
import ShortlistedArtistRow from './Components/ShortlistedArtistRow';
import AssignedArtistRow from './Components/AssignedArtistRow';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProjectQuery } from '../../../features/project/projectApi';
import { setProjectData } from '../../../features/project/projectSlice';
import ArtistRequest from './ArtistRequest';
import Modal from '../../../Components/Modal/Modal';
import Badge from '../../../Components/Badge/Badge';
import TableRow from '../../../Components/Table/TableRow';
import Container from '../../../Components/Container/Container';
import LeftAside from '../../Home/LeftAside';
import { useAssignDemoToProjectMutation } from '../../../features/demo/demoApi';
import WorkDemo from '../../Artist/Components/View/WorkDemo';
import AddNewDemo from '../../Demo/AddNewDemo';

const ProjectDashboard = () => {
    const { setIsModalOpen, showChat, isMobile } = useRootContext();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { id } = useParams();
    const { data: currentProject = {}, refetch, isFetching } = useGetProjectQuery(id);

    useEffect(() => {
        if (user?.email) {
            refetch();
        }
    }, [user])

    useEffect(() => {
        if (currentProject.pk) {
            dispatch(setProjectData({
                shortlistedArtists: currentProject.shortlisted_artists_details?.map(artist => artist.id),
                selectedContentProduct: currentProject.project_template,
                ...currentProject
            }))

            sessionStorage.setItem("CURRENT_PROJECT", currentProject.pk);
        }
    }, [currentProject]);

    useEffect(() => {
        if (isMobile) {
            if (showChat) {
                document.body.classList.add("overflow-hidden");
            } else {
                document.body.classList.remove("overflow-hidden");
            }
        }
    }, [showChat, isMobile]);

    const [artistRequestModal, setArtistRequestModal] = useState(false);
    useEffect(() => {
        setIsModalOpen(artistRequestModal);
    }, [artistRequestModal]);

    // this logic is for after creating project assigning the demo to the project
    const location = useLocation();
    const [assignDemoToProject] = useAssignDemoToProjectMutation();
    useEffect(() => {
        const project_demo = location.state?.project_demo;
        console.log(project_demo);
        if (project_demo) {
            assignDemoToProject({
                id: currentProject.pk,
                data: { project_demos: [project_demo] }
            }).then(data => {
                if (data?.data?.project_demos?.length) {
                    location.state = {};
                }
            })
        }
    }, [currentProject.pk]);
    // 

    if (isFetching || (!currentProject?.pk && currentProject?.message)) {
        return <div className="p-4 font-hero"><Badge type="error" className="border border-red-200">{currentProject?.message}</Badge></div>
    }

    const thumbnail = currentProject.links?.length > 0 && currentProject.links[0];

    return (
        <Container>
            <div className="p-4">
                <div className='mb-5 flex items-center justify-center gap-1.5'>
                    <h1 className='text-3xl font-bold font-hero text-gray-600'>{currentProject?.title}</h1>
                    {(user?.role === "PM" || user?.email === currentProject?.client_details?.name)
                        && (<Link to={`/projects/edit-project/${currentProject?.pk}`}>
                            <Badge type="error">Edit</Badge>
                        </Link>)
                    }
                </div>

                {thumbnail.link && <div className='stream mb-5'>
                    <WorkDemo demo_type={thumbnail.link_type} demo_link={thumbnail.link} />
                </div>}

                <div className="w-full overflow-hidden rounded-lg shadow-lg font-hero">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full">
                            <tbody className="bg-white">
                                <TableRow label="Client" content={<>{currentProject?.client_details?.name} <br /> <span className='bg-gray-200 px-2 text-sm rounded-full'>{currentProject?.client_details?.email}</span></>} />
                                <TableRow label="Stage" content={<Badge type="success">{currentProject?.stage}</Badge>} />
                                <TableRow label="Visibility" content={<Badge type="warning">{currentProject?.visibility}</Badge>} />
                                <TableRow label="Content Product" content={currentProject.template?.length > 0 && <span className="font-semibold">{currentProject?.template[1]}</span>} />
                                <TableRow label="Production solution" content={currentProject?.production_solution} />
                                <TableRow label="Artist discussion updates" content={currentProject?.artist_discussion_updates} />
                                <TableRow label="Reference Links" content={
                                    currentProject?.links?.map(({ link }) => (
                                        <a target="_blank" href={link} className="text-blue-800">{link}</a>))
                                } />
                                <TableRow label="Client Briefing" content={currentProject?.post_project_client_feedback} />
                                <TableRow label="Briefing Files" content={<>
                                    {currentProject?.files?.map(file => <a className="text-blue-700 hover:text-blue-800" href={file.url} target="_blank">{file.url}</a>)}
                                </>} />
                            </tbody>
                        </table>

                        {user?.role !== "Artist" && (
                            <table className="w-full">
                                <thead>
                                    <tr className="text-md font-semibold text-left text-gray-900 bg-gray-100 border border-t-0">
                                        <th className="px-4 py-3 flex items-center gap-2">
                                            Shortlisted Artist
                                            {user?.email &&
                                                <div className="flex items-center gap-1">
                                                    <Link to="/artists">
                                                        <Badge className="block border border-gray-200 bg-blue-100 text-blue-700">Add Artist</Badge>
                                                    </Link>
                                                    {user?.role === "PM" &&
                                                        <button onClick={() => setArtistRequestModal(true)}><Badge className="block border border-gray-200 bg-blue-100 text-blue-700">Request for Artist</Badge></button>}
                                                </div>}
                                        </th>
                                        <th className="px-4 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">{
                                    currentProject.shortlisted_artists_details?.map(artist => (
                                        <ShortlistedArtistRow
                                            key={artist.id}
                                            artist={artist}
                                            projectId={currentProject.pk}
                                        />))
                                }</tbody>
                            </table>)
                        }

                        {currentProject.assigned_artists_details?.length > 0 &&
                            <table className="w-full">
                                <thead>
                                    <tr className="text-md font-semibold text-left text-gray-900 bg-gray-100 border-b border-gray-600">
                                        <th className="px-4 py-3">Assigned Artist</th>
                                        <th className="px-4 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">{
                                    currentProject.assigned_artists_details?.map(artist => (
                                        <AssignedArtistRow
                                            key={artist.id}
                                            artist={artist}
                                            projectId={currentProject.pk}
                                        />))
                                }</tbody>
                            </table>
                        }

                        <table className="w-full">
                            <thead>
                                <tr className="font-semibold text-left text-gray-900 bg-gray-100 border">
                                    <th className="px-4 py-3 flex items-center gap-2">
                                        <h5 className="font-semibold">Demos</h5>
                                        <AddNewDemo />
                                    </th>
                                    <th className="px-4 py-3">
                                        <h5 className="font-semibold">Actions</h5>
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="bg-white">
                                {currentProject.project_demos?.map(demo => (
                                    <tr className="text-gray-700">
                                        <td className="px-4 py-3 border border-b-0 w-3/5">
                                            <a target="_blank" href={demo.link || demo.document} className="text-blue-800 hover:text-red-900">
                                                {demo.Title}
                                            </a>
                                        </td>
                                        {user?.role === "PM" && (
                                            <td className="px-4 py-3 text-sm border border-b-0 space-x-2">
                                                <button type='button'>
                                                    <Badge type="success">Select</Badge>
                                                </button>
                                                <button type='button'>
                                                    <Badge type="success">Shortlist</Badge>
                                                </button>
                                                <button type='button'>
                                                    <Badge type="error">Reject</Badge>
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {user?.role !== "Artist" &&
                            (<table className="w-full">
                                <thead>
                                    <tr className="text-md font-semibold text-left text-gray-900 bg-gray-100 border">
                                        <th className="px-4 py-3">Estimate Fee #</th>
                                        <th className="px-4 py-3">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {user?.role === "PM" && <TableRow label="Assigned artist payouts" content={currentProject?.assigned_artist_payouts} />}
                                    {user?.role === "PM" && <TableRow label="Negotiated Advance" content={currentProject?.negotiated_advance} />}
                                    {user?.role === "PM" && <TableRow label="Final Advance" content={currentProject?.final_advance} />}
                                    {user?.role === "PM" && <TableRow label="Post-Project Client’s Total Payout" content={currentProject?.post_project_client_total_payout} />}

                                    <TableRow label="Solution Fee" content={currentProject?.solution_fee || "WIP"} />
                                    <TableRow label="Production Advance" content={currentProject?.production_advance || "WIP"} />

                                    <TableRow label="Project fee Status" content={<Badge type="warning">{currentProject?.project_fee_Status || "N/A"}</Badge>} />
                                    <TableRow label="Advance Status" content={<Badge type="warning">{"Pending"}</Badge>} />
                                    <TableRow label="Artist payout status" content={<Badge type="warning">{currentProject?.artist_payout_status || 'N/A'}</Badge>} />

                                    {user?.role === "PM" && <TableRow label="Final fee settlement status" content={
                                        currentProject?.final_fee_settlement_status
                                            ? <Badge type="success">Complete</Badge>
                                            : <Badge type="error">Incomplete</Badge>
                                    } />}
                                    {user?.role === "PM" && <TableRow label="Contract status" content={
                                        currentProject?.contract_status
                                            ? <Badge type="success">Complete</Badge>
                                            : <Badge type="error">Incomplete</Badge>
                                    } />}
                                </tbody>
                            </table>)
                        }
                    </div>
                </div>
            </div >

            {
                artistRequestModal &&
                <Modal onClick={() => setArtistRequestModal(false)} className="w-11/12 max-w-2xl">
                    <ArtistRequest setArtistRequestModal={setArtistRequestModal} />
                </Modal>
            }

            {(user?.role === "PM" || user?.email === currentProject?.client_details?.name) && (
                <div className={`w-full md:w-[350px] fixed bottom-0 right-0 md:right-0 ${showChat ? "translate-y-0" : "translate-y-[88%]"} duration-200 z-50`}>
                    <LeftAside />
                </div>)
            }

        </Container >
    );
};

export default ProjectDashboard;