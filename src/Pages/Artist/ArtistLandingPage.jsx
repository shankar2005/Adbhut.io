import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/logos/adbhutGIF.gif"

const ArtistLandingPage = () => {
    return (
        <div className='bg-black text-white font-hero'>
            <header>
                <nav className='p-5 flex justify-between items-center'>
                    <Link to="/">
                        <img className="w-32 rounded-sm" src={logo} alt="" />
                        {/* <h5 className='text-xl font-bold'>Adbhut.io</h5> */}
                    </Link>
                    <ul className='flex gap-x-8 items-center'>
                        <li>Home</li>
                        <li>
                            <button type="button" class="bg-gradient-to-r from-pink-500 to-yellow-500 py-2 px-4 rounded font-semibold">
                                Login
                            </button>
                        </li>
                    </ul>
                </nav>

                <div className='p-32 flex justify-between items-center'>
                    <div className='flex-1 space-y-5'>
                        <h1 className='text-6xl font-bold'>
                            Create content <br />
                            people love
                        </h1>
                        <p className='text-xl'>Earn via brand integrations in your content</p>
                        <Link to="/artist/dashboard" className="block w-fit">
                            <button type="button" class="bg-gradient-to-r from-pink-500 to-yellow-500 py-3 px-6 rounded font-semibold">
                                Upload Now
                            </button>
                        </Link>
                    </div>
                    <div className='flex-1'>
                        <img className='rotate-90 ml-auto' src="https://d2sbanhm648peq.cloudfront.net/thumbnails/sync/home_page_banner.png" alt="" />
                    </div>
                </div>
            </header>

            <section className='mt-40'>
                <h3 className='text-4xl font-bold text-center mb-5'>Content you can upload to start earning</h3>
                <div className='w-10/12 mx-auto space-y-16'>
                    <div className='flex items-center'>
                        <div className='flex-1'>
                            <img className='mx-auto' src="https://d251apx0x5nzbt.cloudfront.net/0x350/website/images/audio_story_writing.png" alt="" />
                        </div>
                        <div className='flex-1'>
                            <h1 className='text-6xl font-bold mb-2'>Story Telling <br /> Formats</h1>
                            <p className='text-lg'>Create your video in 1st person shoot as a Story Teller. Learn the best practices and how to get in Top Talents here.</p>
                            <button className='font-semibold mt-5'>Explore More</button>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <div className='flex-1'>
                            <h1 className='text-6xl font-bold mb-2'>Animation Reel  <br /> Formats</h1>
                            <p className='text-lg'>Create your video as a Animated Video of Story Telling. Learn the best practices and how to get in Top Talents here.</p>
                            <button className='font-semibold mt-5'>Explore More</button>
                        </div>
                        <div className='flex-1'>
                            <img className='mx-auto' src="https://d251apx0x5nzbt.cloudfront.net/0x350/website/images/audio_story_writing.png" alt="" />
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <div className='flex-1'>
                            <img className='mx-auto' src="https://d251apx0x5nzbt.cloudfront.net/0x350/website/images/audio_story_writing.png" alt="" />
                        </div>
                        <div className='flex-1'>
                            <h1 className='text-6xl font-bold mb-2'>Slider Reel <br /> Formats</h1>
                            <p className='text-lg'>Create your video as a Slider Video for Story Telling. Learn the best practices and how to get in Top Talents here.</p>
                            <button className='font-semibold mt-5'>Explore More</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ArtistLandingPage;