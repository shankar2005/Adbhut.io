import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineRight } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Badge from '../../Components/Badge/Badge';
import Button from '../../Components/Button/Button';
import Container from '../../Components/Container/Container';
import Input from '../../Components/Input/Input';
import TableRow from '../../Components/Table/TableRow';
import { useRootContext } from '../../contexts/RootProvider';
import { useGetArtistByIdQuery } from '../../features/artist/artistApi';
import { showLogin } from '../../features/dropdown/dropdownSlice';
import { useCreateProjectMutation } from '../../features/project/projectApi';
import { setClientFeedback, setReferenceLinks, setTitle } from '../../features/project/projectSlice';
import { removeArtist } from '../../features/project/projectSlice';
import { setArtist, addArtist } from '../../features/project/projectSlice';
import WorkDemo from '../Artist/Components/View/WorkDemo';
import WorkDemoSm from '../Artist/Components/View/WorkDemoSm';

const CreateProject = () => {
    const { contentProducts, handleSelectContentProduct } = useRootContext();
    const currentProject = useSelector(state => state.project);
    const [contentErr, setContentErr] = useState(null);

    const dispatch = useDispatch();
    const [createProject, { isSuccess, data: projectData }] = useCreateProjectMutation();
    const { user } = useSelector(state => state.auth);
    const {
        chatLog, shortlistedArtists, selectedContentProduct,
        title, reference_links, post_project_client_feedback, project_demo
    } = useSelector(state => state.project);

    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.removeItem("CURRENT_PROJECT");
    }, [])

    const handleSetRefLinks = (e) => {
        const value = e.target.value.split("\n");
        dispatch(setReferenceLinks(value));
    }

    // send brief
    const formData = {
        // required
        brief: JSON.stringify(chatLog),
        shortlisted_artists: shortlistedArtists,
        // optionals
        project_template: selectedContentProduct,
        title: title || project_demo?.Title,
        reference_links: reference_links,
        post_project_client_feedback,
    }

    const handleSendBrief = () => {
        if (!user.email) {
            return dispatch(showLogin());
        }
        if (!selectedContentProduct) {
            return setContentErr("Select a content product!");
        }
        setContentErr(null);

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
            return setContentErr("Select a content product!");
        }
        setContentErr(null);

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
                if (project_demo?.id) {
                    navigate(`/projects/${data.pk}`, { state: { project_demo: project_demo.id } });
                } else {
                    navigate(`/projects/${data.pk}`);
                }
            } else {
                toast.error("Something went wrong!", { id: "createNewProject" });
            }
        }
    }, [isSuccess])

    const [realtedWorks, setRelatedWorks] = useState(null);
    useEffect(() => {
        fetch(`https://dev.nsnco.in/api/v1/get_content_work/${selectedContentProduct}/?limit=3`)
            .then(res => res.json())
            .then(data => setRelatedWorks(data.content_works))
            .catch(err => setRelatedWorks(null));
    }, [selectedContentProduct]);

    useEffect(() => {
        if (project_demo.id) {
            dispatch(setArtist([]));

            if (project_demo?.artist) {
                dispatch(addArtist(project_demo?.artist));
            }
            if (project_demo?.collaborators?.length) {
                dispatch(setArtist(project_demo?.collaborators?.map(c => c.id)));
            }
        }
    }, [project_demo]);

    console.log(project_demo);

    return (
        <Container className="font-hero">
            <div className='mb-5 flex justify-center'>
                <div className="relative w-fit min-w-[200px] mt-2">
                    <input
                        type="text"
                        className="peer h-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 text-3xl font-bold font-hero text-gray-600"
                        placeholder=" "
                        onBlur={e => dispatch(setTitle(e.target.value))}
                        defaultValue={currentProject?.title || project_demo?.Title}
                    />
                    <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Title
                    </label>
                </div>
            </div>

            <div className='stream'>
                <WorkDemoSm demo_type={project_demo?.demo_type} demo_link={project_demo?.link || project_demo?.document} />
            </div>
            
            <form>
                <table className="w-full">
                    <tbody className="bg-white">
                        <TableRow
                            label="Reference Link"
                            content={
                                <>
                                    {reference_links?.map(link => <span className="bg-gray-200 px-2 rounded-full inline-block w-fit mb-1 mr-0.5">{link}</span>)}
                                    <textarea
                                        type="url"
                                        placeholder="Reference link"
                                        onChange={handleSetRefLinks}
                                        defaultValue={currentProject?.reference_links}
                                        className="input"
                                        rows={5}
                                    />
                                </>
                            } />
                        <TableRow
                            label="Content Product"
                            content={<>
                                <select onChange={(e) => {
                                    const content = JSON.parse(e.target.value);
                                    handleSelectContentProduct(content);
                                }} className="border">
                                    <option value={JSON.stringify({})} selected>Select content product</option>
                                    {
                                        contentProducts?.map(content => <option selected={selectedContentProduct === content.pk} value={JSON.stringify(content)}>{content.name}</option>)
                                    }
                                </select>
                                {contentErr && <p className='text-red-500 mt-0.5'>{contentErr}</p>}
                            </>} />
                    </tbody>
                </table>

                {realtedWorks?.length > 0 && (
                    <div className='grid grid-cols-4 items-center gap-2 p-4 overflow-hidden'>
                        {realtedWorks?.map(work => <WorkDemoSm demo_type={work.demo_type} demo_link={work.weblink} />)}
                        <div className='flex items-center justify-center'><Link to="/artists" className='hover:underline underline-offset-2 text-blue-900'><Badge>Show More</Badge></Link></div>
                    </div>
                )}

                {project_demo.id && <table className="w-full">
                    <thead>
                        <tr className="text-md font-semibold text-left text-gray-900 bg-gray-100 border-b">
                            <th className="px-4 py-3">
                                <h3 className="text-lg font-semibold">Demos</h3>
                            </th>
                        </tr>
                    </thead>

                    <tbody className="bg-white">
                        <tr>
                            <td className="px-4 py-3 text-sm border whitespace-pre-wrap">
                                <div className='flex flex-wrap gap-x-4 items-center text-base'>
                                    <a target="_blank" href={project_demo.link} className="text-blue-800 hover:text-red-900">
                                        {project_demo.Title}
                                    </a>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>}

                <table className="w-full">
                    <thead>
                        <tr className="text-md font-semibold text-left text-gray-900 bg-gray-100 border-b">
                            <th className="px-4 py-3 flex items-center gap-2">
                                Shortlisted Artist
                                <div className="flex items-center gap-1">
                                    <Link to="/artists">
                                        <Badge className="block border border-gray-200 bg-blue-100 text-blue-700">Add Artist</Badge>
                                    </Link>
                                </div>
                            </th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">{
                        shortlistedArtists?.map(artistId => (
                            <ArtistRow artistId={artistId} />))
                    }</tbody>
                </table>

                <table className="w-full">
                    <tbody className="bg-white">
                        <TableRow label="Assignment" content={
                            <textarea
                                name="post_project_client_feedback"
                                rows="5"
                                className="border w-4/5 p-1"
                                placeholder="Your assignment"
                                defaultValue={currentProject?.post_project_client_feedback}
                                onBlur={e => dispatch(setClientFeedback(e.target.value))}
                            ></textarea>
                        } />
                    </tbody>
                </table>

                <div className='p-4 space-x-2 flex'>
                    <Button variant="primary" onClick={handleAddToDreamProject}>Add to dream project</Button>
                    <Button variant="primary" onClick={handleSendBrief}>Send Brief</Button>
                </div>

            </form>
        </Container>
    );
};

export default CreateProject;


const ArtistRow = ({ artistId }) => {
    const { setArtistProfile } = useRootContext();
    const { data: artist = {} } = useGetArtistByIdQuery(artistId);
    const dispatch = useDispatch();

    const handleRejectArtist = () => {
        dispatch(removeArtist(artistId));
    }

    return (
        <tr className="text-gray-700">
            <td className="px-4 py-3 border w-3/5">
                <div className="flex items-center">
                    <p onClick={() => setArtistProfile(artist.id)} className="text-blue-700 hover:text-red-800 cursor-pointer">{artist?.name}</p>
                </div>
            </td>
            <td className="px-4 py-3 text-sm border space-x-2">
                <button type='button' onClick={handleRejectArtist}>
                    <Badge type="error">Reject</Badge>
                </button>
            </td>
        </tr>
    )
}