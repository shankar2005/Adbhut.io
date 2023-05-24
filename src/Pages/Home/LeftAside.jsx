import { useEffect, useRef, useState } from 'react';
import { AiOutlineGif } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';
import { BsFillMicFill, BsImageFill } from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im';
import { BsEmojiSmile } from 'react-icons/bs';
import { useRootContext } from '../../contexts/RootProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import nsnlogo from '../../assets/logos/adbeta.jpeg';
import ChatHeading from './Chat/ChatHeading';
import TypingIndicator from '../../Components/TypingIndicator';
import { useDispatch, useSelector } from 'react-redux';
import { useSendMessageMutation, useSendMessageToGPTMutation } from '../../features/chat/chatApi';
import { useCreateProjectMutation, useUpdateProjectMutation, useUploadDemoMutation } from '../../features/project/projectApi';
import { showLogin } from '../../features/dropdown/dropdownSlice';
import { addChatLog, setChatLog } from '../../features/project/projectSlice';
import GetProjectReference from './Chat/GetProjectReference';
import { RiRefreshLine } from 'react-icons/ri';
import ChatCallToAction from './Components/ChatCallToAction';
import Message from './Chat/Message';

const LeftAside = () => {
    const { handleSelectContentProduct, contentProducts, isMobile, suggestions, avatar, currentProjectRefetch } = useRootContext();

    const dispatch = useDispatch();
    const [createProject] = useCreateProjectMutation();
    const [updateProject] = useUpdateProjectMutation();
    const { user } = useSelector(state => state.auth);
    const currentProject = useSelector(state => state.project);

    const { chatLog, shortlistedArtists, selectedContentProduct, reference_links, referenceLinksHasTaken } = useSelector(state => state.project);

    const [sendMessageToGPT] = useSendMessageToGPTMutation();
    const [sendMessage] = useSendMessageMutation();

    const navigate = useNavigate();
    const pathname = useLocation().pathname;

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

    const sender = (user.role === "Client" || !user.email) ? "user" : "bot";

    // send brief
    const handleSendBrief = () => {
        if (!user.email) {
            return dispatch(showLogin());
        }

        if (!referenceLinksHasTaken) {
            setShowProjectReferenceLinkInput(true);
            return
        }

        createProject({
            "stage": "Lead",
            "brief": JSON.stringify(chatLog),
            "project_template": selectedContentProduct,
            "shortlisted_artists": shortlistedArtists,
            "reference_links": JSON.stringify(reference_links)
        })
            .then(response => {
                const data = response.data;
                toast.success("Project created successfully!");
                navigate(`/projects/${data.pk}/`);
            })
    }

    // handle change stage
    const handleChangeStage = () => {
        if (!user.email) {
            return dispatch(showLogin());
        }
        updateProject({
            id: currentProject.pk,
            data: { stage: "Lead" }
        }).then(response => {
            const data = response.data;
            navigate(`/projects/${data?.pk}`);
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
        user?.role === "Client" && isON && setIsTyping(true);

        // chatlog
        const message = { msgID: chatLog.length + 1, [sender]: userInputText };
        dispatch(addChatLog(message));
        setuserInputText("");
        userInputRef.current.value = "";

        if (user.email && currentProject?.pk) {
            sendMessage({
                project_id: currentProject.pk,
                message: message
            }).then(response => {
                const data = response.data;
                if (data?.project?.pk) {
                    dispatch(setChatLog(JSON.parse(data?.project?.brief)));
                    setIsTyping(false);
                }
            }).catch((err) => {
                setIsTyping(false);
            })
        } else {
            sendMessageToGPT({
                message: userInputText
            }).then(response => {
                const data = response.data;
                if (data?.response) {
                    dispatch(addChatLog({ msgID: chatLog.length + 1, bot: data?.response }));
                    setIsTyping(false);
                }
            }).catch((err) => {
                setIsTyping(false);
            })
        }

        //this logic might be assist with chathome
        if (pathname === "/") {
            if (isMobile) {
                navigate("/projects/chat");
            } else {
                navigate("/artists");
            }
        }
    }

    let name = user.name?.length > 2 ? user.name : user.email;

    const TypingElement = isTyping &&
        <div className='text-sm flex mb-5'>
            <img className='w-10 h-10' src={nsnlogo} alt="" />
            <div>
                <TypingIndicator />
            </div>
        </div>

    const [showProjectReferenceLinkInput, setShowProjectReferenceLinkInput] = useState(false);

    const [isON, setIsON] = useState(currentProject?.chatbot_status?.status === "ON");
    useEffect(() => {
        setIsON(currentProject?.chatbot_status?.status === "ON");
    }, [currentProject])


    // file uploading functionality
    const [file, setFile] = useState(null);
    const [uploadDemo] = useUploadDemoMutation();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleSubmit = (e) => {
        const formData = new FormData();
        formData.append("document", file);
        formData.append("project", currentProject?.pk);
        formData.append("status", "Selected");

        uploadDemo(formData)
            .then(data => {
                setFile(null);
            })
    }

    return (
        <section className={`bg-white shadow-md rounded-b-lg md:rounded-lg ${pathname === "/" ? "h-[500px]" : "h-[calc(100vh-10.7rem)] md:h-[calc(100vh-6.5rem)]"} flex flex-col justify-between`}>
            <ChatHeading isON={isON} setIsON={setIsON} />
            <div ref={chatboxRef} className='h-full overflow-y-scroll overflow-x-hidden relative flex flex-col justify-between'>
                <div className='flex flex-col p-3 gap-5 mb-3'>
                    <Message
                        image={nsnlogo}
                        name="Adbhut.io"
                        text="Please select any of the content product or send your inputs here to continue"
                        isOwn={user.role === "PM" || user.role === "AM"}
                    />
                    {
                        chatLog?.map((chat, idx) => (
                            <div key={idx}>
                                {chat.bot
                                    ? <Message
                                        image={nsnlogo}
                                        name="Adbhut.io"
                                        text={chat.bot}
                                        isOwn={user.role === "AM" || user.role === "PM"}
                                    />
                                    : <Message
                                        image={user?.image || avatar}
                                        name={currentProject?.pk ? currentProject?.client_details?.name : (name || "Guest Account")}
                                        text={chat.user}
                                        isOwn={user.role === "Client"}
                                    />}
                            </div>
                        ))
                    }

                    {/* project reference links */}
                    {showProjectReferenceLinkInput &&
                        <Message
                            image={nsnlogo}
                            name="Adbhut.io"
                            text={<GetProjectReference setShowProjectReferenceLinkInput={setShowProjectReferenceLinkInput} />}
                            isOwn={false}
                        />}
                    {/* project reference links */}

                    {TypingElement}
                </div>

                <ChatCallToAction />

                {
                    suggestions?.length === 0 && contentProducts?.length > 0 && !selectedContentProduct &&
                    <div className='sticky bottom-0 p-2 pb-0 bg-white mt-12'>
                        <div className='pb-2 flex flex-wrap gap-2 text-sm font-medium select-none'>
                            {
                                contentProducts.map(contentProduct => <div
                                    onClick={() => {
                                        handleSelectContentProduct(contentProduct);
                                        navigate("/artists")
                                    }}
                                    key={contentProduct.pk}
                                    className='whitespace-nowrap py-1 px-3 border text-gray-500 border-gray-500 rounded-full cursor-pointer hover:bg-blue-100'>
                                    {contentProduct.name}
                                </div>)
                            }
                        </div>
                    </div>
                }
            </div>

            <div className='absolute right-8 bottom-56'>
                {
                    currentProject?.pk &&
                    <button onClick={() => currentProjectRefetch()} className='active:rotate-180 duration-300 opacity-30' type="button"><RiRefreshLine size={30} /></button>
                }
            </div>

            <div className='p-3 border-t-[3px] border-gray-300'>
                {
                    file?.name
                        ? <div className="p-3 py-8 border rounded-lg mb-2 bg-gray-100 text-center relative">
                            {file.name}
                            <RxCross1 className="absolute top-2 right-2 cursor-pointer" size={20} onClick={() => {
                                setFile(null);
                                document.getElementById("file-upload").value = null;
                            }} />
                        </div>
                        : <textarea ref={userInputRef} onKeyUp={handleChatInput} className="p-2 rounded-lg bg-gray-100 w-full focus:outline-none text-sm" rows="4" placeholder='Start a briefing...'></textarea>
                }
                <div className='flex justify-between items-center'>
                    <div className='flex gap-2'>
                        <BsEmojiSmile className="opacity-30" />
                        <div>
                            <label htmlFor="file-upload"><ImAttachment className="cursor-pointer" /></label>
                            <input onChange={handleFileChange} id="file-upload" className="hidden" type="file" />
                        </div>
                        <BsImageFill className="opacity-30" />
                        <AiOutlineGif className="opacity-30" />
                    </div>
                    <div className='flex items-center space-x-1'>
                        <BsFillMicFill />
                        {
                            file ?
                                <button type='button' onClick={handleSubmit} className='bg-sky-500 text-white py-[3px] px-3 rounded-full text-sm'>Send</button>
                                : userInputText || currentProject?.pk
                                    ? <button onClick={handleSendUserInput} className='bg-sky-500 text-white py-[3px] px-3 rounded-full text-sm'>Send</button>
                                    : (selectedContentProduct || currentProject?.pk || shortlistedArtists?.length > 0)
                                        ? <button onClick={currentProject?.stage === "DreamProject" ? handleChangeStage : handleSendBrief} className='bg-sky-500 text-white py-[3px] px-3 rounded-full text-sm'>Save</button>
                                        : <button className='bg-gray-300 text-gray-400 py-[3px] px-3 rounded-full text-sm' disabled>Save</button>
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LeftAside;