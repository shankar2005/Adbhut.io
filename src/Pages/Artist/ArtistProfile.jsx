import { FiArrowLeft } from 'react-icons/fi';
import { IoLanguageSharp, IoLocationSharp } from 'react-icons/io5';
import { useRootContext } from '../../contexts/RootProvider';
import useYoutubeEmbaded from '../../hooks/useYoutubeEmbaded';
import { GiCheckMark } from 'react-icons/gi';
import gdrive from "../../assets/placeholders/gdrive-folder.jpg";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { useGetArtistByIdQuery } from '../../features/artist/artistApi';
import { useSelector } from 'react-redux';
import { BsBoxArrowUpRight, BsStar, BsStarFill } from 'react-icons/bs';
import { HiPhone } from 'react-icons/hi';
import { FaRegEnvelope } from 'react-icons/fa';

const ArtistProfile = () => {
    const { shortlistedArtists } = useSelector(state => state.project);

    const { handleShortlist, artistProfile, setArtistProfile, avatar } = useRootContext();
    const { data } = useGetArtistByIdQuery(artistProfile);
    const {
        works_links,
        skill: skills,
        social,
        manager,
        artistID,
        genre,
        languages,
        location,
        social_profile,
        name,
        artist_intro,
        profile_pic,
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

    return (
        <div className='bg-white rounded-l-md p-5 shadow-xl h-full'>
            <div className='flex items-start'>
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
                        <div className='text-sm text-gray-600'>
                            {location && <p className='flex items-center gap-1'><IoLocationSharp /> {location}</p>}
                            {languages && <p className='flex items-center gap-2'><IoLanguageSharp /> {languages.join(", ")}</p>}
                        </div>
                        <div className='flex flex-wrap gap-1 text-xs font-medium mt-1'>
                            {
                                skills?.map((item, idx) => <div key={`skills${idx}`} className='px-1 border text-gray-500 border-gray-500 rounded-full'>{item}</div>)
                            }
                        </div>
                    </div>
                </div>
                {
                    shortlistedArtists?.includes(artistID)
                        ? <button className='ml-auto text-green-600 border-2 bg-sky-100 border-sky-100 py-2.5 px-4 rounded-lg font-medium'><GiCheckMark /></button>
                        : <button onClick={() => handleShortlist(artistID, name, profile_pic)} className='ml-auto text-blue-500 border-2 hover:border-blue-500 bg-sky-100 border-sky-100 py-3 px-4 rounded-lg font-medium z-10'>Shortlist</button>
                }
            </div>


            <div className='mt-5'>
                {artist_intro && <div className='w-fit my-1 px-0.5 text-sm font-normal font-sans italic text-gray-700 bg-yellow-100'>&#9679; {artist_intro}</div>}
                {
                    genre?.length > 0 &&
                    <div className='flex flex-wrap items-center gap-1 mt-1'>
                        <strong>Genre:</strong>
                        {genre?.map((item, idx) => <div key={`genre${idx}`} className='text-xs font-medium px-1 border text-gray-500 border-gray-500 rounded-full'>{item}</div>)}
                    </div>
                }
                {
                    professional_rating &&
                    <div className='flex items-center gap-1'>
                        <strong>Professional Rating - </strong>
                        <p>({professional_rating})</p>
                        <BsStarFill className='text-yellow-400' />
                    </div>
                }
                {
                    attitude_rating &&
                    <div className='flex items-center gap-1'>
                        <strong>Attitude Rating - </strong>
                        <p>({attitude_rating})</p>
                        <BsStarFill className='text-yellow-400' />
                    </div>
                }
                <div>
                    {budget_range && <p><strong>Budget Range: </strong>{budget_range}</p>}
                    {budget_idea && <p><strong>Budget Idea: </strong>{budget_idea}</p>}
                    {am_notes && <p><strong>Artist Manager Notes: </strong>{am_notes}</p>}
                    {pm_notes && <p><strong>Production Manager Notes: </strong>{pm_notes}</p>}
                    {ctc_per_annum && <p><strong>Production Manager Notes: </strong>{ctc_per_annum}</p>}
                </div>

                <div className='mt-4 border-t pt-4'>
                    <h3 className='text-xl text-gray-600 mb-4'>Contact Info</h3>
                    <div>
                        {email && <p className='flex items-center gap-2'><FaRegEnvelope />{email}</p>}
                        {phone && <p className='flex items-center gap-2'><HiPhone />{phone}</p>}
                    </div>
                </div>
            </div>

            <div className='artistProfile mt-5'>
                <Swiper
                    slidesPerView={1}
                    modules={[Navigation]}
                    navigation
                >
                    {
                        works_links?.map(link => <SwiperSlide>
                            {
                                link[1] === "Youtube Link"
                                && <div className='aspect-video'>
                                    {useYoutubeEmbaded(link[0], 'rounded-lg')}
                                </div>
                            }
                            {
                                link[1] === "Instagram Link"
                                && <div className='border rounded-lg bg-gray-200 overflow-hidden'>
                                    <iframe src={link[0]} className="mx-auto border-l border-r -mt-14" height="430" frameBorder="0" scrolling="no" allowtransparency="true"></iframe>
                                </div>
                            }
                            {
                                link[1] === "Soundcloud Link"
                                && <div className='border rounded-lg'>
                                    <iframe width="100%" height="166" scrolling="no" frameBorder="no" src={`https://w.soundcloud.com/player/?url=${link[0]};auto_play=false&amp;show_artwork=true`}></iframe>
                                </div>
                            }
                            {
                                link[1] === "Image"
                                && <div className='bg-black'>
                                    <img className='w-1/2 mx-auto bg-white' src={link[0]} alt="" />
                                </div>
                            }
                            {
                                link[1] === "Video"
                                && <div className='border rounded-lg'>
                                    <video controls autoPlay width="300" className='mx-auto'>
                                        <source src={link[0]} type="video/mp4" />
                                    </video>
                                </div>
                            }
                            {
                                link[1] === "Other Document" && link[0]?.includes("drive.google")
                                    ? <a href={link[0]} className='hover:underline block bg-gray-100 py-10 rounded-lg' target="_blank">
                                        <img className="mx-auto w-56" src={gdrive} alt="" />
                                        <p className='font-medium text-blue-700 flex justify-center gap-2'>Open in drive <BsBoxArrowUpRight /></p>
                                    </a>
                                    : <embed src={link[0]} className="w-full" height="500" />
                            }
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </div >
    );
};

export default ArtistProfile;