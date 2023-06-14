import { useEffect, useRef, useState } from 'react';
import { AiOutlineGif } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';
import { BsFillMicFill, BsImageFill } from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im';
import { BsEmojiSmile } from 'react-icons/bs';
import { useRootContext } from '../../contexts/RootProvider';
import { useNavigate } from 'react-router-dom';
import nsnlogo from '../../assets/logos/adbeta.jpeg';
import { useSelector } from 'react-redux';
import ChatCallToAction from './Components/ChatCallToAction';
import Message from './Chat/Message';
import MessageNew from './Chat/MessageNew';
import { useChatbotStatusQuery } from '../../features/chat/chatApi';
import ChatHeading from './Chat/ChatHeading';
import { useCreateDemoMutation } from '../../features/demo/demoApi';

const LeftAside = () => {
    const { handleSelectContentProduct, contentProducts, suggestions } = useRootContext();

    const { user, token } = useSelector(state => state.auth);
    const currentProject = useSelector(state => state.project);
    const { selectedContentProduct } = useSelector(state => state.project);
    const { data: chatbotStatus, refetch } = useChatbotStatusQuery(currentProject?.pk, { skip: !currentProject?.pk });

    const navigate = useNavigate();

    // auto scroll
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

    // handle send message
    const userInputRef = useRef();
    const [userInputText, setuserInputText] = useState("");

    const handleSendMessage = (e) => {
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

        if (isOpen(socketRef.current)) {
            socketRef.current?.send(
                JSON.stringify({
                    message: userInputText,
                    toggle: chatbotStatus?.status
                })
            );
        };

        setuserInputText("");
        userInputRef.current.value = "";
        // test
        refetch();
    }

    // upload files
    const [file, setFile] = useState(null);
    const [uploadDemo] = useCreateDemoMutation();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleSubmit = (e) => {
        // const formData = new FormData();
        // formData.append("document", file);
        // formData.append("project", currentProject?.pk);
        // formData.append("status", "Selected");

        // uploadDemo(formData)
        //     .then(data => {
        //         setFile(null);
        //     })
    }

    // socket
    const [messages, setMessages] = useState([]);

    const socketRef = useRef();
    useEffect(() => {
        if (currentProject?.pk && token) {
            socketRef.current = new WebSocket(`wss://dev.nsnco.in/ws/chat/${currentProject?.pk}/?token=${token}`);
        }

        socketRef.current?.addEventListener('open', () => {
            console.log('Connection established!');
        });

        socketRef.current?.addEventListener('message', data => {
            setMessages(JSON.parse(data?.data)?.messages);
        });
    }, [currentProject, token]);

    function isOpen(ws) { return ws?.readyState === ws?.OPEN }
    // 

    return (
        <section className={`bg-white font-hero shadow border rounded-lg h-[70vh] flex flex-col justify-between`}>
            <ChatHeading chatbotStatus={chatbotStatus} />
            <div ref={chatboxRef} className='h-full overflow-y-scroll overflow-x-hidden relative flex flex-col justify-between'>

                {messages?.length < 1 && <small className='block border border-yellow-300/5 bg-yellow-100 text-yellow-700 w-fit px-2 py-1 rounded-full mx-auto mt-3'>No messages, send a message to start the conversation</small>}

                <div className='flex flex-col p-3 gap-3'>
                    {/* <Message
                        image={nsnlogo}
                        name="Adbhut.io"
                        text="Please select any of the content product or send your inputs here to continue"
                        isOwn={user.role === "PM" || user.role === "AM"}
                    /> */}
                    {
                        messages?.map(msg => <MessageNew
                            msg={msg}
                            isOwn={msg.sender_email === user?.email}
                        />)
                    }
                </div>

                {/* <ChatCallToAction /> */}

                {
                    suggestions?.length === 0 && contentProducts?.length > 0 && !selectedContentProduct &&
                    <div className='sticky bottom-0 p-2 pb-0 bg-white'>
                        <div className='pb-2 flex flex-wrap gap-2 text-sm font-semibold select-none'>
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
                        : <textarea ref={userInputRef} onKeyUp={handleSendMessage} className="p-2 rounded-lg bg-gray-100 w-full focus:outline-none text-sm" rows="4" placeholder='Start a briefing...'></textarea>
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
                        <BsFillMicFill className="opacity-30" />
                        {file
                            ? <button type='button' onClick={handleSubmit} className='bg-sky-500 text-white py-[3px] px-3 rounded-full text-sm'>Send</button>
                            : <button onClick={handleSendUserInput} className='bg-sky-500 text-white py-[3px] px-3 rounded-full text-sm'>Send</button>
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LeftAside;