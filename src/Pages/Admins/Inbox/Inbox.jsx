import React from 'react';
import { useDispatch } from 'react-redux';
import { useRootContext } from '../../../contexts/RootProvider';
import { useGetProjectQuery } from '../../../features/project/projectApi';
import { setProjectData } from '../../../features/project/projectSlice';

const Inbox = () => {
    const { currentProjects } = useRootContext();

    return (
        <div className='bg-white rounded-lg shadow-lg'>
            <h3 className='font-medium p-3'>Client Messages</h3>
            <ul>
                {
                    currentProjects?.map(project => <MsgItem id={project} />)
                }

                {/* <li className='p-4 py-5 flex items-center gap-3 hover:bg-gray-200 bg-blue-100'>
                    <img className='w-16 h-16 object-cover rounded-full border' src={avatar} alt="" />
                    <p className='text-sm'><strong>Md Maruf Hossain</strong> the perfect random person pictures. Find over 100+ of the best free Awesome :D I will try to use to improve the AI on www.justlearn.com - We use AI for image.</p>
                </li> */}

            </ul>
        </div>
    );
};

const MsgItem = (id) => {
    const dispatch = useDispatch();
    const { avatar } = useRootContext();
    const { data: currentProject } = useGetProjectQuery(id?.id?.pk, { skip: !id?.id?.pk });

    // console.log(JSON.parse(currentProject?.brief)[JSON.parse(currentProject?.brief).length - 1]);

    return (
        <li onClick={() => {

            dispatch(setProjectData({
                chatLog: JSON.parse(currentProject.brief),
                shortlistedArtists: currentProject.shortlisted_artists_details?.map(artist => artist.id),
                selectedContentProduct: currentProject.project_template,
                ...currentProject
            }))
            sessionStorage.setItem("CURRENT_PROJECT", id?.id?.pk);

        }} className='cursor-pointer p-4 py-5 flex items-center gap-3 hover:bg-gray-200'>
            <img className='w-16 h-16 object-cover rounded-full border' src={avatar} alt="" />
            <p className='text-sm'><strong>{currentProject?.client_details?.name}</strong> </p>
            <p className='text-sm'><strong>{currentProject?.pk}</strong> </p>
            <p className='text-sm'><strong>{currentProject?.name}</strong> </p>
            <p className='text-sm'><strong>{currentProject?.stage}</strong> </p>
        </li>
    )
}

export default Inbox;