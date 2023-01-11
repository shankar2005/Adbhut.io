import React from 'react';
import { AiFillLinkedin, AiOutlineMail, AiOutlineGoogle } from 'react-icons/ai';
import { MdCelebration } from 'react-icons/md';
import { BsHash } from 'react-icons/bs';

const LeftAside = () => {
    return (
        <>
            {/* <section className='bg-white rounded-lg p-4 shadow-md mb-5'>
                <div className='relative'>
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
                </div>
            </section> */}

            <section className='bg-white rounded-lg p-4 shadow-md mb-5'>
                <h2 className="mb-3 text-2xl font-semibold text-center">Login to your account</h2>
                <p className="text-sm text-center text-gray-400">Dont have account?
                    <a href="#" rel="noopener noreferrer" className="focus:underline hover:underline ml-1">Sign up here</a>
                </p>
                <div className="my-6 space-y-4">
                    <button className='border border-purple-500 hover:bg-purple-500 hover:text-white w-full py-3 rounded mb-2 flex items-center justify-center gap-2'><AiOutlineMail className='w-6 h-6' /> Login with Email</button>
                    <button className='border border-green-600 hover:bg-green-600 hover:text-white w-full py-3 rounded mb-2 flex items-center justify-center gap-2'><AiOutlineGoogle className='w-7 h-7' /> Login with Google</button>
                    <button className='border border-blue-500 hover:bg-blue-500 hover:text-white w-full py-3 rounded mb-2 flex items-center justify-center gap-2'><AiFillLinkedin className='w-7 h-7' /> Login with LinkedIn</button>
                </div>
                <div className="flex items-center w-full my-4">
                    <hr className="w-full text-gray-400" />
                    <p className="px-3 text-gray-400">OR</p>
                    <hr className="w-full text-gray-400" />
                </div>
                <form novalidate="" action="" className="space-y-8 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label for="email" className="block text-sm">Email address</label>
                            <input type="email" name="email" id="email" placeholder="example@gmail.com" className="w-full px-3 py-2 border rounded-md border-gray-700" data-temp-mail-org="2" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label for="password" className="text-sm">Password</label>
                                <a rel="noopener noreferrer" href="#" className="text-xs hover:underline text-gray-400">Forgot password?</a>
                            </div>
                            <input type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md border-gray-700" />
                        </div>
                    </div>
                    <button type="button" className="w-full px-8 py-3 font-medium rounded-md bg-blue-500 text-white">Sign in</button>
                </form>
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
        </>
    );
};

export default LeftAside;