import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
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

const ArtistEntry = () => {
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
        <Container className='font-hero'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <table className="w-full">
                    <tbody className="bg-white">
                        <TableRow
                            label={<>Name <RequiredMark /></>}
                            content={
                                <Input
                                    type="text"
                                    name="name"
                                    placeholder="Artist name"
                                    register={register}
                                    required={true}
                                />
                            } />
                        <TableRow
                            label="Age"
                            content={
                                <Input
                                    type="number"
                                    name="age"
                                    placeholder="Artist age"
                                    register={register}
                                />
                            } />
                        <TableRow
                            label={<>Email <RequiredMark /></>}
                            content={
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Artist email"
                                    register={register}
                                    required={true}
                                />
                            } />
                        <TableRow
                            label={<>Phone <RequiredMark /></>}
                            content={<>
                                <select className="border">
                                    <option value="+91">+91</option>
                                </select>
                                <Input
                                    type="tel"
                                    name="phone"
                                    placeholder="Artist phone number"
                                    register={register}
                                    required={true}
                                />
                            </>} />
                        <TableRow label={<span className="whitespace-nowrap">Profile Picture <RequiredMark /></span>} content={
                            <input
                                type="file"
                                name="profile_pic"
                                className="border cursor-pointer"
                                onChange={handleFileChange}
                                required
                            />
                        } />
                        <TableRow label="Select location" content={
                            <Select
                                name="location"
                                register={register}
                                defaultOption="Choose a location"
                                options={locations}
                            />
                        } />
                        <TableRow label="Artist intro" content={<>
                            <Textarea
                                name="artist_intro"
                                placeholder="Artist intro"
                                register={register}
                                validation={{ maxLength: 150 }}
                            />
                            {errors.artist_intro && errors.artist_intro.type === 'maxLength' && (
                                <p className='text-red-600'>Maximum character limit exceeded (150 characters).</p>
                            )}
                        </>
                        } />
                        <TableRow label={<>Select languages <RequiredMark /></>} content={
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
                    <Button type="submit">Add Artist</Button>
                </div>
            </form>
        </Container>
    );
};

export default ArtistEntry;

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