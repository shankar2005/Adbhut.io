import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Button from '../../Components/Button/Button';
import SelectLangs from '../../Components/Input/SelectLangs';
import SelectSkills from '../../Components/Input/SelectSkills';
import Textarea from '../../Components/Input/Textarea';
import Input from '../../Components/Input/Input';
import { useRootContext } from '../../contexts/RootProvider';
import { useAddArtistMutation, useGetArtistByIdQuery, useUpdateArtistMutation } from '../../features/artist/artistApi';
import WorkLinks from './Components/WorkLinks';

const ArtistEntry = () => {
    const { artistId } = useParams();
    const [workLinks, setWorkLinks] = useState([{ weblink: '', demo_type: '' }]);

    const { data: artistData } = useGetArtistByIdQuery(artistId, { skip: !artistId });
    const [addArtist, { isSuccess: addSuccess }] = useAddArtistMutation();
    const [updateArtist, { isSuccess: updateSuccess }] = useUpdateArtistMutation();
    const { locations } = useRootContext();

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

    return (
        <div className='bg-white rounded-b-lg shadow-lg'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='p-4'>
                    <div className='grid grid-cols-2 gap-3 mb-4'>
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
                        <div>
                            <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900">Select location</label>
                            <select {...register("location", { required: !artistData?.location.name })} id="location" className="input">
                                <option value={null} selected>Choose a location</option>
                                {
                                    locations?.map(location => <option value={location.pk} selected={artistData?.location.name}>{location.name}</option>)
                                }
                            </select>
                        </div>
                    </div>
                    <div className='mb-4'>
                        <SelectLangs
                            control={control}
                            defaultValue={artistData?.language}
                        />
                    </div>
                    <div className='mb-4'>
                        <SelectSkills control={control} defaultValue={artistData?.skills} />
                    </div>

                    {/* <div className="mb-4">
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
                    </div> */}

                    <div className="mb-4">
                        <Textarea
                            name="intro"
                            label="Intro"
                            placeholder="Intro"
                            defaultValue={artistData?.artist_intro}
                            register={register}
                        />
                    </div>
                </div>

                <WorkLinks
                    workLinks={workLinks}
                    setWorkLinks={setWorkLinks}
                    defaultWorkLinks={artistData?.works_links}
                />

                <div className='p-4'>
                    <div className="mb-4">
                        <Input
                            type="text"
                            name="social_links"
                            label="Social Link"
                            placeholder="Social link"
                            defaultValue={artistData?.social_links}
                            register={register}
                            required={true}
                        />
                    </div>

                    <div className='grid grid-cols-2 gap-2'>
                        <div className="mb-4">
                            <Input
                                type="number"
                                name="professional_rating"
                                label="Professional Rating"
                                placeholder="Professional Rating"
                                defaultValue={artistData?.professional_rating}
                                register={register}
                                required={true}
                            />
                        </div>
                        <div className="mb-4">
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
                    </div>
                    <div className="mb-4">
                        <label htmlFor="budget_range" className="block mb-2 text-sm font-medium text-gray-900">Budget range</label>
                        <select {...register("budget_range")} id="budget_range" className="input">
                            <option selected>Less than 10,000</option>
                            <option selected={artistData?.budget_range}>10K - 20K</option>
                            <option selected={artistData?.budget_range}>20K - 40K</option>
                            <option selected={artistData?.budget_range}>Above 40K</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <Textarea
                            name="budget_idea"
                            label="Budget idea"
                            placeholder="Budget idea"
                            defaultValue={artistData?.budget_idea}
                            register={register}
                        />
                    </div>
                    <div className="mb-4">
                        <Textarea
                            name="am_notes"
                            label="Artist manager notes"
                            placeholder="Artist manager notes"
                            defaultValue={artistData?.am_notes}
                            register={register}
                        />
                    </div>
                    <div className="mb-4">
                        <Textarea
                            name="pm_notes"
                            label="Production manager notes"
                            placeholder="Production manager notes"
                            defaultValue={artistData?.pm_notes}
                            register={register}
                        />
                    </div>
                    <Button type="submit">Add Artist</Button>
                </div>
            </form>

        </div>
    );
};

export default ArtistEntry;