import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Container from '../../../Components/Container/Container';
import { useRootContext } from '../../../contexts/RootProvider';
import { useGetProjectQuery } from '../../../features/project/projectApi';
import { setProjectData } from '../../../features/project/projectSlice';

const Inbox = () => {
    const { currentProjects } = useRootContext();

    return (
        <Container>
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
        </Container>
    );
};

const MsgItem = (id) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { avatar } = useRootContext();
    const { data: currentProject } = useGetProjectQuery(id?.id?.pk, { skip: !id?.id?.pk });

    return (
        <li onClick={() => {

            dispatch(setProjectData({
                chatLog: JSON.parse(currentProject.brief),
                shortlistedArtists: currentProject.shortlisted_artists_details?.map(artist => artist.id),
                selectedContentProduct: currentProject.project_template,
                ...currentProject
            }))
            sessionStorage.setItem("CURRENT_PROJECT", id?.id?.pk);
            navigate(`/projects/${currentProject.pk}`);

        }} className='cursor-pointer p-4 py-5 flex items-center gap-3 hover:bg-gray-200'>
            <img className='w-16 h-16 object-cover rounded-full border' src={avatar} alt="" />
            <div>
                <p className='text-sm'><strong>{currentProject?.client_details?.name}</strong> </p>
                <div>
                    <span className='text-sm'>{currentProject?.name} - </span>
                    <span className='text-sm'>{currentProject?.pk}</span>
                </div>
            </div>
        </li>
    )
}

export default Inbox;