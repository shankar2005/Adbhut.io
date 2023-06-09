import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Button from '../../Components/Button/Button';
import Textarea from '../../Components/Input/Textarea';
import Input from '../../Components/Input/Input';
import { useRootContext } from '../../contexts/RootProvider';
import { useAddArtistMutation, useGetArtistByIdQuery, useUpdateArtistMutation } from '../../features/artist/artistApi';
import WorkLinks from './Components/WorkLinks';
import Select from '../../Components/Input/Select';
import MultiSelect from '../../Components/Input/MultiSelect';
import { useGetLanguagesQuery, useGetLocationsQuery } from '../../features/utils/utilsApi';
import MultiSelectUpdate from '../../Components/Input/MultiSelectUpdate';

const EditArtist = () => {
    const { artistId } = useParams();
    const [workLinks, setWorkLinks] = useState([{ weblink: '', demo_type: '' }]);

    const { data: artistData } = useGetArtistByIdQuery(artistId, { skip: !artistId });
    const [addArtist, { isSuccess: addSuccess }] = useAddArtistMutation();
    const [updateArtist, { isSuccess: updateSuccess }] = useUpdateArtistMutation();
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

        if (artistId) {
            updateArtist({
                id: artistId,
                data: formData
            })
            return;
        }
        addArtist(formData);
    }

    const navigate = useNavigate();
    useEffect(() => {
        if (addSuccess || updateSuccess) {
            Swal.fire(
                'Success!',
                `Artist has been ${addSuccess ? "added" : "updated"}!`,
                'success'
            )
            reset();
            navigate("/artists/artist-list");
        }
    }, [addSuccess, updateSuccess])

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
            value: artistData?.profile_pic
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

    return (
        <div className='bg-white rounded-b-lg shadow-lg'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='p-4 space-y-4'>
                    <div className='grid grid-cols-2 gap-3'>
                        {
                            inputFields?.map(field => <Input
                                key={field.name}
                                type={field.type}
                                name={field.name}
                                label={field.label}
                                placeholder={field.placeholder}
                                defaultValue={field.value}
                                register={register}
                                required={field.required}
                            />)
                        }
                        <Select
                            name="location"
                            label="Select location"
                            register={register}
                            defaultOption="Choose a location"
                            defaultValue={artistData?.location?.label}
                            options={locations}
                        />
                    </div>

                    {
                        artistId
                            ? <>
                                <MultiSelectUpdate
                                    name="languages"
                                    label="Select language"
                                    control={control}
                                    options={languages}
                                    defaultValue={artistData?.language}
                                />
                                <MultiSelectUpdate
                                    name="skill"
                                    label="Select skill"
                                    control={control}
                                    options={skills}
                                    defaultValue={artistData?.skills}
                                />
                            </>
                            : <>
                                <MultiSelect
                                    name="languages"
                                    label="Select language"
                                    control={control}
                                    options={languages}
                                />
                                <MultiSelect
                                    name="skill"
                                    label="Select skill"
                                    control={control}
                                    options={skills}
                                />
                            </>
                    }


                    <Textarea
                        name="intro"
                        label="Intro"
                        placeholder="Intro"
                        defaultValue={artistData?.artist_intro}
                        register={register}
                    />
                </div>

                <WorkLinks
                    workLinks={workLinks}
                    setWorkLinks={setWorkLinks}
                    defaultWorkLinks={artistData?.works_links}
                />

                <div className='p-4 space-y-4'>
                    <Input
                        type="text"
                        name="social_links"
                        label="Social Link"
                        placeholder="Social link"
                        defaultValue={artistData?.social_links}
                        register={register}
                        required={false}
                    />

                    <div className='grid grid-cols-2 gap-2'>
                        <Input
                            type="number"
                            name="professional_rating"
                            label="Professional Rating"
                            placeholder="Professional Rating"
                            defaultValue={artistData?.professional_rating}
                            register={register}
                            required={true}
                        />
                        <Input
                            type="number"
                            name="attitude_rating"
                            label="Attitude Rating"
                            placeholder="Attitude Rating"
                            defaultValue={artistData?.attitude_rating}
                            register={register}
                            required={true}
                        />
                    </div>
                    <Select
                        name="budget_range"
                        label="Budget range"
                        register={register}
                        defaultValue={artistData?.budget_range}
                        defaultOption="Select budge range"
                        options={[
                            { name: "Less than 10,000", value: "Less than 10,000" },
                            { name: "10K - 20K", value: "10K - 20K" },
                            { name: "20K - 40K", value: "20K - 40K" },
                            { name: "Above 40K", value: "Above 40K" },
                        ]}
                    />
                    <Textarea
                        name="budget_idea"
                        label="Budget idea"
                        placeholder="Budget idea"
                        defaultValue={artistData?.budget_idea}
                        register={register}
                    />
                    <Textarea
                        name="am_notes"
                        label="Artist manager notes"
                        placeholder="Artist manager notes"
                        defaultValue={artistData?.am_notes}
                        register={register}
                    />
                    <Textarea
                        name="pm_notes"
                        label="Production manager notes"
                        placeholder="Production manager notes"
                        defaultValue={artistData?.pm_notes}
                        register={register}
                    />
                    <Button type="submit">{artistId ? "Update Artist" : "Add Artist"}</Button>
                </div>
            </form>

        </div>
    );
};

export default EditArtist;