import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
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
import WorkDemo from '../Artist/Components/View/WorkDemo';

const CreateProject = () => {
    const { contentProducts, handleSelectContentProduct } = useRootContext();

    const currentProject = useSelector(state => state.project);

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

    // const [realtedWorks, setRelatedWorks] = useState(null);
    // useEffect(() => {
    //     fetch('https://dev.nsnco.in/api/v1/get_feed/')
    //         .then(res => res.json())
    //         .then(data => setRelatedWorks(data.results?.slice(0, 3)));
    // }, []);

    return (
        <Container className="font-hero">
            <h1 className="text-3xl font-semibold p-3 text-center">Create Project</h1>
            <form>
                <table className="w-full">
                    <tbody className="bg-white">
                        <TableRow
                            label="Title"
                            content={
                                <Input
                                    type="text"
                                    placeholder="Enter project title"
                                    onBlur={e => dispatch(setTitle(e.target.value))}
                                    defaultValue={currentProject?.title}
                                />
                            } />
                        <TableRow
                            label="Reference Link"
                            content={
                                <Input
                                    type="url"
                                    placeholder="Reference link"
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

                {/* <div className='grid grid-cols-4 gap-2 p-4 h-40 overflow-hidden'>
                    {realtedWorks?.map(work => <WorkDemo demo_type={work.demo_type} demo_link={work.weblink} />)}
                    <Link to="/artists" className='flex items-center justify-center'>Show More</Link>
                </div> */}


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
                    <p onClick={() => setArtistProfile(artist.artistID)} className="text-blue-700 hover:text-red-800 cursor-pointer">{artist?.name}</p>
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