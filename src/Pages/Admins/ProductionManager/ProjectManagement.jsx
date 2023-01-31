import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { useRootContext } from '../../../contexts/RootProvider';
import { FcCheckmark } from 'react-icons/fc'
import { RxCross2 } from 'react-icons/rx'
import { BsMessenger } from 'react-icons/bs';

const ProjectManagement = () => {
    const { locations, skills } = useRootContext();

    const allSkills = [];
    skills.forEach(skill => {
        allSkills.push({ value: skill.pk, label: skill.name })
    })
    const languages = [
        { value: 62, label: "Hindi" }
    ]

    const { register, handleSubmit, formState: { errors }, control } = useForm();
    const onSubmit = data => {
        console.log(data);
        return
        fetch('https://dev.nsnco.in/api/v1/artist_action/', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                ...data,
                "genre": [198, 197],
                "works_links": [984, 983],
                "has_manager": false,
                "budget_idea": "Good Morning",
                "am_notes": "good evening",
                "professional_rating": 4,
                "attitude_rating": 3
            })
        })
            .then(res => res.json())
            .then(data => console.log(data));
    }

    return (
        <div className='bg-white rounded-lg shadow-lg'>
            <div className='border-b shadow-sm font-medium p-3 flex justify-between items-center'>
                <h3>Projects Requirements</h3>
                <BsMessenger className='text-blue-500' size={20} />
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
                        <option>Artwork</option>
                        <option>Chat Show</option>
                        <option>Documentary</option>
                        <option>Fiction & Reality</option>
                        <option>Musical</option>
                        <option>Web 3.0 Solutions</option>
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
                    <div className='flex items-center gap-2 text-sm bg-gray-100 p-2 mb-1'>
                        <img className='w-10 h-10 rounded-full' src="https://flowbite.com/docs/images/people/profile-picture-4.jpg" alt="" />
                        <div>
                            <p className='font-medium'>Maruf Hossain</p>
                            <p>Status: Available</p>
                        </div>
                        <div className='flex ml-auto pr-2 gap-1'>
                            <button><RxCross2 size={20} color='red' /></button>
                            <button><FcCheckmark size={20} /></button>
                        </div>
                    </div>
                    <div className='flex items-center gap-2 text-sm bg-gray-100 p-2 mb-1'>
                        <img className='w-10 h-10 rounded-full' src="https://flowbite.com/docs/images/people/profile-picture-4.jpg" alt="" />
                        <div>
                            <p className='font-medium'>Maruf Hossain</p>
                            <p>Status: Available</p>
                        </div>
                        <div className='flex ml-auto pr-2 gap-1'>
                            <button><RxCross2 size={20} color='red' /></button>
                            <button><FcCheckmark size={20} /></button>
                        </div>
                    </div>
                    <div className='flex items-center gap-2 text-sm bg-gray-100 p-2 mb-1'>
                        <img className='w-10 h-10 rounded-full' src="https://flowbite.com/docs/images/people/profile-picture-4.jpg" alt="" />
                        <div>
                            <p className='font-medium'>Maruf Hossain</p>
                            <p>Status: Available</p>
                        </div>
                        <div className='flex ml-auto pr-2 gap-1'>
                            <button><RxCross2 size={20} color='red' /></button>
                            <button><FcCheckmark size={20} /></button>
                        </div>
                    </div>
                </div>

                <div class="mb-4">
                    <label class="block mb-2 text-sm font-medium text-gray-900">Assigned Artists</label>
                    <div className='flex items-center gap-2 text-sm bg-gray-100 p-2 mb-1'>
                        <img className='w-10 h-10 rounded-full' src="https://flowbite.com/docs/images/people/profile-picture-4.jpg" alt="" />
                        <div>
                            <p className='font-medium'>Maruf Hossain</p>
                            <p>Status: Available</p>
                        </div>
                    </div>
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