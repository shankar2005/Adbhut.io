import React, { useContext } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlinePlus } from 'react-icons/ai';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import { AuthContext } from '../../contexts/AuthProvider';
import { useRootContext } from '../../contexts/RootProvider';
import { useGetArtistByIdQuery } from '../../features/artist/artistApi';

const CreateProject = () => {
    const { shortlistedArtist, chatLog, contentProducts, dreamProjectsRefetch, currentProjectsRefetch, authToken, selectedContentProducts, createProjectFormState: state, createProjectFormDispatch, dropdownDispatch } = useRootContext();
    const { user } = useContext(AuthContext);

    console.log(user);

    const currentProject = [];

    const navigate = useNavigate();
    const handleAddMoreArtist = () => {
        navigate("/");
    }

    const register = (e) => ({
        type: "FORM",
        payload: { name: e.target.name, value: e.target.value }
    })

    // select content product on changing selectedContentProducts value from right side
    useEffect(() => {
        createProjectFormDispatch({ type: "FORM", payload: { name: "project_template", value: selectedContentProducts } })
    }, [selectedContentProducts])


    // send brief
    const handleSendBrief = () => {
        if (!user) {
            return dropdownDispatch({ type: "SHOW_LOGIN" });
        }
        if (!state.project_template) {
            return toast("Select a content product!");
        }

        fetch('https://dev.nsnco.in/api/v1/create_new_project/', {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: `token ${authToken}`
            },
            body: JSON.stringify({
                ...state,
                "stage": "Lead",
                "brief": JSON.stringify(chatLog),
                "shortlisted_artists": shortlistedArtist,
            })
        }).then(res => res.json())
            .then(data => {
                if (data.pk) {
                    toast.success("Project created successfully!", { id: "createNewProject" });
                    currentProjectsRefetch();
                    navigate(`/projects/${data.pk}/${Lead}/`);
                } else {
                    toast.error("Something went wrong!", { id: "createNewProject" });
                }
            });
    }
    // above and below both events are the same code repeated (just state changes)
    // add to dream project
    const handleAddToDreamProject = () => {
        if (!isAuthenticated) {
            return dropdownDispatch({ type: "SHOW_LOGIN" });
        }
        if (!state.project_template) {
            return toast("Select a content product!");
        }

        fetch('https://dev.nsnco.in/api/v1/create_new_project/', {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: `token ${authToken}`
            },
            body: JSON.stringify({
                ...state,
                "stage": "DreamProject",
                "brief": JSON.stringify(chatLog),
                "shortlisted_artists": shortlistedArtist,
            })
        }).then(res => res.json())
            .then(data => {
                if (data.pk) {
                    toast.success("Added to dreamproject!", { id: "createNewProject" });
                    dreamProjectsRefetch();
                    navigate(`/projects/${data.pk}/DreamProject/`);
                } else {
                    toast.error("Something went wrong!", { id: "createNewProject" });
                }
            });
    }

    const location = useLocation();

    return (
        <div className='bg-white rounded-lg shadow-lg'>
            <div className='border-b shadow-sm font-medium p-3 py-[15px] flex justify-between items-center relative'>
                <div className='flex gap-2 items-center'>
                    <h3>Project Dashboard</h3>
                </div>
            </div>

            <form>
                <div className="p-4">
                    <div className="mb-4 items-center gap-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Project Title</label>
                        <input type="text" name="title" onBlur={e => createProjectFormDispatch(register(e))} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter a Project title" defaultValue={state.title} />
                    </div>

                    <div className='flex gap-4'>
                        <div className="mb-4 flex items-center gap-2">
                            <label className="flex-1 text-sm font-medium text-gray-900">Content Product: </label>
                            <select name="project_template" onChange={e => createProjectFormDispatch(register(e))} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5">
                                <option selected>Select content product</option>
                                {
                                    contentProducts?.map(content => <option selected={selectedContentProducts === content.pk} value={content.pk}>{content.name}</option>)
                                }
                            </select>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Project Reference Link:</label>
                        <textarea name="reference_links" onBlur={e => createProjectFormDispatch(register(e))} rows="5" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="https://www.youtube.com/watch?v=RhdXPesyRGk" defaultValue={state.reference_links}></textarea>
                    </div>

                    {
                        <div className="mb-4 mt-8">
                            <div className='flex justify-between mb-1'>
                                <label className="block mb-2 text-sm font-medium text-gray-900">{
                                    shortlistedArtist?.length ? 'Shortlisted Artists' : 'Shortlist Artists'
                                }</label>
                                <Link to="/artists" state={{ from: location }}>
                                    <button type='button' onClick={handleAddMoreArtist} className='bg-sky-400 hover:bg-sky-500 drop-shadow text-white p-1 px-2 rounded-lg text-sm font-meidum flex items-center gap-0.5'>Add Artist <AiOutlinePlus size={18} /></button>
                                </Link>
                            </div>
                            {
                                shortlistedArtist?.length > 0 ?
                                    shortlistedArtist?.map(artistId => <ArtistRow artistId={artistId} />)
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
                                    refetch={refetch}
                                />)
                            }
                        </div>
                    }

                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Send assignment:</label>
                        <textarea name="post_project_client_feedback" onBlur={e => createProjectFormDispatch(register(e))} rows="5" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Your assignment" defaultValue={state.post_project_client_feedback}></textarea>
                    </div>
                </div>

                <div className='p-4 pt-0 space-x-2 flex'>
                    <Button onClick={handleAddToDreamProject}>Add to dream project</Button>
                    <Button onClick={handleSendBrief}>Send Brief</Button>
                </div>

            </form>
        </div>
    );
};

export default CreateProject;


const ArtistRow = ({ artistId }) => {
    const { setArtistProfile } = useRootContext();
    const { data: artist = {} } = useGetArtistByIdQuery(artistId);

    return (
        <div className='flex items-center gap-2 text-sm bg-gray-100 p-2 mb-1 border border-blue-300 rounded-lg'>
            <img className='w-10 h-10 rounded-full' src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" alt="" />
            <div>
                <p onClick={() => setArtistProfile(artist.artistID)} className='font-medium hover:underline'>{artist.name}</p>
                <p className='text-xs'>Status: <span className='bg-gray-400 p-0.5 px-1 rounded text-gray-50'>available</span></p>
            </div>
        </div>
    )
}