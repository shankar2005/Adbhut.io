import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useToggleChatGPTMutation } from '../../../features/chat/chatApi';

const ChatHeading = ({ chatbotStatus }) => {
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
        <div className='flex border-b shadow-sm p-2 rounded-t-lg items-center justify-between'>
            <div className='flex gap-1 justify-between items-center w-full p-1.5'>
                <h1 className="font-medium">Servicing Chat</h1>
                {
                    currentProject?.pk && user?.role === "PM" && pathname !== "/" &&
                    <div className='flex flex-col items-center justify-center'>
                        <span className='text-xs font-medium'>ChatGPT Toggle</span>
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
            </div>
        </div>
    );
};

export default ChatHeading;