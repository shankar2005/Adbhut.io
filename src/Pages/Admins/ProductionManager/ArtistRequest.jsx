import { useForm } from 'react-hook-form';
import Button from "../../../Components/Button/Button";
import { useAddArtistRequestMutation } from '../../../features/artist/artistApi';
import { useRootContext } from '../../../contexts/RootProvider';
import { useGetLanguagesQuery } from '../../../features/utils/utilsApi';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import MultiSelect from '../../../Components/Input/MultiSelect';
import Select from '../../../Components/Input/Select';

const ArtistRequest = ({ setArtistRequestModal }) => {
    const { locations, skills: skillsData } = useRootContext();
    const [addArtistRequest, { isSuccess }] = useAddArtistRequestMutation();
    const currentProject = useSelector(state => state.project)

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
    const onSubmit = ({ art_details, budget_idea, skill, location, language, budget_range, project, production_hiring, service_hiring, target_artists_numbers, comments }) => {
        const formData = {
            "skill": skill,
            "location": location,
            // "genre": [194, 193],
            "languages": language,
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

    // structured the data in expected form of `react-select`
    const { data: languagesData } = useGetLanguagesQuery();
    const languages = languagesData?.map(language => {
        return { value: language.pk, label: language.name }
    });
    const skills = skillsData?.map(skill => {
        return { value: skill.pk, label: skill.name }
    });

    return (
        <div className='bg-white max-h-[90vh] overflow-y-scroll scroll-none'>
            <h3 className='font-medium p-3 border-b shadow-sm py-5'>Artist Requirements</h3>

            <form onSubmit={handleSubmit(onSubmit)} className='p-4'>
                <div className='grid grid-cols-2 items-end gap-3 mb-4'>
                    <MultiSelect
                        name="skill"
                        label="Select skill"
                        control={control}
                        options={skills}
                    />

                    <Select
                        name="location"
                        label="Select location"
                        register={register}
                        defaultOption="Choose a location"
                        required={true}
                        options={locations}
                    />

                    <MultiSelect
                        name="languages"
                        label="Select language"
                        control={control}
                        options={languages}
                    />

                    <Select
                        name="budget_range"
                        label="Budget range"
                        register={register}
                        required={true}
                        defaultOption="Select budge range"
                        options={[
                            { name: "Less than 10,000", value: "Less than 10,000" },
                            { name: "10K - 20K", value: "10K - 20K" },
                            { name: "20K - 40K", value: "20K - 40K" },
                            { name: "Above 40K", value: "Above 40K" },
                        ]}
                    />

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