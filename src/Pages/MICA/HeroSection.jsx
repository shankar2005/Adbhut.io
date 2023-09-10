import { Link } from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import ott from "../../assets/ott.png"
import advertisement from "../../assets/social-media-advertising.png"
import film from "../../assets/film.png"

const HeroSection = () => {
    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper w-10/12 mx-auto"
        >
            <SwiperSlide>
                <div className="aspect-[16/9] py-28 px-20 grid grid-cols-2 justify-between items-center bg-gray-100 rounded-xl">
                    <h1 className='text-7xl leading-[0.9] font-bold text-hero'>
                        12 TV/OTT show worthy synopsis scripts
                    </h1>
                    <div className="ml-auto">
                        <img src={ott} alt="" />
                    </div>
                    {/* <p className='text-xl'>Earn via brand integrations in your content</p> */}
                    {/* <Link to="/artist/dashboard" className="block w-fit">
                        <button type="button" class="bg-sky-500 py-3 px-5 rounded-full text-sm text-white">
                            Get Started
                        </button>
                    </Link> */}
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="aspect-[16/9] py-28 px-20 grid grid-cols-2 justify-between items-center bg-gray-100 rounded-xl">
                    <h1 className='text-7xl leading-[0.9] font-bold text-hero'>
                        12+ advertising short content showcases
                    </h1>
                    <div className="ml-auto">
                        <img src={advertisement} alt="" />
                    </div>
                    {/* <p className='text-xl'>Earn via brand integrations in your content</p> */}
                    {/* <Link to="/artist/dashboard" className="block w-fit">
                        <button type="button" class="bg-sky-500 py-3 px-5 rounded-full text-sm text-white">
                            Get Started
                        </button>
                    </Link> */}
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="aspect-[16/9] py-28 px-20 grid grid-cols-2 justify-between items-center bg-gray-100 rounded-xl">
                    <h1 className='text-7xl leading-[0.9] font-bold text-hero'>
                        12+ OTT worthy feature/short films synopsis
                    </h1>
                    <div className="ml-auto">
                        <img src={film} alt="" />
                    </div>
                    {/* <p className='text-xl'>Earn via brand integrations in your content</p> */}
                    {/* <Link to="/artist/dashboard" className="block w-fit">
                        <button type="button" class="bg-sky-500 py-3 px-5 rounded-full text-sm text-white">
                            Get Started
                        </button>
                    </Link> */}
                </div>
            </SwiperSlide>
        </Swiper>
    );
};

export default HeroSection;