import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Button from '../../Components/Button/Button';
import SelectLangs from '../../Components/Input/SelectLangs';
import SelectSkills from '../../Components/Input/SelectSkills';
import Textarea from '../../Components/Input/Textarea';
import Input from '../../Components/Input/Input';
import { useRootContext } from '../../contexts/RootProvider';
import { useAddArtistMutation, useGetArtistByIdQuery, useShortlistArtistMutation } from '../../features/artist/artistApi';

const ArtistEntry = () => {
    const { projectId, artistId } = useParams();
    const location = useLocation();
    const redirectPath = location.state?.from?.pathname;

    const { data: artistData } = useGetArtistByIdQuery(artistId, { skip: !artistId });
    const [addArtist, { data, isSuccess }] = useAddArtistMutation();
    const { locations } = useRootContext();
    const [shortlistArtist] = useShortlistArtistMutation();

    const { register, handleSubmit, formState: { errors }, control, reset } = useForm();
    const onSubmit = data => {
        const workLinks = [];
        if (workLink1) {
            workLinks.push({
                weblink: workLink1,
                demo_type: workLink1Type,
                show_in_top_feed: true
            });
        }
        if (workLink2) {
            workLinks.push({
                weblink: workLink2,
                demo_type: workLink2Type,
            });
        }
        if (workLink3) {
            workLinks.push({
                weblink: workLink3,
                demo_type: workLink3Type,
            });
        }

        addArtist({
            ...data,
            "has_manager": false,
            "works_links": workLinks
        })
            .then(data => {
                if (data.data?.artist?.id) {
                    Swal.fire(
                        'Success!',
                        'Artist has been added!',
                        'success'
                    )
                    reset();

                    if (!redirectPath) {
                        navigate("/artists/artist-list");
                    }
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const navigate = useNavigate();
    useEffect(() => {
        if (projectId && isSuccess) {
            shortlistArtist({
                projectId,
                artistId: data.artist.id
            })
                .then(data => {
                    navigate(redirectPath);
                })
        }
    }, [projectId, isSuccess]);

    const fields = [
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

    const [workLink1, setWorkLink1] = useState(null);
    const [workLink1Type, setWorkLink1Type] = useState("Other");

    const [workLink2, setWorkLink2] = useState(null);
    const [workLink2Type, setWorkLink2Type] = useState("Other");

    const [workLink3, setWorkLink3] = useState(null);
    const [workLink3Type, setWorkLink3Type] = useState("Other");

    const fileTypes = ["Youtube", "Google Drive", "Behance", "Imdb", "Instagram", "Vimeo", "Wixsite", "Other"]

    return (
        <div className='bg-white rounded-b-lg shadow-lg'>
            <h3 className='font-medium p-3 border-b shadow-sm'>Artist Entry</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='p-4'>
                    <div className='grid grid-cols-2 gap-3 mb-4'>
                        {
                            fields?.map(field => <Input
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
                            <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900">Select country</label>
                            <select {...register("location", { required: true })} id="location" className="input">
                                <option selected>Choose a country</option>
                                {
                                    locations?.map(location => <option value={location.pk} selected={artistData?.location}>{location.name}</option>)
                                }
                            </select>
                        </div>
                    </div>

                    <div className='mb-4'>
                        <SelectLangs
                            control={control}
                            defaultValue={artistData?.languages}
                        />
                    </div>
                    <div className='mb-4'>
                        <SelectSkills control={control} />
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
                            required={true}
                        />
                    </div>
                </div>

                {/* work links */}

                <div className='bg-gray-50 border-y p-4'>
                    <div className="mb-4 flex gap-4">
                        <div className='w-full'>
                            <label htmlFor="best_work_link" className="block mb-2 text-sm font-medium text-gray-900">Best Work Link</label>
                            <input onBlur={e => setWorkLink1(e.target.value)} type="text" id="best_work_link" className="input" placeholder="Best work link" />
                        </div>
                        <div className="w-2/6">
                            <label htmlFor="demo-type1" className="block mb-2 text-sm font-medium text-gray-900">Demo Type</label>
                            <select onChange={e => setWorkLink1Type(e.target.value)} id="demo-type1" className="input">
                                <option selected disabled>Choose</option>
                                {fileTypes.map(type => <option value={type}>{type}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="mb-4 flex gap-4">
                        <div className="w-full">
                            <label htmlFor="work_link_2" className="block mb-2 text-sm font-medium text-gray-900">Work Link 2</label>
                            <input onBlur={e => setWorkLink2(e.target.value)} type="text" id="work_link_2" className="input" placeholder="Work link 2" />
                        </div>
                        <div className="w-2/6">
                            <label htmlFor="demo-type1" className="block mb-2 text-sm font-medium text-gray-900">Demo Type</label>
                            <select onChange={e => setWorkLink2Type(e.target.value)} id="demo-type1" className="input">
                                <option selected disabled>Choose</option>
                                {fileTypes.map(type => <option value={type}>{type}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="mb-4 flex gap-4">
                        <div className="w-full">
                            <label htmlFor="work_link_3" className="block mb-2 text-sm font-medium text-gray-900">Work Link 3</label>
                            <input onBlur={e => setWorkLink3(e.target.value)} type="text" id="work_link_3" className="input" placeholder="Work link 3" />
                        </div>
                        <div className="w-2/6">
                            <label htmlFor="demo-type1" className="block mb-2 text-sm font-medium text-gray-900">Demo Type</label>
                            <select onChange={e => setWorkLink3Type(e.target.value)} id="demo-type1" className="input">
                                <option selected disabled>Choose</option>
                                {fileTypes.map(type => <option value={type}>{type}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* work links */}

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
                        <select {...register("budget_range", { required: true })} id="budget_range" className="input">
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
                            required={true}
                        />
                    </div>
                    <div className="mb-4">
                        <Textarea
                            name="am_notes"
                            label="Artist manager notes"
                            placeholder="Artist manager notes"
                            defaultValue={artistData?.am_notes}
                            register={register}
                            required={true}
                        />
                    </div>
                    <div className="mb-4">
                        <Textarea
                            name="pm_notes"
                            label="Production manager notes"
                            placeholder="Production manager notes"
                            defaultValue={artistData?.pm_notes}
                            register={register}
                            required={true}
                        />
                    </div>
                    <Button type="submit">Add Artist</Button>
                </div>
            </form>

        </div>
    );
};

export default ArtistEntry;