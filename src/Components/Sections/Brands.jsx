import dettol from "../../assets/logos/brands/Dettol_Logo-modified.jpeg";
import dollar from "../../assets/logos/brands/dollar-modified.jpeg";
import amazon from "../../assets/logos/brands/logo amazon-modified.jpeg";
import ap from "../../assets/logos/brands/logo ap-modified.png";
import phil from "../../assets/logos/brands/logo phil-modified.jpeg";
import tmc from "../../assets/logos/brands/logo tmc-modified.jpeg";
import chargeup from "../../assets/logos/brands/Chargeup logo-modified.png";
import equal_experts from "../../assets/logos/brands/Equal Experts Logo-modified.png";
import exch from "../../assets/logos/brands/EXCH-SITE-BIG-1-modified.png";
import WorkDemo from "../../Pages/Artist/Components/View/WorkDemo";
import { Swiper, SwiperSlide } from "swiper/react";
import { RxCross1 } from "react-icons/rx";
import Modal from "../Modal/Modal";
import { useRef, useState } from "react";
import { Navigation, Pagination } from "swiper";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import thhs from "../../assets/logos/thhs.png"

const Brands = ({ setIsHovered }) => {
    // const [isPlay, setIsPlay] = useState(false);

    const swiperRef = useRef(null);
    const brandSwiperRef = useRef(null);

    const nextSlide = () => {
        console.log("click next", swiperRef.current);
        swiperRef.current?.swiper.slideNext();
    };
    const prevSlide = () => {
        console.log("click next", swiperRef.current);
        swiperRef.current?.swiper.slidePrev();
    };

    const brandNextSlide = () => {
        brandSwiperRef.current?.swiper.slideNext();
    };
    const brandPrevSlide = () => {
        brandSwiperRef.current?.swiper.slidePrev();
    };

    const brands = [
        {
            id: 1,
            img: dettol,
            url: "https://drive.google.com/file/d/1YFIeUZ09mqFKFMHBodKS1JYIylDDEv8-/view?usp=sharing"
        },
        {
            id: 2,
            img: dollar,
            url: "https://mojapp.in/thejunepaul06/video/2496599085?referrer=web"
        },
        {
            id: 3,
            img: amazon,
            url: "https://mojapp.in/arishfakhan138/video/2547569601?referrer=web"
        },
        {
            id: 4,
            img: ap,
            url: "https://mojapp.in/raam_choreographer/video/2871504030?referrer=web"
        },
        {
            id: 5,
            img: phil,
            url: "https://mojapp.in/himanshu_s01/video/2548816507?referrer=web"
        },
        {
            id: 6,
            img: tmc,
            url: "https://drive.google.com/file/d/132L7Ed6gjTmkcRPhXXKN2yOd4mI2sdsR/view?usp=sharing"
        },
        {
            id: 7,
            img: chargeup,
            url: "https://drive.google.com/file/d/1nyYg-98Td2m-LLeY8GNFc-DdnqZ8nMiI/view?usp=sharing"
        },
        {
            id: 8,
            img: equal_experts,
            url: "https://drive.google.com/file/d/1fu5XGQTtjdeJqoh5riZHF2OX1-_jLi7T/view?usp=sharing"
        },
        {
            id: 9,
            img: exch,
            url: "https://mojapp.in/mubarak_ms/video/3086823464?referrer=web"
        },
    ];

    const certificates = [
        "https://drive.google.com/file/d/1hkDugeQfpk1GPoZ9LAkcaEBk0Iz7On1U/view?usp=drive_link",
        "https://drive.google.com/file/d/1So4J1tLS81r9TOdzRA0xQGt0mjoHYDDX/view?usp=sharing",
        "https://drive.google.com/file/d/1BIFOA_b3qc4jXGntiANTi8M4RD4sUwKF/view?usp=sharing",
        "https://drive.google.com/file/d/19tc1AQ2n9i27PZC0UqvbhlHm-JFlCUYo/view?usp=sharing",
        "https://drive.google.com/file/d/1tJKgC_GVWRk1gyE6ku_lfnn9OtUl-0-9/view?usp=sharing",
        "https://drive.google.com/file/d/1oV_1sOPiJ03Xoy8jhbccNlPfCOgHIb4H/view?usp=sharing",
        "https://drive.google.com/file/d/1DxjAM64ql4DHoS6tjHqnkCVfvuDTFYDC/view?usp=sharing",
        "https://drive.google.com/file/d/10mEeroqwE_j9dbhPeVNvAhiVUU9Mm4mb/view?usp=sharing",
        "https://drive.google.com/file/d/1BLN_0v8SShG-iQN4R6fMfk3EETh9OQch/view?usp=sharing",
        "https://drive.google.com/file/d/1Rmacvo47K6qFurDDomRgdCsO8jeP5_fh/view?usp=sharing",
        "https://drive.google.com/file/d/1xYMX9SVf0eYEy1pp8eNiqbjoubNgda47/view?usp=sharing",
        "https://drive.google.com/file/d/1v9LqrvgtnRjTpu7LoVX4NAeFTWplsOpr/view?usp=sharing",
    ]

    return (
        <section className='fixed top-16 left-0 w-full bg-white shadow border p-5 pb-16 z-10 rounded-b-lg h-screen overflow-auto'>
            <RxCross1 onClick={() => setIsHovered(false)} className='absolute right-5 top-5 z-20 cursor-pointer' size={25} />

            <div className='w-full md:w-3/12 font-hero mb-8'>
                <h1 className='text-2xl font-semibold'>Client Projects</h1>
            </div>

            <Swiper
                ref={brandSwiperRef}
                className="select-none relative"
                spaceBetween={5}
                slidesPerView={6}
                breakpoints={{
                    // when window width is >= 320px
                    320: {
                        slidesPerView: 3,
                    },
                    // when window width is >= 480px
                    480: {
                        slidesPerView: 4,
                    },
                    // when window width is >= 640px
                    640: {
                        slidesPerView: 6,
                    }
                }}
            >
                {brands.map(brand => (
                    <SwiperSlide key={brand.id}>
                        <a target={brand.url && "_blank"} href={brand.url ? brand.url : "#"} className="block hover:scale-105 duration-150">
                            <img className="w-24 md:w-32 m-auto h-32 object-contain" src={brand.img} alt="" />
                        </a>
                    </SwiperSlide>
                ))}
                <div className='absolute top-1/2 -translate-y-1/2 z-10 left-0 flex justify-between w-full '>
                    <button onClick={brandPrevSlide} className="bg-blue-500 p-2 rounded-full text-white"><BiChevronLeft size={20} /></button>
                    <button onClick={brandNextSlide} className="bg-blue-500 p-2 rounded-full text-white"><BiChevronRight size={20} /></button>
                </div>
            </Swiper>

            <p className="text-center text-2xl mt-10">74 trees planted</p>

            <Swiper
                ref={swiperRef}
                slidesPerView={1}
                className="w-full lg:w-3/6 mt-5 relative"
                modules={[Pagination]}
                pagination={{ clickable: true }}
            >
                {certificates.map(certificate => (
                    <SwiperSlide>
                        <iframe className="w-full aspect-video border" src={certificate.replace("/view", "/preview")} allow="autoplay"></iframe>
                    </SwiperSlide>
                ))}
                <div className='absolute top-1/2 -translate-y-1/2 z-10 left-0 flex justify-between w-full '>
                    <button onClick={prevSlide} className="bg-gray-100 p-2 ml-2 rounded-full"><BiChevronLeft size={20} /></button>
                    <button onClick={nextSlide} className="bg-gray-100 p-2 mr-2 rounded-full"><BiChevronRight size={20} /></button>
                </div>
            </Swiper>

            <a target="_blank" href="https://thhs.in/invite"><img className="w-96 mx-auto my-20" src={thhs} alt="" /></a>

            {/* {isPlay && <Modal onClick={() => setIsPlay(false)}>
                <div className="bg-white p-5 w-full">
                    <WorkDemo demo_type="Google Drive" demo_link="https://drive.google.com/file/d/1YFIeUZ09mqFKFMHBodKS1JYIylDDEv8-/view?usp=sharing" />
                </div>
            </Modal>} */}

        </section>
    );
};

export default Brands;