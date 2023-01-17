import React from 'react';
import { toast } from 'react-hot-toast';
import { AiFillLinkedin, AiOutlineInstagram } from 'react-icons/ai';
import { FiArrowLeft, FiDelete } from 'react-icons/fi';
import { Link, useLoaderData } from 'react-router-dom';
import { useRootContext } from '../../contexts/RootProvider';
import useYoutubeEmbaded from '../../hooks/useYoutubeEmbaded';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const ArtistProfile = () => {
    const { handleShortlist } = useRootContext();

    const artistInfo = useLoaderData();
    const { artistID, name, email, profile_pic, phone, skills, social, languages } = artistInfo;
    console.log(artistInfo);
    return (
        <div className='bg-white rounded-lg p-10'>
            <div className='flex items-center gap-5 mb-7'>
                <Link to="/"><FiArrowLeft className='w-6 h-6 text-blue-500 cursor-pointer' /></Link>
                <button onClick={() => handleShortlist(artistID, name, profile_pic)} className='ml-auto text-blue-500 border-2 border-blue-500 hover:bg-sky-100 hover:border-sky-100 py-3 px-4 rounded-lg font-medium'>Shortlist</button>
            </div>
            <div>
                <img className='w-36 h-36 object-cover rounded-lg bg-white border' src={profile_pic} alt="" />
                {/* <div className='flex gap-1 text-gray-500'>
                    {social?.instagram && <a target="_blank" href={social.instagram}><AiOutlineInstagram className='w-8 h-8' /></a>}
                    {social?.facebook && <a target="_blank" href={social.facebook}><AiFillLinkedin className='w-8 h-8' /></a>}
                </div> */}
            </div>
            <div className='mt-5'>
                <div className='flex gap-1 items-center'>
                    <h4 className='text-lg font-medium'>{name}</h4>
                    <img className='w-5' src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/800px-Twitter_Verified_Badge.svg.png" alt="" />
                </div>
                {/* <p className='text-gray-500 text-sm'>
                    Vestibulum rutrum rutrum neque. Aenean auctor gravida sem quam pede lobortis ligula, sit amet eleifend.
                    Product Infrastructure
                </p> */}
                <div className='flex flex-wrap gap-2 text-sm font-medium mt-3'>
                    {
                        skills?.map((skill, idx) => <div key={`skills${idx}`} className='py-1 px-3 border text-gray-500 border-gray-500 rounded-full'>{skill}</div>)
                    }
                </div>
            </div>
            <div className='mt-10'>
                <Swiper
                    slidesPerView={1}
                    modules={[Navigation]}
                    navigation
                >
                    <SwiperSlide>
                        <div className='h-[400px]'>
                            {useYoutubeEmbaded("https://www.youtube.com/watch?v=YlikPdOlhkQ&ab_channel=NsNCo", "rounded-lg")}
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='h-[400px]'>
                            {useYoutubeEmbaded("https://www.youtube.com/watch?v=YlikPdOlhkQ&ab_channel=NsNCo", "rounded-lg")}
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='h-[400px]'>
                            {useYoutubeEmbaded("https://www.youtube.com/watch?v=YlikPdOlhkQ&ab_channel=NsNCo", "rounded-lg")}
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default ArtistProfile;