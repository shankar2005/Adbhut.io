import React, { useState } from 'react';
import fb from '../../assets/ui/facebook (1).png';
import gmail from '../../assets/ui/gmail.png';
import instagram from '../../assets/ui/instagram.png';
import linkedin from '../../assets/ui/linkedin.png';

const Hero = () => {
    const [modal, setModal] = useState(false);
    return (
        <section className='max-w-screen-xl mx-auto px-10 xl:px-0 min-h-[650px] md:min-h-[600px] flex items-center pt-10'>
            <div>
                <h1 className='text-6xl mb-5 font-hero'>
                    The Happy Hippies Show
                </h1>
                <p className='w-1/2 font-thin text-white text-opacity-80'>
                    We invite you to join us and take part in this moment for change. Driven by our GenZs, The Happy Hippies Show is a web series of discussions by the leaders, on these social themes.
                </p>
                <div className='flex gap-3 mt-5 text-purple-900 text-sm flex-wrap'>
                    <button className='bg-white duration-100 font-bold hover:shadow-lg hover:shadow-purple-500/100 px-3 py-2 rounded hover:bg-inherit border-4 border-white hover:text-white'>Play Invite</button>
                    <a target="_blank" href="https://nsnco.in/">
                        <button className='bg-white duration-100 font-bold hover:shadow-lg hover:shadow-purple-500/100 px-3 py-2 rounded hover:bg-inherit border-4 border-white hover:text-white'>Visit NsN Co</button>
                    </a>
                    <button onClick={() => setModal(!modal)} className='bg-white duration-100 font-bold hover:shadow-lg hover:shadow-purple-500/100 px-3 py-2 rounded hover:bg-inherit border-4 border-white hover:text-white'>Invite Friends</button>
                    <a target="_blank" href="https://www.linkedin.com/company/the-happy-hippies-show/jobs/">
                        <button className='bg-white duration-100 font-bold hover:shadow-lg hover:shadow-purple-500/100 px-3 py-2 rounded hover:bg-inherit border-4 border-white hover:text-white'>We Are Hiring</button>
                    </a>
                </div>
            </div>
            <div className={`${modal ? 'fixed' : 'hidden'} z-50 top-0 left-0 bg-black bg-opacity-70 w-full h-screen  flex items-center justify-center`}>
                <div className='bg-white w-fit rounded-lg text-black p-5 relative'>
                    <h3>Invite friends</h3>
                    <ul className='flex gap-6 py-5 px-20'>
                        <a target="_blank" href='https://www.facebook.com/happy.hippie.969/'><li className='duration-100'><img className='w-8' src={fb} alt="" /></li></a>
                        <a target="_blank" href='mailto:happyhippie@thhs.in'><li className='duration-100'><img className='w-8' src={gmail} alt="" /></li></a>
                        <a target="_blank" href='https://www.instagram.com/thehappyhippiesshow/?hl=en'><li className='duration-100'><img className='w-8' src={instagram} alt="" /></li></a>
                        <a target="_blank" href='https://www.linkedin.com/company/the-happy-hippies-show'><li className='duration-100'><img className='w-8' src={linkedin} alt="" /></li></a>
                    </ul>
                    <input className='w-full p-2 border border-black rounded' type="text" defaultValue="https://nsnco.netlify.app" />
                    <p onClick={() => setModal(false)} className='absolute top-0 right-0 m-3 mr-4 cursor-pointer font-bold'>✕</p>
                </div>
            </div>
        </section>
    );
};

export default Hero;