import React from 'react';
import { FaRegEnvelope } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';
import { HiPhone } from 'react-icons/hi';
import { IoLanguageSharp, IoLocationSharp } from 'react-icons/io5';
import { Link, useLoaderData } from 'react-router-dom';
import { useRootContext } from '../../contexts/RootProvider';
import useYoutubeEmbaded from '../../hooks/useYoutubeEmbaded';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

const ArtistProfile = () => {
    const { handleShortlist } = useRootContext();

    const artistInfo = useLoaderData();
    const { artistID, name, email, profile_pic, phone, skills, social, languages, workLinks, location } = artistInfo;
    return (
        <div className='bg-white rounded-lg p-10'>
            <div className='mb-40 relative'>
                <div className='absolute -bottom-16 px-3 z-10 flex items-center justify-between w-full'>
                    <Link className='' to="/"><FiArrowLeft className='w-6 h-6 text-blue-500 cursor-pointer' /></Link>
                    <button onClick={() => handleShortlist(artistID, name, profile_pic)} className='ml-auto text-blue-500 border-2 hover:border-blue-500 bg-sky-100 border-sky-100 py-3 px-4 rounded-lg font-medium z-10'>Shortlist</button>
                </div>
                <img className='absolute top-0 left-0 h-40 w-full rounded-lg' src="https://worgs.net/wp-content/uploads/2014/08/picture-bg.gif" alt="" />
                <div className='absolute top-20 left-10'>
                    <img className='w-36 h-36 object-cover rounded-lg bg-white border' src={profile_pic} alt="" />
                </div>
            </div>
            <div className='ml-10 pt-20'>
                <div className='flex gap-1 items-center'>
                    <h4 className='text-lg font-medium'>{name}</h4>
                    <img className='w-5' src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/800px-Twitter_Verified_Badge.svg.png" alt="" />
                </div>
                {email && <p className='flex items-center gap-2'><FaRegEnvelope />{email}</p>}
                {phone && <p className='flex items-center gap-2'><HiPhone />{phone}</p>}
                {
                    languages &&
                    <p className='flex items-center gap-2'><IoLanguageSharp /> {languages.join(", ")}</p>
                }
                <p className='flex items-center gap-2'><IoLocationSharp /> {location}</p>
                <p className='text-gray-500 text-sm'>
                    Vestibulum rutrum rutrum neque. Aenean auctor gravida sem quam pede lobortis ligula, sit amet eleifend.
                    Product Infrastructure
                </p>
                <div className='flex flex-wrap gap-2 text-sm font-medium mt-3'>
                    {
                        skills?.map((skill, idx) => <div key={`skills${idx}`} className='py-1 px-3 border text-gray-500 border-gray-500 rounded-full'>{skill}</div>)
                    }
                </div>
            </div>
            <div className='artistProfile mt-10'>
                <Swiper
                    slidesPerView={1}
                    modules={[Navigation]}
                    navigation
                >
                    {
                        workLinks.map(link => <SwiperSlide>
                            {
                                link[1] === "Youtube Link"
                                && <div className='h-[400px]'>
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
                                link[1] === "Other Document"
                                && <embed src={link[0]} className="w-full" height="500" />
                            }
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default ArtistProfile;