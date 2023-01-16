import React from 'react';
import { toast } from 'react-hot-toast';
import { AiFillLinkedin, AiOutlineInstagram } from 'react-icons/ai';
import { FiArrowLeft, FiDelete } from 'react-icons/fi';

const ViewArtistModal = ({ modal, setModal, viewArtist, setviewArtist, setshortlistedArtist, shortlistedArtist, setchatLog }) => {
    const { artistID, name, email, profile_pic, phone, skills, social } = viewArtist;

    const handleCloseModal = () => {
        setviewArtist(null);
        setModal(false);
    }

    const handleRemoveShortlistedArtist = msgID => {
        // remove chatlog
        setchatLog(current => [...current.filter(msg => msg.msgID !== msgID)]);
        // remove selected artist
        setshortlistedArtist(current => [...current.filter(artist => artist.artistID !== artistID)]);
    }

    const handleShortlist = () => {
        const isExist = shortlistedArtist.find(artist => artist.artistID === artistID);
        if (!isExist) {
            setshortlistedArtist(current => [...current, { name, artistID }]);
            // chatlog
            setchatLog(current => [...current, { msgID: current.length + 1, bot: <>You've shortlisted <img className='w-8 h-8 inline bg-white object-cover' src={profile_pic} alt="" /> {name} <FiDelete onClick={() => handleRemoveShortlistedArtist(current.length + 1)} className='inline w-5 h-5 cursor-pointer' /></> }]);
        } else {
            toast('Already shortlisted');
        }
        handleCloseModal();
    }

    return (
        <div className={`${modal ? 'fixed' : 'hidden'} z-50 top-0 left-0 bg-black bg-opacity-70 w-full h-screen flex items-center justify-center`}>
            <div className='bg-white max-w-screen-sm mx-5 rounded-lg text-black p-10 relative'>
                <div className='flex items-center gap-5 mb-7'>
                    <FiArrowLeft onClick={handleCloseModal} className='w-6 h-6 text-blue-500 cursor-pointer' />
                    <div className='text-gray-700'>
                        <h1 className='text-2xl font-medium'>Profile for {name}</h1>
                        <p>This is a profile page. Easy to shortlist</p>
                    </div>
                    <button onClick={handleShortlist} className='ml-auto text-blue-500 border-2 border-blue-500 hover:bg-sky-100 hover:border-sky-100 py-3 px-4 rounded-lg font-medium'>Shortlist</button>
                </div>
                <div className='relative'>
                    <img className='w-full h-[200px] rounded-lg' src="https://deepcreekcenter.com/wp-content/uploads/2017/08/btx-placeholder-04-6.jpg" alt="" />
                    <img className='w-36 h-36 object-cover absolute top-1/2 left-5 rounded-lg bg-white' src={profile_pic} alt="" />
                    <div className='flex gap-1 text-gray-500 absolute -bottom-10 right-0'>
                        {social?.instagram && <a target="_blank" href={social.instagram}><AiOutlineInstagram className='w-8 h-8' /></a>}
                        {social?.facebook && <a target="_blank" href={social.facebook}><AiFillLinkedin className='w-8 h-8' /></a>}
                    </div>
                </div>
                <div className='mt-16'>
                    <div className='flex gap-1 items-center'>
                        <h4 className='text-lg font-medium'>{name}</h4>
                        <img className='w-5' src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/800px-Twitter_Verified_Badge.svg.png" alt="" />
                    </div>
                    <p className='text-gray-500 text-sm'>
                        Vestibulum rutrum rutrum neque. Aenean auctor gravida sem quam pede lobortis ligula, sit amet eleifend.
                        Product Infrastructure
                    </p>
                    <div className='flex flex-wrap gap-2 text-sm font-medium mt-3'>
                        {
                            skills?.map((skill, idx) => <div key={`skills${idx}`} className='py-1 px-3 border text-gray-500 border-gray-500 rounded-full'>{skill}</div>)
                        }
                    </div>
                    <div className='flex gap-2 text-sm font-medium mt-8'>
                        <div className='py-1 px-3 border bg-blue-500 text-white rounded-lg'>Follow</div>
                        <div className='py-1 px-3 border text-blue-600 border-blue-500 rounded-lg'>View Profile</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewArtistModal;