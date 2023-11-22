import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import nsnlogo from '../../assets/logos/nsn-logo.png';
import { showLogin } from '../../features/dropdown/dropdownSlice';
import AuthModal from '../Auth/Components/AuthModal';
import { FaPlus } from "react-icons/fa";
import Footer from "../../layouts/Shared/Footer";
import HeroSection from '../MICA/HeroSection';
import Brands from '../../Components/Sections/Brands';

const ArtistLandingPage = () => {
    const dispatch = useDispatch();

    return (
        <div className='font-hero'>
            {/* auth modal */}
            <AuthModal />

            <header>
                <nav className='w-10/12 mx-auto py-3 flex justify-between items-center'>
                    <div className="flex items-center gap-8">
                        <Link className="flex items-center gap-2" to="/">
                            <img src={nsnlogo} className='w-20' />
                            <span className="text-3xl font-bold text-cyan-900 tracking-wide">CO</span>
                        </Link>
                        {/* <img className="w-10 rounded-sm" src="https://img.collegedekhocdn.com/media/img/institute/logo/1432796965.png" alt="" /> */}
                        <ul className='hidden ml-10 md:flex gap-x-8 items-center text-sm font-semibold'>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                            <li>
                                <a target="_blank" href="https://thhs.in/">Campaign</a>
                            </li>
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
                <HeroSection />
            </header>

            <section className="w-10/12 md:w-9/12 mx-auto bg-sky-100 px-16 py-8 rounded-lg mt-20">
                <h2 className="text-4xl font-semibold mb-3">Creator Fellowship Program</h2>
                <p className="mb-5">
                    An initiative of [COMPANY], hosted by Adbhut.io to bring together academia, industry and community for offering a space to Media and Entertainment industries to facilitate research based solutions for enduring content needs.
                </p>
                <button type="button" class="bg-sky-500 py-1 px-5 rounded text-sm text-white font-semibold">
                    Sign up as Creator
                </button>
            </section>

            <section className="w-10/12 md:w-9/12 mx-auto my-20 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
                <div>
                    <h2 className="text-4xl font-extrabold">Join our Creator Fellowship Program 2023</h2>
                    <p className="mt-10 font-bold">
                        Single or multiple entry allowed with upto 250 slots for each artist to submit their content entries. Elimination basis [Company] team shortlists to bring out the pro-series participants!
                    </p>

                    <div className='border-l-4 pl-2 border-black font-bold mt-16'>
                        Know more <br />
                        <small>[Company]</small>
                    </div>
                </div>

                <div className="hidden md:block w-4/5 h-[500px] ml-auto bg-gray-200 rounded-xl">
                    {/* <img className="w-full h-full object-cover object-left-bottom rounded-xl" src="https://www.mbarendezvous.com/images/top-stories-img/bannerimage_1597143579.jpg" alt="" /> */}
                </div>
            </section>

            <section className="w-10/12 md:w-9/12 mx-auto my-20 grid grid-cols-1 md:grid-cols-3 items-center gap-10">
                <div className='cols-span-1'>
                    <h2 className="text-4xl font-extrabold">START EARNING</h2>
                    <p className="text-sm mt-3 font-bold">
                        An ongoing, no elimination, content tournament with 250 open slots of entry to your deepest Creative desires and a chance to make it to the pro series!
                    </p>
                    <button type="button" class="bg-sky-500 py-1 px-5 rounded text-sm text-white font-semibold mt-6">
                        Get Started
                    </button>
                </div>
                <div className='col-span-2 grid grid-cols-1 md:grid-cols-2 gap-2'>
                    <div className="shadow-lg border p-4 pb-6 rounded-xl">
                        <div className="flex items-center gap-2">
                            <img className='w-6' src="https://static.vecteezy.com/system/resources/thumbnails/018/251/257/small/indian-rupee-currency-symbol-icon-on-transparent-background-free-png.png" alt="" />
                            <div>
                                <p className='text-sm font-semibold'>2000 <small className='text-xs w-fit bg-black text-white font-bold px-1 py-0.5 rounded'>INR</small></p>
                                <p className='text-xs text-red-700 font-bold'>
                                    Recognition Honorarium per content IP registration
                                </p>
                            </div>
                        </div>
                        <p className="text-xs font-semibold mt-4">
                            New content IP registration promotional plan offering great benefits! Please check them out by entering the "pro series". Enjoy creating!
                        </p>
                    </div>
                    <div className="shadow-lg border p-4 pb-6 rounded-xl">
                        <div className="flex items-center gap-2">
                            <img className='w-6' src="https://static.vecteezy.com/system/resources/thumbnails/018/251/257/small/indian-rupee-currency-symbol-icon-on-transparent-background-free-png.png" alt="" />
                            <div>
                                <p className='text-sm font-semibold'>40,000 <small className='text-xs w-fit bg-black text-white font-bold px-1 py-0.5 rounded'>INR</small></p>
                                <p className='text-xs text-red-700 font-bold'>
                                    Development fee per content IP registration
                                </p>
                            </div>
                        </div>
                        <p className="text-xs font-semibold mt-4">
                            Given for full-length script final development work for OTT/TV/ Media syndication pitches
                        </p>
                    </div>
                </div>
            </section>

            <section className="w-10/12 md:w-9/12 mx-auto bg-sky-100 p-16 rounded-lg my-20">
                <h2 className="text-4xl font-semibold mb-3">NEW GENERATION OF TOMORROW</h2>
                <p className="mb-5">
                    Pro series for starting great careers
                </p>
                <button type="button" class="bg-sky-500 py-1 px-5 rounded text-sm text-white font-semibold">
                    Apply Now
                </button>
            </section>

            <section className="w-10/12 md:w-9/12 mx-auto my-20 grid grid-cols-1 md:grid-cols-3 items-start gap-10">
                <div className='cols-span-1'>
                    <h2 className="text-4xl font-extrabold">FAQ</h2>
                    <p className="text-sm mt-3 font-bold">
                        Learn everything you need to know about our program! For more info, please reach out to us.
                    </p>
                </div>
                <div className='col-span-2 space-y-1.5'>
                    <div className="bg-sky-600 text-white p-4 rounded-xl">
                        <div className="flex items-center justify-between">
                            <p className='font-semibold'>How to join CEATOR FELLOWSHIP program?</p>
                            <FaPlus />
                        </div>
                        <p className="text-sm font-semibold mt-4">
                            New briefs every 3 months and 2 years of plans with great opportunities! Please check them out by applying to the "Pro Series". Enjoy creating!
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

            <section className="w-10/12 md:w-9/12 mx-auto my-20 flex justify-between">
                <Brands />
            </section>


            <section className="w-10/12 md:w-9/12 mx-auto bg-sky-600 py-10 px-8 md:px-16 rounded-lg my-20 text-white">
                <div className='flex justify-between'>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-3">ON-GOING PROJECTS</h2>
                    <p className='font-semibold text-center'>
                        30 DAYS
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 mt-14 gap-10'>
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold">TV/OTT show</h2>
                        <p className='text-sm font-semibold text-white/70'>12 Spots Open</p>
                    </div>
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold">Advertising content</h2>
                        <p className='text-sm font-semibold text-white/70'>12 Spots Open</p>
                    </div>
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold">Feature/short films</h2>
                        <p className='text-sm font-semibold text-white/70'>12 Spots Open</p>
                    </div>
                </div>
            </section>


            <section className="w-10/12 md:w-9/12 mx-auto bg-gray-600 py-10 px-10 md:px-16 rounded-lg my-20 text-white grid grid-cols-1 md:grid-cols-3 gap-20">
                <div className="col-span-2">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-3">ALL THE DETAILS FOR CREATOR FELLOWSHIP PROGRAM</h2>
                    <p className="mb-5 font-bold">
                        An ongoing, no elimination, content tournament with 250 open slots of entry to your deepest Creative desires and a chance to make it to the pro series!
                    </p>
                    <button type="button" class="bg-white text-black py-1 px-5 rounded text-sm font-semibold">
                        Join Now
                    </button>
                </div>

                <div className='col-span-1 gap-24'>
                    <div className='border-b border-white/60 pb-3 mb-3'>
                    </div>
                    <div className='border-b border-white/60 pb-3 mb-3'>
                        <h2 className="text-xl md:text-2xl font-bold">756</h2>
                        <p className='text-sm font-semibold text-white/70'>Creators</p>
                    </div>
                    <div className='border-b border-white/60 pb-3 mb-3'>
                        <h2 className="text-xl md:text-2xl font-bold">7.6 Bn</h2>
                        <p className='text-sm font-semibold text-white/70'>Content Views worldwide</p>
                    </div>
                    <div className='border-b border-white/60 pb-3 mb-3'>
                        <h2 className="text-xl md:text-2xl font-bold">21</h2>
                        <p className='text-sm font-semibold text-white/70'>Satisfied Brand Partners</p>
                    </div>
                    <div className='border-b border-white/60 pb-3 mb-3'>
                        <h2 className="text-xl md:text-2xl font-bold">2500k INR</h2>
                        <p className='text-sm font-semibold text-white/70'>Total prize pool</p>
                    </div>
                    <div className='border-b border-white/60 pb-3 mb-3'>
                        <h2 className="text-xl md:text-2xl font-bold">Multiple</h2>
                        <p className='text-sm font-semibold text-white/70'>Partners & sponsors</p>
                    </div>
                </div>
            </section>


            <section className="w-10/12 md:w-9/12 mx-auto my-20">
                <div className='cols-span-1 text-center'>
                    <h2 className="text-5xl font-extrabold">LEVEL PLAYING FIELD</h2>
                    <p className="mt-8 font-bold">
                        The maps below are used for playing during the tournamnet each map has its own number of rounds. - The mappings shown below are used for content evaluating during the program with each map having its own number of rounds.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 mt-10">
                    <div className='relative'>
                        <div className='absolute top-0 left-0 pb-12 pl-8 text-white w-full h-full bg-gradient-to-t from-black to-black/40 flex flex-col justify-end'>
                            <small className='text-xs w-fit bg-gray-600 text-white font-bold px-2 py-0.5 rounded'>BEST STRUCTURED OUTPUT</small>
                            <h4 className='text-xl md:text-2xl font-semibold'>Ai/ML analysis </h4>
                            <p className='text-xs font-semibold'>
                                This map is used for first three rounds of content evaluation.
                            </p>
                        </div>
                        <img className='w-full' src="https://c.files.bbci.co.uk/131CB/production/_106838287_6838286.jpg" alt="" />
                    </div>
                    <div className='relative'>
                        <div className='absolute top-0 left-0 pb-12 pl-8 text-white w-full h-full bg-gradient-to-t from-black to-black/40 flex flex-col justify-end'>
                            <small className='text-xs w-fit bg-gray-600 text-white font-bold px-2 py-0.5 rounded'>BEST OF MONTH</small>
                            <h4 className='text-xl md:text-2xl font-semibold'>[Company] Shortlists</h4>
                            <p className='text-xs font-semibold'>
                                This map is used for last round.
                            </p>
                        </div>
                        <img className='w-full' src="https://c.files.bbci.co.uk/131CB/production/_106838287_6838286.jpg" alt="" />
                    </div>
                </div>
            </section>

            <section className="bg-sky-600 text-white my-20 py-20 ">
                <div className='w-9/12 mx-auto md:grid grid-cols-2 items-center gap-10'>
                    <div>
                        <h2 className="text-5xl font-extrabold uppercase">AI/ML CONTENT Evaluation</h2>
                        <p className="mt-5 font-bold mb-3">
                            Content is coming alive with Adbhut Media Evaluation, where we intend to bring daily Value driven evaluation to content with quality client pools. Join the pro series!
                        </p>

                        <div className='flex items-center'>
                            <button type="button" class="bg-sky-500 py-1 px-3 rounded text-sm text-white font-semibold mr-2">
                                Join Now!
                            </button>
                            <small className='text-sm font-bold inline-flex flex-col'>
                                Today Joined <br />
                                8/756
                            </small>
                        </div>

                        <div className='border-l-4 pl-2 border-sky-100 font-bold mt-16'>
                            15.07.2022. <br />
                            <small>Adbhut.io</small>
                        </div>
                    </div>
                    <div className='hidden md:block'>
                        <img className="w-4/5 ml-auto rounded-xl" src="https://rush-theme.pxsquad.com/demo1/wp-content/uploads/2022/07/Group.png" alt="" />
                    </div>
                </div>
            </section>


            <section className="w-10/12 md:w-9/12 mx-auto my-20">
                <div className='text-center'>
                    <h2 className="text-5xl font-extrabold">MONTHLY SHOWCASE</h2>
                    <p className="mt-8 font-bold">Top 3 Artists of the month contributing maximum to the fellowship program</p>
                </div>
                <div className="flex flex-col md:flex-row items-end gap-3 mt-16">
                    <div className='relative rounded-2xl h-fit'>
                        <div className='absolute top-0 left-0 p-10 text-white w-full h-full bg-gradient-to-t from-black to-black/40 flex flex-col justify-end rounded-2xl text-center backdrop-blur-lg'>
                            <h4 className='text-xl md:text-2xl font-semibold'>Upcoming</h4>
                            <p className='text-xs font-semibold mt-3'>
                                A mechanical keyboard designed for Valorant, premium piece of gear coming from our partners
                            </p>
                            <a className='mt-4 text-xs block font-semibold uppercase' href="#">TV/OTT show</a>
                        </div>
                        <img className='w-full rounded-2xl' src="https://rush-theme.pxsquad.com/demo1/wp-content/uploads/2022/07/Frame-37-3.jpg" alt="" />
                    </div>
                    <div className='relative rounded-2xl h-fit'>
                        <div className='absolute top-0 left-0 p-10 text-white w-full h-full bg-gradient-to-t from-black to-black/40 flex flex-col justify-end rounded-2xl text-center backdrop-blur-lg'>
                            <h4 className='text-xl md:text-2xl font-semibold'>Upcoming</h4>
                            <p className='text-xs font-semibold mt-3'>
                                A mechanical keyboard designed for Valorant, premium piece of gear coming from our partners
                            </p>
                            <a className='mt-4 text-xs block font-semibold uppercase' href="#">Advertising content</a>
                        </div>
                        <img className='w-full rounded-2xl' src="https://rush-theme.pxsquad.com/demo1/wp-content/uploads/2022/07/Frame-55.jpg" alt="" />
                    </div>
                    <div className='relative rounded-2xl h-fit'>
                        <div className='absolute top-0 left-0 p-10 text-white w-full h-full bg-gradient-to-t from-black to-black/40 flex flex-col justify-end rounded-2xl text-center backdrop-blur-lg'>
                            <h4 className='text-xl md:text-2xl font-semibold'>Upcoming</h4>
                            <p className='text-xs font-semibold mt-3'>
                                A mechanical keyboard designed for Valorant, premium piece of gear coming from our partners
                            </p>
                            <a className='mt-4 text-xs block font-semibold uppercase' href="#">Feature/short films</a>
                        </div>
                        <img className='w-full rounded-2xl' src="https://rush-theme.pxsquad.com/demo1/wp-content/uploads/2022/07/Frame-39-3.jpg" alt="" />
                    </div>
                </div>
            </section>

            {/* <section className="w-10/12 md:w-9/12 mx-auto my-20">
                <div className='cols-span-1 text-center'>
                    <h2 className="text-5xl font-extrabold">TOURNAMENT VENUE</h2>
                    <p className="mt-8 font-bold">We'll be using two locations for the tournament venue depending on the rounds</p>
                </div>
                <div className="grid grid-cols-2 mt-10">
                    <div className='relative'>
                        <div className='absolute top-0 left-0 pb-12 pl-8 text-white w-full h-full bg-gradient-to-t from-black to-black/40 flex flex-col justify-end'>
                            <small className='text-xs w-fit bg-gray-600 text-white font-bold px-2 py-0.5 rounded'>BEST OF OUT 1</small>
                            <h4 className='text-xl md:text-2xl font-semibold'>Upcoming</h4>
                            <p className='text-xs font-semibold'>
                                This map is used for first three rounds.
                            </p>
                        </div>
                        <img className='w-full' src="https://c.files.bbci.co.uk/131CB/production/_106838287_6838286.jpg" alt="" />
                    </div>
                    <div className='relative'>
                        <div className='absolute top-0 left-0 pb-12 pl-8 text-white w-full h-full bg-gradient-to-t from-black to-black/40 flex flex-col justify-end'>
                            <small className='text-xs w-fit bg-gray-600 text-white font-bold px-2 py-0.5 rounded'>BEST OF OUT 1</small>
                            <h4 className='text-xl md:text-2xl font-semibold'>Upcoming</h4>
                            <p className='text-xs font-semibold'>
                                This map is used for first three rounds.
                            </p>
                        </div>
                        <img className='w-full' src="https://c.files.bbci.co.uk/131CB/production/_106838287_6838286.jpg" alt="" />
                    </div>
                </div>
            </section> */}


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