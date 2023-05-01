import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { useRootContext } from '../../contexts/RootProvider';
import { useAddArtistMutation } from '../../features/artist/artistApi';

const ArtistEntry = () => {
    const [addArtist] = useAddArtistMutation();
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
        addArtist({
            ...data,
            "languages": [20, 19],
            "has_manager": false,
        })
    }

    const fields = [
        {
            name: "name",
            type: "text",
            label: "Name",
            placeholder: "Your Name",
            required: true
        },
        {
            name: "age",
            type: "number",
            label: "Age",
            placeholder: "Your age",
            required: false
        },
        {
            name: "email",
            type: "email",
            label: "Email",
            placeholder: "Your Email",
            required: true
        },
        {
            name: "phone",
            type: "tel",
            label: "Phone",
            placeholder: "Your phone number",
            required: true
        },
        {
            name: "profile_image",
            type: "url",
            label: "Profile image",
            placeholder: "Profile image",
            required: false
        },
    ]

    return (
        <div className='bg-white rounded-lg shadow-lg'>
            <h3 className='font-medium p-3 border-b shadow-sm'>Artist Entry</h3>

            <form onSubmit={handleSubmit(onSubmit)} className='p-4'>
                <div className='grid grid-cols-2 gap-3 mb-4'>
                    {
                        fields?.map(field => <div>
                            <label htmlFor={field.name} className="block mb-2 text-sm font-medium text-gray-900">{field.label}</label>
                            <input {...register(field.name, { required: field.required })} type={field.type} id={field.name} className="input" placeholder={field.placeholder} />
                        </div>)
                    }
                    <div>
                        <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900">Select country</label>
                        <select {...register("location", { required: true })} id="location" className="input">
                            <option selected>Choose a country</option>
                            {
                                locations?.map(location => <option value={location.pk}>{location.name}</option>)
                            }
                        </select>
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="language" className="block mb-2 text-sm font-medium text-gray-900">Select language</label>
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

                <div className="mb-4">
                    <label htmlFor="skill" className="block mb-2 text-sm font-medium text-gray-900">Select skill</label>
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

                <div className="mb-4">
                    <label htmlFor="genre" className="block mb-2 text-sm font-medium text-gray-900">Select genre</label>
                    <Controller
                        control={control}
                        name='genre'
                        id='genre'
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

                <div className="mb-4">
                    <label htmlFor="intro" className="block mb-2 text-sm font-medium text-gray-900">Intro</label>
                    <textarea {...register("intro", { required: true })} id="intro" rows="5" className="input" placeholder="Intro"></textarea>
                </div>

                <div className='grid grid-cols-2 gap-3'>
                    <div>
                        <label htmlFor="works_links" className="block mb-2 text-sm font-medium text-gray-900">Best Work Link</label>
                        <input {...register("works_links", { required: true })} type="text" id="works_links" className="input" placeholder="Best work link" />
                    </div>


                    {/* <div>
                        <label htmlFor="best_work_link" className="block mb-2 text-sm font-medium text-gray-900">Best Work Link</label>
                        <input {...register("best_work_link", { required: true })} type="text" id="best_work_link" className="input" placeholder="Best work link" />
                    </div>
                    <div>
                        <label htmlFor="work_link_2" className="block mb-2 text-sm font-medium text-gray-900">Work Link 2</label>
                        <input {...register("work_link_2", { required: true })} type="text" id="work_link_2" className="input" placeholder="Work link 2" />
                    </div>
                    <div>
                        <label htmlFor="work_link_3" className="block mb-2 text-sm font-medium text-gray-900">Work Link 3</label>
                        <input {...register("work_link_3", { required: true })} type="text" id="work_link_3" className="input" placeholder="Work link 3" />
                    </div> */}

                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Social Link</label>
                        <input {...register("social_links")} type="text" id="name" className="input" placeholder="Social link" />
                    </div>
                </div>

                <div className='grid grid-cols-2 gap-2'>
                    <div className="mb-4">
                        <label htmlFor="professional_rating" className="block mb-2 text-sm font-medium text-gray-900">Professional Rating</label>
                        <input {...register("professional_rating", { required: true })} type="number" id="professional_rating" className="input" placeholder="Professional Rating" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="attitude_rating" className="block mb-2 text-sm font-medium text-gray-900">Attitude Rating</label>
                        <input {...register("attitude_rating", { required: true })} type="number" id="attitude_rating" className="input" placeholder="Attitude Rating" />
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="budget_range" className="block mb-2 text-sm font-medium text-gray-900">Budget range</label>
                    <select {...register("budget_range", { required: true })} id="budget_range" className="input">
                        <option selected>Less than 10,000</option>
                        <option>10K - 20K</option>
                        <option>20K - 40K</option>
                        <option>Above 40K</option>

                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="budget_idea" className="block mb-2 text-sm font-medium text-gray-900">Budget idea</label>
                    <textarea {...register("budget_idea", { required: true })} id="budget_idea" rows="5" className="input" placeholder="Budget idea"></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="am_notes" className="block mb-2 text-sm font-medium text-gray-900">Artist manager notes</label>
                    <textarea {...register("am_notes", { required: true })} id="am_notes" rows="5" className="input" placeholder="Artist manager notes"></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="pm_notes" className="block mb-2 text-sm font-medium text-gray-900">Production manager notes</label>
                    <textarea {...register("pm_notes", { required: true })} id="pm_notes" rows="5" className="input" placeholder="Production manager notes"></textarea>
                </div>

                <button type="submit" className="text-white bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Add Artist</button>
            </form>

        </div>
    );
};

export default ArtistEntry;