import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProjectQuery, useUpdateProjectMutation } from '../../../features/project/projectApi';
import { useSendMessageToGPTMutation } from '../../../features/chat/chatApi';
import { showLogin } from '../../../features/dropdown/dropdownSlice';
import { addChatLog } from '../../../features/project/projectSlice';
import PageLoader from '../../../Components/Loader/PageLoader';
import Badge from '../../../Components/Badge/Badge';
import TableRow from '../../../Components/Table/TableRow';

const EditProject = () => {
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
            setValue("post_project_client_total_feedback", currentProject.post_project_client_total_feedback);
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

    return (
        <div className='bg-white rounded-b-lg shadow-lg'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-4">
                    <div className='mb-5 flex items-center justify-center gap-1.5'>
                        <div class="relative w-fit min-w-[200px] mt-2">
                            <input
                                type="text"
                                name="title"
                                class="peer h-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 text-3xl font-bold font-hero text-gray-600"
                                placeholder=" "
                                {...register("title", { required: true })}
                            />
                            <label class="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                Title
                            </label>
                        </div>
                        <button type="submit"><Badge type="success">Save</Badge></button>
                    </div>
                    <section class="font-hero">
                        <div class="w-full overflow-hidden rounded-lg shadow-lg">
                            <div class="w-full overflow-x-auto">
                                <table class="w-full">
                                    <tbody class="bg-white">
                                        <TableRow label="Client" content={<>{user.email ? currentProject?.client_details?.name : "ADBHUT.IO"} <br /> <span className='bg-gray-200 px-2 text-sm rounded-full'>{user.email ? currentProject?.client_details?.email : "servicing@adbhut.io"}</span></>} />
                                        <TableRow label="Stage" content={<Badge type="success">{currentProject?.stage}</Badge>} />
                                        <TableRow label="Content Product" content={currentProject.template?.length > 0 && <span className="font-semibold">{currentProject?.template[1]}</span>} />
                                        {user?.role === "PM" &&
                                            <TableRow label="Production solution" content={
                                                <Textarea
                                                    name="production_solution"
                                                    placeholder="Production solution"
                                                    register={register}
                                                ></Textarea>
                                            } />}
                                        {user?.role === "PM" &&
                                            <TableRow label="Artist discussion updates" content={
                                                <Textarea
                                                    name="artist_discussion_updates"
                                                    placeholder="Artist discussion updates"
                                                    register={register}
                                                />
                                            } />}

                                        {/* {urrentProject?.reference_links?.startsWith("[") && currentProject?.reference_links?.endsWith("]") &&
                                            JSON.parse(currentProject?.reference_links)?.length > 0 &&} */}
                                        {/* <TableRow label="Project Reference Links" content={JSON.parse(currentProject?.reference_links)} /> */}

                                        {user?.role === "Client" &&
                                            <TableRow label="Client Briefing" content={
                                                <Textarea
                                                    name="post_project_client_feedback"
                                                    placeholder="Client Briefing"
                                                    register={register}
                                                    defaultValue={currentProject?.post_project_client_feedback}
                                                />
                                            } />
                                        }
                                    </tbody>
                                </table>
                                {user?.role === "PM" &&
                                    <table class="w-full">
                                        <thead>
                                            <tr class="text-md font-semibold text-left text-gray-900 bg-gray-100 border-b border-gray-600">
                                                <th class="px-4 py-3">Estimate Fee #</th>
                                                <th class="px-4 py-3">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody class="bg-white">
                                            <TableRow label="Assigned artist payouts" content={
                                                <Input
                                                    type="number"
                                                    name="assigned_artist_payouts"
                                                    placeholder="Enter amount"
                                                    register={register}
                                                    min={0}
                                                />
                                            } />
                                            <TableRow label="Negotiated Advance" content={
                                                <Input
                                                    type="number"
                                                    name="negotiated_advance"
                                                    placeholder="Enter amount"
                                                    register={register}
                                                    min={0}
                                                />
                                            } />
                                            <TableRow label="Final Advance" content={
                                                <Input
                                                    type="number"
                                                    name="final_advance"
                                                    placeholder="Enter amount"
                                                    register={register}
                                                    min={0}
                                                />
                                            } />
                                            <TableRow label="Post-Project Client’s Total Payout" content={
                                                <Input
                                                    type="number"
                                                    name="post_project_client_total_payout"
                                                    placeholder="Enter amount"
                                                    register={register}
                                                    min={0}
                                                />
                                            } />

                                            <TableRow label="Solution Fee" content={currentProject?.solution_fee || "WIP"} />
                                            <TableRow label="Production Advance" content={currentProject?.production_advance || "WIP"} />

                                            <TableRow label="Project fee Status" content={<Badge>{currentProject?.project_fee_Status || "N/A"}</Badge>} />
                                            <TableRow label="Advance Status" content={<Badge>{"Pending"}</Badge>} />
                                            <TableRow label="Artist payout status" content={<Badge>{currentProject?.artist_payout_status || 'N/A'}</Badge>} />

                                            <TableRow label="Final fee settlement" content={
                                                <input {...register("final_fee_settlement_status")} id="final_fee_settlement_status" type="checkbox" className="w-4 h-4 text-blue-600 rounded ring-offset-gray-800 bg-gray-700 border-gray-600" defaultChecked={currentProject?.final_fee_settlement_status} />
                                            } />
                                            <TableRow label="Contract status" content={
                                                <input {...register("contract_status")} id="contract_status" type="checkbox" className="w-4 h-4 text-blue-600 rounded ring-offset-gray-800 bg-gray-700 border-gray-600" defaultChecked={currentProject?.contract_status} />
                                            } />
                                        </tbody>
                                    </table>}
                            </div>
                        </div>
                    </section>
                </div>
            </form>

            {
                (updateProjectLoading || getProjectLoading) &&
                <PageLoader />
            }
        </div>
    );
};

export default EditProject;

const Textarea = ({ name, placeholder, defaultValue, required, register, ...props }) => {
    return (
        <textarea {...register(name, { required })} id={name} rows="5" className="w-full border p-1" placeholder={placeholder} defaultValue={defaultValue} {...props}></textarea>
    );
};

const Input = ({
    name,
    type,
    placeholder,
    defaultValue,
    required,
    register = () => { },
    ...props
}) => {
    return (
        <input
            {...register(name, { required: !defaultValue })}
            type={type}
            className="border px-1"
            placeholder={placeholder}
            defaultValue={defaultValue}
            {...props}
        />
    );
};