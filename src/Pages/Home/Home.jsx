import React from 'react';
import avatar from '../../assets/placeholders/avatar.png';
import { AiFillLinkedin, AiOutlineMail, AiOutlineGoogle, AiFillHome, AiOutlineGif } from 'react-icons/ai';
import { MdCelebration } from 'react-icons/md';
import { ImOffice } from 'react-icons/im';
import { TfiWorld } from 'react-icons/tfi';
import { BsHash, BsImageFill, BsThreeDots } from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im';
import { BsEmojiSmile } from 'react-icons/bs';

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


                <aside className='col-span-3 sticky top-16'>
                    <section className='bg-white rounded-lg p-4 shadow-md mb-5'>
                        {/* <div className='relative'>
                            <img className='rounded-t-lg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8ATiUg17HuXkHqkRB436JTxNVqh55NdWSZQ&usqp=CAU" alt="" />
                            <div className='w-20 rounded-full absolute bottom-0 right-1/2 translate-y-1/2 translate-x-1/2 border-4 border-white'>
                                <img className='w-full h-full' src={avatar} alt="" />
                            </div>
                        </div>
                        <div className='mt-12 pt-0 p-4 text-center'>
                            <h4 className='font-medium text-lg'>Md Maruf Hossain</h4>
                            <p className='text-sm text-gray-600'>
                                @maruf <br />
                                <p className='flex items-center justify-center gap-1 mt-1'><ImOffice /> NsN Co</p>
                                <p className='flex items-center justify-center gap-1 mt-1'><TfiWorld /> https://nsnco.in/</p>
                            </p>
                        </div> */}
                        <button className='border border-purple-500 hover:bg-purple-500 hover:text-white w-full py-2 rounded mb-2 flex items-center justify-center gap-1'><AiOutlineMail className='w-5 h-5' /> Login via Email</button>
                        <button className='border border-green-600 hover:bg-green-600 hover:text-white w-full py-2 rounded mb-2 flex items-center justify-center gap-1'><AiOutlineGoogle className='w-6 h-6' /> Login via Google</button>
                        <button className='border border-blue-500 hover:bg-blue-500 hover:text-white w-full py-2 rounded mb-2 flex items-center justify-center gap-1'><AiFillLinkedin className='w-5 h-5' /> Login via LinkedIn</button>
                    </section>
                    <section className='bg-white text-gray-700 rounded-lg shadow-md text-sm'>
                        <div className='border-b mb-3 pb-6 p-4'>
                            <p className='text-black mb-2 font-medium'>Current Projects</p>
                            <p className='flex items-center gap-1 underline hover:text-blue-700 cursor-pointer'><MdCelebration className='w-5 h-5 text-yellow-400' />JavaScript Developer</p>
                            <p className='flex items-center gap-1 underline hover:text-blue-700 cursor-pointer'><MdCelebration className='w-5 h-5 text-yellow-400' />International Jobs for Web Developer</p>
                            <p className='flex items-center gap-1 underline hover:text-blue-700 cursor-pointer'><MdCelebration className='w-5 h-5 text-yellow-400' />hashtag6monthsofcodechallenge</p>
                        </div>
                        <div className='border-b mb-3 pb-6 p-4'>
                            <p className='text-black mb-2 font-medium'>Recent Artists</p>
                            <p className='flex gap-1 mb-1'><img className='w-5 h-5' src="https://media.licdn.com/dms/image/D4D0BAQErxzI3ZO8CEA/company-logo_200_200/0/1665423690851?e=2147483647&v=beta&t=lNNe6O9RDmoigkZam6o8yn-abUNDT-L_F2MCusFSQ3E" alt="" /> JavaScript Developer</p>
                            <p className='flex gap-1 mb-1'><img className='w-5 h-5' src="https://media.licdn.com/dms/image/D4D0BAQErxzI3ZO8CEA/company-logo_200_200/0/1665423690851?e=2147483647&v=beta&t=lNNe6O9RDmoigkZam6o8yn-abUNDT-L_F2MCusFSQ3E" alt="" /> International Jobs for Web Dev</p>
                            <p className='flex gap-1 mb-1'><img className='w-5 h-5' src="https://media.licdn.com/dms/image/D4D0BAQErxzI3ZO8CEA/company-logo_200_200/0/1665423690851?e=2147483647&v=beta&t=lNNe6O9RDmoigkZam6o8yn-abUNDT-L_F2MCusFSQ3E" alt="" /> EventsSee all Events</p>
                        </div>
                        <div className='border-b mb-3 pb-6 p-4'>
                            <p className='text-black mb-2 font-medium'>Followed Hashtags</p>
                            <p className='flex items-center'><BsHash className='w-5 h-5 text-purple-700' />6monthsofcodechallenge</p>
                        </div>
                        <div>
                            About
                            Accessibility
                            Help Center
                            Privacy & Terms
                            Ad Choices
                            Advertising
                            Business Services
                            Get the LinkedIn app
                            More
                            LinkedIn Corporation © 2023
                        </div>
                    </section>
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

                <div className='col-span-3  sticky top-16'>
                    <div className='mb-5 bg-white shadow-md rounded-lg p-3'>
                        <h3 className='font-medium mb-3 text-gray-600'>Category</h3>
                        <div className='grid grid-cols-3 gap-x-2 gap-y-4 text-center'>
                            <div className='group flex flex-col items-center gap-2 text-gray-700 cursor-pointer'>
                                <div className='w-12 h-12 p-2 border rounded-md '>
                                    <img className='group-hover:scale-110 duration-150 overflow-hidden' src="https://img.icons8.com/external-ddara-flat-ddara/64/null/external-artwork-digital-marketing-ddara-flat-ddara.png" />
                                </div>
                                <p className='text-sm'>Artwork</p>
                            </div>
                            <div className='group flex flex-col items-center gap-2 text-gray-700 cursor-pointer'>
                                <div className='w-12 h-12 p-2 border rounded-md '>
                                    <img className='group-hover:scale-110 duration-150 overflow-hidden' src="https://img.icons8.com/color/48/null/filled-chat.png" />
                                </div>
                                <p className='text-sm'>Chat Show</p>
                            </div>
                            <div className='group flex flex-col items-center gap-2 text-gray-700 cursor-pointer'>
                                <div className='w-12 h-12 p-2 border rounded-md '>
                                    <img className='group-hover:scale-110 duration-150 overflow-hidden' src="https://img.icons8.com/color-glass/48/null/documentary.png" />
                                </div>
                                <p className='text-sm'>Documentary</p>
                            </div>
                            <div className='group flex flex-col items-center gap-2 text-gray-700 cursor-pointer'>
                                <div className='w-12 h-12 p-2 border rounded-md '>
                                    <img className='group-hover:scale-110 duration-150 overflow-hidden' src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/null/external-fiction-literature-flaticons-lineal-color-flat-icons.png" />
                                </div>
                                <p className='text-sm'>Fiction & Reality</p>
                            </div>
                            <div className='group flex flex-col items-center gap-2 text-gray-700 cursor-pointer'>
                                <div className='w-12 h-12 p-2 border rounded-md '>
                                    <img className='group-hover:scale-110 duration-150 overflow-hidden' src="https://img.icons8.com/cute-clipart/64/null/musical.png" />
                                </div>
                                <p className='text-sm'>Musical</p>
                            </div>
                            <div className='group flex flex-col items-center gap-2 text-gray-700 cursor-pointer'>
                                <div className='w-12 h-12 p-2 border rounded-md '>
                                    <img className='group-hover:scale-110 duration-150 overflow-hidden' src="https://img.icons8.com/color/48/null/bitcoin--v1.png" />
                                </div>
                                <p className='text-sm'>Web 3.0 Solutions</p>
                            </div>
                        </div>
                    </div>
                    <div className='bg-white shadow-md rounded-lg'>
                        <div className='border-b shadow-sm p-3 rounded-t-lg flex items-center justify-between'>
                            <h4 className='font-medium'>Project Servicing Chat</h4>
                            <BsThreeDots className='cursor-pointer' />
                        </div>
                        <div className='p-3'>
                            <div className='text-sm flex gap-2 mb-5'>
                                <img className='w-10 h-10' src={avatar} alt="" />
                                <div>
                                    <h4 className='font-medium'>NsN Co Servicing</h4>
                                    <p>
                                        How am I help you?
                                    </p>
                                </div>
                            </div>
                            <div className='flex gap-2 text-sm font-medium'>
                                <div className='py-1 px-3 border text-blue-500 border-blue-500 rounded-full cursor-pointer hover:bg-blue-100'>Home</div>
                                <div className='py-1 px-3 border text-blue-500 border-blue-500 rounded-full cursor-pointer hover:bg-blue-100'>Working</div>
                                <div className='py-1 px-3 border text-blue-500 border-blue-500 rounded-full cursor-pointer hover:bg-blue-100'>I'm done here</div>
                            </div>
                            <div className='mt-4'>
                                <textarea name="" className="p-2 rounded-lg border border-blue-500 w-full focus:outline-none" rows="4" placeholder='Start a briefing...' ></textarea>
                                <div className='flex justify-between items-center'>
                                    <div className='flex gap-2'>
                                        <BsEmojiSmile />
                                        <ImAttachment />
                                        <BsImageFill />
                                        <AiOutlineGif />
                                    </div>
                                    <div>
                                        <button className='bg-gray-400 py-[3px] px-3 rounded-full text-sm'>Send</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* messaging */}
                    {/* <div className='bg-white shadow-md rounded-lg p-3'>
                        <h3 className='font-medium mb-3 text-gray-600'>Message</h3>
                        <div className='flex items-center gap-2 mb-3 border-b pb-3 hover:bg-gray-200'>
                            <img className='w-12 h-12' src={avatar} alt="" />
                            <div className='text-sm'>
                                <p className='font-medium'>Märuf</p>
                                <p className='text-xs'>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                </p>
                            </div>
                        </div>
                        <div className='flex items-center gap-2 mb-3 border-b pb-3 hover:bg-gray-200'>
                            <img className='w-12 h-12' src={avatar} alt="" />
                            <div className='text-sm'>
                                <p className='font-medium'>Märuf</p>
                                <p className='text-xs'>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                </p>
                            </div>
                        </div>
                        <div className='flex items-center gap-2 mb-3 border-b pb-3 hover:bg-gray-200'>
                            <img className='w-12 h-12' src={avatar} alt="" />
                            <div className='text-sm'>
                                <p className='font-medium'>Märuf</p>
                                <p className='text-xs'>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                </p>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Home;