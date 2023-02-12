import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsThreeDots, BsTrash } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import { useRootContext } from '../../contexts/RootProvider';

const CreateProject = () => {
    const { shortlistedArtist, setchatLog, setshortlistedArtist, setcurrentProject, chatLog, contentProducts, dreamProjectsRefetch, currentProjectsRefetch, authToken } = useRootContext();
    const { isAuthenticated, user } = useContext(AuthContext);

    useEffect(() => {
        setcurrentProject({});
        // setchatLog([]);
        // setshortlistedArtist([]);
    }, [])

    const currentProject = [];

    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => { }

    const navigate = useNavigate();
    const handleAddMoreArtist = () => {
        navigate("/");
    }


    // send brief
    const handleSendBrief = () => {
        if (!isAuthenticated) {
            toast("You must have to login");
        }
        fetch('https://dev.nsnco.in/api/v1/create_project/', {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: `token ${authToken}`
            },
            body: JSON.stringify({
                "stage": "Lead",
                "title": title,
                "brief": JSON.stringify(chatLog),
                "product": selectedcontentProduct,
                "shortlisted_artists": shortlistedArtist,
                "post_project_client_feedback": assignmentField
            })
        }).then(res => res.json())
            .then(data => {
                if (data.success) {
                    toast.success(data.success);
                    currentProjectsRefetch();
                    navigate(`/project/${data.projectId}/Lead`);
                } else if (data.error) {
                    toast.error(data.error);
                }
            });
    }
    // above and below both events are the same code repeated (just state changes)
    // add to dream project
    const handleAddToDreamProject = () => {
        if (!isAuthenticated) {
            toast("You must have to login");
        }
        fetch('https://dev.nsnco.in/api/v1/create_project/', {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: `token ${authToken}`
            },
            body: JSON.stringify({
                "title": title,
                "stage": "DreamProject",
                "brief": JSON.stringify(chatLog),
                "product": selectedcontentProduct,
                "shortlisted_artists": shortlistedArtist,
                "post_project_client_feedback": assignmentField
            })
        }).then(res => res.json())
            .then(data => {
                if (data.success) {
                    toast.success(data.success);
                    dreamProjectsRefetch();
                    navigate(`/project/${data.projectId}/Lead`);
                } else if (data.error) {
                    toast.error(data.error);
                }
            });
    }

    const [selectedcontentProduct, setselectedcontentProduct] = useState("");
    const [assignmentField, setassignmentField] = useState("");
    const [title, setTitle] = useState("project-title");

    return (
        <div className='bg-white rounded-lg shadow-lg'>
            <div className='border-b shadow-sm font-medium p-3 py-[15px] flex justify-between items-center relative'>
                <div className='flex gap-2 items-center'>
                    <h3>Project Dashboard</h3>
                </div>
                {/* <BsThreeDots onClick={() => setactionToggle(!actionToggle)} className='cursor-pointer' />
                {
                    actionToggle && isAuthenticated &&
                    <div className='absolute right-0 -bottom-3/4 border bg-white shadow-lg select-none'>
                        <button onClick={handleDeleteProject} className='flex items-center gap-2 text-sm py-3 px-5'>Delete <BsTrash size={20} /></button>
                    </div>
                } */}
            </div>

            <form id='projectForm' onSubmit={handleSubmit(onSubmit)}>
                <div className="p-4">
                    <div className="mb-4 items-center gap-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Project Title</label>
                        <input type="text" {...register('title')} onBlur={(e) => setTitle(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    </div>
                    {/* <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Creator</label>
                        {
                            isAuthenticated
                                ? <div className='flex items-center gap-2 rounded'>
                                    <div className='relative'>
                                        <img className='w-14 border rounded-full' src="https://media.licdn.com/dms/image/C4E03AQECm3P3VuGSNg/profile-displayphoto-shrink_200_200/0/1650625726703?e=1680739200&v=beta&t=Kxqdzo8dg2YRwmiHATynhHCMX7giWstWmIWQkRW89Wo" alt="" />
                                        <div className='w-3 h-3 bg-green-500 rounded-full absolute bottom-0 right-0 -translate-x-1/2'></div>
                                    </div>
                                    <div className='text-sm'>
                                        <p className="font-medium">{currentProject?.client_details?.name}</p>
                                        <p className='bg-gray-200 px-2 text-xs rounded-full'>{currentProject?.client_details?.email}</p>
                                    </div>
                                </div>
                                : <div className='flex items-center gap-2 rounded'>
                                    <div className='relative'>
                                        <img className='w-14 border rounded-full' src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" alt="" />
                                        <div className='w-3 h-3 bg-green-500 rounded-full absolute bottom-0 right-0 -translate-x-1/2'></div>
                                    </div>
                                    <div className='text-sm'>
                                        <p className="font-medium">Guest Account</p>
                                        <p className='bg-gray-200 px-2 text-xs rounded-full w-fit'>N/A</p>
                                    </div>
                                </div>
                        }
                    </div> */}
                    <div className='flex gap-4'>
                        <div className="mb-4 flex items-center gap-2">
                            <label className="text-sm font-medium text-gray-900">Content Product: </label>
                            <select onChange={(e) => setselectedcontentProduct(e.target.value)} className='border border-black p-1'>
                                <option selected disabled>Select content product</option>
                                {
                                    contentProducts.map(content => <option value={content.pk}>{content.name}</option>)
                                }
                            </select>
                        </div>
                    </div>
                    {/* <div className="mb-4">
                        <label className="text-sm font-medium text-gray-900">Project Reference Link </label>
                        <p className='text-sm text-blue-500'>http://localhost:5173/project</p>
                        <p className='text-sm text-blue-500'>http://localhost:5173/project</p>
                        <p className='text-sm text-blue-500'>http://localhost:5173/project</p>
                        <p className='text-sm text-blue-500'>http://localhost:5173/project</p>
                        <p className='text-sm text-blue-500'>http://localhost:5173/project</p>
                    </div> */}


                    {
                        <div className="mb-4 mt-8">
                            <div className='flex justify-between mb-1'>
                                <label className="block mb-2 text-sm font-medium text-gray-900">{
                                    shortlistedArtist?.length ? 'Shortlisted Artists' : 'Shortlist Artists'
                                }</label>
                                <button type='button' onClick={handleAddMoreArtist} className='bg-sky-400 hover:bg-sky-500 drop-shadow text-white p-1 px-2 rounded-lg text-sm font-meidum flex items-center gap-0.5'>Add More Artist <AiOutlinePlus size={18} /></button>
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
                        <textarea {...register("post_project_client_feedback")} onBlur={(e) => setassignmentField(e.target.value)} rows="5" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Your assignment"></textarea>
                    </div>
                </div>

                {/* <div className='border-y py-3 px-4 mb-4 text-gray-400 text-sm font-medium bg-gray-100'>
                    Project Fee
                </div> */}

                {/* project cost */}

                {/* <div className='px-4 grid grid-cols-2 gap-2'>
                    <div className='col-span-2 mb-4'>
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-200">
                                <tr className="text-left">
                                    <th className="p-3">Estimate Fee #</th>
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
                    {
                        isAuthenticated &&
                        <>
                            <div className="mb-5 flex items-center gap-2">
                                <label className="text-sm font-medium text-gray-900">Project fee Status:</label>
                                <p className='whitespace-nowrap w-fit py-1 px-3 border text-sm text-gray-500 border-gray-300 bg-blue-200 rounded-full'>{currentProject?.project_fee_Status || "N/A"}</p>
                            </div>
                            <div className="mb-5 flex items-center gap-2">
                                <label className="block text-sm font-medium text-gray-900">Advance Status:</label>
                                <p className='whitespace-nowrap w-fit py-1 px-3 border text-sm text-gray-500 border-gray-300 bg-gray-200 rounded-full'>Pending</p>
                            </div>
                        </>
                    }
                </div> */}

                <div className='p-4 pt-0 space-x-2'>
                    <button type="button" onClick={handleAddToDreamProject} className="text-white bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center">Add to dream project</button>
                    <button type="button" onClick={handleSendBrief} className="text-white bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center">Send Brief</button>
                </div>

            </form>
        </div >
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
                <Link to={`/artist/${artist.id}`}><p className='font-medium hover:underline'>{artist.name}</p></Link>
                <p className='text-xs'>Status: <span className='bg-gray-400 p-0.5 px-1 rounded text-gray-50'>available</span></p>
            </div>
        </div>
    )
}