import { FiArrowLeft } from 'react-icons/fi';
import { IoLanguageSharp, IoLocationSharp } from 'react-icons/io5';
import { useRootContext } from '../../contexts/RootProvider';
import useYoutubeEmbaded from '../../hooks/useYoutubeEmbaded';
import { GiCheckMark } from 'react-icons/gi';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { useGetArtistByIdQuery } from '../../features/artist/artistApi';
import { useSelector } from 'react-redux';
import { BsBoxArrowUpRight } from 'react-icons/bs';

const ArtistProfile = () => {
    const { shortlistedArtists } = useSelector(state => state.project);

    const { handleShortlist, artistProfile, setArtistProfile, avatar } = useRootContext();
    const { data } = useGetArtistByIdQuery(artistProfile);
    const { artistID, name, profile_pic, skills, languages, workLinks, location_name } = data || {};

    return (
        <div className='bg-white rounded-l-md p-5 shadow-xl h-full'>
            <div className='flex items-start'>
                <div className="flex gap-3 items-center">
                    <button onClick={() => setArtistProfile(null)} type='button'>
                        <FiArrowLeft className='w-6 h-6 text-blue-500 cursor-pointer ml-2' />
                    </button>
                    <img className='w-14 h-14 rounded-full' src={avatar} alt="" />
                    <div>
                        <h4 className='font-medium text-lg'>{name}</h4>
                        <div className='text-sm text-gray-600'>
                            {location_name && <p className='flex items-center gap-1'><IoLocationSharp /> {location_name}</p>}
                            {languages && <p className='flex items-center gap-2'><IoLanguageSharp /> {languages.join(", ")}</p>}
                        </div>
                        <div className='flex flex-wrap gap-1 text-xs font-medium mt-1'>
                            {
                                skills?.map((skill, idx) => <div key={`skills${idx}`} className='px-1 border text-gray-500 border-gray-500 rounded-full'>{skill}</div>)
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
            <div className='artistProfile mt-5'>
                <Swiper
                    slidesPerView={1}
                    modules={[Navigation]}
                    navigation
                >
                    {
                        workLinks?.map(link => <SwiperSlide>
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
                                        <img className="mx-auto w-56" src="https://icon-library.com/images/google-folder-icon/google-folder-icon-20.jpg" alt="" />
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