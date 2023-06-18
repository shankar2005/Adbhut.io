import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlinePlus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Alert from '../../Components/Badge/Alert';
import Button from '../../Components/Button/Button';
import Container from '../../Components/Container/Container';
import Input from '../../Components/Input/Input';
import TableRow from '../../Components/Table/TableRow';
import { useRootContext } from '../../contexts/RootProvider';
import { useGetArtistByIdQuery } from '../../features/artist/artistApi';
import { showLogin } from '../../features/dropdown/dropdownSlice';
import { useCreateProjectMutation } from '../../features/project/projectApi';
import { setClientFeedback, setReferenceLinks, setTitle } from '../../features/project/projectSlice';
import AssignedArtistRow from '../Admins/ProductionManager/Components/AssignedArtistRow';

const CreateProject = () => {
    const { contentProducts, handleSelectContentProduct } = useRootContext();

    const currentProject = useSelector(state => state.project);

    const dispatch = useDispatch();
    const [createProject, { isSuccess, data: projectData }] = useCreateProjectMutation();
    const { user } = useSelector(state => state.auth);
    const {
        chatLog, shortlistedArtists, selectedContentProduct,
        title, reference_links, post_project_client_feedback,
    } = useSelector(state => state.project);

    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.removeItem("CURRENT_PROJECT");
    }, [])

    // send brief
    const formData = {
        // required
        brief: JSON.stringify(chatLog),
        shortlisted_artists: shortlistedArtists,
        // optionals
        project_template: selectedContentProduct,
        title,
        reference_links: JSON.stringify(reference_links),
        post_project_client_feedback,
    }

    const handleSendBrief = () => {
        if (!user.email) {
            return dispatch(showLogin());
        }
        if (!selectedContentProduct) {
            return toast("Select a content product!");
        }

        createProject({
            stage: "Lead",
            ...formData
        })
    }

    // add to dream project
    const handleAddToDreamProject = () => {
        if (!user.email) {
            return dispatch(showLogin());
        }
        if (!selectedContentProduct) {
            return toast("Select a content product!");
        }

        createProject({
            stage: "DreamProject",
            ...formData
        })
    }

    useEffect(() => {
        if (isSuccess) {
            const data = projectData;
            if (data?.pk) {
                if (data.stage === "Lead") {
                    toast.success("Project created successfully!", { id: "createNewProject" });
                } else {
                    toast.success("Added to DreamProject!", { id: "createNewProject" });
                }
                navigate(`/projects/${data.pk}`);
            } else {
                toast.error("Something went wrong!", { id: "createNewProject" });
            }
        }
    }, [isSuccess])

    const location = useLocation();

    return (
        <Container className="font-hero">
            <h1 className="text-3xl font-semibold p-3 text-center border-b">Create Project</h1>
            <div className='mb-5 flex items-center justify-center gap-1.5'>
                <div className="relative w-fit min-w-[200px] mt-2">
                    <input
                        type="text"
                        name="title"
                        className="peer h-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 text-3xl font-bold font-hero text-gray-600"
                        placeholder=" "
                        onBlur={e => dispatch(setTitle(e.target.value))}
                        defaultValue={currentProject?.title}
                    />
                    <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Title
                    </label>
                </div>
            </div>

            <form>
                <table className="w-full">
                    <tbody className="bg-white">
                        <TableRow
                            label="Project Reference Link"
                            content={
                                <Input
                                    type="url"
                                    className="w-full"
                                    placeholder="Enter project reference link"
                                    onBlur={e => dispatch(setReferenceLinks([e.target.value]))}
                                    defaultValue={currentProject?.reference_links}
                                />
                            } />
                        <TableRow
                            label="Content Product"
                            content={
                                <select onChange={(e) => {
                                    const content = JSON.parse(e.target.value);
                                    handleSelectContentProduct(content);
                                }} className="border">
                                    <option selected>Select content product</option>
                                    {
                                        contentProducts?.map(content => <option selected={selectedContentProduct === content.pk} value={JSON.stringify(content)}>{content.name}</option>)
                                    }
                                </select>
                            } />
                    </tbody>
                </table>

                <div className="p-4">
                    {
                        <div className="mb-4 mt-8">
                            <div className='flex justify-between mb-1'>
                                <label className="block mb-2 text-sm font-medium text-gray-900">{
                                    shortlistedArtists?.length ? 'Shortlisted Artists' : 'Shortlist Artists'
                                }</label>
                                <Link to="/artists" state={{ from: location }}>
                                    <button type='button' onClick={() => navigate("/")} className='bg-sky-400 hover:bg-sky-500 drop-shadow text-white p-1 px-2 rounded-lg text-sm font-meidum flex items-center gap-0.5'>Add Artist <AiOutlinePlus size={18} /></button>
                                </Link>
                            </div>
                            {
                                shortlistedArtists?.length > 0 ?
                                    shortlistedArtists?.map(artistId => <ArtistRow artistId={artistId} />)
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
                                    refetch={refetch}
                                />)
                            }
                        </div>
                    }

                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Send assignment:</label>
                        <textarea name="post_project_client_feedback" onBlur={e => dispatch(setClientFeedback(e.target.value))} rows="5" className="input" placeholder="Your assignment" defaultValue={currentProject?.post_project_client_feedback}></textarea>
                    </div>
                </div>

                <div className='p-4 pt-0 space-x-2 flex'>
                    <Button variant="primary" onClick={handleAddToDreamProject}>Add to dream project</Button>
                    <Button variant="primary" onClick={handleSendBrief}>Send Brief</Button>
                </div>

            </form>
        </Container>
    );
};

export default CreateProject;


const ArtistRow = ({ artistId }) => {
    const { setArtistProfile, avatar } = useRootContext();
    const { data: artist = {} } = useGetArtistByIdQuery(artistId);

    return (
        <div className='flex items-center gap-2 text-sm bg-gray-100 p-2 mb-1 border border-blue-300 rounded-lg'>
            <img className='w-10 h-10 rounded-full' src={avatar} alt="" />
            <div>
                <p onClick={() => setArtistProfile(artist.artistID)} className='font-medium hover:underline'>{artist.name}</p>
                <p className='text-xs'>Status: <span className='bg-gray-400 p-0.5 px-1 rounded text-gray-50'>available</span></p>
            </div>
        </div>
    )
}