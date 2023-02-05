import React, { useEffect, useRef, useState } from 'react';
import { BiPencil } from 'react-icons/bi';
import { RiRefreshLine } from 'react-icons/ri';
import nsnlogo from '../../../assets/logo.jpeg'
import { useRootContext } from '../../../contexts/RootProvider';

const ChatHeading = ({ projectTitle, handleShowProjectHistory, currentProject }) => {
    const { currentProjectsRefetch } = useRootContext();

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
        fetch(`https://dev.nsnco.in/api/v1/update_title/${currentProject?.pk}/`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ title: renamedTitle })
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                currentProjectsRefetch();
                handleShowProjectHistory(currentProject.pk, currentProject.stage);
            });
    }, [renamedTitle])

    console.log(currentProject);

    return (
        <div className='border-b shadow-sm p-2 rounded-t-lg flex items-center justify-between'>
            <div className='flex gap-1 justify-between items-center w-full'>
                <div className='flex gap-2'>
                    <img onClick={() => handleShowProjectHistory(currentProject.pk, currentProject.stage)} className='w-10 cursor-pointer' src={nsnlogo} alt="" />
                    <button className='active:rotate-180 duration-300' onClick={() => handleShowProjectHistory(currentProject.pk, currentProject.stage)} type="button"><RiRefreshLine size={20} /></button>
                </div>
                <div className='flex gap-1 pr-1'>
                    {
                        renameState
                            ? <form onSubmit={handleRenameSubmit}>
                                <input onBlur={handleRenameTitle} ref={renameInputRef} type="text" class="block font-medium w-full text-gray-900 bg-transparent border-0 border-b-2 appearance-none border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600" defaultValue={projectTitle} />
                            </form>
                            : <h4 className='font-medium'>{projectTitle || 'Project Servicing Chat'}</h4>
                    }
                    <BiPencil className='cursor-pointer' onClick={() => {
                        setRenameState(true);
                        setTimeout(() => {
                            renameInputRef.current.focus();
                            renameInputRef.current.select();
                        }, [10])
                    }} size={20} />
                </div>
            </div>
        </div>
    );
};

export default ChatHeading;