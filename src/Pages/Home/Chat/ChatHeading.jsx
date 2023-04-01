import React, { useEffect, useRef, useState } from 'react';
import { BiPencil } from 'react-icons/bi';
import { RiRefreshLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import nsnlogo from '../../../assets/logo.jpeg'
import { useRootContext } from '../../../contexts/RootProvider';
import { useToggleChatGPTMutation } from '../../../features/chat/chatApi';
import { useUpdateProjectMutation } from '../../../features/project/projectApi';

const ChatHeading = ({ isON, setIsON }) => {
    const { currentProjectRefetch } = useRootContext();
    const [updateProject] = useUpdateProjectMutation();
    const currentProject = useSelector(state => state.project);
    const { user } = useSelector(state => state.auth);
    const { title: projectTitle } = useSelector(state => state.project);
    const [toggleChatGPT] = useToggleChatGPTMutation();

    const renameInputRef = useRef();
    const [renameState, setRenameState] = useState(false);
    const [renamedTitle, setrenamedTitle] = useState("");

    const handleRenameTitle = (e) => {
        setRenameState(false);
        setrenamedTitle(renameInputRef.current.value)
    }
    const handleRenameSubmit = (e) => {
        e.preventDefault();
        setRenameState(false);
        setrenamedTitle(renameInputRef.current.value)
    }

    useEffect(() => {
        if (currentProject?.pk && renamedTitle) {
            updateProject({
                id: currentProject?.pk,
                data: { title: renamedTitle }
            })
        }
    }, [renamedTitle])

    // handle chatgpt toggle
    const handleChatgptToggle = (e) => {
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
        <div className='border-b shadow-sm p-2 rounded-t-lg flex items-center justify-between'>
            <div className='flex gap-1 justify-between items-center w-full'>
                <div className='flex gap-2'>
                    <Link to="/">
                        <img className='w-10 cursor-pointer' src={nsnlogo} alt="" />
                    </Link>
                    {
                        currentProject?.pk &&
                        <button onClick={() => currentProjectRefetch()} className='active:rotate-180 duration-300' type="button"><RiRefreshLine size={20} /></button>
                    }
                </div>

                {/* chatgpt toggle */}
                {
                    user?.role === "PM" && pathname !== "/" &&
                    <div className='flex flex-col items-center justify-center'>
                        <span className='text-xs font-medium'>ChatGPT Toggle</span>
                        <label class="inline-flex space-x-2 items-center cursor-pointer">
                            <span class="text-sm text-gray-900">OFF</span>
                            <span className='relative'>
                                <input onChange={handleChatgptToggle} checked={isON} type="checkbox" value="" class="sr-only peer" />
                                <div class="w-9 h-5 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all border-gray-600 peer-checked:bg-blue-500"></div>
                            </span>
                            <span class="text-sm text-gray-900">ON</span>
                        </label>
                    </div>

                }
                {/* chatgpt toggle */}

                <div className='flex gap-1 pr-1'>
                    {
                        !currentProject?.pk
                            ? <h4 className='font-medium'>Adbhut.io Project Chat</h4>
                            : <>
                                {
                                    renameState
                                        ? <form onSubmit={handleRenameSubmit}>
                                            <input onBlur={handleRenameTitle} ref={renameInputRef} type="text" className="block font-medium w-full text-gray-900 bg-transparent border-0 border-b-2 appearance-none border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600" defaultValue={projectTitle} />
                                        </form>
                                        : currentProject?.pk ?
                                            <h4 className='font-medium underline underline-offset-2 text-blue-600 hover:text-blue-800'>
                                                <Link to={`/projects/${currentProject.pk}/${currentProject.stage}`}>{projectTitle?.length > 30 ? projectTitle?.slice(0, 30) + '...' : projectTitle}</Link>
                                            </h4>
                                            : <Link to="/projects/create-project"><h4 className='font-medium text-blue-500 underline'>Project Servicing Chat</h4></Link>
                                }
                                <BiPencil className='cursor-pointer' onClick={() => {
                                    setRenameState(true);
                                    setTimeout(() => {
                                        renameInputRef.current.focus();
                                        renameInputRef.current.select();
                                    }, [10])
                                }} size={20} />
                            </>
                    }

                </div>
            </div>
        </div>
    );
};

export default ChatHeading;