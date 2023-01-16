import React, { useEffect, useRef, useState } from 'react';
import avatar from '../../assets/placeholders/avatar.png';
import { AiOutlineGif } from 'react-icons/ai';
import { BsImageFill, BsThreeDots } from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im';
import { BsEmojiSmile } from 'react-icons/bs';
import { motion } from "framer-motion"

const LeftAside = ({ shortlistedArtist, selectedContentProducts, setselectedContentProducts, chatLog, setchatLog, setcheckedSkills }) => {
    const chatboxRef = useRef();
    useEffect(() => {
        const chatboxElement = chatboxRef.current;
        chatboxElement.scrollTo(0, chatboxElement.scrollHeight);
    }, [])

    useEffect(() => {
        if (chatboxRef) {
            chatboxRef.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
        }
    }, [])

    const artistIDs = shortlistedArtist?.map(artist => artist.artistID).join(",");

    // for showing chat suggestions (artists skills) when shortlisted an artist
    const [skills, setSkills] = useState([]);
    const [contentProducts, setcontentProducts] = useState([]);
    useEffect(() => {
        fetch('https://dev.nsnco.in/api/v1/chatflow_skills/', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                artists: artistIDs,
                product: selectedContentProducts || 0
            })
        })
            .then(res => res.json())
            .then(data => {
                setSkills(data.skills);
                setcontentProducts(data.projects);
                // filter on content products
                setcheckedSkills(data.skills.map(skill => skill[1] + ''));
            });
    }, [shortlistedArtist, selectedContentProducts]);

    // ------------------------------
    //      handle select skill & content
    // -------------------------------
    const handleSelectSkill = (skill) => {
        setcheckedSkills([skill[1] + '']);
        // chatlog
        setchatLog(current => [...current, { msgID: current.length + 1, user: skill[0] }]);
    }
    const handleSelectContent = (content) => {
        setselectedContentProducts(content[1] + '');
        // chatlog
        setchatLog(current => [...current, { msgID: current.length + 1, user: content[0] }]);
    }

    return (
        <>
            <section className='bg-white shadow-md rounded-lg'>
                <div className='border-b shadow-sm p-3 rounded-t-lg flex items-center justify-between'>
                    <h4 className='font-medium'>Project Servicing Chat</h4>
                    <BsThreeDots className='cursor-pointer' />
                </div>

                <div ref={chatboxRef} className='h-96 overflow-y-scroll overflow-x-hidden p-3'>
                    <div className='flex flex-col'>
                        <motion.div
                            initial={{ translateX: '-100%' }}
                            animate={{ translateX: '0%' }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className='text-sm flex gap-2 mb-5'>
                                <img className='w-10 h-10' src="https://media.licdn.com/dms/image/D4D0BAQErxzI3ZO8CEA/company-logo_200_200/0/1665423690851?e=2147483647&v=beta&t=lNNe6O9RDmoigkZam6o8yn-abUNDT-L_F2MCusFSQ3E" alt="" />
                                <div className='mr-12'>
                                    <h4 className='font-medium'>NsN Co Servicing</h4>
                                    <p className='bg-sky-500 text-white p-3 rounded-bl-lg rounded-br-lg rounded-tr-lg mb-1'>
                                        Please shortlist an artist, skill or content product or send your inputs here
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                        {
                            chatLog &&
                            chatLog.map(chat => (
                                chat.bot ?
                                    <div className='text-sm flex gap-2 mb-5'>
                                        <img className='w-10 h-10' src="https://media.licdn.com/dms/image/D4D0BAQErxzI3ZO8CEA/company-logo_200_200/0/1665423690851?e=2147483647&v=beta&t=lNNe6O9RDmoigkZam6o8yn-abUNDT-L_F2MCusFSQ3E" alt="" />
                                        <div className='mr-12'>
                                            <h4 className='font-medium'>NsN Co Servicing</h4>
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={chat.actionResponse && { delay: 0.2 }}
                                            >
                                                <p className='bg-sky-500 text-white p-3 rounded-bl-lg rounded-br-lg rounded-tr-lg mb-1'>
                                                    {chat.bot}
                                                </p>
                                            </motion.div>
                                        </div>
                                    </div>
                                    :
                                    <div className='text-sm flex gap-2 mb-5 ml-auto'>
                                        <div>
                                            <h4 className='font-medium'>Md Maruf Hossain</h4>
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                            >
                                                <p className='w-fit ml-auto bg-sky-100 p-3 rounded-bl-lg rounded-br-lg rounded-tl-lg mb-1'>
                                                    {chat.user}
                                                </p>
                                            </motion.div>
                                        </div>
                                        <img className='w-10 h-10' src={avatar} alt="" />
                                    </div>
                            ))
                        }
                    </div>

                    <div className='flex flex-wrap gap-2 text-sm font-medium mt-8 select-none'>
                        {
                            skills &&
                            skills.map(skill => <div
                                onClick={() => handleSelectSkill(skill)}
                                key={`suggested-skill${skill[1]}`}
                                className='py-1 px-3 border text-blue-500 border-blue-500 rounded-full cursor-pointer hover:bg-blue-100'>
                                {skill[0]}
                            </div>)
                        }
                        {
                            contentProducts &&
                            contentProducts.map(contentProduct => <div
                                onClick={() => handleSelectContent(contentProduct)}
                                key={`suggested-content${contentProduct[1]}`}
                                className='py-1 px-3 border text-gray-500 border-gray-500 rounded-full cursor-pointer hover:bg-blue-100'>
                                {contentProduct[0]}
                            </div>)
                        }
                    </div>
                </div>

                <div className='p-3 border-t-[3px] border-gray-300'>
                    <textarea name="" className="p-2 rounded-lg border border-blue-500 w-full focus:outline-none" rows="4" placeholder='Start a briefing...' ></textarea>
                    <div className='flex justify-between items-center'>
                        <div className='flex gap-2'>
                            <BsEmojiSmile />
                            <ImAttachment />
                            <BsImageFill />
                            <AiOutlineGif />
                        </div>
                        {
                            shortlistedArtist[0] || selectedContentProducts
                                ?
                                <div className='space-x-1'>
                                    <button className='bg-sky-500 text-white py-[3px] px-3 rounded-full text-sm'>Add to Dream Project</button>
                                    <button className='bg-sky-500 text-white py-[3px] px-3 rounded-full text-sm'>Send Brief</button>
                                </div>
                                :
                                <div className='space-x-1'>
                                    <button disabled className='bg-gray-300 text-gray-400 py-[3px] px-3 rounded-full text-sm'>Add to Dream Project</button>
                                    <button disabled className='bg-gray-300 text-gray-400 py-[3px] px-3 rounded-full text-sm'>Send Brief</button>
                                </div>
                        }
                    </div>
                </div>
            </section>
        </>
    );
};

export default LeftAside;