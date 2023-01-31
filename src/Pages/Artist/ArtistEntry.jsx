import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { useRootContext } from '../../contexts/RootProvider';

const ArtistEntry = () => {
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
        fetch('https://dev.nsnco.in/api/v1/artist_action/', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                ...data,
                "languages": [20, 19],
                "has_manager": false,
            })
        })
            .then(res => res.json())
            .then(data => console.log(data));
    }

    return (
        <div className='bg-white rounded-lg shadow-lg'>
            <h3 className='font-medium p-3 border-b shadow-sm'>Artist Entry</h3>

            <form onSubmit={handleSubmit(onSubmit)} className='p-4'>
                <div class="mb-4">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Name</label>
                    <input {...register("name", { required: true })} type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Your name" />
                </div>
                <div class="mb-4">
                    <label for="profile_image" class="block mb-2 text-sm font-medium text-gray-900">Profile image</label>
                    <input {...register("profile_image", { required: true })} type="text" id="profile_image" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Profile image" />
                </div>
                <div class="mb-4">
                    <label for="age" class="block mb-2 text-sm font-medium text-gray-900">Age</label>
                    <input {...register("age", { required: true })} type="number" id="age" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Your age" />
                </div>
                <div class="mb-4">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
                    <input {...register("email", { required: true })} type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Your email" />
                </div>
                <div class="mb-4">
                    <label for="phone" class="block mb-2 text-sm font-medium text-gray-900">Phone</label>
                    <input {...register("phone", { required: true })} type="tel" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Your phone number" />
                </div>

                <div class="mb-4">
                    <label for="location" class="block mb-2 text-sm font-medium text-gray-900">Select country</label>
                    <select {...register("location", { required: true })} id="location" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option selected>Choose a country</option>
                        {
                            locations?.map(location => <option value={location.pk}>{location.name}</option>)
                        }
                    </select>
                </div>

                <div class="mb-4">
                    <label for="language" class="block mb-2 text-sm font-medium text-gray-900">Select language</label>
                    <Controller
                        control={control}
                        name='languages'
                        id='language'
                        render={({ field: { onChange, ref } }) => (
                            <Select
                                isMulti
                                name="colors"
                                options={languages}
                                inputRef={ref}
                                onChange={(val) => onChange(val.map((c) => c.value))}
                                className="basic-multi-select"
                                classNamePrefix="select"
                            />
                        )}
                    />
                </div>

                <div class="mb-4">
                    <label for="skill" class="block mb-2 text-sm font-medium text-gray-900">Select skill</label>
                    <Controller
                        control={control}
                        name='skill'
                        id='skill'
                        render={({ field: { onChange, ref } }) => (
                            <Select
                                isMulti
                                name="colors"
                                options={allSkills}
                                inputRef={ref}
                                onChange={(val) => onChange(val.map((c) => c.value))}
                                className="basic-multi-select"
                                classNamePrefix="select"
                            />
                        )}
                    />
                </div>

                {/* <div class="mb-4">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Genre</label>
                    <input type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Your name" />
                </div> */}

                <div class="mb-4">
                    <label for="intro" class="block mb-2 text-sm font-medium text-gray-900">Intro</label>
                    <textarea {...register("intro", { required: true })} id="intro" rows="5" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Intro"></textarea>
                </div>

                <div class="mb-4">
                    <label for="best_work_link" class="block mb-2 text-sm font-medium text-gray-900">Best Work Link</label>
                    <input {...register("best_work_link", { required: true })} type="text" id="best_work_link" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Best work link" />
                </div>
                <div class="mb-4">
                    <label for="work_link_2" class="block mb-2 text-sm font-medium text-gray-900">Work Link 2</label>
                    <input {...register("work_link_2", { required: true })} type="text" id="work_link_2" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Work link 2" />
                </div>
                <div class="mb-4">
                    <label for="work_link_3" class="block mb-2 text-sm font-medium text-gray-900">Work Link 3</label>
                    <input {...register("work_link_3", { required: true })} type="text" id="work_link_3" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Work link 3" />
                </div>

                <div class="mb-4">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Social Link</label>
                    <input {...register("social_links")} type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Social link" />
                </div>

                <div className='grid grid-cols-2 gap-2'>
                    <div class="mb-4">
                        <label for="professional_rating" class="block mb-2 text-sm font-medium text-gray-900">Professional Rating</label>
                        <input {...register("professional_rating", { required: true })} type="number" id="professional_rating" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Professional Rating" />
                    </div>
                    <div class="mb-4">
                        <label for="attitude_rating" class="block mb-2 text-sm font-medium text-gray-900">Attitude Rating</label>
                        <input {...register("attitude_rating", { required: true })} type="number" id="attitude_rating" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Attitude Rating" />
                    </div>
                </div>
                <div class="mb-4">
                    <label for="budget_range" class="block mb-2 text-sm font-medium text-gray-900">Budget range</label>
                    <select {...register("budget_range", { required: true })} id="budget_range" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option selected>Less than 10,000</option>
                        <option>10K - 20K</option>
                        <option>20K - 40K</option>
                        <option>Above 40K</option>

                    </select>
                </div>
                <div class="mb-4">
                    <label for="budget_idea" class="block mb-2 text-sm font-medium text-gray-900">Budget idea</label>
                    <textarea {...register("budget_idea", { required: true })} id="budget_idea" rows="5" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Budget idea"></textarea>
                </div>
                <div class="mb-4">
                    <label for="am_notes" class="block mb-2 text-sm font-medium text-gray-900">Artist manager notes</label>
                    <textarea {...register("am_notes", { required: true })} id="am_notes" rows="5" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Artist manager notes"></textarea>
                </div>
                <div class="mb-4">
                    <label for="pm_notes" class="block mb-2 text-sm font-medium text-gray-900">Production manager notes</label>
                    <textarea {...register("pm_notes", { required: true })} id="pm_notes" rows="5" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Production manager notes"></textarea>
                </div>

                <button type="submit" class="text-white bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Add Artist</button>
            </form>

        </div>
    );
};

export default ArtistEntry;