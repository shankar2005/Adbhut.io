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
import Container from '../../Components/Container/Container';
import RequiredMark from '../../Components/Input/RequiredMark';

const EditArtist = () => {
    const { artistId } = useParams();
    const navigate = useNavigate();
    const { data: artistData } = useGetArtistByIdQuery(artistId, { skip: !artistId });
    const [updateArtist, { isSuccess, isError, error }] = useUpdateArtistMutation();
    const { skills: skillsData } = useRootContext();
    const { data: locations } = useGetLocationsQuery();
    const { data: languagesData } = useGetLanguagesQuery();
    const [file, setFile] = useState(null);
    const [isFullTime, setIsFullTime] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }
    const handleUploadImage = () => {
        const formData = new FormData();
        formData.append('profile_pic', file);
        updateArtist({
            id: artistId,
            data: formData
        });
    }

    const handleChangeCTC = (e) => {
        setIsFullTime(e.target.checked);
    }

    const { register, handleSubmit, formState: { errors }, control, reset } = useForm();
    const onSubmit = data => {
        const formData = {
            ...data,
            age: +data.age,
            phone: data.phone,
            professional_rating: data.professional_rating || 0,
            attitude_rating: data.attitude_rating || 0,
            has_manager: false,
            full_time: isFullTime
        }
        updateArtist({
            id: artistId,
            data: formData
        })
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success("Artist has been updated");
            setFile(null);
        }
    }, [isSuccess]);

    // structured the data in expected form of `react-select`
    const languages = languagesData?.map(language => {
        return { value: language.pk, label: language.name }
    });
    const skills = skillsData?.map(skill => {
        return { value: skill.pk, label: skill.name }
    });

    const [location, setLocation] = useState(null);
    const [budgetRange, setBudgetRange] = useState(null);

    useEffect(() => {
        setIsFullTime(artistData?.full_time);
        setLocation(artistData?.location?.label);
        setBudgetRange(artistData?.budget_range);
        reset();
    }, [reset, artistData])

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
            navigate("/artists");
            toast.success("Deleted!");
        }
    }

    // handle errors
    useEffect(() => {
        if (isError) {
            if (error?.data?.languages) {
                setErrorMsg("Please select at least one language");
            } else if (error?.data?.skill) {
                setErrorMsg("Please select at least one skill");
            } else {
                setErrorMsg(Object.values(error?.data)[0][0]);
            }
        } else {
            setErrorMsg(null);
        }
    }, [isError])

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
                                    defaultValue={artistData?.name}
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
                                    defaultValue={artistData?.age}
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
                                    defaultValue={artistData?.email}
                                />
                            } />
                        <TableRow
                            label={<>Phone <RequiredMark /></>}
                            content={
                                <Input
                                    type="tel"
                                    name="phone"
                                    placeholder="Artist phone number"
                                    register={register}
                                    required={true}
                                    defaultValue={artistData?.phone}
                                />}
                        />
                        <TableRow label={<span className="whitespace-nowrap">Profile Picture <RequiredMark /></span>} content={(
                            <>
                                <div className="flex items-center gap-2">
                                    <img className="w-10 h-10 object-contain mb-1 rounded-full border" src={artistData?.profile_pic} alt="" />
                                    <input
                                        type="file"
                                        name="profile_pic"
                                        className="border cursor-pointer"
                                        onChange={handleFileChange}
                                    />
                                    {file?.name && <button onClick={handleUploadImage} type='button' className='bg-gray-500 text-white py-1 px-2'>Upload</button>}
                                </div>
                                <a target="_blank" href={artistData?.profile_pic} className="text-blue-800">{artistData?.profile_pic?.slice(0, 50)}...</a>
                            </>
                        )} />
                        <TableRow label="Select location" content={
                            <Select
                                name="location"
                                register={register}
                                defaultOption="Choose a location"
                                options={locations}
                                defaultValue={location}
                            />
                        } />
                        <TableRow label={<>Select languages <RequiredMark /></>} content={
                            <MultiSelectUpdate
                                name="languages"
                                control={control}
                                options={languages}
                                defaultValue={artistData?.language}
                            />
                        } />
                        <TableRow label={<>Select skills <RequiredMark /></>} content={
                            <MultiSelectUpdate
                                name="skill"
                                control={control}
                                options={skills}
                                defaultValue={artistData?.skills}
                            />
                        } />
                        <TableRow label="Artist Intro" content={<>
                            <textarea
                                {...register("artist_intro", { required: false, maxLength: 150 })}
                                rows="5"
                                className="w-full border p-1"
                                placeholder="Artist Intro"
                                defaultValue={artistData?.artist_intro}
                            ></textarea>
                            {errors.artist_intro && errors.artist_intro.type === 'maxLength' && (
                                <p className='text-red-600'>Maximum character limit exceeded (150 characters).</p>
                            )}
                        </>} />
                    </tbody>
                </table>

                <WorkLinkTable artistId={artistData?.id} />

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
                        <TableRow content={
                            <div class="flex items-center">
                                <input onChange={handleChangeCTC} id={`fulltime-checkbox`} type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" checked={isFullTime} />
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
                                defaultValue={artistData?.ctc_per_annum}
                            />
                        </span>} />}
                    </tbody>
                </table>

                {errorMsg && <p className='bg-red-100 text-red-500 text-sm p-3'>{errorMsg}</p>}

                {showConfirm && <div className='p-4 pb-0'>
                    <p className='text-sm mb-1 font-semibold'>To confirm, type "<span className='font-bold text-red-600'>Delete</span>" in the box below</p>
                    <input ref={confirmInputRef} type="text" className="border-2 border-blue-500 outline-red-500 rounded pl-1 text-sm" />
                </div>}

                <div className='p-4 space-x-2'>
                    <Button type="submit">Update Artist</Button>
                    <Button onClick={handleDeleteArtist} type="button" variant="danger">Delete</Button>
                </div>
            </form>

        </Container>
    );
};

export default EditArtist;