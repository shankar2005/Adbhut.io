import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineExclamationCircle, AiOutlinePlus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Alert from '../../Components/Badge/Alert';
import Button from '../../Components/Button/Button';
import { useRootContext } from '../../contexts/RootProvider';
import { useGetArtistByIdQuery } from '../../features/artist/artistApi';
import { showLogin } from '../../features/dropdown/dropdownSlice';
import { useCreateProjectMutation } from '../../features/project/projectApi';
import { setClientFeedback, setReferenceLinks, setTitle } from '../../features/project/projectSlice';
import useSendMail from '../../hooks/useSendMail';
import AssignedArtistRow from '../Admins/ProductionManager/Components/AssignedArtistRow';

const CreateProject = () => {
    const { contentProducts, handleSelectContentProduct } = useRootContext();

    const currentProject = useSelector(state => state.project);

    const dispatch = useDispatch();
    const [createProject] = useCreateProjectMutation();
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
    const handleSendBrief = () => {
        if (!user.email) {
            return dispatch(showLogin());
        }
        if (!selectedContentProduct) {
            return toast("Select a content product!");
        }

        createProject({
            // required
            stage: "Lead",
            brief: JSON.stringify(chatLog),
            shortlisted_artists: shortlistedArtists,
            // optionals
            project_template: selectedContentProduct,
            title,
            reference_links: JSON.stringify(reference_links),
            post_project_client_feedback,
        })
            .then(response => {
                const data = response.data;
                if (data?.pk) {
                    const template = {
                        title,
                        client:"Maruf"
                    };
                    useSendMail(template);
                    toast.success("Project created successfully!", { id: "createNewProject" });
                    navigate(`/projects/${data.pk}`);
                } else {
                    toast.error("Something went wrong!", { id: "createNewProject" });
                }
            });
    }
    // above and below both events are the same code repeated (just state changes)
    // add to dream project
    const handleAddToDreamProject = () => {
        if (!user.email) {
            return dispatch(showLogin());
        }
        if (!selectedContentProduct) {
            return toast("Select a content product!");
        }

        createProject({
            // required
            stage: "DreamProject",
            brief: JSON.stringify(chatLog),
            shortlisted_artists: shortlistedArtists,
            // optionals
            project_template: selectedContentProduct,
            title: title,
            reference_links: JSON.stringify(reference_links),
            post_project_client_feedback,
        })
            .then(response => {
                const data = response.data;
                if (data.pk) {
                    toast.success("Added to dreamproject!", { id: "createNewProject" });
                    navigate(`/projects/${data.pk}`);
                } else {
                    toast.error("Something went wrong!", { id: "createNewProject" });
                }
            });
    }

    const location = useLocation();

    return (
        <div className='bg-white rounded-b-lg shadow-lg'>
            <form>
                <div className="p-4">
                    <div className="mb-4 items-center gap-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Project Title</label>
                        <input type="text" name="title" onBlur={e => dispatch(setTitle(e.target.value))} className="input" placeholder="Enter a Project title" defaultValue={currentProject?.title} />
                    </div>

                    <div className='flex gap-4'>
                        <div className="mb-4 w-full">
                            <label className="flex-1 text-sm font-medium text-gray-900">Content Product: </label>
                            <select name="project_template" onChange={e => {
                                const content = JSON.parse(e.target.value);
                                handleSelectContentProduct(content);
                                navigate("/artists");
                            }} className="input bg-gray-50">
                                <option selected>Select content product</option>
                                {
                                    contentProducts?.map(content => <option selected={selectedContentProduct === content.pk} value={JSON.stringify(content)}>{content.name}</option>)
                                }
                            </select>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Project Reference Link:</label>
                        <input type="text" name="reference_links" onBlur={e => dispatch(setReferenceLinks([e.target.value]))} className="input" placeholder="Enter project reference link" defaultValue={currentProject?.reference_links} />
                    </div>

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
        </div>
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