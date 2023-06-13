import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import Textarea from '../../Components/Input/Textarea';
import Input from '../../Components/Input/Input';
import { useRootContext } from '../../contexts/RootProvider';
import { useDeleteArtistMutation, useGetArtistByIdQuery, useUpdateArtistMutation } from '../../features/artist/artistApi';
import Select from '../../Components/Input/Select';
import { useGetLanguagesQuery, useGetLocationsQuery } from '../../features/utils/utilsApi';
import MultiSelectUpdate from '../../Components/Input/MultiSelectUpdate';
import TableRow from '../../Components/Table/TableRow';
import { useRef } from 'react';
import { toast } from 'react-hot-toast';
import WorkLinkTable from './Components/WorkLinkTable';

const EditArtist = () => {
    const { artistId } = useParams();

    const { data: artistData } = useGetArtistByIdQuery(artistId, { skip: !artistId });
    const [updateArtist, { isSuccess }] = useUpdateArtistMutation();
    const { skills: skillsData } = useRootContext();
    const { data: locations } = useGetLocationsQuery();

    const { register, handleSubmit, formState: { errors }, control, reset } = useForm();
    const onSubmit = data => {
        const formData = {
            ...data,
            age: +data.age,
            professional_rating: data.professional_rating || 0,
            attitude_rating: data.attitude_rating || 0,
            has_manager: false
        }
        updateArtist({
            id: artistId,
            data: formData
        })
    }

    const navigate = useNavigate();
    useEffect(() => {
        if (isSuccess) {
            toast.success("Artist has been updated");
            reset();
            navigate("/artists/artist-list");
        }
    }, [isSuccess])

    const inputFields = [
        {
            name: "name",
            type: "text",
            label: "Name",
            placeholder: "Your Name",
            required: true,
            value: artistData?.name
        },
        {
            name: "age",
            type: "number",
            label: "Age",
            placeholder: "Your age",
            required: false,
            value: artistData?.age
        },
        {
            name: "email",
            type: "email",
            label: "Email",
            placeholder: "Your Email",
            required: true,
            value: artistData?.email
        },
        {
            name: "phone",
            type: "tel",
            label: "Phone",
            placeholder: "Your phone number",
            required: true,
            value: artistData?.phone
        },
        {
            name: "profile_image",
            type: "url",
            label: "Profile image",
            placeholder: "Profile image",
            required: false,
            value: artistData?.profile_image
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

    useEffect(() => {
        reset();
    }, [reset, artistData])

    const [location, setLocation] = useState(null);
    const [budgetRange, setBudgetRange] = useState(null);

    useEffect(() => {
        setLocation(artistData?.location?.label);
        setBudgetRange(artistData?.budget_range);
    }, [artistData]);

    // delete artist
    const [deleteArtist] = useDeleteArtistMutation();
    const confirmInputRef = useRef();
    const [showConfirm, setShowConfirm] = useState(false);
    const handleDeleteArtist = () => {
        if (confirmInputRef.current?.value.trim() !== "Delete") {
            setShowConfirm(true);
            confirmInputRef.current?.focus();
        } else {
            deleteArtist(artistData?.id);
            navigate("/artists/artist-list");
            toast.success("Deleted!");
        }
    }

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
                                        defaultValue={field.value}
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
                                defaultValue={location}
                            />
                        } />
                        <TableRow label="Select language" content={
                            <MultiSelectUpdate
                                name="languages"
                                control={control}
                                options={languages}
                                defaultValue={artistData?.language}
                            />
                        } />
                        <TableRow label="Select skill" content={
                            <MultiSelectUpdate
                                name="skill"
                                control={control}
                                options={skills}
                                defaultValue={artistData?.skills}
                            />
                        } />
                        <TableRow label="Artist Intro" content={
                            <Textarea
                                name="artist_intro"
                                placeholder="Artist Intro"
                                defaultValue={artistData?.artist_intro}
                                register={register}
                            />
                        } />
                    </tbody>
                </table>

                <WorkLinkTable works_links={artistData?.works_links} artistId={artistData?.id} />

                <table className="w-full">
                    <tbody className="bg-white">
                        <TableRow label="Social Link" content={
                            <Input
                                type="text"
                                name="social_links"
                                placeholder="Social link"
                                defaultValue={artistData?.social_links}
                                register={register}
                            />
                        } />
                        <TableRow label="Professional Rating" content={
                            <Input
                                type="number"
                                name="professional_rating"
                                placeholder="Professional Rating"
                                defaultValue={artistData?.professional_rating}
                                register={register}
                                required={true}
                            />
                        } />
                        <TableRow label="Attitude Rating" content={
                            <Input
                                type="number"
                                name="attitude_rating"
                                placeholder="Attitude Rating"
                                defaultValue={artistData?.attitude_rating}
                                register={register}
                                required={true}
                            />
                        } />
                        <TableRow label="Budget range" content={
                            <Select
                                name="budget_range"
                                register={register}
                                defaultValue={budgetRange}
                                defaultOption="Select budge range"
                                options={[
                                    { name: "Less Than 10,000", value: "Less Than 10,000" },
                                    { name: "10K - 20K", value: "10K - 20K" },
                                    { name: "20K - 40K", value: "20K - 40K" },
                                    { name: "Above 40K", value: "Above 40K" },
                                ]}
                            />
                        } />
                        <TableRow label="Budget idea" content={
                            <Textarea
                                name="budget_idea"
                                placeholder="Budget idea"
                                defaultValue={artistData?.budget_idea}
                                register={register}
                            />
                        } />
                        <TableRow label="Artist manager notes" content={
                            <Textarea
                                name="am_notes"
                                placeholder="Artist manager notes"
                                defaultValue={artistData?.am_notes}
                                register={register}
                            />
                        } />
                        <TableRow label="Production manager notes" content={
                            <Textarea
                                name="pm_notes"
                                placeholder="Production manager notes"
                                defaultValue={artistData?.pm_notes}
                                register={register}
                            />
                        } />
                    </tbody>
                </table>

                {showConfirm && <div className='p-4 pb-0'>
                    <p className='text-sm mb-1 font-semibold'>To confirm, type "<span className='font-bold text-red-600'>Delete</span>" in the box below</p>
                    <input ref={confirmInputRef} type="text" className="border-2 border-blue-500 outline-red-500 rounded pl-1 text-sm" />
                </div>}

                <div className='p-4 space-x-2'>
                    <Button type="submit">Update Artist</Button>
                    <Button onClick={handleDeleteArtist} type="button" variant="danger">Delete</Button>
                </div>
            </form>

        </div>
    );
};

export default EditArtist;