import React, { useContext, useEffect, useRef, useState } from 'react';
import { AiOutlineGif, AiOutlinePlus } from 'react-icons/ai';
import { BsImageFill } from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im';
import { BsEmojiSmile } from 'react-icons/bs';
import { useRootContext } from '../../contexts/RootProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import nsnlogo from '../../assets/logo.jpeg';
import ChatHeading from './Chat/ChatHeading';
import { openAIMessageAPI, sendMessageAPI } from '../../apis/messages/messages';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import MessageReceiver from './Chat/MessageReceiver';
import avatar from "../../assets/placeholders/avatar.png";
import MessageSender from './Chat/MessageSender';

const ChatboxHome = () => {
    const { selectedContentProducts, chatLog, setchatLog, currentProject, handleShowProjectHistory, handleSelectContentProduct, contentProducts, isFullTime, isMobile } = useRootContext();
    const { isAuthenticated, user } = useContext(AuthContext);

    const sender = (user.role === "Client" || !isAuthenticated) ? "user" : "bot";

    const navigate = useNavigate();

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
                }
            }).catch((err) => {
            })
        } else {
            openAIMessageAPI({
                message: userInputText
            }).then(data => {
                if (data.response) {
                    setchatLog(current => [...current, { msgID: chatLog.length + 1, bot: data.response }]);
                }
            }).catch((err) => {
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

    const pathname = useLocation().pathname;

    return (
        <>
            <section className='bg-white shadow-md rounded-lg'>
                <ChatHeading
                    projectTitle={currentProject?.name}
                    handleShowProjectHistory={handleShowProjectHistory}
                    currentProject={currentProject}
                />

                <div ref={chatboxRef} className='h-72 overflow-y-scroll overflow-x-hidden p-3 relative'>
                    <div className='flex flex-col'>
                        <MessageReceiver
                            key={isFullTime ? "visible" : "hidden"}
                            image={nsnlogo}
                            name="Adbhut.io"
                            text={`Hello, I'm Adbhut. Lets ${isFullTime ? "Hire" : "Create"}!`}
                        />

                        {
                            chatLog.length > 0 &&
                            chatLog.map((chat, idx) => (
                                chat.bot
                                    ? <MessageReceiver
                                        key={idx}
                                        image={nsnlogo}
                                        name="Adbhut.io"
                                        text={chat.bot}
                                    />
                                    : <MessageSender
                                        key={idx}
                                        image={avatar}
                                        name={name || "Guest Account"}
                                        text={chat.user}
                                    />
                            ))
                        }
                    </div>

                    {
                        contentProducts.length > 0 &&
                        <div className='contentProducts text-center select-none mt-14'>
                            <Swiper
                                spaceBetween={5}
                                slidesPerView={4}
                                modules={[Navigation]}
                                navigation
                                className='px-3'
                            >
                                <SwiperSlide>
                                    <Link to="/projects/create-project">
                                        <div className='group flex flex-col gap-2 items-center'>
                                            <div className='border rounded-md h-[76px] w-[76px] flex items-center justify-center'>
                                                <AiOutlinePlus className='group-hover:scale-110 duration-150 overflow-hidden text-gray-600' size={40} />
                                            </div>
                                            <p className='text-[0.6rem] leading-tight'>New Project</p>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                                {
                                    contentProducts?.map(content => (
                                        <SwiperSlide key={content.pk}>
                                            <div onClick={() => {
                                                handleSelectContentProduct(content)
                                                if (isMobile) {
                                                    navigate("/projects/chat");
                                                } else {
                                                    navigate("/artists");
                                                }
                                            }} className='group flex flex-col items-center gap-2 text-gray-700 cursor-pointer'>
                                                <div className={`${currentProject?.project_template === content.pk || selectedContentProducts === content.pk ? 'w-20 h-20' : 'w-[75px] h-[75px]'} p-1 border rounded-md`}>
                                                    <img className='group-hover:scale-110 duration-150 overflow-hidden' src={content.weblink} />
                                                </div>
                                                <p className={`${currentProject?.project_template === content.pk || selectedContentProducts === content.pk && 'text-blue-600 font-medium'} text-[0.6rem] leading-tight`}>{content.name}</p>
                                            </div>
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
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
                            userInputText
                                ? <button onClick={handleSendUserInput} className='bg-sky-500 text-white py-[3px] px-3 rounded-full text-sm'>Send</button>
                                : <button disabled className='bg-gray-300 text-gray-400 py-[3px] px-3 rounded-full text-sm'>Send</button>
                        }
                    </div>
                </div>
            </section>
        </>
    );
};

export default ChatboxHome;