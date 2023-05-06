import { Controller, useForm } from 'react-hook-form';
import Button from "../../../Components/Button/Button";
import SelectSkills from '../../../Components/Input/SelectSkills';
import { useAddArtistRequestMutation } from '../../../features/artist/artistApi';
import { useRootContext } from '../../../contexts/RootProvider';
import { useGetLanguagesQuery } from '../../../features/utils/utilsApi';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const ArtistRequest = ({ setArtistRequestModal }) => {
    const { locations } = useRootContext();
    const [addArtistRequest, { isSuccess }] = useAddArtistRequestMutation();
    const { data: languages } = useGetLanguagesQuery();
    const currentProject = useSelector(state => state.project)

    const allLanguages = [];
    languages?.forEach(language => {
        allLanguages.push({ value: language.pk, label: language.name })
    });

    const fields = [
        {
            name: "art_details",
            type: "text",
            label: "Performing Art Details",
            placeholder: "Artist performing art details",
            required: true
        },
        {
            name: "budget_idea",
            type: "text",
            label: "Budget idea",
            placeholder: "Client's budget idea",
            required: true
        },
        {
            name: "hiring_artists_numbers",
            type: "number",
            label: "Production Suggested Advance Hiring Artists numbers",
            placeholder: "Production suggested artists numbers",
            required: true
        },
        {
            name: "reason",
            type: "select",
            label: "Reason for more numbers",
            options: [
                "Current Data not Sufficient",
                "As backup",
                "Preparation"
            ],
            required: true
        },
        {
            name: "target_artists_numbers",
            type: "number",
            label: "Target artists numbers for assigned skill category",
            placeholder: "Target artists numbers",
            required: true
        },
        {
            name: "production_hiring",
            type: "number",
            label: "Production Hiring",
            placeholder: "Production hiring artists numbers",
        },
        {
            name: "service_hiring",
            type: "number",
            label: "Servicing Hiring",
            placeholder: "Service hiring artists numbers",
        },
    ]

    const { register, handleSubmit, formState: { errors }, control } = useForm();
    const onSubmit = ({ art_details, budget_idea, skill, location, languages, budget_range, project, production_hiring, service_hiring, target_artists_numbers, comments }) => {
        const formData = {
            "skill": skill,
            "location": location,
            // "genre": [194, 193],
            "languages": languages,
            "other_performin_arts": art_details,
            "budget_range": budget_range,
            "budget_idea": budget_idea,
            "project": currentProject?.pk,
            "production_hiring": production_hiring,
            "service_hiring": service_hiring,
            "target": target_artists_numbers,
            "comments": comments,
        }

        // submit formData
        addArtistRequest(formData);
    }

    useEffect(() => {
        if (isSuccess) {
            setArtistRequestModal(false);
        }
    }, [isSuccess])

    return (
        <div className='bg-white max-h-[90vh] overflow-y-scroll scroll-none'>
            <h3 className='font-medium p-3 border-b shadow-sm py-5'>Artist Requirements</h3>

            <form onSubmit={handleSubmit(onSubmit)} className='p-4'>
                <div className='grid grid-cols-2 items-end gap-3 mb-4'>
                    {/* select skills */}
                    <SelectSkills control={control} />
                    {/*  */}

                    <div>
                        <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900">Select country</label>
                        <select {...register("location", { required: true })} id="location" className="input">
                            <option selected>Choose a country</option>
                            {
                                locations?.map(location => <option value={location.pk}>{location.name}</option>)
                            }
                        </select>
                    </div>

                    <div>
                        <label htmlFor="languages" className="block mb-2 text-sm font-medium text-gray-900">Select languages</label>
                        <Controller
                            control={control}
                            name='languages'
                            id='languages'
                            render={({ field: { onChange, ref } }) => (
                                <Select
                                    isMulti
                                    name="colors"
                                    options={allLanguages}
                                    inputRef={ref}
                                    onChange={(val) => onChange(val.map((c) => c.value))}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            )}
                        />
                    </div>

                    <div>
                        <label htmlFor="budget_range" className="block mb-2 text-sm font-medium text-gray-900">Budget range</label>
                        <select {...register("budget_range", { required: true })} id="budget_range" className="input">
                            <option selected>Less than 10,000</option>
                            <option>10K - 20K</option>
                            <option>20K - 40K</option>
                            <option>Above 40K</option>
                        </select>
                    </div>

                    {
                        fields?.map(field => {
                            if (field.type === "select") {
                                return (
                                    <div>
                                        <label htmlFor={field.name} className="block mb-2 text-sm font-medium text-gray-900">{field.label}</label>
                                        <select {...register(field.name, { required: field.required })} id={field.name} className="input">
                                            {field.options.map(option => <option>{option}</option>)}
                                        </select>
                                    </div>
                                )
                            } else {
                                return (
                                    <div>
                                        <label htmlFor={field.name} className="block mb-2 text-sm font-medium text-gray-900">{field.label} <span className='text-red-500'>*</span></label>
                                        <input {...register(field.name, { required: field.required })} type={field.type} id={field.name} className="input" placeholder={field.placeholder} />
                                    </div>
                                )
                            }
                        })
                    }

                    <div className="mb-4">
                        <label htmlFor="comments" className="block mb-2 text-sm font-medium text-gray-900">Comments</label>
                        <textarea {...register("comments", { required: true })} id="comments" rows="5" className="input" placeholder="Write your comments"></textarea>
                    </div>

                </div>
                <Button variant="primary" type="submit">Submit</Button>
            </form>
        </div>
    );
};

export default ArtistRequest;