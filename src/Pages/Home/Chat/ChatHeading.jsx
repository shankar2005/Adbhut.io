import { useEffect } from 'react';
import { useState } from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { SlArrowUp } from 'react-icons/sl';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useRootContext } from '../../../contexts/RootProvider';
import { useToggleChatGPTMutation } from '../../../features/chat/chatApi';
import logo from "../../../assets/logos/adbeta.jpeg";

const ChatHeading = ({ chatbotStatus }) => {
    const { setShowChat, showChat } = useRootContext();
    const [showMore, setShowMore] = useState(false);
    const currentProject = useSelector(state => state.project);
    const { user } = useSelector(state => state.auth);
    const [toggleChatGPT] = useToggleChatGPTMutation();
    const [isON, setIsON] = useState(chatbotStatus?.status === "ON");
    useEffect(() => {
        setIsON(chatbotStatus?.status === "ON");
    }, [chatbotStatus])

    // handle chatgpt toggle
    const handleChatgptToggle = () => {
        setIsON(!isON);
        if (isON) {
            toggleChatGPT({
                "id": currentProject?.pk,
                "status": "OFF"
            })
        } else {
            toggleChatGPT({
                "id": currentProject?.pk,
                "status": "ON"
            })
        }
    }
    const pathname = useLocation().pathname;

    return (
        <div className='flex border-b shadow-sm p-2 pr-4 rounded-t-lg items-center justify-between'>
            <div className='flex gap-3 justify-between items-center w-full relative'>
                <div className="mr-auto flex items-center gap-2">
                    <img className="w-10 h-10" src={logo} alt="" />
                    <h1 className="font-semibold">Contact Hub</h1>
                </div>

                {showMore &&
                    currentProject?.pk && user?.role === "PM" && pathname !== "/" &&
                    <div className='absolute bottom-10 right-0 bg-white shadow border p-3 w-52 flex flex-col justify-center'>
                        <span className='text-xs font-semibold'>ChatGPT Toggle</span>
                        <label className="inline-flex space-x-2 items-center cursor-pointer">
                            <span className="text-sm text-gray-900">OFF</span>
                            <span className='relative'>
                                <input onChange={handleChatgptToggle} checked={isON} type="checkbox" value="" className="sr-only peer" />
                                <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all border-gray-600 peer-checked:bg-blue-500"></div>
                            </span>
                            <span className="text-sm text-gray-900">ON</span>
                        </label>
                    </div>
                }

                <BiDotsHorizontalRounded className='cursor-pointer' onClick={() => setShowMore(prev => !prev)} size={20} />

                <button onClick={() => setShowChat(prev => !prev)}>
                    {showChat ? <SlArrowUp className='rotate-180' /> : <SlArrowUp />}
                </button>
            </div>
        </div>
    );
};

export default ChatHeading;