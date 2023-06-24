import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useDeleteProjectMutation, useGetProjectQuery, useUpdateProjectMutation } from '../../../features/project/projectApi';
import { showLogin } from '../../../features/dropdown/dropdownSlice';
import { clearProject } from '../../../features/project/projectSlice';
import PageLoader from '../../../Components/Loader/PageLoader';
import Badge from '../../../Components/Badge/Badge';
import TableRow from '../../../Components/Table/TableRow';
import { toast } from 'react-hot-toast';
import { useRootContext } from '../../../contexts/RootProvider';
import Container from '../../../Components/Container/Container';
import Input from '../../../Components/Input/Input';
import { useState } from 'react';
import Button from '../../../Components/Button/Button';
import Select from '../../../Components/Input/Select';
import Textarea from '../../../Components/Input/Textarea';
import { BiArrowBack } from 'react-icons/bi';

// post_project_client_feedback - this field means Client Briefing
// not giving PM to update this field

const EditProject = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [updateProject, { isLoading: updateProjectLoading, isSuccess }] = useUpdateProjectMutation();
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
            // set data in form
            setValue("title", currentProject.title);
            setValue("stage", currentProject.stage);
            setValue("visibility", currentProject.visibility);
            setValue("production_solution", currentProject.production_solution);
            setValue("artist_discussion_updates", currentProject.artist_discussion_updates);
            setValue("post_project_client_feedback", currentProject.post_project_client_feedback);
            setValue("assigned_artist_payouts", currentProject.assigned_artist_payouts);
            setValue("solution_fee", currentProject.solution_fee);
            setValue("production_advance", currentProject.production_advance);
            setValue("negotiated_advance", currentProject.negotiated_advance);
            setValue("final_advance", currentProject.final_advance);
            setValue("post_project_client_total_payout", currentProject.post_project_client_total_payout);
            setValue("project_fee_Status", currentProject.project_fee_Status);
            setValue("advance_status", currentProject.advance_status);
            setValue("artist_payout_status", currentProject.artist_payout_status);
            setValue("final_fee_settlement_status", currentProject.final_fee_settlement_status);
            setValue("contract_status", currentProject.contract_status);
        }
    }, [currentProject])

    const { register, handleSubmit, setValue } = useForm();
    const onSubmit = data => {
        if (!user.email) {
            return dispatch(showLogin());
        }

        const formData = {
            title: data.title,
            stage: data.stage,
            visibility: data.visibility,
            post_project_client_feedback: data.post_project_client_feedback,
            production_solution: data.production_solution,
            artist_discussion_updates: data.artist_discussion_updates,
            // fees
            assigned_artist_payouts: +data.assigned_artist_payouts,
            negotiated_advance: +data.negotiated_advance,
            final_advance: +data.final_advance,
            post_project_client_total_payout: +data.post_project_client_total_payout,
            project_fee_Status: data.project_fee_Status,
            advance_status: data.advance_status,
            artist_payout_status: data.artist_payout_status,
            final_fee_settlement_status: data.final_fee_settlement_status,
            contract_status: data.contract_status,
        }

        updateProject({
            id: currentProject.pk,
            data: formData
        })
    }

    useEffect(() => {
        if (isSuccess) {
            navigate(`/projects/${currentProject?.pk}`)
        }
    }, [isSuccess, currentProject?.pk]);

    return (
        <Container className="relative">
            <Link to={`/projects/${currentProject.pk}`} className="absolute left-4 top-10">
                <BiArrowBack className='cursor-pointer bg-gray-200 text-gray-700 rounded-full p-1' size={30} />
            </Link>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-4">
                    <div className='mb-5 flex items-center justify-center gap-1.5'>
                        <div className="relative w-fit min-w-[200px] mt-2">
                            <input
                                type="text"
                                name="title"
                                className="peer h-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 text-3xl font-bold font-hero text-gray-600"
                                placeholder=" "
                                {...register("title", { required: true })}
                            />
                            <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                Title
                            </label>
                        </div>
                        <button type="submit"><Badge type="success">Save</Badge></button>
                    </div>
                    <section className="font-hero">
                        <div className="w-full overflow-hidden rounded-lg shadow-lg">
                            <div className="w-full overflow-x-auto">
                                <table className="w-full">
                                    <tbody className="bg-white">
                                        <TableRow label="Client" content={<>{user.email ? currentProject?.client_details?.name : "ADBHUT.IO"} <br /> <span className='bg-gray-200 px-2 text-sm rounded-full'>{user.email ? currentProject?.client_details?.email : "servicing@adbhut.io"}</span></>} />
                                        <TableRow label="Stage" content={
                                            <Select
                                                name="stage"
                                                register={register}
                                                options={[
                                                    { name: "DreamProject", value: "DreamProject" },
                                                    { name: "Lead", value: "Lead" },
                                                    { name: "In Progress", value: "In Progress" },
                                                    { name: "Halt", value: "Halt" },
                                                    { name: "Finish", value: "Finish" },
                                                ]}
                                            />
                                        } />
                                        <TableRow label="Visibility" content={
                                            <Select
                                                name="visibility"
                                                register={register}
                                                options={[
                                                    { name: "private", value: "private" },
                                                    { name: "public", value: "public" },
                                                ]}
                                            />
                                        } />
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
                                                />
                                            } />
                                        }
                                    </tbody>
                                </table>
                                {user?.role === "PM" &&
                                    <table className="w-full">
                                        <thead>
                                            <tr className="text-md font-semibold text-left text-gray-900 bg-gray-100 border-b border-gray-600">
                                                <th className="px-4 py-3">Estimate Fee #</th>
                                                <th className="px-4 py-3">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white">
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

                                            <TableRow label="Project fee Status" content={
                                                <Select
                                                    name="project_fee_Status"
                                                    register={register}
                                                    options={[
                                                        { name: "Unpaid", value: "Unpaid" },
                                                        { name: "Partially Paid", value: "Partially Paid" },
                                                        { name: "Paid", value: "Paid" },
                                                    ]}
                                                />
                                            } />
                                            <TableRow label="Advance Status" content={
                                                <Select
                                                    name="advance_status"
                                                    register={register}
                                                    options={[
                                                        { name: "Pending", value: "Pending" },
                                                        { name: "In Progress", value: "In Progress" },
                                                        { name: "Done", value: "Done" },
                                                    ]}
                                                />
                                            } />
                                            <TableRow label="Artist payout status" content={
                                                <Select
                                                    name="artist_payout_status"
                                                    register={register}
                                                    options={[
                                                        { name: "In Progress", value: "In Progress" },
                                                        { name: "Advance Payment Done", value: "Advance Payment Done" },
                                                        { name: "Full Payment Done", value: "Full Payment Done" },
                                                    ]}
                                                />
                                            } />

                                            <TableRow label="Final fee settlement status" content={
                                                <input {...register("final_fee_settlement_status")} id="final_fee_settlement_status" type="checkbox" className="w-4 h-4 text-blue-600 rounded ring-offset-gray-800 bg-gray-700 border-gray-600" />
                                            } />
                                            <TableRow label="Contract status" content={
                                                <input {...register("contract_status")} id="contract_status" type="checkbox" className="w-4 h-4 text-blue-600 rounded ring-offset-gray-800 bg-gray-700 border-gray-600" />
                                            } />
                                        </tbody>
                                    </table>}
                            </div>
                        </div>
                    </section>
                </div>
            </form>

            <ProjectActions projectId={currentProject?.pk} />

            {
                (updateProjectLoading || getProjectLoading) &&
                <PageLoader />
            }
        </Container>
    );
};

export default EditProject;

const ProjectActions = ({ projectId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setSuggestions, setRemovedSkill } = useRootContext();

    // delete project
    const [deleteProject] = useDeleteProjectMutation();
    const confirmInputRef = useRef();
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDeleteProject = () => {
        if (confirmInputRef.current?.value.trim() !== "Delete") {
            setShowConfirm(true);
            confirmInputRef.current?.focus();
        } else {
            deleteProject(projectId)
                .then(data => {
                    toast.success(data.data.message);
                    dispatch(clearProject());
                    setSuggestions([]);
                    setRemovedSkill([]);
                    navigate("/projects");
                });
        }
    }

    return (
        <div className="p-4 pt-1">
            {showConfirm && <div className='mb-2'>
                <p className='text-sm mb-1 font-semibold'>To confirm, type "<span className='font-bold text-red-600'>Delete</span>" in the box below</p>
                <input ref={confirmInputRef} type="text" className="border-2 border-blue-500 outline-red-500 rounded pl-1 text-sm" />
            </div>}

            <Button onClick={handleDeleteProject} type="button" variant="danger">Delete</Button>
        </div>
    )
}