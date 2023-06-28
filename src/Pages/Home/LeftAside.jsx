import { useEffect, useRef, useState } from 'react';
import { AiOutlineGif } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';
import { BsFillMicFill, BsImageFill } from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im';
import { BsEmojiSmile } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import ChatCallToAction from './Components/ChatCallToAction';
import Message from './Chat/Message';
import MessageNew from './Chat/MessageNew';
import { useChatbotStatusQuery } from '../../features/chat/chatApi';
import ChatHeading from './Chat/ChatHeading';
import { useCreateDemoMutation } from '../../features/demo/demoApi';
import { useUploadBriefMutation } from '../../features/project/projectApi';

const LeftAside = () => {
    const { user, token } = useSelector(state => state.auth);
    const currentProject = useSelector(state => state.project);
    const { data: chatbotStatus, refetch } = useChatbotStatusQuery(currentProject?.pk, { skip: !currentProject?.pk });

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
    const [uploadBrief, { isSuccess }] = useUploadBriefMutation();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleSubmit = (e) => {
        const formData = new FormData();
        formData.append("chat_file", file);

        uploadBrief({
            projectId: currentProject?.pk,
            data: formData
        }).then(data => {
            if (data.data.chat_file) {
                if (isOpen(socketRef.current)) {
                    socketRef.current?.send(
                        JSON.stringify({
                            message: data.data.files[data.data.files.length - 1].name,
                            toggle: chatbotStatus?.status
                        })
                    );
                };
            }
        })
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
        <section className={`bg-white font-hero shadow border rounded-lg h-[94vh] md:h-[470px] flex flex-col justify-between`}>
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
                        {/* <BsEmojiSmile className="opacity-30" /> */}
                        {/* <BsImageFill className="opacity-30" />
                        <AiOutlineGif className="opacity-30" /> */}
                    </div>
                    <div className='flex items-center space-x-1'>
                        <div>
                            <label htmlFor="file-upload"><ImAttachment className="cursor-pointer" /></label>
                            <input onChange={handleFileChange} id="file-upload" className="hidden" type="file" />
                        </div>
                        {/* <BsFillMicFill className="opacity-30" /> */}
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