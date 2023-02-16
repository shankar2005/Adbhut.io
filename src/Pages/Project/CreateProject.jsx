import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { useReducer } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlinePlus } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import { useRootContext } from '../../contexts/RootProvider';

const CreateProject = () => {
    const { shortlistedArtist, setchatLog, setshortlistedArtist, setselectedContentProducts, setcurrentProject, chatLog, contentProducts, dreamProjectsRefetch, currentProjectsRefetch, authToken, selectedContentProducts } = useRootContext();
    const { isAuthenticated, user } = useContext(AuthContext);

    useEffect(() => {
        setcurrentProject(null);
        setchatLog([]);
        setshortlistedArtist([]);
        setselectedContentProducts("");
    }, [])

    const currentProject = [];

    const navigate = useNavigate();
    const handleAddMoreArtist = () => {
        navigate("/");
    }


    const initialState = {
        title: "",
        project_template: "",
        reference_links: "",
        post_project_client_feedback: "",
    }
    const reducer = (state, action) => {
        switch (action.type) {
            case "FORM":
                return { ...state, [action.payload.name]: action.payload.value }
            default:
                return state;
        }
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    const register = (e) => ({
        type: "FORM",
        payload: { name: e.target.name, value: e.target.value }
    })


    // send brief
    const handleSendBrief = () => {
        if (!isAuthenticated) {
            return toast("You must have to login");
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
            return toast("You must have to login");
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
                console.log(data);
                if (data.pk) {
                    toast.success("Added to dreamproject!", { id: "createNewProject" });
                    dreamProjectsRefetch();
                    navigate(`/projects/${data.pk}/DreamProject/`);
                } else {
                    toast.error("Something went wrong!", { id: "createNewProject" });
                }
            });
    }

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
                        <input type="text" name="title" onBlur={e => dispatch(register(e))} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter a Project title" required />
                    </div>

                    <div className='flex gap-4'>
                        <div className="mb-4 flex items-center gap-2">
                            <label className="flex-1 text-sm font-medium text-gray-900">Content Product: </label>
                            <select name="project_template" onChange={e => dispatch(register(e))} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5">
                                <option selected disabled>Select content product</option>
                                {
                                    contentProducts.map(content => <option selected={selectedContentProducts === content.pk} value={content.pk}>{content.name}</option>)
                                }
                            </select>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Project Reference Link:</label>
                        <textarea name="reference_links" onBlur={e => dispatch(register(e))} rows="5" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Your assignment" required></textarea>
                    </div>

                    {
                        <div className="mb-4 mt-8">
                            <div className='flex justify-between mb-1'>
                                <label className="block mb-2 text-sm font-medium text-gray-900">{
                                    shortlistedArtist?.length ? 'Shortlisted Artists' : 'Shortlist Artists'
                                }</label>
                                <Link to="/artists">
                                    <button type='button' onClick={handleAddMoreArtist} className='bg-sky-400 hover:bg-sky-500 drop-shadow text-white p-1 px-2 rounded-lg text-sm font-meidum flex items-center gap-0.5'>Add More Artist <AiOutlinePlus size={18} /></button>
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
                        <textarea name="post_project_client_feedback" onBlur={e => dispatch(register(e))} rows="5" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Your assignment"></textarea>
                    </div>
                </div>

                <div className='p-4 pt-0 space-x-2'>
                    <button type="button" onClick={handleAddToDreamProject} className="text-white bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center">Add to dream project</button>
                    <button type="button" onClick={handleSendBrief} className="text-white bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center">Send Brief</button>
                </div>

            </form>
        </div>
    );
};

export default CreateProject;


const ArtistRow = ({ artistId }) => {
    // dream projects
    const { data: artist = {} } = useQuery({
        queryKey: ['artist'],
        queryFn: () => axios(`https://dev.nsnco.in/api/v1/get_artist/${artistId}/`)
            .then(response => response.data)
    })

    return (
        <div className='flex items-center gap-2 text-sm bg-gray-100 p-2 mb-1 border border-blue-300 rounded-lg'>
            <img className='w-10 h-10 rounded-full' src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" alt="" />
            <div>
                <Link to={`/artists/${artist.id}`}><p className='font-medium hover:underline'>{artist.name}</p></Link>
                <p className='text-xs'>Status: <span className='bg-gray-400 p-0.5 px-1 rounded text-gray-50'>available</span></p>
            </div>
        </div>
    )
}