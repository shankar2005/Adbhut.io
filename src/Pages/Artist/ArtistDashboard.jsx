import { AiOutlineUser } from 'react-icons/ai';
import { FiFolderPlus } from 'react-icons/fi';
import { RiFileEditLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { useGetDemoByArtistQuery } from '../../features/demo/demoApi';
// import WorkDemo from './Components/View/WorkDemo';

const ArtistDashboardTest = () => {
    // const { user } = useSelector(state => state.auth);
    // const { data: myDemos } = useGetDemoByArtistQuery(user?.id, { skip: !user?.email });

    return (
        <div className='bg-black text-white font-hero'>
            <header>
                <nav className='p-5 flex justify-between items-center'>
                    <Link to="/">
                        <h5 className='text-xl font-bold'>Adbhut.io</h5>
                    </Link>
                    <ul className='flex gap-x-8 items-center'>
                        <li><Link to="/artist">Home</Link></li>
                        <li>
                            <button type="button" class="bg-gradient-to-r from-pink-500 to-yellow-500 py-2 px-4 rounded font-semibold">
                                Login
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>

            <div className="flex">
                <aside className='w-64 p-8'>
                    <ul>
                        <li className='text-lg p-3 flex items-center gap-3'><FiFolderPlus size={25} /> My Demos</li>
                        <li className='text-lg p-3 flex items-center gap-3 text-white/70'><AiOutlineUser size={25} /> My Account</li>
                        <li className='text-lg p-3 flex items-center gap-3 text-white/70'><RiFileEditLine size={25} /> Apply to Project</li>
                    </ul>
                </aside>

                <main className='flex-grow'>
                    <section class="w-10/12 mx-auto bg-neutral-900 p-3 flex items-center justify-between">
                        <h3 className='text-xl font-semibold'>My Demos</h3>
                        <button type="button" className="font-semibold inline-flex items-center gap-2 cursor-pointer uppercase">
                            <FiFolderPlus size={23} /> Add New Demo
                        </button>
                    </section>

                    <section class="w-10/12 mx-auto py-10 mb-10">
                        {/* <label for="cover-photo" class="block font-medium leading-6">Upload a demo file</label> */}
                        <div class="mt-2 flex justify-center rounded-lg border border-dashed  px-6 py-10">
                            <div class="text-center">
                                <svg class="mx-auto h-12 w-12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
                                </svg>
                                <div class="mt-4 flex text-sm leading-6">
                                    <label for="file-upload" class="relative cursor-pointer rounded-md font-semibold text-yellow-500 hover:text-indigo-500">
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="file-upload" type="file" class="sr-only" />                            </label>
                                    <p class="pl-1">or drag and drop</p>
                                </div>
                                <p class="text-xs leading-5">Image, video, audio less than 10MB</p>
                            </div>
                        </div>
                    </section>

                    <section className='w-10/12 mx-auto flex gap-8 pb-20'>
                        <div className='flex-1 bg-neutral-900 rounded-lg'>
                            <img className='m-auto' src="https://d251apx0x5nzbt.cloudfront.net/365x450/mugafi_landing_page/images/kickstart_pdp.png" alt="" />
                        </div>
                        <div className='flex-1 bg-neutral-900 rounded-lg p-10'>
                            <h5 className='text-xl font-semibold mb-4'>Generated Keywords</h5>
                            <ul className='h-80 overflow-y-auto no-scroll'>
                                <li className='bg-green-100 py-1 px-3 text-black'>Loremwe</li>
                                <li className='bg-green-200 py-1 px-3 text-black'>ipsum</li>
                                <li className='bg-green-300 py-1 px-3 text-black'>dolorw</li>
                                <li className='bg-green-400 py-1 px-3 text-black'>sit</li>
                                <li className='bg-green-500 py-1 px-3 text-black'>amet.</li>
                                <li className='bg-green-600 py-1 px-3 text-black'>Loremwe</li>
                                <li className='bg-green-700 py-1 px-3 text-black'>sit</li>
                                <li className='bg-green-800 py-1 px-3 text-black'>dolorw</li>
                                <li className='bg-green-900 py-1 px-3 text-black'>ipsum</li>
                                <li className='bg-green-100 py-1 px-3 text-black'>Loremwe</li>
                                <li className='bg-green-200 py-1 px-3 text-black'>ipsum</li>
                                <li className='bg-green-300 py-1 px-3 text-black'>dolorw</li>
                                <li className='bg-green-400 py-1 px-3 text-black'>sit</li>
                                <li className='bg-green-500 py-1 px-3 text-black'>amet.</li>
                                <li className='bg-green-600 py-1 px-3 text-black'>Loremwe</li>
                                <li className='bg-green-700 py-1 px-3 text-black'>sit</li>
                                <li className='bg-green-800 py-1 px-3 text-black'>dolorw</li>
                                <li className='bg-green-900 py-1 px-3 text-black'>ipsum</li>
                            </ul>
                        </div>
                    </section>

                    {/* <section className="w-6/12 mx-auto space-y-5 py-10">
                        {myDemos?.map(demo => (
                            <div className="border border-neutral-700 rounded-xl">
                                <WorkDemo demo_type={demo?.demo_type} demo_link={demo?.link || demo?.document} />
                            </div>
                        ))}
                    </section> */}
                </main>
            </div>
        </div>
    );
};

export default ArtistDashboardTest;