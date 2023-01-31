import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { useRootContext } from '../../../contexts/RootProvider';
import { FcCheckmark } from 'react-icons/fc'
import { RxCross2 } from 'react-icons/rx'
import { BsMessenger, BsThreeDots } from 'react-icons/bs';

const ProjectManagement = () => {
    const { locations, skills, currentProject } = useRootContext();

    const allSkills = [];
    skills.forEach(skill => {
        allSkills.push({ value: skill.pk, label: skill.name })
    })
    const languages = [
        { value: 62, label: "Hindi" }
    ]

    const [shortlisted_artists, set_shortlisted_artists] = useState([]);
    useEffect(() => {
        set_shortlisted_artists(currentProject?.shortlisted_artists)
    }, [currentProject])

    const [assignedArtist, setassignedArtist] = useState([]);
    const handleAssignArtist = (artistID) => {
        setassignedArtist(state => [...state, artistID]);
        set_shortlisted_artists(state => state.filter(id => id !== artistID));
    }

    const { register, handleSubmit, formState: { errors }, control } = useForm();
    const onSubmit = data => {
    }

    return (
        <div className='bg-white rounded-lg shadow-lg'>
            <div className='border-b shadow-sm font-medium p-3 flex justify-between items-center'>
                <h3>Projects Requirements</h3>
                <BsThreeDots className='cursor-pointer' />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='p-4'>
                <div class="mb-4">
                    <label class="block mb-2 text-sm font-medium text-gray-900">Client</label>
                    <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Your name" value="Maruf" />
                </div>
                <div class="mb-4">
                    <label class="block mb-2 text-sm font-medium text-gray-900">Stage</label>
                    <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option>Dream Project</option>
                        <option selected>Lead</option>
                        <option>In Progress</option>
                        <option>Halt</option>
                        <option>Finish</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label class="block mb-2 text-sm font-medium text-gray-900">Content Product</label>
                    <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
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
                    <textarea rows="5" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Production solution"></textarea>
                </div>
                <div class="mb-4">
                    <label class="block mb-2 text-sm font-medium text-gray-900">Artist discussion updates</label>
                    <textarea rows="5" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Artist discussion updates"></textarea>
                </div>

                <div class="mb-4 mt-8">
                    <label class="block mb-2 text-sm font-medium text-gray-900">Shortlisted Artists</label>
                    {
                        shortlisted_artists?.length
                            ? shortlisted_artists.map(artist => <ArtistRow
                                key={artist}
                                artistID={artist}
                                handleAssignArtist={handleAssignArtist}
                            />)
                            : <div className='bg-gray-100 p-3 text-sm'>No artists left!</div>
                    }
                </div>

                <div class="mb-4">
                    <label class="block mb-2 text-sm font-medium text-gray-900">Assigned Artists</label>
                    {
                        assignedArtist?.map(artist => <ArtistRow
                            key={artist}
                            artistID={artist}
                            handleAssignArtist={handleAssignArtist}
                        />)
                    }
                </div>

                <div class="mb-4">
                    <label class="block mb-2 text-sm font-medium text-gray-900">Showcase Demos</label>
                    <div className='flex items-center gap-2 text-sm bg-gray-100 p-2 mb-1'>
                        <img className='w-36 rounded' src="https://fbutube.com/media/images/play_button/play_button_added.webp" alt="" />
                        <div>
                            <p className='font-medium'>Maruf Hossain</p>
                            <p>Status: Available</p>
                        </div>
                    </div>
                </div>

                <div class="mb-4">
                    <label class="block mb-2 text-sm font-medium text-gray-900">Project Demos</label>
                    <div className='flex items-center gap-2 text-sm bg-gray-100 p-2 mb-1'>
                        <img className='w-36 rounded' src="https://www.clickfunnels.com/business-tools/assets/add_play_button_after-de5ac961f7fb0b1c3b5bd920a3d0703820e4157e9d63074e9dfcdf0f5aff8557.jpg" alt="" />
                        <div>
                            <p className='font-medium'>Maruf Hossain</p>
                            <p>Status: Available</p>
                        </div>
                    </div>
                </div>

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

                <button type="submit" class="text-white bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
            </form>

        </div>
    );
};

export default ProjectManagement;

const ArtistRow = ({ artistID, handleAssignArtist }) => {
    const [artist, setArtist] = useState({});
    useEffect(() => {
        fetch(`https://dev.nsnco.in/api/v1/get_artist/${artistID}/`)
            .then(res => res.json())
            .then(data => setArtist(data));
    }, [artistID])

    return (
        <div className='flex items-center gap-2 text-sm bg-gray-100 p-2 mb-1'>
            <img className='w-10 h-10 rounded-full' src="https://flowbite.com/docs/images/people/profile-picture-4.jpg" alt="" />
            <div>
                <p className='font-medium'>{artist.name}</p>
                <p>Status: Available</p>
            </div>
            <div className='flex ml-auto pr-2 gap-1'>
                <button type='button'><RxCross2 size={20} color='red' /></button>
                <button type='button' onClick={() => handleAssignArtist(artist.artistID)}><FcCheckmark size={20} /></button>
            </div>
        </div>
    )
}