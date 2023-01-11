import React from 'react';
import avatar from '../../assets/placeholders/avatar.png';
import { AiOutlineGif } from 'react-icons/ai';
import { BsImageFill, BsThreeDots } from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im';
import { BsEmojiSmile } from 'react-icons/bs';

const RightAside = () => {
    return (
        <>
            <section className='mb-5 bg-white shadow-md rounded-lg p-3'>
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
            </section>
            <section className='bg-white shadow-md rounded-lg'>
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
            </section>

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
        </>
    );
};

export default RightAside;