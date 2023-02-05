import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRootContext } from '../../../contexts/RootProvider';
import { FcCheckmark } from 'react-icons/fc'
import { RxCross2 } from 'react-icons/rx'
import { RiSave3Fill } from 'react-icons/ri'
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
                <div className='flex gap-2 items-center'>
                    <h3>Project Dashboard</h3>
                    <RiSave3Fill size={23} className="text-purple-800" />
                </div>
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
                    <div class="mb-4 items-center gap-2">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Project Title</label>
                        <input type="text" {...register('name')} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Client Info</label>
                        <div className='flex items-center gap-2 rounded'>
                            <div className='relative'>
                                <img className='w-14 border rounded-full' src="https://media.licdn.com/dms/image/C4E03AQECm3P3VuGSNg/profile-displayphoto-shrink_200_200/0/1650625726703?e=1680739200&v=beta&t=Kxqdzo8dg2YRwmiHATynhHCMX7giWstWmIWQkRW89Wo" alt="" />
                                <div className='w-3 h-3 bg-green-500 rounded-full absolute bottom-0 right-0 -translate-x-1/2'></div>
                            </div>
                            <div className='text-sm'>
                                <p className="font-medium">{currentProject?.client_details?.name}</p>
                                <p className='bg-gray-200 px-2 text-xs rounded-full'>{currentProject?.client_details?.email}</p>
                            </div>
                        </div>
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
                    {
                        user.role === "Client" || !user.email ?
                            currentProject?.production_solution
                            && <div class="mb-4">
                                <label class="block mb-2 text-sm font-medium text-gray-900">Production solution</label>
                                <p className='rounded-bl-lg rounded-br-lg rounded-tr-lg rounded p-3 text-sm bg-sky-100'>{currentProject?.production_solution}</p>
                            </div>
                            : <div class="mb-4">
                                <label class="block mb-2 text-sm font-medium text-gray-900">Production solution</label>
                                <textarea {...register("production_solution")} rows="5" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Production solution"></textarea>
                            </div>
                    }

                    {
                        user.role === "Client" || !user.email ?
                            currentProject?.production_solution
                            && <div class="mb-4">
                                <label class="block mb-2 text-sm font-medium text-gray-900">Artist discussion updates</label>
                                <p className='rounded-bl-lg rounded-br-lg rounded-tr-lg rounded p-3 text-sm bg-sky-100'>{currentProject?.production_solution}</p>
                            </div>
                            : <div class="mb-4">
                                <label class="block mb-2 text-sm font-medium text-gray-900">Artist discussion updates</label>
                                <textarea rows="5" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Artist discussion updates"></textarea>
                            </div>
                    }

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

                    <div class="mb-4 mt-8">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Post project client feedback:</label>
                        <textarea rows="5" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Client feedback"></textarea>
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Project fee Status:</label>
                        <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" disabled>
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
                {
                    user.role === "Client" || !user.email ?
                        <div className='px-4 grid grid-cols-2 gap-2'>
                            <div class="mb-4">
                                <label class="block mb-2 text-sm font-medium text-gray-900">Solution Fee</label>
                                <div class="bg-gray-100 text-gray-900 text-sm rounded p-2.5">N/A</div>
                            </div>
                            <div class="mb-4">
                                <label class="block mb-2 text-sm font-medium text-gray-900">Production Advance</label>
                                <div class="bg-gray-100 text-gray-900 text-sm rounded p-2.5">N/A</div>
                            </div>
                            <div class="mb-4">
                                <label class="block mb-2 text-sm font-medium text-gray-900">Negotiated Advance</label>
                                <div class="bg-gray-100 text-gray-900 text-sm rounded p-2.5">N/A</div>
                            </div>
                            <div class="mb-4">
                                <label class="block mb-2 text-sm font-medium text-gray-900">Final Advance</label>
                                <div class="bg-gray-100 text-gray-900 text-sm rounded p-2.5">N/A</div>
                            </div>
                            <div class="mb-4">
                                <label class="block mb-2 text-sm font-medium text-gray-900">Post-Project Client’s Total Payout</label>
                                <div class="bg-gray-100 text-gray-900 text-sm rounded p-2.5">N/A</div>
                            </div>
                            <div class="mb-4">
                                <label class="block mb-2 text-sm font-medium text-gray-900">Assigned artist payouts</label>
                                <div class="bg-gray-100 text-gray-900 text-sm rounded p-2.5">N/A</div>
                            </div>
                            <div class="mb-4 flex items-center gap-2">
                                <label class="block text-sm font-medium text-gray-900">Advance Status:</label>
                                <p className='whitespace-nowrap w-fit py-1 px-3 border text-sm text-gray-500 border-gray-300 bg-gray-200 rounded-full'>Pending</p>
                            </div>
                            <div class="mb-4 flex items-center gap-2">
                                <label class="block text-sm font-medium text-gray-900">Artist payout status: </label>
                                <p className='whitespace-nowrap w-fit py-1 px-3 border text-sm text-gray-500 border-gray-300 bg-gray-200 rounded-full'>Pending</p>
                            </div>
                        </div>
                        :
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
                            <div class="mb-4">
                                <label class="block mb-2 text-sm font-medium text-gray-900">Post-Project Client’s Total Payout</label>
                                <input type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" min={0} placeholder="Enter amount" />
                            </div>
                            <div class="mb-4">
                                <label class="block mb-2 text-sm font-medium text-gray-900">Assigned artist payouts</label>
                                <input type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" min={0} placeholder="Enter amount" />
                            </div>
                            <div class="mb-4 flex items-center gap-2">
                                <label class="block text-sm font-medium text-gray-900">Advance Status:</label>
                                <p className='whitespace-nowrap w-fit py-1 px-3 border text-sm text-gray-500 border-gray-300 bg-gray-200 rounded-full'>Pending</p>
                            </div>
                            <div class="mb-4 flex items-center gap-2">
                                <label class="block text-sm font-medium text-gray-900">Artist payout status: </label>
                                <p className='whitespace-nowrap w-fit py-1 px-3 border text-sm text-gray-500 border-gray-300 bg-gray-200 rounded-full'>Pending</p>
                            </div>
                            <div class="flex items-center mb-4">
                                <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 rounded ring-offset-gray-800 bg-gray-700 border-gray-600" />
                                <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900">Final fee settlement</label>
                            </div>
                        </div>
                }
                {
                    user.role === "Client" &&
                    <div className='p-4 pt-0 space-x-2'>
                        <button type="submit" class="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Approve</button>
                        <button type="submit" class="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Decline</button>
                    </div>
                }
                {
                    !user.email &&
                    <p className='text-sm p-4 text-gray-800'>Login to continue with the project. <span className='text-blue-500 underline'>Login Now</span></p>
                }
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
                    <span className='bg-green-500 text-xs text-white px-2 py-0.5 rounded-full font-medium scale-95 active:scale-90 cursor-pointer select-none duration-200'>Assigned</span>
                </div>
            </div>
            <img className='w-36 rounded mt-2 ml-12' src="https://fbutube.com/media/images/play_button/play_button_added.webp" alt="" />
        </div>
    )
}