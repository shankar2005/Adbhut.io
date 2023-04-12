import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRootContext } from '../../../contexts/RootProvider';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import ShortlistedArtistRow from './Components/ShortlistedArtistRow';
import AssignedArtistRow from './Components/AssignedArtistRow';
import Button from '../../../Components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProjectQuery, useUpdateProjectMutation } from '../../../features/project/projectApi';
import { useSendMessageToGPTMutation } from '../../../features/chat/chatApi';
import { showLogin } from '../../../features/dropdown/dropdownSlice';
import { addChatLog, setProjectData } from '../../../features/project/projectSlice';
import PageLoader from '../../../Components/Loader/PageLoader';
// import ReactAudioPlayer from 'react-audio-player';
// import test from "../../../assets/test.mp3"

const ProjectManagement = () => {
    const { avatar } = useRootContext();

    const dispatch = useDispatch();
    const [updateProject, { isLoading: updateProjectLoading }] = useUpdateProjectMutation();
    const [sendMessage] = useSendMessageToGPTMutation();
    const { user } = useSelector(state => state.auth);
    const { chatLog } = useSelector(state => state.project);

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

            // set data in form
            setValue("title", currentProject.title);
            setValue("assigned_artist_payouts", currentProject.assigned_artist_payouts);
            setValue("solution_fee", currentProject.solution_fee);
            setValue("production_advance", currentProject.production_advance);
            setValue("negotiated_advance", currentProject.negotiated_advance);
            setValue("final_advance", currentProject.final_advance);
            setValue("post_project_client_total_payout", currentProject.post_project_client_total_payout);
            setValue("production_solution", currentProject.production_solution);
            setValue("artist_discussion_updates", currentProject.artist_discussion_updates);
        }
    }, [currentProject])

    const { register, handleSubmit, setValue } = useForm();
    const onSubmit = data => {
        if (!user.email) {
            return dispatch(showLogin());
        }

        const formData = {
            title: data.title,
            post_project_client_feedback: data.post_project_client_feedback,
            production_solution: data.production_solution,
            artist_discussion_updates: data.artist_discussion_updates,
            // fees
            assigned_artist_payouts: +data.assigned_artist_payouts,
            negotiated_advance: +data.negotiated_advance,
            final_advance: +data.final_advance,
            post_project_client_total_payout: +data.post_project_client_total_payout,
            final_fee_settlement_status: data.final_fee_settlement_status,
            contract_status: data.contract_status,
        }

        updateProject({
            id: currentProject.pk,
            data: formData
        })
            .then(response => {
                const data = response.data;
                if (formData.post_project_client_feedback) {
                    // send assignment to the chatbox
                    if (user.role === "Client") {
                        // chatlog
                        const message = { msgID: chatLog.length + 1, user: data.post_project_client_feedback };
                        dispatch(addChatLog(message));
                        // send message api
                        sendMessage({
                            project_id: currentProject.pk,
                            message: message
                        })
                    }
                }
            })
    }

    const navigate = useNavigate();

    const [assignmentField, setassignmentField] = useState("");
    const handleAddToMyProject = () => {
        if (!user.email) {
            return dispatch(showLogin());
        }

        updateProject({
            id: currentProject.pk,
            data: { stage: "Lead", post_project_client_feedback: assignmentField }
        })
            .then(response => {
                const data = response.data;
                navigate(`/projects/${data.pk}/${data.stage}`);

                // send assignment to the chatbox
                // chatlog
                const message = { msgID: chatLog.length + 1, user: assignmentField };
                dispatch(addChatLog(message));
                // send message api
                sendMessage({
                    project_id: currentProject.pk,
                    message: message
                })
            })
    }

    const handleSubmitToClient = () => {
        updateProject({
            id: currentProject.pk,
            data: { stage: "In Progress" }
        })
            .then(response => {
                const data = response.data;
                if (data.pk) {
                    // chatlog
                    const message = { msgID: chatLog.length + 1, bot: "Project is in progress. Waiting for client's response!" };
                    dispatch(addChatLog(message));
                    // send message api
                    sendMessage({
                        project_id: currentProject.pk,
                        message: message
                    })
                }
            })
    }

    const handleApproveProject = () => {
        navigate("/projects/sign-project");
    }

    return (
        <div className='bg-white rounded-lg shadow-lg'>
            <form id='projectForm' onSubmit={handleSubmit(onSubmit)}>
                <div className="p-4">
                    <div className="mb-4 items-center gap-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Project Title</label>
                        <input type="text" {...register('title')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" disabled={!user.email} />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Creator</label>
                        {
                            user.email
                                ? <div className='flex items-center gap-2 rounded'>
                                    <div className='relative'>
                                        <img className='w-10 border rounded-full' src={avatar} alt="" />
                                    </div>
                                    <div className='text-sm'>
                                        <p className="font-medium">{currentProject?.client_details?.name}</p>
                                        <p className='bg-gray-200 px-2 text-xs rounded-full'>{currentProject?.client_details?.email}</p>
                                    </div>
                                </div>
                                : <div className='flex items-center gap-2 rounded'>
                                    <div className='relative'>
                                        <img className='w-10 border rounded-full' src="https://adbhut.io/assets/logo-63665b8e.jpeg" alt="" />
                                    </div>
                                    <div className='text-sm'>
                                        <p className="font-medium">ADBHUT.IO</p>
                                        <p className='bg-gray-200 px-2 text-xs rounded-full w-fit'>servicing@adbhut.io</p>
                                    </div>
                                </div>
                        }
                    </div>
                    <div className='flex gap-4'>
                        <div className="mb-4 flex items-center gap-2">
                            <label className="text-sm font-medium text-gray-900">Stage: </label>
                            <p className='whitespace-nowrap w-fit py-1 px-3 border text-sm text-gray-500 border-gray-300 bg-blue-200 rounded-full'>{currentProject?.stage}</p>
                        </div>
                        <div className="mb-4 flex items-center gap-2">
                            <label className="text-sm font-medium text-gray-900">Content Product: </label>
                            <p className='whitespace-nowrap w-fit py-1 px-3 border text-sm text-gray-500 border-gray-300 bg-blue-200 rounded-full'>{currentProject.template?.length > 0 && currentProject?.template[1]}</p>
                        </div>
                    </div>

                    {
                        user.role === "Client" || !user.email ?
                            currentProject?.production_solution
                            && <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Production solution</label>
                                <p className='rounded-bl-lg rounded-br-lg rounded-tr-lg rounded p-3 text-sm bg-sky-100 font-sans'>{currentProject?.production_solution}</p>
                            </div>
                            : <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Production solution</label>
                                <textarea {...register("production_solution")} rows="5" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Production solution"></textarea>
                            </div>
                    }

                    {
                        user.role === "Client" || !user.email ?
                            currentProject?.artist_discussion_updates
                            && <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Artist discussion updates</label>
                                <p className='rounded-bl-lg rounded-br-lg rounded-tr-lg rounded p-3 text-sm bg-sky-100 font-sans'>{currentProject?.artist_discussion_updates}</p>
                            </div>
                            : <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Artist discussion updates</label>
                                <textarea {...register("artist_discussion_updates")} rows="5" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Artist discussion updates"></textarea>
                            </div>
                    }

                    {
                        <div className="mb-4 mt-8">
                            <div className='flex justify-between mb-1'>
                                <label className="block mb-2 text-sm font-medium text-gray-900">{
                                    currentProject.shortlisted_artists_details?.length ? 'Shortlisted Artists' : 'Shortlist Artists'
                                }</label>
                                <Link to="/artists">
                                    <button type='button' className='bg-sky-400 hover:bg-sky-500 drop-shadow text-white p-1 px-2 rounded-lg text-sm font-meidum flex items-center gap-0.5'>Add Artist <AiOutlinePlus size={18} /></button>
                                </Link>
                            </div>
                            {
                                currentProject.shortlisted_artists_details?.length > 0 ?
                                    currentProject.shortlisted_artists_details?.map(artist => <ShortlistedArtistRow
                                        key={artist.id}
                                        artist={artist}
                                        projectId={currentProject.pk}
                                    />)
                                    : <div className='bg-gray-200 p-3 rounded-lg text-sm'>No artist selected!</div>
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
                        currentProject?.reference_links &&
                        <div className="mb-4">
                            <label className="text-sm font-medium text-gray-900">Project Reference Links: </label>
                            <ul className='rounded-bl-lg rounded-br-lg rounded-tr-lg rounded p-3 text-sm bg-yellow-100 font-sans mt-2'>
                                {JSON.parse(currentProject?.reference_links)}
                            </ul>
                        </div>
                    }

                    {
                        currentProject?.pk === 108 &&
                        <div className="mb-4">
                            <label className="text-sm font-medium text-gray-900">Demos: </label>
                            {/* <ReactAudioPlayer
                                src={test}
                                autoPlay={false}
                                controls
                                className='w-full'
                            /> */}
                        </div>
                    }

                    {
                        user.role === "PM" || user.role === "AM" ?
                            currentProject?.post_project_client_feedback
                            && <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Artist assignment</label>
                                <p className='rounded-bl-lg rounded-br-lg rounded-tr-lg rounded p-3 text-sm bg-yellow-100 font-sans'>{currentProject?.post_project_client_feedback}</p>
                            </div>
                            : <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Send assignment:</label>
                                <textarea {...register("post_project_client_feedback")} onBlur={(e) => setassignmentField(e.target.value)} rows="5" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Your assignment"></textarea>
                            </div>
                    }

                </div>

                <div className='border-y py-3 px-4 mb-4 text-gray-400 text-sm font-medium bg-gray-100'>
                    Project Fee
                </div>

                {/* project cost */}
                {
                    user.role === "Client" || !user.email ?
                        <div className='px-4 grid grid-cols-2 gap-2'>
                            <div className='col-span-2 mb-4'>
                                <table className="min-w-full text-sm">
                                    <thead className="bg-gray-200">
                                        <tr className="text-left">
                                            <th className="p-3">Estimate Fee #</th>
                                            <th className="p-3 text-right">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-opacity-20 border-gray-700">
                                            <td className="p-3">
                                                <p>Solution Fee</p>
                                            </td>
                                            <td className="p-3 text-right">
                                                <p>{currentProject?.solution_fee}</p>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-opacity-20 border-gray-700">
                                            <td className="p-3">
                                                <p>Production Advance</p>
                                            </td>
                                            <td className="p-3 text-right">
                                                <p>{currentProject?.production_advance}</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {
                                user.email &&
                                <>
                                    <div className="mb-5 flex items-center gap-2">
                                        <label className="text-sm font-medium text-gray-900">Project fee Status:</label>
                                        <p className='whitespace-nowrap w-fit py-1 px-3 border text-sm text-gray-500 border-gray-300 bg-blue-200 rounded-full'>{currentProject?.project_fee_Status || "N/A"}</p>
                                    </div>
                                    <div className="mb-5 flex items-center gap-2">
                                        <label className="block text-sm font-medium text-gray-900">Advance Status:</label>
                                        <p className='whitespace-nowrap w-fit py-1 px-3 border text-sm text-gray-500 border-gray-300 bg-gray-200 rounded-full'>Pending</p>
                                    </div>
                                </>
                            }
                        </div>
                        :
                        <div className='px-4 grid grid-cols-2 gap-2'>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Assigned artist payouts</label>
                                <input {...register("assigned_artist_payouts")} type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" min={0} placeholder="Enter amount" />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Solution Fee</label>
                                <input {...register("solution_fee")} type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed" min={0} placeholder="Enter amount" disabled />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Production Advance</label>
                                <input {...register("production_advance")} type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed" min={0} placeholder="Enter amount" disabled />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Negotiated Advance</label>
                                <input {...register("negotiated_advance")} type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" min={0} placeholder="Enter amount" />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Final Advance</label>
                                <input {...register("final_advance")} type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" min={0} placeholder="Enter amount" />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Post-Project Client’s Total Payout</label>
                                <input {...register("post_project_client_total_payout")} type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" min={0} placeholder="Enter amount" />
                            </div>
                            <div className="mb-4 flex items-center gap-2">
                                <label className="block text-sm font-medium text-gray-900">Advance Status:</label>
                                <p className='whitespace-nowrap w-fit py-1 px-3 border text-sm text-gray-500 border-gray-300 bg-gray-200 rounded-full'>{currentProject?.advance_status || 'N/A'}</p>
                            </div>
                            <div className="mb-4 flex items-center gap-2">
                                <label className="block text-sm font-medium text-gray-900">Artist payout status: </label>
                                <p className='whitespace-nowrap w-fit py-1 px-3 border text-sm text-gray-500 border-gray-300 bg-gray-200 rounded-full'>{currentProject?.artist_payout_status || 'N/A'}</p>
                            </div>
                            <div className="col-span-2 flex items-center">
                                <input {...register("final_fee_settlement_status")} id="final_fee_settlement_status" type="checkbox" className="w-4 h-4 text-blue-600 rounded ring-offset-gray-800 bg-gray-700 border-gray-600" defaultChecked={currentProject?.final_fee_settlement_status} />
                                <label htmlFor="final_fee_settlement_status" className="ml-2 text-sm font-medium text-gray-900">Final fee settlement</label>
                            </div>
                            <div className="col-span-2 flex items-center mb-4">
                                <input {...register("contract_status")} id="contract_status" type="checkbox" className="w-4 h-4 text-blue-600 rounded ring-offset-gray-800 bg-gray-700 border-gray-600" defaultChecked={currentProject?.contract_status} />
                                <label htmlFor="contract_status" className="ml-2 text-sm font-medium text-gray-900">Contract status</label>
                            </div>
                        </div>
                }

                <div className='p-4 space-x-2 flex'>
                    {
                        user.email ?
                            <>
                                <Button variant="primary" type="submit">Save Changes</Button>
                                {
                                    currentProject.stage !== "DreamProject" ?
                                        <>
                                            {
                                                user.role === "PM" && currentProject.stage === "Lead" &&
                                                <Button variant="primary" onClick={handleSubmitToClient}>Submit to client</Button>
                                            }
                                        </>
                                        : <Button variant="primary" onClick={handleAddToMyProject}>Send Brief</Button>
                                }
                            </>
                            : <>
                                {
                                    currentProject.stage === "DreamProject" &&
                                    <Button variant="primary" onClick={handleAddToMyProject}>Send Brief</Button>
                                }
                            </>
                    }
                    {
                        user.role === "Client" && currentProject.stage === "In Progress"
                        && <>
                            <button onClick={handleApproveProject} type="button" className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center">Approve</button>
                            <button onClick={handleApproveProject} type="button" className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center">Decline</button>
                            <button onClick={handleApproveProject} type="button" className="text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center">Put On Hold</button>
                        </>
                    }
                </div>
            </form>

            {
                (updateProjectLoading || getProjectLoading) &&
                <PageLoader />
            }

        </div>
    );
};

export default ProjectManagement;