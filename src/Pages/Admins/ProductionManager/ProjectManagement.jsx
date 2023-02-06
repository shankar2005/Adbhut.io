import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRootContext } from '../../../contexts/RootProvider';
import { FcCheckmark } from 'react-icons/fc'
import { RxCross2 } from 'react-icons/rx'
import { RiSave3Fill } from 'react-icons/ri'
import { BsThreeDots, BsTrash } from 'react-icons/bs';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import { AiOutlinePlus } from 'react-icons/ai';

const ProjectManagement = () => {
    const { currentProject, chatLog, setchatLog, setshortlistedArtist, selectedContentProducts, currentProjectsRefetch, authToken, handleShowProjectHistory } = useRootContext();
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
            title: data.title,
            shortlisted_artists: shortlisted_artists.filter(id => !rejectedArtist.includes(id) && !assignedArtist.includes(id)),
            assigned_artists: assignedArtist,
            post_project_client_feedback: data.post_project_client_feedback,
            production_solution: data.production_solution,
            // fees
            solution_fee: +data.solution_fee,
            production_advance: +data.production_advance,
            negotiated_advance: +data.negotiated_advance,
            final_advance: +data.final_advance,
            post_project_client_total_payout: +data.post_project_client_total_payout,
            final_fee_settlement_status: data.final_fee_settlement_status,
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
                console.log('data', data);
                handleShowProjectHistory(data?.pk, data?.stage);
            })
            .catch(err => console.log(err))
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

    console.log(currentProject);

    useEffect(() => {
        document.onkeydown = function (e) {
            e = e || window.event;//Get event
            if (e.ctrlKey) {
                var c = e.which || e.keyCode;//Get key code
                switch (c) {
                    case 83://Block Ctrl+S
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('saved');
                        document.getElementById("saveProjectForm").click();
                        break;
                }
            }
        };
    }, [])

    const navigate = useNavigate();
    // handle add more artist
    const handleAddMoreArtist = () => {
        if (user.role === "Client") {
            navigate("/");

            // save api used in LeftAsie Component
            // chatlog
            const message = { msgID: chatLog.length + 1, bot: "Please shortlist artists for your project!" };
            setchatLog(current => [...current, message]);
            fetch('https://dev.nsnco.in/api/v1/create_project/', {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    Authorization: `token ${authToken}`
                },
                body: JSON.stringify({
                    project_id: currentProject.pk,
                    message: message
                })
            }).then(res => res.json())
                .then(data => { });

        }
    }

    return (
        <div className='bg-white rounded-lg shadow-lg'>
            <div className='border-b shadow-sm font-medium p-3 py-[15px] flex justify-between items-center relative'>
                <div className='flex gap-2 items-center'>
                    <h3>Project Dashboard</h3>
                    <button type='submit' form='projectForm' id='saveProjectForm'>
                        <RiSave3Fill size={23} className="text-purple-800" />
                    </button>
                </div>
                <BsThreeDots onClick={() => setactionToggle(!actionToggle)} className='cursor-pointer' />
                {
                    actionToggle &&
                    <div className='absolute right-0 -bottom-3/4 border bg-white shadow-lg select-none'>
                        <button onClick={handleDeleteProject} className='flex items-center gap-2 text-sm py-3 px-5'>Delete <BsTrash size={20} /></button>
                    </div>
                }
            </div>

            <form id='projectForm' onSubmit={handleSubmit(onSubmit)}>
                <div className="p-4">
                    <div class="mb-4 items-center gap-2">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Project Title</label>
                        <input type="text" {...register('title')} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
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
                    <div className='flex gap-4'>
                        <div class="mb-4 flex items-center gap-2">
                            <label class="text-sm font-medium text-gray-900">Stage: </label>
                            <p className='whitespace-nowrap w-fit py-1 px-3 border text-sm text-gray-500 border-gray-300 bg-blue-200 rounded-full'>{currentProject?.stage}</p>
                        </div>
                        <div class="mb-4 flex items-center gap-2">
                            <label class="text-sm font-medium text-gray-900">Content Product: </label>
                            <p className='whitespace-nowrap w-fit py-1 px-3 border text-sm text-gray-500 border-gray-300 bg-blue-200 rounded-full'>{currentProject?.template[1]}</p>
                        </div>
                    </div>
                    <div class="mb-4">
                        <label class="text-sm font-medium text-gray-900">Project Reference Link </label>
                        <p className='text-sm text-blue-500'>http://localhost:5173/project</p>
                        <p className='text-sm text-blue-500'>http://localhost:5173/project</p>
                        <p className='text-sm text-blue-500'>http://localhost:5173/project</p>
                        <p className='text-sm text-blue-500'>http://localhost:5173/project</p>
                        <p className='text-sm text-blue-500'>http://localhost:5173/project</p>
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
                            <div className='flex justify-between'>
                                <label class="block mb-2 text-sm font-medium text-gray-900">Shortlisted Artists</label>
                                <button type='button' onClick={handleAddMoreArtist} className='text-sm font-meidum flex items-center gap-1'>Add More Artist <AiOutlinePlus size={20} /></button>
                            </div>
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
                        <label class="block mb-2 text-sm font-medium text-gray-900">Send feedback:</label>
                        <textarea {...register("post_project_client_feedback")} rows="5" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Your feedback"></textarea>
                    </div>
                </div>

                <div className='border-y py-3 px-4 mb-4 text-gray-400 text-sm font-medium bg-gray-100'>
                    Project Fee
                </div>

                {/* project cost */}
                {
                    user.role === "Client" || !user.email ?
                        <div className='px-4 grid grid-cols-2 gap-2'>
                            <div className='col-span-2 mb-4'>
                                <table className="min-w-full text-sm">
                                    <thead className="bg-gray-200">
                                        <tr className="text-left">
                                            <th className="p-3">Fee #</th>
                                            <th className="p-3 text-right">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-opacity-20 border-gray-700">
                                            <td className="p-3">
                                                <p>Solution Fee</p>
                                            </td>
                                            <td className="p-3 text-right">
                                                <p>{currentProject?.solution_fee}</p>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-opacity-20 border-gray-700">
                                            <td className="p-3">
                                                <p>Production Advance</p>
                                            </td>
                                            <td className="p-3 text-right">
                                                <p>{currentProject?.production_advance}</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="mb-5 flex items-center gap-2">
                                <label class="text-sm font-medium text-gray-900">Project fee Status:</label>
                                <p className='whitespace-nowrap w-fit py-1 px-3 border text-sm text-gray-500 border-gray-300 bg-blue-200 rounded-full'>{currentProject?.project_fee_Status || "N/A"}</p>
                            </div>
                            <div class="mb-5 flex items-center gap-2">
                                <label class="block text-sm font-medium text-gray-900">Advance Status:</label>
                                <p className='whitespace-nowrap w-fit py-1 px-3 border text-sm text-gray-500 border-gray-300 bg-gray-200 rounded-full'>Pending</p>
                            </div>
                        </div>
                        :
                        <div className='px-4 grid grid-cols-2 gap-2'>
                            <div class="mb-4">
                                <label class="block mb-2 text-sm font-medium text-gray-900">Solution Fee</label>
                                <input {...register("solution_fee")} type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" min={0} placeholder="Enter amount" />
                            </div>
                            <div class="mb-4">
                                <label class="block mb-2 text-sm font-medium text-gray-900">Production Advance</label>
                                <input {...register("production_advance")} type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" min={0} placeholder="Enter amount" />
                            </div>
                            <div class="mb-4">
                                <label class="block mb-2 text-sm font-medium text-gray-900">Negotiated Advance</label>
                                <input {...register("negotiated_advance")} type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" min={0} placeholder="Enter amount" />
                            </div>
                            <div class="mb-4">
                                <label class="block mb-2 text-sm font-medium text-gray-900">Final Advance</label>
                                <input {...register("final_advance")} type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" min={0} placeholder="Enter amount" />
                            </div>
                            <div class="mb-4">
                                <label class="block mb-2 text-sm font-medium text-gray-900">Post-Project Client’s Total Payout</label>
                                <input {...register("post_project_client_total_payout")} type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" min={0} placeholder="Enter amount" />
                            </div>
                            <div class="mb-4">
                                <label class="block mb-2 text-sm font-medium text-gray-900">Assigned artist payouts</label>
                                <input type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" min={0} placeholder="Enter amount" />
                            </div>
                            <div class="mb-4 flex items-center gap-2">
                                <label class="block text-sm font-medium text-gray-900">Advance Status:</label>
                                <p className='whitespace-nowrap w-fit py-1 px-3 border text-sm text-gray-500 border-gray-300 bg-gray-200 rounded-full'>{currentProject?.advance_status || 'N/A'}</p>
                            </div>
                            <div class="mb-4 flex items-center gap-2">
                                <label class="block text-sm font-medium text-gray-900">Artist payout status: </label>
                                <p className='whitespace-nowrap w-fit py-1 px-3 border text-sm text-gray-500 border-gray-300 bg-gray-200 rounded-full'>{currentProject?.artist_payout_status || 'N/A'}</p>
                            </div>
                            <div class="col-span-2 flex items-center">
                                <input {...register("final_fee_settlement_status")} id="default-checkbox" type="checkbox" class="w-4 h-4 text-blue-600 rounded ring-offset-gray-800 bg-gray-700 border-gray-600" />
                                <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900">Final fee settlement</label>
                            </div>
                            <div class="col-span-2 flex items-center mb-4">
                                <input {...register("final_fee_settlement_status")} id="default-checkbox" type="checkbox" class="w-4 h-4 text-blue-600 rounded ring-offset-gray-800 bg-gray-700 border-gray-600" />
                                <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900">Contract status</label>
                            </div>
                        </div>
                }
                {
                    user.role === "Client" && isAuthenticated
                        ? <div className='p-4 pt-0 space-x-2'>
                            <button type="submit" class="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Approve</button>
                            <button type="submit" class="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Decline</button>
                            <button type="submit" class="text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Put On Hold</button>
                        </div>
                        : <div className='p-4 pt-0 space-x-2'>
                            <button type="submit" class="text-white bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit to client</button>
                        </div>
                }
                {
                    isAuthenticated ||
                    <p className='text-xs p-4 text-gray-800'>Login to continue with this project. <span className='text-blue-500 underline'>Login Now</span></p>
                }
            </form>
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