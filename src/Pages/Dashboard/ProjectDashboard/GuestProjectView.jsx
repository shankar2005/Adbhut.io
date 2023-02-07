import React from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import AssignedArtistRow from '../../Admins/ProductionManager/Components/AssignedArtistRow';

const GuestProjectView = ({ currentProject, user, shortlisted_artists, handleAddMoreArtist }) => {
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = () => { }

    return (
        <form id='projectForm' onSubmit={handleSubmit(onSubmit)}>
            <div className="p-4">
                <div className="mb-4 items-center gap-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Project Title</label>
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={currentProject?.title} />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Client Info</label>
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
                    <div className="mb-4 flex items-center gap-2">
                        <label className="text-sm font-medium text-gray-900">Stage: </label>
                        <p className='whitespace-nowrap w-fit py-1 px-3 border text-sm text-gray-500 border-gray-300 bg-blue-200 rounded-full'>{currentProject?.stage}</p>
                    </div>
                    <div className="mb-4 flex items-center gap-2">
                        <label className="text-sm font-medium text-gray-900">Content Product: </label>
                        <p className='whitespace-nowrap w-fit py-1 px-3 border text-sm text-gray-500 border-gray-300 bg-blue-200 rounded-full'>{currentProject.template?.length > 0 && currentProject?.template[1]}</p>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="text-sm font-medium text-gray-900">Project Reference Link </label>
                    <p className='text-sm text-blue-500'>http://localhost:5173/project</p>
                    <p className='text-sm text-blue-500'>http://localhost:5173/project</p>
                    <p className='text-sm text-blue-500'>http://localhost:5173/project</p>
                    <p className='text-sm text-blue-500'>http://localhost:5173/project</p>
                    <p className='text-sm text-blue-500'>http://localhost:5173/project</p>
                </div>
                {
                    user.role === "Client" || !user.email ?
                        currentProject?.production_solution
                        && <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Production solution</label>
                            <p className='rounded-bl-lg rounded-br-lg rounded-tr-lg rounded p-3 text-sm bg-sky-100'>{currentProject?.production_solution}</p>
                        </div>
                        : <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Production solution</label>
                            <textarea {...register("production_solution")} rows="5" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Production solution"></textarea>
                        </div>
                }

                {
                    user.role === "Client" || !user.email ?
                        currentProject?.production_solution
                        && <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Artist discussion updates</label>
                            <p className='rounded-bl-lg rounded-br-lg rounded-tr-lg rounded p-3 text-sm bg-sky-100'>{currentProject?.production_solution}</p>
                        </div>
                        : <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Artist discussion updates</label>
                            <textarea rows="5" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Artist discussion updates"></textarea>
                        </div>
                }

                {
                    shortlisted_artists?.length > 0 &&
                    <div className="mb-4 mt-8">
                        <div className='flex justify-between'>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Shortlisted Artists</label>
                            <button type='button' onClick={handleAddMoreArtist} className='text-sm font-meidum flex items-center gap-1'>Add More Artist <AiOutlinePlus size={20} /></button>
                        </div>
                        {
                            shortlisted_artists.map(artist => <AssignedArtistRow
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

                <div className="mb-4 mt-8">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Send feedback:</label>
                    <textarea {...register("post_project_client_feedback")} rows="5" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Your feedback"></textarea>
                </div>
            </div>

            <div className='border-y py-3 px-4 mb-4 text-gray-400 text-sm font-medium bg-gray-100'>
                Project Fee
            </div>

            {/* project cost */}
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
                <div className="mb-5 flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-900">Project fee Status:</label>
                    <p className='whitespace-nowrap w-fit py-1 px-3 border text-sm text-gray-500 border-gray-300 bg-blue-200 rounded-full'>{currentProject?.project_fee_Status || "N/A"}</p>
                </div>
                <div className="mb-5 flex items-center gap-2">
                    <label className="block text-sm font-medium text-gray-900">Advance Status:</label>
                    <p className='whitespace-nowrap w-fit py-1 px-3 border text-sm text-gray-500 border-gray-300 bg-gray-200 rounded-full'>Pending</p>
                </div>
            </div>

            <div className='p-4 pt-0 space-x-2'>
                <button type="submit" className="text-white bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Add to Dream Project</button>
            </div>
        </form>
    );
};

export default GuestProjectView;