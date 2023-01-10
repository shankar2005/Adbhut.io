import React from 'react';
import avatar from '../../assets/placeholders/avatar.png'

const Home = () => {
    return (
        <div className='bg-purple-50'>
            <div className='bg-white shadow-md py-5 sticky top-0 z-50'>
                Navbar
            </div>
            <div className='w-11/12 mx-auto grid grid-cols-12 gap-5 items-start mt-5 min-h-screen'>


                <aside className='col-span-3 bg-white text-center rounded-lg'>
                    <div className='relative'>
                        <img className='rounded-t-lg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8ATiUg17HuXkHqkRB436JTxNVqh55NdWSZQ&usqp=CAU" alt="" />
                        <div className='w-20 rounded-full absolute bottom-0 right-1/2 translate-y-1/2 translate-x-1/2 border-4 border-white'>
                            <img className='w-full h-full' src={avatar} alt="" />
                        </div>
                    </div>
                    <div className='mt-16 pt-0 p-4'>
                        <h4 className='font-medium text-lg'>Md Maruf Hossain</h4>
                        <p className='text-sm text-gray-600'>
                            Md Maruf Hossain
                            Full Stack Developer | MERN Stack Developer | Programming Enthusiast
                        </p>
                    </div>
                </aside>



                <div className='col-span-6 bg-white p-5'>
                    <div className='bg-purple-100 p-5 py-36 text-center mb-5'>
                        Post 1
                    </div>
                    <div className='bg-purple-100 p-5 py-36 text-center mb-5'>
                        Post 1
                    </div>
                    <div className='bg-purple-100 p-5 py-36 text-center mb-5'>
                        Post 1
                    </div>
                </div>
                <div className='col-span-3 bg-purple-300 py-80 text-center'>
                    test
                </div>
            </div>
        </div>
    );
};

export default Home;