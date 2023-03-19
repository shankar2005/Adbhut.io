import React, { useState } from 'react';
import reading from '../../assets/icon/reading.png';
import commerce from '../../assets/icon/commerce.png';
import employment from '../../assets/icon/employment.png';
import energy from '../../assets/icon/energy.png';
import gender from '../../assets/icon/gender.png';
import skill from '../../assets/icon/skill.png';
import tree from '../../assets/icon/tree.png';
import PlayInviteModal from './Components/PlayInviteModal';
import adbhutGIF from '../../assets/logos/adbhutGIF.gif';

const Hero = () => {
    const [playInviteModal, setPlayInviteModal] = useState(false);

    return (
        <section className='w-11/12 max-w-screen-xl mx-auto px-10 xl:px-0 min-h-[800px] sm:min-h-[700px] md:min-h-[600px] flex items-center pt-10 relative'>
            <div>
                <p className='w-full lg:w-7/12 text-lg md:text-xl xl:text-2xl mt-16'>
                    We invite you to join us and take part in this moment for change. Driven by our GenZs, The Happy Hippies Show is a web series of discussions by the leaders, on these social themes.
                </p>
                <div className='w-full lg:w-1/2 grid grid-cols-3 sm:grid-cols-4 gap-px py-3 rounded-lg'>
                    <div className='text-center flex flex-col items-center justify-center h-[100px] bg-purple-700 bg-opacity-40 px-2 gap-1'>
                        <div>
                            <img className='w-8 mx-auto' src={reading} alt="" />
                        </div>
                        <p className='opacity-75 text-sm'>Child Education</p>
                    </div>
                    <div className='text-center flex flex-col items-center justify-center h-[100px] bg-purple-700 bg-opacity-40 px-2 gap-1'>
                        <div>
                            <img className='w-8 mx-auto' src={commerce} alt="" />
                        </div>
                        <p className='opacity-75 text-sm'>Cause Driven Consumerism</p>
                    </div>
                    <div className='text-center flex flex-col items-center justify-center h-[100px] bg-purple-700 bg-opacity-40 px-2 gap-1'>
                        <div>
                            <img className='w-8 mx-auto' src={employment} alt="" />
                        </div>
                        <p className='opacity-75 text-sm'>Employement Generation</p>
                    </div>
                    <div className='text-center flex flex-col items-center justify-center h-[100px] bg-purple-700 bg-opacity-40 px-2 gap-1'>
                        <div>
                            <img className='w-8 mx-auto' src={energy} alt="" />
                        </div>
                        <p className='opacity-75 text-sm'>Renewable Energy Adoption</p>
                    </div>
                    <div className='text-center flex flex-col items-center justify-center h-[100px] bg-purple-700 bg-opacity-40 px-2 gap-1'>
                        <div>
                            <img className='w-8 mx-auto' src={gender} alt="" />
                        </div>
                        <p className='opacity-75 text-sm'>Gender Inclusivity</p>
                    </div>
                    <div className='text-center flex flex-col items-center justify-center h-[100px] bg-purple-700 bg-opacity-40 px-2 gap-1'>
                        <div>
                            <img className='w-8 mx-auto' src={skill} alt="" />
                        </div>
                        <p className='opacity-75 text-sm'>Skill Training</p>
                    </div>
                    <div className='text-center flex flex-col items-center justify-center h-[100px] bg-purple-700 bg-opacity-40 px-2 gap-1'>
                        <div>
                            <img className='w-8 mx-auto' src={tree} alt="" />
                        </div>
                        <p className='opacity-75 text-sm'>Tree Plantation</p>
                    </div>
                </div>
                <div className='flex gap-3 mt-5 text-purple-900 text-sm flex-wrap'>
                    <button onClick={() => setPlayInviteModal(true)} className='shake bg-white shadow-lg duration-100 font-bold shadow-purple-300/100 px-3 py-2 rounded hover:bg-inherit border-4 border-white hover:text-white'>Play Invite</button>
                    <a target="_blank" href="https://adbhut.io/">
                        <button className='h-full rounded'>
                            <img className='w-24 h-full rounded' src={adbhutGIF} alt="" />
                        </button>
                    </a>
                    <button className='bg-white duration-100 font-bold hover:shadow-lg hover:shadow-purple-500/100 px-3 py-2 rounded hover:bg-inherit border-4 border-white hover:text-white'>Get Invite</button>
                    <a target="_blank" href="https://www.linkedin.com/company/the-happy-hippies-show/jobs/">
                        <button className='h-full bg-white duration-100 font-bold hover:shadow-lg hover:shadow-purple-500/100 px-3 py-2 rounded hover:bg-inherit border-4 border-white hover:text-white'>We Are Hiring</button>
                    </a>
                </div>
                <div className='lg:hidden my-10 text-sm bg-white bg-opacity-60 text-black p-4'>
                    <h2 className='text-lg text-purple-900'>#MoonProject</h2>
                    In current times, the happy hippies are on their journey to be on the moon by 2024. They are doing this to make earth a better place, cleaner environment, less pollution, no descrimination and happiness for all. Now the happy hippies of future, year 2024, from the moon, are showing us their journey from earth to moon through this show.
                    This show inspires a series of events and conversations with leaders, changemakers and you. We the happy hippies are the GenZs, the generation of hope, for future. And this is our #MoonProject.
                </div>
            </div>

            <div className='hidden lg:block absolute top-1/2 right-0 w-[500px] text-sm bg-white bg-opacity-60 text-black p-4'>
                <h2 className='text-lg text-purple-900'>#MoonProject</h2>
                In current times, the happy hippies are on their journey to be on the moon by 2024. They are doing this to make earth a better place, cleaner environment, less pollution, no descrimination and happiness for all. Now the happy hippies of future, year 2024, from the moon, are showing us their journey from earth to moon through this show.
                This show inspires a series of events and conversations with leaders, changemakers and you. We the happy hippies are the GenZs, the generation of hope, for future. And this is our #MoonProject.
            </div>

            {
                playInviteModal &&
                <PlayInviteModal
                    modal={playInviteModal}
                    setModal={setPlayInviteModal}
                />
            }

        </section>
    );
};

export default Hero;