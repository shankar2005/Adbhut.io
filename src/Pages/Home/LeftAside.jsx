import React, { useContext, useEffect, useRef, useState } from 'react';
import { AiOutlineGif } from 'react-icons/ai';
import { BsImageFill } from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im';
import { BsEmojiSmile } from 'react-icons/bs';
import { motion } from "framer-motion"
import { useRootContext } from '../../contexts/RootProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiDelete } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';
import nsnlogo from '../../assets/logo.jpeg';
import ChatHeading from './Components/ChatHeading';
import { openAIMessageAPI, sendMessageAPI } from '../../apis/messages/messages';
import TypingIndicator from '../../Components/TypingIndicator';

const LeftAside = () => {
    const { shortlistedArtist = [], selectedContentProducts, chatLog, setchatLog, setcheckedSkills, setshortlistedArtist, authToken, currentProject, currentProjectsRefetch, handleShowProjectHistory, dreamProjectsRefetch, dropdownDispatch, handleSelectContentProduct, contentProducts, isMobile } = useRootContext();
    const { isAuthenticated, user } = useContext(AuthContext);

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

    const sender = (user.role === "Client" || !isAuthenticated) ? "user" : "bot";

    const artistIDs = shortlistedArtist?.join(",");

    // for showing chat suggestions (artists skills) when shortlisted an artist
    const [suggestions, setSuggestions] = useState([]);
    useEffect(() => {
        // if no selectedContentProducts then don't show skills suggestions
        if (!selectedContentProducts || currentProject?.pk) return;

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
                setSuggestions(data.skills);
                // filter on content products
                setcheckedSkills(data.skills.map(skill => skill[1] + ''));
            });
    }, [selectedContentProducts]);

    // -----------------------------------
    //    handle select skill & content
    // -----------------------------------
    const handleSelectSkill = (skill) => {
        setcheckedSkills([skill[1] + '']);
        // chatlog
        setchatLog(current => [...current, { msgID: current.length + 1, [sender]: skill[0] }]);

        // removing suggested skills after click
        setSuggestions(current => current.filter(i => i[1] + '' !== skill[1] + ''));

        navigate("/artists");
    }

    // handle remove shortlisted artist
    const handleRemoveShortlistedArtist = (msgID, artistID) => {
        // remove chatlog
        setchatLog(current => [...current.filter(msg => msg.msgID !== msgID)]);
        // remove selected artist
        setshortlistedArtist(current => [...current.filter(id => id !== artistID)]);
    }

    const navigate = useNavigate();
    // send brief
    const handleSendBrief = () => {
        if (!isAuthenticated) {
            return dropdownDispatch({ type: "SHOW_LOGIN" });
        }
        fetch('https://dev.nsnco.in/api/v1/create_project/', {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: `token ${authToken}`
            },
            body: JSON.stringify({
                "stage": "Lead",
                "brief": JSON.stringify(chatLog),
                "product": selectedContentProducts,
                "shortlisted_artists": shortlistedArtist
            })
        }).then(res => res.json())
            .then(data => {
                if (data.success) {
                    toast.success(data.success);
                    currentProjectsRefetch();
                    navigate(`/projects/${data.projectId}/Lead/`);
                } else if (data.error) {
                    toast.error(data.error);
                }
            });
    }

    // handle change stage
    const handleChangeStage = () => {
        if (!isAuthenticated) {
            return dropdownDispatch({ type: "SHOW_LOGIN" });
        }
        fetch(`https://dev.nsnco.in/api/v1/edit_project/${currentProject.pk}/`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                Authorization: `token ${authToken}`
            },
            body: JSON.stringify({ stage: "Lead" })
        })
            .then(res => res.json())
            .then(data => {
                handleShowProjectHistory(data?.pk, data?.stage);
                navigate(`/projects/${data?.pk}/${data?.stage}/`);
                currentProjectsRefetch();
                dreamProjectsRefetch();
            })
    }

    const [isTyping, setIsTyping] = useState(false);

    // handle Chat Input
    const userInputRef = useRef();
    const [userInputText, setuserInputText] = useState("");
    const handleChatInput = (e) => {
        setuserInputText(e.target.value);
        // on key enter submit input
        if (e.key === "Enter") {
            handleSendUserInput();
        }
    }
    const handleSendUserInput = () => {
        if (!userInputRef.current.value) {
            userInputRef.current.focus();
            return;
        };
        setIsTyping(true);

        // chatlog
        const message = { msgID: chatLog.length + 1, [sender]: userInputText };
        setchatLog(current => [...current, message]);
        setuserInputText("");
        userInputRef.current.value = "";

        if (isAuthenticated && currentProject?.pk) {
            sendMessageAPI({
                project_id: currentProject.pk,
                message: message
            }).then(data => {
                if (data?.project?.pk) {
                    setchatLog(JSON.parse(data?.project?.brief));
                    setIsTyping(false);
                }
            }).catch((err) => {
                setIsTyping(false);
            })
        } else {
            openAIMessageAPI({
                message: userInputText
            }).then(data => {
                if (data.response) {
                    setchatLog(current => [...current, { msgID: chatLog.length + 1, bot: data.response }]);
                    setIsTyping(false);
                }
            }).catch((err) => {
                setIsTyping(false);
            })
        }

        if (pathname === "/") {
            if (isMobile) {
                navigate("/projects/chat");
            } else {
                navigate("/artists");
            }
        }
    }

    let name;
    if (user.name?.length <= 1) {
        name = user.username;
    } else {
        name = user.name;
    }

    const TypingElement = isTyping &&
        <div className='text-sm flex mb-5'>
            <img className='w-10 h-10' src={nsnlogo} alt="" />
            <div>
                <TypingIndicator />
            </div>
        </div>

    const pathname = useLocation().pathname;

    return (
        <section className='bg-white shadow-md rounded-lg'>
            <ChatHeading
                projectTitle={currentProject?.name}
                handleShowProjectHistory={handleShowProjectHistory}
                currentProject={currentProject}
            />

            <div ref={chatboxRef} className='h-72 overflow-y-scroll overflow-x-hidden p-3 relative'>
                {
                    user.role === "Client" || !isAuthenticated
                        ? <div className='flex flex-col'>
                            <motion.div
                                initial={{ translateX: '-100%' }}
                                animate={{ translateX: '0%' }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className='text-sm flex gap-2 mb-5'>
                                    <img className='w-10 h-10' src={nsnlogo} alt="" />
                                    <div className='mr-12'>
                                        <h4 className='font-medium'>Adbhut.io</h4>
                                        <p className='bg-sky-500 text-white p-3 rounded-bl-lg rounded-br-lg rounded-tr-lg w-fit mb-1'>
                                            Please select any of the content product or send your inputs here to continue
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {
                                chatLog.length > 0 &&
                                chatLog.map((chat, idx) => (
                                    chat.bot ?
                                        <div key={idx} className='text-sm flex gap-2 mb-5'>
                                            <img className='w-10 h-10' src={nsnlogo} alt="" />
                                            <div className='mr-12'>
                                                <h4 className='font-medium'>Adbhut.io</h4>
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={chat.actionResponse && { delay: 0.2 }}
                                                >
                                                    <p className='bg-sky-500 text-white p-3 rounded-bl-lg rounded-br-lg rounded-tr-lg w-fit'>
                                                        {chat.bot}
                                                    </p>
                                                </motion.div>
                                            </div>
                                        </div>
                                        :
                                        <div key={idx} className='text-sm flex gap-2 mb-5 ml-auto'>
                                            <div className='ml-8'>
                                                <h4 className='font-medium text-right'>{name || "Guest Account"}</h4>
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                >
                                                    <p className='w-fit ml-auto bg-sky-100 p-3 rounded-bl-lg rounded-br-lg rounded-tl-lg'>
                                                        {
                                                            chat.user ||
                                                            chat.type === 'shortlistedArtist' &&
                                                            <>Shortlisted <Link to={`/artists/${chat.artist.artistID}/`}><img className='w-8 h-8 inline bg-white object-cover' src={chat.artist.profile_pic} alt="" /> <span className='hover:underline'>{chat.artist.name.split(" ")[0]}</span></Link> <FiDelete onClick={() => handleRemoveShortlistedArtist(chat.msgID, chat.artist.artistID)} className='inline w-5 h-5 cursor-pointer' /></>
                                                        }
                                                    </p>
                                                </motion.div>
                                            </div>
                                            {
                                                isAuthenticated
                                                    ? <img className='w-10 h-10 rounded-full border border-cyan-300' src='https://media.licdn.com/dms/image/C4E03AQECm3P3VuGSNg/profile-displayphoto-shrink_200_200/0/1650625726703?e=1680739200&v=beta&t=Kxqdzo8dg2YRwmiHATynhHCMX7giWstWmIWQkRW89Wo' alt="" />
                                                    : <img className='w-10 h-10 rounded-full' src='https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541' alt="" />
                                            }
                                        </div>
                                ))
                            }


                            {/*  */}
                            {
                                TypingElement
                            }
                            {/*  */}


                        </div>
                        :
                        <div className='flex flex-col'>
                            <div className='text-sm flex gap-2 mb-5 ml-auto'>
                                <motion.div
                                    initial={{ translateX: '100%' }}
                                    animate={{ translateX: '0%' }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <div className='text-sm flex gap-2 mb-5'>
                                        <div className='ml-12'>
                                            <h4 className='font-medium text-right'>Adbhut.io</h4>
                                            <p className='bg-sky-100 w-fit ml-auto  p-3 rounded-bl-lg rounded-br-lg rounded-tl-lg'>
                                                Please select any of the content product or send your inputs here to continue
                                            </p>
                                        </div>
                                        <img className='w-10 h-10' src={nsnlogo} alt="" />
                                    </div>
                                </motion.div>
                            </div>
                            {
                                chatLog.length > 0 &&
                                chatLog.map((chat, idx) => (
                                    chat.user ?
                                        <div key={idx} className='text-sm flex gap-2 mb-5'>
                                            <img className='w-10 h-10' src="https://media.licdn.com/dms/image/C4E03AQECm3P3VuGSNg/profile-displayphoto-shrink_200_200/0/1650625726703?e=1680739200&v=beta&t=Kxqdzo8dg2YRwmiHATynhHCMX7giWstWmIWQkRW89Wo" alt="" />
                                            <div className='mr-12'>
                                                <h4 className='font-medium'>{currentProject?.client_details?.name}</h4>
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={chat.actionResponse && { delay: 0.2 }}
                                                >
                                                    <p className='bg-sky-500 text-white p-3 rounded-bl-lg rounded-br-lg rounded-tr-lg w-fit'>
                                                        {chat.user}
                                                    </p>
                                                </motion.div>
                                            </div>
                                        </div>
                                        :
                                        <div key={idx} className='text-sm flex gap-2 mb-5 ml-auto'>
                                            <div className='ml-8'>
                                                <h4 className='font-medium text-right'>Adbhut.io</h4>
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                >
                                                    <p className='w-fit ml-auto bg-sky-100 p-3 rounded-bl-lg rounded-br-lg rounded-tl-lg'>
                                                        {
                                                            chat.bot ||
                                                            chat.type === 'shortlistedArtist' &&
                                                            <>Shortlisted <Link to={`/artists/${chat.artist.artistID}`}><img className='w-8 h-8 inline bg-white object-cover' src={chat.artist.profile_pic} alt="" /> <span className='hover:underline'>{chat.artist.name.split(" ")[0]}</span></Link> <FiDelete onClick={() => handleRemoveShortlistedArtist(chat.msgID, chat.artist.artistID)} className='inline w-5 h-5 cursor-pointer' /></>
                                                        }
                                                    </p>
                                                </motion.div>
                                            </div>
                                            <img className='w-10 h-10 rounded-full border border-cyan-300' src={nsnlogo} alt="" />
                                        </div>
                                ))
                            }


                            {/*  */}
                            {
                                TypingElement
                            }
                            {/*  */}


                        </div>
                }


                {
                    suggestions.length > 0 &&
                    <div className='flex skillScroll overflow-x-scroll pb-2 gap-2 text-sm font-medium select-none'>
                        {
                            suggestions &&
                            suggestions.map(skill => <div
                                onClick={() => handleSelectSkill(skill)}
                                key={`suggestedSkill${skill[1]}`}
                                className='whitespace-nowrap py-1 px-3 border text-blue-500 border-blue-500 rounded-full cursor-pointer hover:bg-blue-100'>
                                {skill[0]}
                            </div>)
                        }
                    </div>
                }
                {
                    suggestions.length === 0 && contentProducts.length > 0 && !selectedContentProducts && shortlistedArtist.length === 0 && chatLog.length === 0 &&
                    <div className='flex flex-wrap pb-2 gap-2 text-sm font-medium select-none absolute bottom-0'>
                        {
                            contentProducts.map(contentProduct => <div
                                onClick={() => handleSelectContentProduct(contentProduct)}
                                key={contentProduct.pk}
                                className='whitespace-nowrap py-1 px-3 border text-gray-500 border-gray-500 rounded-full cursor-pointer hover:bg-blue-100'>
                                {contentProduct.name}
                            </div>)
                        }
                    </div>
                }
            </div>

            <div className='p-3 border-t-[3px] border-gray-300'>
                <textarea ref={userInputRef} onKeyUp={handleChatInput} className="p-2 rounded-lg bg-gray-100 w-full focus:outline-none text-sm" rows="4" placeholder='Start a briefing...'></textarea>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-2'>
                        <BsEmojiSmile />
                        <ImAttachment />
                        <BsImageFill />
                        <AiOutlineGif />
                    </div>
                    {
                        userInputText ?
                            <div className='space-x-1'>
                                <button onClick={handleSendUserInput} className='bg-sky-500 text-white py-[3px] px-3 rounded-full text-sm'>Send</button>
                            </div>
                            :
                            shortlistedArtist[0] || selectedContentProducts || typeof currentProject?.pk === "number"
                                ?
                                <div className='space-x-1'>
                                    {
                                        currentProject?.pk && currentProject?.stage !== "DreamProject" ?
                                            <button onClick={handleSendBrief} className='bg-sky-500 text-white py-[3px] px-3 rounded-full text-sm'>
                                                Update Brief
                                            </button>
                                            // below logic means if we have currentProject && if it's stage is Dream then we will let user to sendBrief(with handleChangeStage)
                                            : <button onClick={currentProject?.stage === "DreamProject" ? handleChangeStage : handleSendBrief} className='bg-sky-500 text-white py-[3px] px-3 rounded-full text-sm'>
                                                Send Brief
                                            </button>
                                    }
                                </div>
                                :
                                <button disabled className='bg-gray-300 text-gray-400 py-[3px] px-3 rounded-full text-sm'>Send Brief</button>
                    }
                </div>
            </div>
        </section>
    );
};

export default LeftAside;