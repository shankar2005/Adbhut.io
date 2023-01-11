import React from 'react';
import avatar from '../../assets/placeholders/avatar.png';
import { AiFillHome } from 'react-icons/ai';
import { MdCelebration } from 'react-icons/md';
import LeftAside from './LeftAside';
import RightAside from './RightAside';

const Home = () => {
    return (
        <div className='bg-gray-100'>
            <nav className='bg-white shadow-md py-5 sticky top-0 z-50'>
                <div className='w-11/12 mx-auto flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <h4 className='font-medium'>Nsn Co</h4>
                        <input type="text" className='border border-purple-700 py-1 px-2' placeholder='Search your artist here...' />
                    </div>
                    <ul className='flex gap-4 text-gray-500'>
                        <li><AiFillHome className='w-6 h-6' /></li>
                        <li><MdCelebration className='w-6 h-6' /></li>
                    </ul>
                </div>
            </nav>
            <div className='w-11/12 mx-auto grid grid-cols-12 gap-5 items-start mt-5 pb-5'>

                <aside className='col-span-3'>
                    <LeftAside />
                </aside>

                <main className='col-span-6'>
                    <div className='mb-5 p-5 bg-white rounded-lg shadow-md'>
                        <div className='flex items-center gap-2 mb-3'>
                            <img className='w-12 h-12' src={avatar} alt="" />
                            <div className='text-sm'>
                                <p className='font-medium'>Märuf</p>
                                <p>2022-11-05</p>
                            </div>
                        </div>
                        <div>
                            <p className='text-sm mb-2'>
                                People have already started building awesome apps on top of #ChatGPT
                                Here are 10 use cases I liked most.
                                1. Connect your ChatGPT with your Whatsapp.
                                Link: http://bit.ly/3ZfmyzC
                                2. ChatGPT Writer : It use ChatGPT to generate emails or replies based on your prompt!
                                Link: http://bit.ly/3vGB3if <a className='text-blue-500' href="#">see more...</a>
                            </p>
                            <img className='w-full rounded-lg' src="https://media.licdn.com/dms/image/C4D22AQHenxuQDLXLIQ/feedshare-shrink_1280/0/1673346557857?e=1676505600&v=beta&t=pn0YmhYRFIjhQLBdZ9L_A8TRzfmexFDcag_qWFzx9R4" alt="" />
                        </div>
                    </div>
                    <div className='mb-5 p-5 bg-white rounded-lg shadow-md'>
                        <div className='flex items-center gap-2 mb-3'>
                            <img className='w-12 h-12' src={avatar} alt="" />
                            <div className='text-sm'>
                                <p className='font-medium'>Märuf</p>
                                <p>2022-11-05</p>
                            </div>
                        </div>
                        <div>
                            <p className='text-sm mb-2'>
                                People have already started building awesome apps on top of #ChatGPT
                                Here are 10 use cases I liked most.
                                1. Connect your ChatGPT with your Whatsapp.
                                Link: http://bit.ly/3ZfmyzC
                                2. ChatGPT Writer : It use ChatGPT to generate emails or replies based on your prompt!
                                Link: http://bit.ly/3vGB3if <a className='text-blue-500' href="#">see more...</a>
                            </p>
                            <img className='w-full rounded-lg' src="https://media.licdn.com/dms/image/C4D22AQHenxuQDLXLIQ/feedshare-shrink_1280/0/1673346557857?e=1676505600&v=beta&t=pn0YmhYRFIjhQLBdZ9L_A8TRzfmexFDcag_qWFzx9R4" alt="" />
                        </div>
                    </div>
                    <div className='mb-5 p-5 bg-white rounded-lg shadow-md'>
                        <div className='flex items-center gap-2 mb-3'>
                            <img className='w-12 h-12' src={avatar} alt="" />
                            <div className='text-sm'>
                                <p className='font-medium'>Märuf</p>
                                <p>2022-11-05</p>
                            </div>
                        </div>
                        <div>
                            <p className='text-sm mb-2'>
                                People have already started building awesome apps on top of #ChatGPT
                                Here are 10 use cases I liked most.
                                1. Connect your ChatGPT with your Whatsapp.
                                Link: http://bit.ly/3ZfmyzC
                                2. ChatGPT Writer : It use ChatGPT to generate emails or replies based on your prompt!
                                Link: http://bit.ly/3vGB3if <a className='text-blue-500' href="#">see more...</a>
                            </p>
                            <img className='w-full rounded-lg' src="https://media.licdn.com/dms/image/C4D22AQHenxuQDLXLIQ/feedshare-shrink_1280/0/1673346557857?e=1676505600&v=beta&t=pn0YmhYRFIjhQLBdZ9L_A8TRzfmexFDcag_qWFzx9R4" alt="" />
                        </div>
                    </div>
                </main>

                <aside className='col-span-3 sticky top-20'>
                    <RightAside />
                </aside>
            </div>
        </div>
    );
};

export default Home;