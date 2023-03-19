import React from 'react';
import fb from '../../assets/ui/facebook (1).png';
import gmail from '../../assets/ui/gmail.png';
import instagram from '../../assets/ui/instagram.png';
import linkedin from '../../assets/ui/linkedin.png';
import logo from '../../assets/thhs.png';
import { useState } from 'react';
import { useEffect } from 'react';
import { FcShare } from 'react-icons/fc';
import InviteModal from './Components/InviteModal';

const Navbar = () => {
    const [navSize, setnavSize] = useState("10rem");
    const [navColor, setnavColor] = useState("transparent");
    const listenScrollEvent = () => {
        window.scrollY > 10 ? setnavColor("#252734") : setnavColor("transparent");
        window.scrollY > 10 ? setnavSize("5rem") : setnavSize("5rem");
    };
    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent);
        return () => {
            window.removeEventListener("scroll", listenScrollEvent);
        };
    }, []);

    const inviteURL = `https://adbhut.io/invite`;
    const [state, setState] = useState({ value: inviteURL, copied: false, });
    const [inviteFriendsModal, setInviteFriendsModal] = useState(false);

    return (
        <nav style={{
            backgroundColor: navColor,
            height: navSize,
            transition: "all 0.5s"
        }} className="fixed z-40 w-full top-0 left-0 py-4 px-6 shadow-lg">
            <div className='w-11/12 max-w-screen-xl mx-auto flex gap-8 justify-between items-center'>
                <img className='w-72' src={logo} alt="" />
                <div className='hidden md:flex gap-6'>
                    <a className='hover:scale-125 duration-150' target="_blank" href='https://www.linkedin.com/company/the-happy-hippies-show'><img className='w-8' src={linkedin} alt="" /></a>
                    <a className='hover:scale-125 duration-150' target="_blank" href='https://www.facebook.com/happy.hippie.969/'><img className='w-8' src={fb} alt="" /></a>
                    <a className='hover:scale-125 duration-150' target="_blank" href='mailto:happyhippie@thhs.in'><img className='w-8' src={gmail} alt="" /></a>
                    <a className='hover:scale-125 duration-150' target="_blank" href='https://www.instagram.com/thehappyhippiesshow/?hl=en'><img className='w-8' src={instagram} alt="" /></a>
                    <button onClick={() => setInviteFriendsModal(true)} className='hover:scale-125 duration-150'><FcShare size={35} /></button>
                </div>
                <div className='md:hidden fixed right-0 top-1/4 z-40'>
                    <a className='block p-0.5 border border-purple-400 backdr border-b-0 border-r-0 rounded-l' target="_blank" href='https://www.linkedin.com/company/the-happy-hippies-show'><img className='w-8' src={linkedin} alt="" /></a>
                    <a className='block p-0.5 border border-purple-400 backdr border-b-0 border-r-0 rounded-l' target="_blank" href='https://www.facebook.com/happy.hippie.969/'><img className='w-8' src={fb} alt="" /></a>
                    <a className='block p-0.5 border border-purple-400 backdr border-b-0 border-r-0 rounded-l' target="_blank" href='mailto:happyhippie@thhs.in'><img className='w-8' src={gmail} alt="" /></a>
                    <a className='block p-0.5 border border-purple-400 backdr border-b-0 border-r-0 rounded-l' target="_blank" href='https://www.instagram.com/thehappyhippiesshow/?hl=en'><img className='w-8' src={instagram} alt="" /></a>
                    <button onClick={() => setInviteFriendsModal(true)} className='block border border-purple-400 backdr rounded-l border-r-0'><FcShare size={35} /></button>
                </div>
            </div>

            <InviteModal
                modal={inviteFriendsModal}
                setModal={setInviteFriendsModal}
                setState={setState}
                inviteURL={inviteURL}
                state={state}
            />
        </nav>
    );
};

export default Navbar;