import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useRootContext } from '../../contexts/RootProvider';
import { useAddArtistMutation } from '../../features/artist/artistApi';
import Select from '../../Components/Input/Select';
import MultiSelect from '../../Components/Input/MultiSelect';
import { useGetLanguagesQuery, useGetLocationsQuery } from '../../features/utils/utilsApi';
import TableRow from '../../Components/Table/TableRow';
import Button from '../../Components/Button/Button';
import { toast } from 'react-hot-toast';
import Container from '../../Components/Container/Container';
import Input from '../../Components/Input/Input';
import RequiredMark from '../../Components/Input/RequiredMark';
import WorkLinkTable from './Components/WorkLinkTable';
import { AiOutlineCheck } from 'react-icons/ai';
import { FcCheckmark } from 'react-icons/fc';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { useSelector } from 'react-redux';

const ArtistAccount = () => {
    return (
        <div className="bg-gray-50 py-5 min-h-screen">
            <ol className="font-hero font-semibold w-full md:w-9/12 mx-auto mb-5 flex items-center gap-5">
                <Link to="/artists/account"><li className="bg-white shadow border border-green-500 p-3 rounded-lg gap-x-24 flex justify-between items-center">1. User info <FcCheckmark size={20} /></li></Link>
                <Link to="/artists/account/personal-info"><li className="bg-white shadow border border-blue-400 p-3 rounded-lg gap-x-24 flex justify-between items-center">2. Account info <HiOutlineArrowNarrowRight size={20} className="text-blue-600" /></li></Link>
                <Link to="/artists/account/demo-info"><li className="bg-white shadow border border-blue-400 p-3 rounded-lg gap-x-24 flex justify-between items-center">3. Work Demo <HiOutlineArrowNarrowRight size={20} className="text-blue-600" /></li></Link>
            </ol>
            <Outlet />
        </div>
    );
};

export default ArtistAccount;

export const UserInfo = () => {
    const { user } = useSelector(state => state.auth);
    return (
        <Container className="font-hero">
            <div className="border p-4 border-b-0">
                <h1 className="text-3xl font-semibold">Your User Info</h1>
                <small>Minimum requirements to login or access your account.</small>
            </div>
            <table className="w-full">
                <tbody className="bg-white">
                    <TableRow
                        label={<>Name <RequiredMark /></>}
                        content={user?.name}
                    />
                    <TableRow
                        label={<>Email <RequiredMark /></>}
                        content={user?.email}
                    />
                    <TableRow
                        label={<>Phone <RequiredMark /></>}
                        content={user?.phone}
                    />
                    <TableRow
                        label={<>Password <RequiredMark /></>}
                        content="**********"
                    />
                </tbody>
            </table>
        </Container>
    );
};

export const PersonalInfo = () => {
    const artistId = useSelector(state => state.auth?.user?.id);
    console.log(artistId);
    const [addArtist, { data: artist, isSuccess, isError, error }] = useAddArtistMutation();
    const { skills: skillsData } = useRootContext();
    const { data: locations } = useGetLocationsQuery();
    const { data: languagesData } = useGetLanguagesQuery();
    const [file, setFile] = useState(null);
    const [isFullTime, setIsFullTime] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleChangeCTC = (e) => {
        setIsFullTime(e.target.checked);
    }

    const { register, handleSubmit, formState: { errors }, control, reset } = useForm();
    const onSubmit = data => {
        const copyData = {
            ...data,
            age: +data.age,
            phone: `+91${data.phone}`,
            professional_rating: data.professional_rating || 0,
            attitude_rating: data.attitude_rating || 0,
            has_manager: false,
            works_links: [],
            full_time: isFullTime
        };

        const formData = new FormData();
        // Append other form fields to the form data
        Object.entries(copyData).forEach(([key, value]) => {
            formData.append(key, value);
        });
        formData.append('profile_pic', file); // Add the file to the form data

        addArtist(formData);
    }

    const navigate = useNavigate();
    useEffect(() => {
        if (isSuccess) {
            toast.success("Artist has been added");
            reset();
            navigate(`/artists/artist-entry/works/${artist?.artist?.id}`);
        }

    }, [isSuccess])

    useEffect(() => {
        if (isError) {
            if (error?.data?.languages) {
                setErrorMsg("Please select at least one language");
            } else if (error?.data?.skill) {
                setErrorMsg("Please select at least one skill");
            } else {
                setErrorMsg(Object.values(error?.data)[0][0]);
            }
        }
    }, [isError])

    // structured the data in expected form of `react-select`
    const languages = languagesData?.map(language => {
        return { value: language.pk, label: language.name }
    });
    const skills = skillsData?.map(skill => {
        return { value: skill.pk, label: skill.name }
    });

    return (
        <Container className="font-hero">
            <div className="border p-4 border-b-0">
                <h1 className="text-3xl font-semibold">Your Personal Information</h1>
                <small>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa optio blanditiis.</small>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <table className="w-full">
                    <tbody className="bg-white">
                        <TableRow
                            label="Date of birth"
                            content={
                                <Input
                                    type="date"
                                    name="dob"
                                    register={register}
                                />
                            } />
                        <TableRow label={<span className="whitespace-nowrap">Profile Picture <RequiredMark /></span>} content={
                            <input
                                type="file"
                                name="profile_pic"
                                className="border cursor-pointer"
                                onChange={handleFileChange}
                                required
                            />
                        } />
                        <TableRow label="Intro" content={<>
                            <div className="relative">
                                <Textarea
                                    name="artist_intro"
                                    placeholder="Intro"
                                    register={register}
                                    validation={{ maxLength: 150 }}
                                />
                                <button type="button" className="absolute bottom-3 right-2 bg-blue-500 p-1 rounded-md text-white shadow border">Generate</button>
                            </div>
                            {errors.artist_intro && errors.artist_intro.type === 'maxLength' && (
                                <p className='text-red-600'>Maximum character limit exceeded (150 characters).</p>
                            )}
                        </>
                        } />
                        <TableRow label="Select location" content={
                            <Select
                                name="location"
                                register={register}
                                defaultOption="Choose a location"
                                options={locations}
                            />
                        } />
                        <TableRow label="Select languages" content={
                            <MultiSelect
                                name="languages"
                                control={control}
                                options={languages}
                            />
                        } />
                        <TableRow label={<span className="whitespace-nowrap">Select skills <span className="text-red-500 text-base">*</span></span>} content={
                            <MultiSelect
                                name="skill"
                                control={control}
                                options={skills}
                            />
                        } />
                        <TableRow label="Social Link" content={
                            <Input
                                type="text"
                                name="social_links"
                                placeholder="Social link"
                                register={register}
                            />
                        } />
                        <TableRow label="Budget idea" content={
                            <Textarea
                                name="budget_idea"
                                placeholder="Budget idea"
                                register={register}
                            />
                        } />
                        <TableRow content={
                            <div class="flex items-center">
                                <input onChange={handleChangeCTC} id={`fulltime-checkbox`} type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                                <label for={`fulltime-checkbox`} class="ml-2 text-sm font-medium text-gray-900">Full Time</label>
                            </div>
                        } />
                        {isFullTime && <TableRow content={<span className='flex'>
                            <label class="mr-2 text-sm font-medium text-gray-900">CTC</label>
                            <Input
                                type="number"
                                name="ctc_per_annum"
                                placeholder="CTC per annum"
                                register={register}
                            />
                        </span>} />}
                    </tbody>
                </table>

                {errorMsg && <p className='bg-red-100 text-red-500 text-sm p-3'>{errorMsg}</p>}

                <div className='p-4'>
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </Container>
    )
}

export const DemoInfo = () => {
    const handleSubmit = () => { }
    const onSubmit = () => { }
    const register = () => { }
    return (
        <Container className="font-hero">
            <div className="border p-4 border-b-0">
                <h1 className="text-3xl font-semibold">Your Work Demo <RequiredMark /></h1>
                <small>You've to have at least one work demo to continue.</small>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <table className="w-full">
                    <tbody className="bg-white">
                        <TableRow
                            label="Work link"
                            content={<div className="flex items-center gap-4">
                                <Input
                                    type="text"
                                    name="work_link"
                                    placeholder="Your work link"
                                    register={register}
                                    className="flex-grow"
                                />
                                <div class="flex items-center">
                                    <input id={`isBestWrok-checkbox`} type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                                    <label for={`isBestWrok-checkbox`} class="ml-2 text-sm font-medium text-gray-900">Best Work</label>
                                </div>
                                <div class="flex items-center">
                                    <input id={`isDemo-checkbox`} type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                                    <label for={`isDemo-checkbox`} class="ml-2 text-sm font-medium text-gray-900">Customizable</label>
                                </div>
                            </div>
                            } />
                    </tbody>
                </table>

                {/* {errorMsg && <p className='bg-red-100 text-red-500 text-sm p-3'>{errorMsg}</p>} */}

                <div className='p-4'>
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </Container>
    )
}

const Textarea = ({ name, placeholder, defaultValue, required, register, validation, ...props }) => {
    return (
        <textarea
            {...register(name, { required, ...validation })}
            rows="5"
            className="w-full border p-1"
            placeholder={placeholder}
            defaultValue={defaultValue}
            {...props}
        ></textarea>
    );
};