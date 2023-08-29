import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from "../../assets/logos/adbhutGIF.gif"
import { showLogin } from '../../features/dropdown/dropdownSlice';
import AuthModal from '../Auth/Components/AuthModal';
import { FaPlus } from "react-icons/fa";
import Footer from "../../layouts/Shared/Footer";

const ArtistLandingPage = () => {
    const dispatch = useDispatch();

    return (
        <div className='font-hero'>
            {/* auth modal */}
            <AuthModal />

            <header>
                <nav className='w-10/12 mx-auto px-10 py-5 flex justify-between items-center'>
                    <div className="flex items-center gap-8">
                        <Link to="/">
                            <img className="w-32 rounded-sm" src={logo} alt="" />
                        </Link>
                        <img className="w-10 rounded-sm" src="https://img.collegedekhocdn.com/media/img/institute/logo/1432796965.png" alt="" />
                        <ul className='ml-10 flex gap-x-8 items-center text-sm font-semibold'>
                            <li>Home</li>
                            <li>About</li>
                            <li>Article</li>
                        </ul>
                    </div>
                    <ul className='flex gap-x-8 items-center'>
                        <li>
                            <button onClick={() => dispatch(showLogin())} type="button" class="bg-sky-500 py-3 px-5 rounded-full text-sm text-white">
                                Login
                            </button>
                        </li>
                    </ul>
                </nav>

                <div className="mica-banner p-32 pb-24 space-y-5 flex flex-col justify-center items-center text-white">
                    <h1 className='text-[8rem] leading-[0.9] font-bold text-hero'>
                        Content Hub <br />
                        For Creators
                    </h1>
                    <p className='text-xl'>Earn via brand integrations in your content</p>
                    <Link to="/artist/dashboard" className="block w-fit">
                        <button type="button" class="bg-sky-500 py-3 px-5 rounded-full text-sm text-white">
                            Get Started
                        </button>
                    </Link>

                    <div className='pt-20 flex gap-24'>
                        <div>
                            <h2 className="text-5xl font-bold">256</h2>
                            <p className='text-sm font-semibold text-white/70'>Participants</p>
                        </div>
                        <div>
                            <h2 className="text-5xl font-bold">2.6 BN</h2>
                            <p className='text-sm font-semibold text-white/70'>Gamers worldwide</p>
                        </div>
                        <div>
                            <h2 className="text-5xl font-bold">12k</h2>
                            <p className='text-sm font-semibold text-white/70'>Global rush audience</p>
                        </div>
                        <div>
                            <h2 className="text-5xl font-bold">50k</h2>
                            <p className='text-sm font-semibold text-white/70'>Total prize pool</p>
                        </div>
                        <div>
                            <h2 className="text-5xl font-bold">11</h2>
                            <p className='text-sm font-semibold text-white/70'>Partners & sponsors</p>
                        </div>
                    </div>
                </div>
            </header>

            <section className="w-9/12 mx-auto bg-sky-100 px-16 py-8 rounded-lg mt-20">
                <h2 className="text-4xl font-semibold mb-3">GET ASTRO GEAR</h2>
                <p className="mb-5">By winning in our tournaments you exclusively open yourself to receiving an <br /> absurd amount of ASTRO gaming gear and jerseys.</p>
                <button type="button" class="bg-sky-500 py-1 px-5 rounded text-sm text-white font-semibold">
                    Get Started
                </button>
            </section>

            <section className="w-9/12 mx-auto my-20 grid grid-cols-2 items-center gap-10">
                <div>
                    <h2 className="text-4xl font-extrabold">Join our summer fiesta tournament 2022</h2>
                    <p className="mt-10 font-bold">A single-elimination tournament with 256 slots to fill your deepest Valorant desires and a chance to make it to the pro series!</p>

                    <div className='border-l-4 pl-2 border-black font-bold mt-16'>
                        Location <br />
                        <small>Belgrade, Serbia</small>
                    </div>
                </div>

                <div>
                    <img className="w-4/5 ml-auto rounded-xl" src="https://rush-theme.pxsquad.com/demo1/wp-content/uploads/2022/07/Frame-53-2-1.jpg" alt="" />
                </div>
            </section>

            <section className="w-9/12 mx-auto my-20 grid grid-cols-3 items-center gap-10">
                <div className='cols-span-1'>
                    <h2 className="text-4xl font-extrabold">FEED</h2>
                    <p className="text-sm mt-3 font-bold">A single-elimination tournament with 256 slots to fill your deepest Valorant desires and a chance to make it to the pro series!</p>
                    <button type="button" class="bg-sky-500 py-1 px-5 rounded text-sm text-white font-semibold mt-6">
                        Get Started
                    </button>
                </div>
                <div className='col-span-2 grid grid-cols-2 gap-2'>
                    <div className="shadow-lg border p-4 pb-6 rounded-xl">
                        <div className="flex items-center gap-2">
                            <img className='w-10' src="https://rush-theme.pxsquad.com/demo1/wp-content/uploads/2022/07/Rectangle-8-4.png" alt="" />
                            <div>
                                <p className='text-sm font-semibold'>RUSH <small className='text-xs w-fit bg-black text-white font-bold px-1 py-0.5 rounded'>STAFF</small></p>
                                <p className='text-xs text-red-700 font-bold'>July 20, 2022</p>
                            </div>
                        </div>
                        <p className="text-xs font-semibold mt-4">
                            New 3 months and 1 year subscription plans at great prices! Please check them out by pushing the "Subscribe" button in the space. Enjoy!
                        </p>
                    </div>
                    <div className="shadow-lg border p-4 pb-6 rounded-xl">
                        <div className="flex items-center gap-2">
                            <img className='w-10' src="https://rush-theme.pxsquad.com/demo1/wp-content/uploads/2022/07/Rectangle-8-4.png" alt="" />
                            <div>
                                <p className='text-sm font-semibold'>RUSH <small className='text-xs w-fit bg-black text-white font-bold px-1 py-0.5 rounded'>STAFF</small></p>
                                <p className='text-xs text-red-700 font-bold'>July 20, 2022</p>
                            </div>
                        </div>
                        <p className="text-xs font-semibold mt-4">
                            New 3 months and 1 year subscription plans at great prices! Please check them out by pushing the "Subscribe" button in the space. Enjoy!
                        </p>
                    </div>
                    <div className="shadow-lg border p-4 pb-6 rounded-xl">
                        <div className="flex items-center gap-2">
                            <img className='w-10' src="https://rush-theme.pxsquad.com/demo1/wp-content/uploads/2022/07/Rectangle-8-4.png" alt="" />
                            <div>
                                <p className='text-sm font-semibold'>RUSH <small className='text-xs w-fit bg-black text-white font-bold px-1 py-0.5 rounded'>STAFF</small></p>
                                <p className='text-xs text-red-700 font-bold'>July 20, 2022</p>
                            </div>
                        </div>
                        <p className="text-xs font-semibold mt-4">
                            New 3 months and 1 year subscription plans at great prices! Please check them out by pushing the "Subscribe" button in the space. Enjoy!
                        </p>
                    </div>
                    <div className="shadow-lg border p-4 pb-6 rounded-xl">
                        <div className="flex items-center gap-2">
                            <img className='w-10' src="https://rush-theme.pxsquad.com/demo1/wp-content/uploads/2022/07/Rectangle-8-4.png" alt="" />
                            <div>
                                <p className='text-sm font-semibold'>RUSH <small className='text-xs w-fit bg-black text-white font-bold px-1 py-0.5 rounded'>STAFF</small></p>
                                <p className='text-xs text-red-700 font-bold'>July 20, 2022</p>
                            </div>
                        </div>
                        <p className="text-xs font-semibold mt-4">
                            New 3 months and 1 year subscription plans at great prices! Please check them out by pushing the "Subscribe" button in the space. Enjoy!
                        </p>
                    </div>
                </div>
            </section>

            <section className="w-9/12 mx-auto bg-sky-100 p-16 rounded-lg my-20">
                <h2 className="text-4xl font-semibold mb-3">NEW GENERATION OF TOMORROW</h2>
                <button type="button" class="bg-sky-500 py-1 px-5 rounded text-sm text-white font-semibold">
                    Get Started
                </button>
            </section>

            <section className="w-9/12 mx-auto my-20 grid grid-cols-3 items-start gap-10">
                <div className='cols-span-1'>
                    <h2 className="text-4xl font-extrabold">FAQ</h2>
                    <p className="text-sm mt-3 font-bold">Learn everything you need to know about our tournaments! For more info, please reach out to us.</p>
                </div>
                <div className='col-span-2 space-y-1.5'>
                    <div className="bg-sky-600 text-white p-4 rounded-xl">
                        <div className="flex items-center justify-between">
                            <p className='font-semibold'>How to join RUSH tournament? </p>
                            <FaPlus />
                        </div>
                        <p className="text-sm font-semibold mt-4">
                            New 3 months and 1 year subscription plans at great prices! Please check them out by pushing the "Subscribe" button in the space. Enjoy!
                        </p>
                    </div>
                    <div className="bg-gray-600 text-white p-4 rounded-xl flex justify-between items-center">
                        <p className='font-semibold'>How to join RUSH tournament? </p>
                        <FaPlus />
                    </div>
                    <div className="bg-gray-600 text-white p-4 rounded-xl flex justify-between items-center">
                        <p className='font-semibold'>How to join RUSH tournament? </p>
                        <FaPlus />
                    </div>
                    <div className="bg-gray-600 text-white p-4 rounded-xl flex justify-between items-center">
                        <p className='font-semibold'>How to join RUSH tournament? </p>
                        <FaPlus />
                    </div>
                </div>
            </section>

            <section className="w-9/12 mx-auto my-20 flex justify-between">
                <img className='w-24' src="https://rush-theme.pxsquad.com/demo1/wp-content/uploads/2022/07/Vector-35.png" alt="" />
                <img className='w-24' src="https://rush-theme.pxsquad.com/demo1/wp-content/uploads/2022/07/Vector-35.png" alt="" />
                <img className='w-24' src="https://rush-theme.pxsquad.com/demo1/wp-content/uploads/2022/07/Vector-35.png" alt="" />
                <img className='w-24' src="https://rush-theme.pxsquad.com/demo1/wp-content/uploads/2022/07/Vector-35.png" alt="" />
                <img className='w-24' src="https://rush-theme.pxsquad.com/demo1/wp-content/uploads/2022/07/Vector-35.png" alt="" />
            </section>

            <section className="w-9/12 mx-auto bg-sky-600 py-10 px-16 rounded-lg my-20 text-white">
                <div className='flex justify-between'>
                    <h2 className="text-5xl font-extrabold mb-3">TOURNAMENT SCHEDULE</h2>
                    <p className='font-semibold text-center'>
                        DAY 1 <br />
                        1 DAY
                    </p>
                </div>

                <div className='grid grid-cols-4 mt-14 gap-10'>
                    <div>
                        <h2 className="text-2xl font-bold">Round 1</h2>
                        <p className='text-sm font-semibold text-white/70'>10:00 AM CET</p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Round 1</h2>
                        <p className='text-sm font-semibold text-white/70'>10:00 AM CET</p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Round 1</h2>
                        <p className='text-sm font-semibold text-white/70'>Gamers worldwide</p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Round 1</h2>
                        <p className='text-sm font-semibold text-white/70'>Global rush audience</p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Round 1</h2>
                        <p className='text-sm font-semibold text-white/70'>Total prize pool</p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Round 1</h2>
                        <p className='text-sm font-semibold text-white/70'>Partners & sponsors</p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Round 1</h2>
                        <p className='text-sm font-semibold text-white/70'>10:00 AM CET</p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Round 1</h2>
                        <p className='text-sm font-semibold text-white/70'>Partners & sponsors</p>
                    </div>
                </div>
            </section>


            <section className="w-9/12 mx-auto bg-gray-600 py-10 px-16 rounded-lg my-20 text-white grid grid-cols-3 gap-20">
                <div className="col-span-2">
                    <h2 className="text-5xl font-extrabold mb-3">ALL THE DETAILS FOR THE RUSH TOURNEY</h2>
                    <p className="mb-5 font-bold">A single-elimination tournament with 256 slots to fill your deepest Valorant desires and a chance to make it to the pro series!</p>
                    <button type="button" class="bg-white text-black py-1 px-5 rounded text-sm font-semibold">
                        Get Started
                    </button>
                </div>

                <div className='col-span-1 gap-24'>
                    <div className='border-b border-white/60 pb-3 mb-3'>
                    </div>
                    <div className='border-b border-white/60 pb-3 mb-3'>
                        <h2 className="text-2xl font-bold">256</h2>
                        <p className='text-sm font-semibold text-white/70'>Participants</p>
                    </div>
                    <div className='border-b border-white/60 pb-3 mb-3'>
                        <h2 className="text-2xl font-bold">2.6 BN</h2>
                        <p className='text-sm font-semibold text-white/70'>Gamers worldwide</p>
                    </div>
                    <div className='border-b border-white/60 pb-3 mb-3'>
                        <h2 className="text-2xl font-bold">12k</h2>
                        <p className='text-sm font-semibold text-white/70'>Global rush audience</p>
                    </div>
                    <div className='border-b border-white/60 pb-3 mb-3'>
                        <h2 className="text-2xl font-bold">50k</h2>
                        <p className='text-sm font-semibold text-white/70'>Total prize pool</p>
                    </div>
                    <div className='border-b border-white/60 pb-3 mb-3'>
                        <h2 className="text-2xl font-bold">11</h2>
                        <p className='text-sm font-semibold text-white/70'>Partners & sponsors</p>
                    </div>
                </div>
            </section>


            <section className="w-9/12 mx-auto my-20">
                <div className='cols-span-1 text-center'>
                    <h2 className="text-5xl font-extrabold">PLAYING FIELD</h2>
                    <p className="mt-8 font-bold">The maps below are used for playing during the tournamnet each map has its own number of rounds.</p>
                </div>
                <div className="grid grid-cols-2 mt-10">
                    <div className='relative'>
                        <div className='absolute top-0 left-0 pb-12 pl-8 text-white w-full h-full bg-gradient-to-t from-black to-black/40 flex flex-col justify-end'>
                            <small className='text-xs w-fit bg-gray-600 text-white font-bold px-2 py-0.5 rounded'>BEST OF OUT 1</small>
                            <h4 className='text-2xl font-semibold'>Map #1</h4>
                            <p className='text-xs font-semibold'>
                                This map is used for first three rounds.
                            </p>
                        </div>
                        <img className='w-full' src="https://c.files.bbci.co.uk/131CB/production/_106838287_6838286.jpg" alt="" />
                    </div>
                    <div className='relative'>
                        <div className='absolute top-0 left-0 pb-12 pl-8 text-white w-full h-full bg-gradient-to-t from-black to-black/40 flex flex-col justify-end'>
                            <small className='text-xs w-fit bg-gray-600 text-white font-bold px-2 py-0.5 rounded'>BEST OF OUT 1</small>
                            <h4 className='text-2xl font-semibold'>Map #1</h4>
                            <p className='text-xs font-semibold'>
                                This map is used for first three rounds.
                            </p>
                        </div>
                        <img className='w-full' src="https://c.files.bbci.co.uk/131CB/production/_106838287_6838286.jpg" alt="" />
                    </div>
                    <div className='relative'>
                        <div className='absolute top-0 left-0 pb-12 pl-8 text-white w-full h-full bg-gradient-to-t from-black to-black/40 flex flex-col justify-end'>
                            <small className='text-xs w-fit bg-gray-600 text-white font-bold px-2 py-0.5 rounded'>BEST OF OUT 1</small>
                            <h4 className='text-2xl font-semibold'>Map #1</h4>
                            <p className='text-xs font-semibold'>
                                This map is used for first three rounds.
                            </p>
                        </div>
                        <img className='w-full' src="https://c.files.bbci.co.uk/131CB/production/_106838287_6838286.jpg" alt="" />
                    </div>
                    <div className='relative'>
                        <div className='absolute top-0 left-0 pb-12 pl-8 text-white w-full h-full bg-gradient-to-t from-black to-black/40 flex flex-col justify-end'>
                            <small className='text-xs w-fit bg-gray-600 text-white font-bold px-2 py-0.5 rounded'>BEST OF OUT 1</small>
                            <h4 className='text-2xl font-semibold'>Map #1</h4>
                            <p className='text-xs font-semibold'>
                                This map is used for first three rounds.
                            </p>
                        </div>
                        <img className='w-full' src="https://c.files.bbci.co.uk/131CB/production/_106838287_6838286.jpg" alt="" />
                    </div>
                </div>
            </section>

            <section className="bg-sky-600 text-white my-20 py-20 ">
                <div className='w-9/12 mx-auto grid grid-cols-2 items-center gap-10'>
                    <div>
                        <h2 className="text-5xl font-extrabold">AN ESPORTS REVOLUTION</h2>
                        <p className="mt-5 font-bold mb-3">
                            Esports is coming alive with Rush Media, where we intend to bring daily Valorant tournaments with quality prize pools. Join the hype squad!
                        </p>

                        <div className='flex items-center'>
                            <button type="button" class="bg-sky-500 py-1 px-3 rounded text-sm text-white font-semibold mr-2">
                                Get Started
                            </button>
                            <small className='text-sm font-bold inline-flex flex-col'>
                                Joined <br />
                                8/256
                            </small>
                        </div>

                        <div className='border-l-4 pl-2 border-sky-100 font-bold mt-16'>
                            15.07.2022. <br />
                            <small>Belgrade, Serbia</small>
                        </div>
                    </div>
                    <div>
                        <img className="w-4/5 ml-auto rounded-xl" src="https://rush-theme.pxsquad.com/demo1/wp-content/uploads/2022/07/Group.png" alt="" />
                    </div>
                </div>
            </section>


            <section className="w-9/12 mx-auto my-20">
                <div className='cols-span-1 text-center'>
                    <h2 className="text-5xl font-extrabold">PRIZE POOL</h2>
                    <p className="mt-8 font-bold">Every Friday we give out prizes to our top 3 placements</p>
                </div>
                <div className="flex items-end gap-3 mt-16">
                    <div className='relative rounded-2xl h-fit'>
                        <div className='absolute top-0 left-0 p-10 text-white w-full h-full bg-gradient-to-t from-black to-black/40 flex flex-col justify-end rounded-2xl text-center'>
                            <h4 className='text-2xl font-semibold'>Map #1</h4>
                            <p className='text-xs font-semibold mt-3'>
                                A mechanical keyboard designed for Valorant, premium piece of gear coming from our partners
                            </p>
                            <a className='mt-4 text-xs block font-semibold uppercase' href="#">View More</a>
                        </div>
                        <img className='w-full rounded-2xl' src="https://rush-theme.pxsquad.com/demo1/wp-content/uploads/2022/07/Frame-37-3.jpg" alt="" />
                    </div>
                    <div className='relative rounded-2xl h-fit'>
                        <div className='absolute top-0 left-0 p-10 text-white w-full h-full bg-gradient-to-t from-black to-black/40 flex flex-col justify-end rounded-2xl text-center'>
                            <h4 className='text-2xl font-semibold'>Map #1</h4>
                            <p className='text-xs font-semibold mt-3'>
                                A mechanical keyboard designed for Valorant, premium piece of gear coming from our partners
                            </p>
                            <a className='mt-4 text-xs block font-semibold uppercase' href="#">View More</a>
                        </div>
                        <img className='w-full rounded-2xl' src="https://rush-theme.pxsquad.com/demo1/wp-content/uploads/2022/07/Frame-55.jpg" alt="" />
                    </div>
                    <div className='relative rounded-2xl h-fit'>
                        <div className='absolute top-0 left-0 p-10 text-white w-full h-full bg-gradient-to-t from-black to-black/40 flex flex-col justify-end rounded-2xl text-center'>
                            <h4 className='text-2xl font-semibold'>Map #1</h4>
                            <p className='text-xs font-semibold mt-3'>
                                A mechanical keyboard designed for Valorant, premium piece of gear coming from our partners
                            </p>
                            <a className='mt-4 text-xs block font-semibold uppercase' href="#">View More</a>
                        </div>
                        <img className='w-full rounded-2xl' src="https://rush-theme.pxsquad.com/demo1/wp-content/uploads/2022/07/Frame-39-3.jpg" alt="" />
                    </div>
                </div>
            </section>

            <section className="w-9/12 mx-auto my-20">
                <div className='cols-span-1 text-center'>
                    <h2 className="text-5xl font-extrabold">TOURNAMENT VENUE</h2>
                    <p className="mt-8 font-bold">We'll be using two locations for the tournament venue depending on the rounds</p>
                </div>
                <div className="grid grid-cols-2 mt-10">
                    <div className='relative'>
                        <div className='absolute top-0 left-0 pb-12 pl-8 text-white w-full h-full bg-gradient-to-t from-black to-black/40 flex flex-col justify-end'>
                            <small className='text-xs w-fit bg-gray-600 text-white font-bold px-2 py-0.5 rounded'>BEST OF OUT 1</small>
                            <h4 className='text-2xl font-semibold'>Map #1</h4>
                            <p className='text-xs font-semibold'>
                                This map is used for first three rounds.
                            </p>
                        </div>
                        <img className='w-full' src="https://c.files.bbci.co.uk/131CB/production/_106838287_6838286.jpg" alt="" />
                    </div>
                    <div className='relative'>
                        <div className='absolute top-0 left-0 pb-12 pl-8 text-white w-full h-full bg-gradient-to-t from-black to-black/40 flex flex-col justify-end'>
                            <small className='text-xs w-fit bg-gray-600 text-white font-bold px-2 py-0.5 rounded'>BEST OF OUT 1</small>
                            <h4 className='text-2xl font-semibold'>Map #1</h4>
                            <p className='text-xs font-semibold'>
                                This map is used for first three rounds.
                            </p>
                        </div>
                        <img className='w-full' src="https://c.files.bbci.co.uk/131CB/production/_106838287_6838286.jpg" alt="" />
                    </div>
                </div>
            </section>


            {/* <section className='mt-40'>
                <h3 className='text-4xl font-bold text-center mb-10'>Content you can upload to start earning</h3>
                <div className='w-10/12 mx-auto grid grid-cols-3 gap-5 mb-10'>
                    <div className='bg-gradient-to-b from-sky-500 to-sky-300 p-5 flex flex-col justify-between gap-y-3 rounded-xl shadow-lg'>
                        <h2 className="text-xl font-bold text-white">12 TV/OTT show worthy synopsis scripts (with demo episode, and/or full-length scripts)</h2>
                        <img src="https://cdn.dribbble.com/userupload/8672208/file/original-405339f7a5e65e2e82509593398209ef.png?resize=1024x687&vertical=center" alt="" />
                        <button type="button" class="bg-white py-3 px-6 rounded text-black font-bold">
                            Apply Now
                        </button>
                    </div>
                    <div className='bg-gradient-to-b from-sky-500 to-sky-300 p-5 flex flex-col justify-between gap-y-3 rounded-xl shadow-lg'>
                        <h2 className="text-xl font-bold text-white">12+ advertising short content showcases done for the industry</h2>
                        <img src="https://cdn.dribbble.com/userupload/8672208/file/original-405339f7a5e65e2e82509593398209ef.png?resize=1024x687&vertical=center" alt="" />
                        <button type="button" class="bg-white py-3 px-6 rounded text-black font-bold">
                            Apply Now
                        </button>
                    </div>
                    <div className='bg-gradient-to-b from-sky-500 to-sky-300 p-5 flex flex-col justify-between gap-y-3 rounded-xl shadow-lg'>
                        <h2 className="text-xl font-bold text-white">12+ OTT worthy feature/short films synopsis (with full-length scripts)</h2>
                        <img src="https://cdn.dribbble.com/userupload/8672208/file/original-405339f7a5e65e2e82509593398209ef.png?resize=1024x687&vertical=center" alt="" />
                        <button type="button" class="bg-white py-3 px-6 rounded text-black font-bold">
                            Apply Now
                        </button>
                    </div>
                </div>
            </section> */}

            {/* <section className="w-10/12 gap-28 max-w-screen-xl mx-auto flex flex-col md:flex-row items-center py-20">
                <div className="text-center md:text-left">
                    <h2 className='text-4xl font-bold mb-10'>
                        Requested task
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 mt-12 gap-5">
                        <div className="bg-secondary p-5 rounded-xl flex items-start gap-2.5 bg-gray-100">
                            <img src="https://edvive.netlify.app/assets/Star-af99be9c.svg" alt="" />
                            <div>
                                <h3 className="font-extrabold text-xl font-theme mb-2">Tech-Powered Media Cases</h3>
                                <p className="text-muted">An Introduction: Students can be speaking on case studies with use of technology in media.</p>
                            </div>
                        </div>
                        <div className="bg-secondary p-5 rounded-xl flex items-start gap-2.5 bg-gray-100">
                            <img src="https://edvive.netlify.app/assets/Star-af99be9c.svg" alt="" />
                            <div>
                                <h3 className="font-extrabold text-xl font-theme mb-2">Sales Funnel Mastery</h3>
                                <p className="text-muted">Teaching to Build Sales Funnel to Other Students: Using Apollo.io subscription (Rs8000/ Month) &
                                    Gmass learning setting online sales funnel (I have a set training module).</p>
                            </div>
                        </div>
                        <div className="bg-secondary p-5 rounded-xl flex items-start gap-2.5 bg-gray-100">
                            <img src="https://edvive.netlify.app/assets/Star-af99be9c.svg" alt="" />
                            <div>
                                <h3 className="font-extrabold text-xl font-theme mb-2">Brand-Building Initiative</h3>
                                <p className="text-muted">Student's Contribution: After classes give two hours to searching brands from APOLLO.IO. Setting a
                                    Gmass mass mailer campaign for automation of our marketing efforts. Record the efforts, edit and publish</p>
                            </div>
                        </div>
                        <div className="bg-secondary p-5 rounded-xl flex items-start gap-2.5 bg-gray-100">
                            <img src="https://edvive.netlify.app/assets/Star-af99be9c.svg" alt="" />
                            <div>
                                <h3 className="font-extrabold text-xl font-theme mb-2">Innovative Campus Engagement</h3>
                                <p className="text-muted">Creative Contribution: EoIs, can be along with simple, yet effective ideas that can be done within campus.
                                    Student's EOI should be creatively aligned or at least more than a resume, is a part MICA CMES decides.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            <Footer />
        </div>
    );
};

export default ArtistLandingPage;