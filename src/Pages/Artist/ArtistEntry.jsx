import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useRootContext } from '../../contexts/RootProvider';
import { useAddArtistMutation } from '../../features/artist/artistApi';
import WorkLinks from './Components/WorkLinks';
import Select from '../../Components/Input/Select';
import MultiSelect from '../../Components/Input/MultiSelect';
import { useGetLanguagesQuery, useGetLocationsQuery } from '../../features/utils/utilsApi';
import TableRow from '../../Components/Table/TableRow';
import Button from '../../Components/Button/Button';

const ArtistEntry = () => {
    const [workLinks, setWorkLinks] = useState([{ weblink: '', demo_type: '' }]);

    const [addArtist, { isSuccess: addSuccess }] = useAddArtistMutation();
    const { skills: skillsData } = useRootContext();
    const { data: locations } = useGetLocationsQuery();

    const { register, handleSubmit, formState: { errors }, control, reset } = useForm();
    const onSubmit = data => {
        const formData = {
            ...data,
            age: +data.age,
            professional_rating: data.professional_rating || 0,
            attitude_rating: data.attitude_rating || 0,
            has_manager: false,
            works_links: workLinks
        };
        addArtist(formData);
    }

    const navigate = useNavigate();
    useEffect(() => {
        if (addSuccess) {
            Swal.fire(
                'Success!',
                `Artist has been ${addSuccess ? "added" : "updated"}!`,
                'success'
            )
            reset();
            navigate("/artists/artist-list");
        }
    }, [addSuccess])

    const inputFields = [
        {
            name: "name",
            type: "text",
            label: "Name",
            placeholder: "Artist name",
            required: true,
        },
        {
            name: "age",
            type: "number",
            label: "Age",
            placeholder: "Artist age",
            required: false,
        },
        {
            name: "email",
            type: "email",
            label: "Email",
            placeholder: "Artist email",
            required: true,
        },
        {
            name: "phone",
            type: "tel",
            label: "Phone",
            placeholder: "Artist phone number",
            required: true,
        },
        {
            name: "profile_image",
            type: "url",
            label: "Profile Picture",
            placeholder: "Artist image URL",
            required: false,
        },
    ]

    // structured the data in expected form of `react-select`
    const { data: languagesData } = useGetLanguagesQuery();
    const languages = languagesData?.map(language => {
        return { value: language.pk, label: language.name }
    });
    const skills = skillsData?.map(skill => {
        return { value: skill.pk, label: skill.name }
    });

    return (
        <div className='font-hero bg-white rounded-b-lg shadow-lg'>
            <form onSubmit={handleSubmit(onSubmit)}>

                <table className="w-full">
                    <tbody className="bg-white">
                        {inputFields?.map(field => (
                            <TableRow
                                key={field.name}
                                label={<span className="whitespace-nowrap">{field.label} {field.required && <span className="text-red-500 text-base">*</span>}</span>}
                                content={
                                    <Input
                                        type={field.type}
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        register={register}
                                        required={field.required}
                                    />
                                } />
                        ))}
                        <TableRow label="Select location" content={
                            <Select
                                name="location"
                                register={register}
                                defaultOption="Choose a location"
                                options={locations}
                            />
                        } />
                        <TableRow label="Artist intro" content={
                            <Textarea
                                name="intro"
                                placeholder="Artist intro"
                                register={register}
                            />
                        } />
                        <TableRow label="Select language" content={
                            <MultiSelect
                                name="languages"
                                control={control}
                                options={languages}
                            />
                        } />
                        <TableRow label={<span className="whitespace-nowrap">Select skill <span className="text-red-500 text-base">*</span></span>} content={
                            <MultiSelect
                                name="skill"
                                control={control}
                                options={skills}
                            />
                        } />
                    </tbody>
                </table>

                <WorkLinks
                    workLinks={workLinks}
                    setWorkLinks={setWorkLinks}
                />

                <div className='p-4'>
                    <Button type="submit">Add Artist</Button>
                </div>
            </form>
        </div>
    );
};

export default ArtistEntry;

const Input = ({
    name,
    type,
    placeholder,
    required,
    register = () => { },
    ...props
}) => {
    return (
        <input
            {...register(name, { required })}
            type={type}
            className="border px-1 outline-none"
            placeholder={placeholder}
            {...props}
        />
    );
};

const Textarea = ({ name, placeholder, defaultValue, required, register, ...props }) => {
    return (
        <textarea {...register(name, { required })} id={name} rows="5" className="w-full border p-1" placeholder={placeholder} defaultValue={defaultValue} {...props}></textarea>
    );
};