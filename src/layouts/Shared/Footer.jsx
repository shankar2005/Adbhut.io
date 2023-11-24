import { IoLocationSharp } from 'react-icons/io5';
import { IoMdCall } from 'react-icons/io';
import { FaEnvelope } from 'react-icons/fa';
import Team from '../../Pages/Home/Sections/Team';
import Modal from '../../Components/Modal/Modal';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import swaraj from "../../assets/logos/Swaraj.png"

const Footer = () => {
    const [isShowMentor, setIsShowMentor] = useState(false);

    return (
        <footer className='bg-slate-800 text-white'>
            <div className='w-10/12 max-w-screen-xl mx-auto py-8 grid grid-cols-12 justify-between gap-y-8'>
                <div className='col-span-8 md:col-span-4'>
                    <h2 className='uppercase text-sm font-medium mb-4'>Product By</h2>
                    <img className='w-24' src={swaraj} alt="" />
                    <p className='mt-4 text-sm'>
                        26, 2nd Main Road Perumalnagar, <br />
                        Old Pallavaram, Chennai - 600117 <br />
                        India
                    </p>
                </div>
                <div className='col-span-4 md:col-span-4'>
                    <h1 className='uppercase text-sm font-medium mb-4'>Links</h1>
                    <ul className='text-sm space-y-2'>
                        <li onClick={() => setIsShowMentor(true)} className='hover:underline w-fit cursor-pointer'>Our Team</li>
                        <li className='hover:underline w-fit'><Link to="/artists">Artists</Link></li>
                        <li className='hover:underline w-fit'><a target="_blank" href='https://www.linkedin.com/company/the-happy-hippies-show'>Hiring</a></li>
                    </ul>
                </div>
                <div className='col-span-full md:col-span-4'>
                    <h1 className='uppercase text-sm font-medium mb-4'>Contact</h1>
                    <div className='space-y-5'>
                        <div className='flex gap-4 items-center'>
                            <div className='bg-slate-700 p-3 rounded-full flex justify-center items-center'>
                                <FaEnvelope size={16} />
                            </div>
                            <div>
                                <h4 className='font-medium text-xl'>Email:</h4>
                                <p className='text-sm'>entertain@NsNco.in</p>
                            </div>
                        </div>
                        <div className='flex gap-4 items-center'>
                            <div className='bg-slate-700 p-3 rounded-full flex justify-center items-center'>
                                <IoMdCall size={20} />
                            </div>
                            <div>
                                <h4 className='font-medium text-xl'>Call:</h4>
                                <p className='text-sm'>+91 8800 2072 99</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='py-2 text-center text-neutral-400 text-sm font-hero'>
                &copy; Swaraj Enterprises Technologies Pvt Ltd
            </div>

            {isShowMentor && <Modal onClick={() => setIsShowMentor(false)} className="w-10/12 overflow-auto"><Team /></Modal>}
        </footer>
    );
};

export default Footer;