import { FiArrowLeft } from 'react-icons/fi';
import { IoLanguageSharp, IoLocationSharp } from 'react-icons/io5';
import { useRootContext } from '../../contexts/RootProvider';
import { GiCheckMark } from 'react-icons/gi';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { useGetArtistByIdQuery } from '../../features/artist/artistApi';
import { useSelector } from 'react-redux';
import { BsStarFill } from 'react-icons/bs';
import { HiPhone } from 'react-icons/hi';
import { FaRegEnvelope } from 'react-icons/fa';
import { TbEdit } from 'react-icons/tb';
import WorkDemo from './Components/View/WorkDemo';
import Spinner from '../../Components/Loader/Spinner';
import WorkLinkTable from './Components/WorkLinkTable';

const ArtistProfile = () => {
    const { shortlistedArtists } = useSelector(state => state.project);
    const { user } = useSelector(state => state.auth);

    const { handleShortlist, artistProfile, setArtistProfile, avatar } = useRootContext();
    const { data, isLoading } = useGetArtistByIdQuery(artistProfile);
    const {
        works_links,
        skills,
        social,
        manager,
        id,
        genre,
        language: languages,
        location,
        social_profile,
        name,
        artist_intro,
        profile_image,
        age,
        email,
        phone,
        relocation,
        full_time,
        part_time,
        other_arts,
        best_link,
        social_links,
        has_manager,
        min_budget,
        max_budget,
        ctc_per_annum,
        budget_range,
        budget_idea,
        am_notes,
        pm_notes,
        professional_rating,
        attitude_rating,
        has_agreement,
        agreement,
    } = data || {};

    if (isLoading) {
        return (
            <div className='h-screen bg-white flex items-center justify-center'>
                <Spinner />
            </div>
        )
    }

    return (
        <div className='bg-white rounded-l-md p-5 shadow-xl h-screen overflow-y-scroll'>
            <div className='flex items-start mb-5'>
                <div className="flex gap-3 items-center">
                    <button onClick={() => setArtistProfile(null)} type='button'>
                        <FiArrowLeft className='w-6 h-6 text-blue-500 cursor-pointer ml-2' />
                    </button>
                    <img className='w-14 h-14 object-cover rounded-full' src={profile_image || avatar} alt="" />
                    <div>
                        <div className='flex items-center gap-1'>
                            <h4 className='font-medium text-lg'>{name}</h4>
                            ({attitude_rating})
                            <BsStarFill className='text-yellow-400' />
                        </div>
                        {artist_intro && <p className='w-fit mb-2 px-0.5 text-xs font-sans text-gray-700'>{artist_intro}</p>}
                    </div>
                </div>
                {
                    shortlistedArtists?.includes(id)
                        ? <button className='ml-auto bg-blue-500 py-2.5 px-4 text-white rounded text-sm font-hero' disabled><GiCheckMark /></button>
                        : <button onClick={() => handleShortlist(id)} className='ml-auto bg-blue-500 py-1.5 px-4 text-white rounded text-sm font-hero'>Shortlist</button>
                }
            </div>

            <div className="grid grid-cols-12 gap-4 items-start">
                <div className='col-span-8 space-y-4'>
                    <div className='bg-gray-50 p-3 border border-gray-100'>
                        <table className="w-full text-sm font-hero">
                            <tbody>
                                {location?.label && <tr>
                                    <td className="p-2 w-3/6">Location</td>
                                    <td className="p-2">{location.label}</td>
                                </tr>}
                                {languages?.length > 0 && <tr>
                                    <td className="p-2">Language</td>
                                    <td className="p-2">{languages?.map(lang => lang.label)}</td>
                                </tr>}
                                <tr>
                                    <td className="p-2">Professional Rating</td>
                                    <td className="p-2">
                                        <div className='flex items-center gap-1'>
                                            <p>({professional_rating})</p>
                                            <BsStarFill className='text-yellow-400' />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-2">Attitude Rating</td>
                                    <td className="p-2">
                                        <div className='flex items-center gap-1'>
                                            <p>({attitude_rating})</p>
                                            <BsStarFill className='text-yellow-400' />
                                        </div>
                                    </td>
                                </tr>

                                {user?.role === "PM" || user?.role === "AM" &&
                                    <>
                                        {budget_range && <tr>
                                            <td className="p-2">Budget Range</td>
                                            <td className="p-2">{budget_range}</td>
                                        </tr>}
                                        {budget_idea && <tr>
                                            <td className="p-2">Budget Idea</td>
                                            <td className="p-2">{budget_idea}</td>
                                        </tr>}
                                        {am_notes && <tr>
                                            <td className="p-2">Artist Manager Note</td>
                                            <td className="p-2">{am_notes}</td>
                                        </tr>}
                                        {pm_notes && <tr>
                                            <td className="p-2">Production Manager Note</td>
                                            <td className="p-2">{pm_notes}</td>
                                        </tr>}
                                        {ctc_per_annum && <tr>
                                            <td className="p-2">CTC Per Annum</td>
                                            <td className="p-2">{ctc_per_annum}</td>
                                        </tr>}
                                    </>
                                }
                            </tbody>
                        </table>
                    </div>

                    {user?.role === "PM" || user?.role === "AM" &&
                        <div className='bg-gray-50 border border-gray-100'>
                            <table className="w-full text-sm font-hero">
                                <tbody>
                                    {email && <tr>
                                        <td className="p-2 w-3/6">Email</td>
                                        <td className="p-2">{email}</td>
                                    </tr>}
                                    {phone && <tr>
                                        <td className="p-2">Phone No.</td>
                                        <td className="p-2">{phone}</td>
                                    </tr>}
                                </tbody>
                            </table>
                        </div>}
                </div>

                <div className="col-span-4 space-y-4">
                    {skills?.length > 0 &&
                        <div className="p-5 bg-gray-50 border border-gray-100">
                            <p className="font-medium text-sm mb-3">Skills</p>
                            <div className='flex flex-wrap gap-2 text-xs font-medium mt-1'>
                                {
                                    skills?.map(skill => <div key={skill.value} className='px-2 py-1.5 border text-gray-500 border-gray-500 rounded-lg'>{skill.label}</div>)
                                }
                            </div>
                        </div>}
                    {genre?.length > 0 &&
                        <div className="p-5 bg-gray-50 border border-gray-100">
                            <p className="font-medium text-sm mb-3">Genre</p>
                            <div className='flex flex-wrap gap-2 text-xs font-medium mt-1'>
                                {
                                    genre?.map(genre => <div key={genre.value} className='px-2 py-1.5 border text-gray-500 border-gray-500 rounded-lg'>{genre.label}</div>)
                                }
                            </div>
                        </div>}
                </div>
            </div>

            <WorkLinkTable works_links={works_links} />

            <div className='artistProfile mt-5'>
                <Swiper
                    slidesPerView={1}
                    modules={[Navigation]}
                    navigation
                >
                    {
                        works_links?.map(link => <SwiperSlide>
                            <WorkDemo demo_type={link.demo_type} demo_link={link.weblink} />
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </div >
    );
};

export default ArtistProfile;