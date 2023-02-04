import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRootContext } from '../../../contexts/RootProvider';
import { FcCheckmark } from 'react-icons/fc'
import { RxCross2 } from 'react-icons/rx'
import { BsThreeDots, BsTrash } from 'react-icons/bs';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';

const ProjectManagement = () => {
    const { currentProject, setchatLog, setshortlistedArtist, selectedContentProducts, currentProjectsRefetch, authToken, handleShowProjectHistory } = useRootContext();
    const { isAuthenticated, user } = useContext(AuthContext);

    const [shortlisted_artists, set_shortlisted_artists] = useState([]);
    useEffect(() => {
        set_shortlisted_artists(currentProject?.shortlisted_artists)
    }, [currentProject?.shortlisted_artists])

    useEffect(() => {
        setassignedArtist(currentProject?.assigned_artists);
        setrejectedArtist([]);
        reset(currentProject);
    }, [currentProject])

    const [assignedArtist, setassignedArtist] = useState([]);
    const [rejectedArtist, setrejectedArtist] = useState([]);
    const handleAssignArtist = (artistID) => {
        setassignedArtist(prev => [...prev, artistID]);
    }
    const handleRejectArtist = (artistID) => {
        setrejectedArtist(prev => [...prev, artistID]);
    }

    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        if (!isAuthenticated) {
            toast("Login to submit project");
            return
        }

        const formData = {
            ...currentProject,
            "shortlisted_artists": shortlisted_artists.filter(id => !rejectedArtist.includes(id) && !assignedArtist.includes(id)),
            "assigned_artists": assignedArtist,
            "production_solution": data.production_solution,
        }

        fetch(`https://dev.nsnco.in/api/v1/edit_project/${currentProject.pk}/`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                Authorization: `token ${authToken}`
            },
            body: JSON.stringify(formData)
        }).then(res => res.json())
            .then(data => {
                handleShowProjectHistory(data?.pk, data?.stage);
            });
    }

    const [actionToggle, setactionToggle] = useState(false);

    const handleDeleteProject = () => {
        fetch(`https://dev.nsnco.in/api/v1/delete_project/${currentProject.pk}/`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                toast.success(data.message);
                currentProjectsRefetch();
                setactionToggle(false);
                setchatLog([]);
                setshortlistedArtist([]);
                selectedContentProducts("");
            });
    }

    return (
        <div className='bg-white rounded-lg shadow-lg'>
            <div className='border-b shadow-sm font-medium p-3 flex justify-between items-center relative'>
                <h3>Project Dashboard</h3>
                <BsThreeDots onClick={() => setactionToggle(!actionToggle)} className='cursor-pointer' />
                {
                    actionToggle &&
                    <div className='absolute right-0 -bottom-3/4 border bg-white shadow-lg select-none'>
                        <button onClick={handleDeleteProject} className='flex items-center gap-2 text-sm py-3 px-5'>Delete <BsTrash size={20} /></button>
                    </div>
                }
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-4">
                    <div class="mb-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Client</label>
                        <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Your name" value={currentProject?.client_details?.name} disabled />
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Stage</label>
                        <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" disabled>
                            <option>Dream Project</option>
                            <option selected>Lead</option>
                            <option>In Progress</option>
                            <option>Halt</option>
                            <option>Finish</option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Content Product</label>
                        <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" disabled>
                            <option selected={currentProject?.template[1] === "Artwork"}>Artwork</option>
                            <option selected={currentProject?.template[1] === "Chat Show"}>Chat Show</option>
                            <option selected={currentProject?.template[1] === "Documentary"}>Documentary</option>
                            <option selected={currentProject?.template[1] === "Fiction & Reality"}>Fiction & Reality</option>
                            <option selected={currentProject?.template[1] === "Musical"}>Musical</option>
                            <option selected={currentProject?.template[1] === "Web 3.0 Solutions"}>Web 3.0 Solutions</option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Production solution</label>
                        {
                            user.role === "Client"
                                ? <p className='border border-pink-200 rounded p-3 text-sm'>{currentProject?.production_solution}</p>
                                : <textarea {...register("production_solution")} rows="5" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Production solution"></textarea>
                        }
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Artist discussion updates</label>
                        <textarea rows="5" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Artist discussion updates"></textarea>
                    </div>

                    {
                        shortlisted_artists?.length > 0 &&
                        <div class="mb-4 mt-8">
                            <label class="block mb-2 text-sm font-medium text-gray-900">Shortlisted Artists</label>
                            {
                                shortlisted_artists.map(artist => <ArtistRow
                                    key={artist}
                                    artistID={artist}
                                    handleAssignArtist={handleAssignArtist}
                                    assignedArtist={assignedArtist}
                                    handleRejectArtist={handleRejectArtist}
                                    rejectedArtist={rejectedArtist}
                                />)
                            }
                        </div>
                    }

                    {
                        currentProject?.assigned_artists?.length > 0 &&
                        <div class="mb-4 mt-8">
                            <label class="block mb-2 text-sm font-medium text-gray-900">Assigned Artists</label>
                            {
                                currentProject.assigned_artists.map(artist => <AssignedArtistRow
                                    key={artist}
                                    artistID={artist}
                                />)
                            }
                        </div>
                    }

                    {/* <div class="mb-4">
                    <label class="block mb-2 text-sm font-medium text-gray-900">Project Demos</label>
                    <div className='flex items-center gap-2 text-sm bg-gray-100 p-2 mb-1'>
                        <img className='w-36 rounded' src="https://www.clickfunnels.com/business-tools/assets/add_play_button_after-de5ac961f7fb0b1c3b5bd920a3d0703820e4157e9d63074e9dfcdf0f5aff8557.jpg" alt="" />
                        <div>
                            <p className='font-medium'>Maruf Hossain</p>
                            <p>Status: Available</p>
                        </div>
                    </div>
                </div> */}

                    <div class="mb-4 mt-8">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Post project client feedback:</label>
                        <textarea rows="5" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Client feedback"></textarea>
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Project fee Status:</label>
                        <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option selected>Unpaid</option>
                            <option>Partially Paid</option>
                            <option>Paid</option>
                        </select>
                    </div>
                </div>

                <div className='border-y py-3 px-4 mb-4 text-gray-400 text-sm font-medium bg-gray-100'>
                    Project Fee
                </div>

                {/* project cost */}
                <div className='px-4 grid grid-cols-2 gap-2'>
                    <div class="mb-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Solution Fee</label>
                        <input type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" min={0} placeholder="Enter amount" />
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Production Advance</label>
                        <input type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" min={0} placeholder="Enter amount" />
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Negotiated Advance</label>
                        <input type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" min={0} placeholder="Enter amount" />
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Final Advance</label>
                        <input type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" min={0} placeholder="Enter amount" />
                    </div>
                    <div class="mb-4 col-span-2">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Post-Project Client’s Total Payout</label>
                        <input type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" min={0} placeholder="Enter amount" />
                    </div>
                    <div class="mb-4 col-span-2 flex items-center gap-2">
                        <label class="block text-sm font-medium text-gray-900">Advance Status:</label>
                        <p className='whitespace-nowrap w-fit py-1 px-3 border text-sm text-gray-500 border-gray-300 bg-gray-200 rounded-full'>Pending</p>
                    </div>
                    <div class="mb-4 col-span-2">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Assigned artist payouts</label>
                        <input type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" min={0} placeholder="Enter amount" />
                    </div>
                    <div class="mb-4 col-span-2 flex items-center gap-2">
                        <label class="block text-sm font-medium text-gray-900">Artist payout status: </label>
                        <p className='whitespace-nowrap w-fit py-1 px-3 border text-sm text-gray-500 border-gray-300 bg-gray-200 rounded-full'>Pending</p>
                    </div>
                    <div class="flex items-center mb-4">
                        <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 rounded ring-offset-gray-800 bg-gray-700 border-gray-600" />
                        <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900">Final fee settlement</label>
                    </div>
                </div>
                <div className='p-4 pt-0'>
                    <button type="submit" class="text-white bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
                </div>
            </form >

        </div >
    );
};

export default ProjectManagement;

// Artist Row

const ArtistRow = ({ artistID, handleAssignArtist, handleRejectArtist, assignedArtist, rejectedArtist }) => {
    const { data: artist = [] } = useQuery({
        queryKey: ['artist', artistID],
        queryFn: () => axios(`https://dev.nsnco.in/api/v1/get_artist/${artistID}/`)
            .then(response => response.data)
    })

    let content = <>
        <button type='button' onClick={() => handleRejectArtist(artist.artistID)}><RxCross2 size={20} color='red' /></button>
        <button type='button' onClick={() => handleAssignArtist(artist.artistID)}><FcCheckmark size={20} /></button>
    </>;

    if (assignedArtist.includes(artistID)) {
        content = <span className='bg-green-500 text-xs text-white px-2 py-0.5 rounded-full font-medium scale-95 active:scale-100 cursor-pointer select-none duration-200'>Assigned</span>
    } else if (rejectedArtist.includes(artistID)) {
        content = <span className='bg-red-500 text-xs text-white px-2 py-0.5 rounded-full font-medium scale-95 active:scale-100 cursor-pointer select-none duration-200'>Rejected</span>
    }

    return (
        <div className='flex items-center gap-2 text-sm bg-gray-100 p-2 mb-1 border border-blue-300 rounded-lg'>
            <img className='w-10 h-10 rounded-full' src="https://flowbite.com/docs/images/people/profile-picture-4.jpg" alt="" />
            <div>
                <Link to={`/artist/${artistID}`}><p className='font-medium hover:underline'>{artist.name}</p></Link>
                <p className='text-xs'>Status: <span className='bg-gray-400 p-0.5 px-1 rounded text-gray-50'>available</span></p>
            </div>
            <div className='flex ml-auto pr-2 gap-1'>
                {
                    content
                }
            </div>
        </div>
    )
}

const AssignedArtistRow = ({ artistID, handleAssignArtist, handleRejectArtist, assignedArtist, rejectedArtist }) => {
    const { data: artist = [] } = useQuery({
        queryKey: ['artist', artistID],
        queryFn: () => axios(`https://dev.nsnco.in/api/v1/get_artist/${artistID}/`)
            .then(response => response.data)
    })


    return (
        <div className=' text-sm bg-green-100 p-2 mb-1 border border-blue-300 rounded-lg'>
            <div className='flex items-center gap-2'>
                <img className='w-10 h-10 rounded-full' src="https://flowbite.com/docs/images/people/profile-picture-4.jpg" alt="" />
                <div>
                    <Link to={`/artist/${artistID}`}><p className='font-medium hover:underline'>{artist.name}</p></Link>
                    <p className='text-xs'>Status: <span className='bg-gray-400 p-0.5 px-1 rounded text-gray-50'>available</span></p>
                </div>
                <div className='flex ml-auto pr-2 gap-1'>
                    <span className='bg-green-500 text-xs text-white px-2 py-0.5 rounded-full font-medium scale-95 active:scale-100 cursor-pointer select-none duration-200'>Assigned</span>
                </div>
            </div>
            <img className='w-36 rounded mt-2 ml-12' src="https://fbutube.com/media/images/play_button/play_button_added.webp" alt="" />
        </div>
    )
}