import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRootContext } from '../../contexts/RootProvider';
import { useAddArtistMutation, useCreateWrokLinkMutation, useDeleteWrokLinkMutation, useGetArtistByIdQuery, useGetArtistWrokLinksQuery, useUpdateArtistMutation, useUpdateWrokLinkMutation } from '../../features/artist/artistApi';
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
import MultiSelectUpdate from '../../Components/Input/MultiSelectUpdate';
import { useRef } from 'react';
import Badge from '../../Components/Badge/Badge';
import { RxCross2 } from 'react-icons/rx';
import ActionLoader from '../../Components/Loader/ActionLoader';

const ArtistAccount = () => {
    const location = useLocation();
    const pathname = location?.pathname;
    return (
        <div className="bg-gray-50 py-5 min-h-screen">
            <ol className="font-hero font-semibold w-full md:w-9/12 mx-auto mb-5 flex items-center gap-5">
                <Link to="/artists/account">
                    <li className={`bg-white shadow border ${pathname === "/artists/account" ? "border-blue-400" : "border-green-400"} p-3 rounded-lg gap-x-24 flex justify-between items-center`}>
                        2. Account info {pathname === "/artists/account"
                            ? <HiOutlineArrowNarrowRight size={20} className="text-blue-600" />
                            : <FcCheckmark />
                        }
                    </li>
                </Link>
                <Link to="/artists/account/demo-info">
                    <li className="bg-white shadow border border-blue-400 p-3 rounded-lg gap-x-24 flex justify-between items-center">
                        3. Work Demo
                        <HiOutlineArrowNarrowRight size={20} className="text-blue-600" />
                    </li>
                </Link>
            </ol>
            <Outlet />
        </div>
    );
};

export default ArtistAccount;

export const PersonalInfo = () => {
    const artistId = useSelector(state => state.auth?.user?.id);
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

    useEffect(() => {
        setIsFullTime(artistData?.full_time);
        setLocation(artistData?.location?.label);
        reset();
    }, [reset, artistData])

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
                                    // register={register}
                                    // required={true}
                                    defaultValue={artistData?.email}
                                    disabled
                                    className="bg-gray-50 border-none text-gray-400"
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
                                    // required={!artistData?.profile_pic}
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
                        <TableRow label="Intro" content={<>
                            <textarea
                                {...register("artist_intro", { required: false, maxLength: 150 })}
                                rows="5"
                                className="w-full border p-1"
                                placeholder="Intro"
                                defaultValue={artistData?.artist_intro}
                            ></textarea>
                            {errors.artist_intro && errors.artist_intro.type === 'maxLength' && (
                                <p className='text-red-600'>Maximum character limit exceeded (150 characters).</p>
                            )}
                        </>} />
                    </tbody>
                </table>

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
                        <TableRow label="Budget idea" content={
                            <Textarea
                                name="budget_idea"
                                placeholder="Budget idea"
                                defaultValue={artistData?.budget_idea}
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

                <div className='p-4 space-x-2'>
                    <Button type="submit">Update Artist</Button>
                    <Link to="/artists/account/demo-info"><Button type="button" variant="secondary">Next</Button></Link>
                </div>
            </form>

        </Container>
    )
}

export const DemoInfo = () => {
    const artistId = useSelector(state => state.auth?.user?.id);
    const { data } = useGetArtistWrokLinksQuery(artistId, { skip: !artistId });
    const works_links = data?.works_links;
    const [editingId, setEditingId] = useState(null);
    const editingLink = works_links?.find(l => l.pk === editingId);
    const linkRef = useRef();
    const [isBestWork, setIsBestWork] = useState();
    const [isDemo, setIsDemo] = useState();
    const [updateWorkLink] = useUpdateWrokLinkMutation();
    const [deleteWorkLink, { isLoading: deleteLoading }] = useDeleteWrokLinkMutation();

    const handleRowClick = (id) => {
        setEditingId(id);
    };

    const handleCloseInput = () => {
        setEditingId(null);
    };

    useEffect(() => {
        if (editingId) {
            setIsBestWork(editingLink?.show_in_top_feed);
            setIsDemo(editingLink?.is_demo);
        }
    }, [editingId, editingLink?.tags])

    const handleSave = () => {
        updateWorkLink({
            id: editingId,
            data: {
                weblink: linkRef.current?.value,
                show_in_top_feed: isBestWork,
                is_demo: isDemo
            }
        }).then(data => {
            if (data?.data?.id) {
                setEditingId(null);
            }
        })
    }

    return (
        <Container className="font-hero">
            <div className="border p-4 border-b-0">
                <h1 className="text-3xl font-semibold">Your Work Demo <RequiredMark /></h1>
                <small>You've to have at least one work demo to continue.</small>
            </div>

            <table className="w-full">
                <thead>
                    <tr className="text-md text-left text-gray-900 bg-gray-100 text-sm">
                        <th className="p-2 border font-semibold">Link</th>
                        <th className="p-2 border font-semibold">Status</th>
                        <th className="p-2 border font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {works_links?.map(link => (
                        <tr key={link.pk}>
                            <td className="p-2 text-sm border border-b-0">
                                {editingId === link.pk ? (
                                    <input
                                        type="text"
                                        className="w-full border rounded pl-1"
                                        defaultValue={link.weblink}
                                        ref={linkRef}
                                    />
                                ) : (
                                    <a target="_blank" href={link.weblink} className="text-blue-700 hover:underline">{link.weblink}</a>
                                )}
                            </td>
                            <td className="p-2 text-sm border border-b-0 space-y-1">
                                {editingId === link.pk ? (
                                    <>
                                        <div class="flex items-center">
                                            <input onChange={() => setIsBestWork(prev => !prev)} id={`best-work-checkbox-edit-${link.pk}`} type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" checked={isBestWork} />
                                            <label for={`best-work-checkbox-edit-${link.pk}`} class="ml-2 text-sm font-medium text-gray-900">Best Work</label>
                                        </div>
                                        <div class="flex items-center">
                                            <input onChange={() => setIsDemo(prev => !prev)} id="demo-checkbox-edit" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" checked={isDemo} />
                                            <label for="demo-checkbox-edit" class="ml-2 text-sm font-medium text-gray-900">Customizable</label>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div class="flex items-center">
                                            <input type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" checked={link.show_in_top_feed} disabled />
                                            <label class="ml-2 text-sm font-medium text-gray-900">Best Work</label>
                                        </div>
                                        <div class="flex items-center">
                                            <input type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" checked={link.is_demo} disabled />
                                            <label class="ml-2 text-sm font-medium text-gray-900">Customizable</label>
                                        </div>
                                    </>
                                )}
                            </td>
                            <td className="p-2 text-sm border border-b-0">
                                {editingId === link.pk ? (
                                    <div className="flex gap-1">
                                        <Badge onClick={handleSave} className="cursor-pointer" type="success">Save</Badge>
                                        {deleteLoading ? <ActionLoader size="sm" /> : <Badge onClick={() => deleteWorkLink(link.pk)} className="cursor-pointer" type="error">Del</Badge>}
                                        <RxCross2 onClick={handleCloseInput} size={25} className="text-gray-700 cursor-pointer" />
                                    </div>
                                ) : (
                                    <Badge className="cursor-pointer" type="error" onClick={() => handleRowClick(link.pk)}>Edit</Badge>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Entry */}
            <WorkLinkEntry />

        </Container>
    )
}

const WorkLinkEntry = () => {
    const [createWrokLink, { isSuccess }] = useCreateWrokLinkMutation();
    const artistId = useSelector(state => state.auth?.user?.id);

    const { register, handleSubmit, reset } = useForm();
    const onSubmit = (data) => {
        createWrokLink({
            id: artistId,
            data
        })
    }

    useEffect(() => {
        if (isSuccess) reset();
    }, [isSuccess]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <table className="w-full">
                <tbody className="bg-white">
                    <TableRow
                        label="Work link"
                        content={<div className="flex items-center gap-4">
                            <Input
                                type="url"
                                name="weblink"
                                placeholder="Your work link"
                                register={register}
                                className="flex-grow"
                                required
                            />
                            <div class="flex items-center">
                                <input {...register("show_in_top_feed")} id={`isBestWrok-checkbox`} type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                                <label for={`isBestWrok-checkbox`} class="ml-2 text-sm font-medium text-gray-900">Best Work</label>
                            </div>
                            <div class="flex items-center">
                                <input {...register("is_demo")} id={`isDemo-checkbox`} type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                                <label for={`isDemo-checkbox`} class="ml-2 text-sm font-medium text-gray-900">Customizable</label>
                            </div>
                            <Button size="sm" type="submit">Add</Button>
                        </div>
                        } />
                </tbody>
            </table>

            <div className='p-4 space-x-1'>
                <Link to="/projects/readydemos"><Button type="button" variant="secondary">Proceed</Button></Link>
            </div>
        </form>
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