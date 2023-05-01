import { useForm } from 'react-hook-form';
import Button from "../../../Components/Button/Button";

const ArtistRequest = () => {
    const fields = [
        {
            name: "category",
            type: "text",
            label: "Category",
            placeholder: "Which category of artist",
            required: true
        },
        {
            name: "skill",
            type: "text",
            label: "Skills",
            placeholder: "Artist Skills",
            required: true
        },
        {
            name: "genre",
            type: "text",
            label: "Genres",
            placeholder: "Artist Genres",
            required: true
        },
        {
            name: "location",
            type: "text",
            label: "Location",
            placeholder: "Artist Location",
            required: false
        },
        {
            name: "language",
            type: "text",
            label: "Language",
            placeholder: "Artist Language",
            required: true
        },
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
            name: "brief",
            type: "text",
            label: "Project Brief",
            placeholder: "Project Brief",
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
            name: "latest_artists_numbers",
            type: "number",
            label: "Latest artists numbers for assigned skill category",
            placeholder: "Latest artists numbers",
            required: true
        },
        {
            name: "target_artists_numbers",
            type: "number",
            label: "Target artists numbers for assigned skill category",
            placeholder: "Target artists numbers",
            required: true
        },
    ]

    const { register, handleSubmit, formState: { errors }, control } = useForm();
    const onSubmit = data => { }

    return (
        <div className='bg-white max-h-[90vh] overflow-y-scroll'>
            <h3 className='font-medium p-3 border-b shadow-sm py-5'>Artist Requirements</h3>

            <form className='p-4'>
                <div className='grid grid-cols-2 items-end gap-3 mb-4'>
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
                </div>
                <Button variant="primary" type="submit">Submit</Button>
            </form>
        </div>
    );
};

export default ArtistRequest;