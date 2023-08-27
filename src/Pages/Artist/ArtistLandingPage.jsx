import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from "../../assets/logos/adbhutGIF.gif"
import { showLogin } from '../../features/dropdown/dropdownSlice';
import AuthModal from '../Auth/Components/AuthModal';

const ArtistLandingPage = () => {
    const dispatch = useDispatch();

    return (
        <div className='font-hero'>
            {/* auth modal */}
            <AuthModal />

            <header>
                <nav className='p-5 flex justify-between items-center'>
                    <Link to="/">
                        <img className="w-32 rounded-sm" src={logo} alt="" />
                        {/* <h5 className='text-xl font-bold'>Adbhut.io</h5> */}
                    </Link>
                    <ul className='flex gap-x-8 items-center'>
                        <li>
                            <button onClick={() => dispatch(showLogin())} type="button" class="bg-gradient-to-r from-pink-500 to-yellow-500 py-2 px-4 rounded font-semibold text-white">
                                Login
                            </button>
                        </li>
                    </ul>
                </nav>

                <div className='px-32 space-y-5 flex flex-col justify-center items-center'>
                    <h1 className='text-[8rem] leading-tight font-bold text-hero'>
                        Content Hub <br />
                        For Creators
                    </h1>
                    <p className='text-xl'>Earn via brand integrations in your content</p>
                    <Link to="/artist/dashboard" className="block w-fit">
                        <button type="button" class="bg-gradient-to-r from-pink-500 to-yellow-500 py-3 px-6 rounded font-semibold text-white">
                            Get Started
                        </button>
                    </Link>
                </div>
            </header>

            <section className='mt-40'>
                <h3 className='text-4xl font-bold text-center mb-10'>Content you can upload to start earning</h3>
                <div className='w-10/12 mx-auto grid grid-cols-3 gap-5 mb-10'>
                    <div className='bg-gradient-to-b from-pink-500 to-yellow-300 p-5 flex flex-col justify-between gap-y-3 rounded-xl shadow-lg'>
                        <h2 className="text-xl font-bold text-white">12 TV/OTT show worthy synopsis scripts (with demo episode, and/or full-length scripts)</h2>
                        <img src="https://cdn.dribbble.com/userupload/8672208/file/original-405339f7a5e65e2e82509593398209ef.png?resize=1024x687&vertical=center" alt="" />
                        <button type="button" class="bg-white py-3 px-6 rounded text-black font-bold">
                            Apply Now
                        </button>
                    </div>
                    <div className='bg-gradient-to-b from-pink-500 to-yellow-300 p-5 flex flex-col justify-between gap-y-3 rounded-xl shadow-lg'>
                        <h2 className="text-xl font-bold text-white">12+ advertising short content showcases done for the industry</h2>
                        <img src="https://cdn.dribbble.com/userupload/8672208/file/original-405339f7a5e65e2e82509593398209ef.png?resize=1024x687&vertical=center" alt="" />
                        <button type="button" class="bg-white py-3 px-6 rounded text-black font-bold">
                            Apply Now
                        </button>
                    </div>
                    <div className='bg-gradient-to-b from-pink-500 to-yellow-300 p-5 flex flex-col justify-between gap-y-3 rounded-xl shadow-lg'>
                        <h2 className="text-xl font-bold text-white">12+ OTT worthy feature/short films synopsis (with full-length scripts)</h2>
                        <img src="https://cdn.dribbble.com/userupload/8672208/file/original-405339f7a5e65e2e82509593398209ef.png?resize=1024x687&vertical=center" alt="" />
                        <button type="button" class="bg-white py-3 px-6 rounded text-black font-bold">
                            Apply Now
                        </button>
                    </div>
                </div>
            </section>

            <section className="w-10/12 gap-28 max-w-screen-xl mx-auto flex flex-col md:flex-row items-center py-20">
                <div className="text-center md:text-left">
                    <h2 className='text-4xl font-bold mb-10'>
                        Requested task
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 mt-12 gap-5">
                        <div className="bg-secondary p-5 rounded-xl flex items-start gap-2.5">
                            <img src="https://edvive.netlify.app/assets/Star-af99be9c.svg" alt="" />
                            <div>
                                <h3 className="font-extrabold text-xl font-theme mb-2">Tech-Powered Media Cases</h3>
                                <p className="text-muted">An Introduction: Students can be speaking on case studies with use of technology in media.</p>
                            </div>
                        </div>
                        <div className="bg-secondary p-5 rounded-xl flex items-start gap-2.5">
                            <img src="https://edvive.netlify.app/assets/Star-af99be9c.svg" alt="" />
                            <div>
                                <h3 className="font-extrabold text-xl font-theme mb-2">Sales Funnel Mastery</h3>
                                <p className="text-muted">Teaching to Build Sales Funnel to Other Students: Using Apollo.io subscription (Rs8000/ Month) &
                                    Gmass learning setting online sales funnel (I have a set training module).</p>
                            </div>
                        </div>
                        <div className="bg-secondary p-5 rounded-xl flex items-start gap-2.5">
                            <img src="https://edvive.netlify.app/assets/Star-af99be9c.svg" alt="" />
                            <div>
                                <h3 className="font-extrabold text-xl font-theme mb-2">Brand-Building Initiative</h3>
                                <p className="text-muted">Student's Contribution: After classes give two hours to searching brands from APOLLO.IO. Setting a
                                    Gmass mass mailer campaign for automation of our marketing efforts. Record the efforts, edit and publish</p>
                            </div>
                        </div>
                        <div className="bg-secondary p-5 rounded-xl flex items-start gap-2.5">
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
            </section>
        </div>
    );
};

export default ArtistLandingPage;