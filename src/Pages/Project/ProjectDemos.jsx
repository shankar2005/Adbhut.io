// import NothingFound from '../../Components/NotFound/NothingFound';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProjectQuery } from '../../features/project/projectApi';
import { DefaultPlayer as Video } from 'react-html5video';
import { ImAttachment } from 'react-icons/im';
import { BsFilePdfFill, BsLink45Deg, BsMusicNoteBeamed, BsPlayCircle } from 'react-icons/bs';
import { IoMdVideocam } from 'react-icons/io';
import Demo from './Components/Demo';

const ProjectDemos = () => {
    const { id } = useParams();
    const { data: currentProject = {} } = useGetProjectQuery(id);

    const tabs = [
        {
            name: "Media",
            element: <Media currentProject={currentProject} />
        },
        {
            name: "Docs",
            element: <Docs currentProject={currentProject} />
        },
        {
            name: "Links",
            element: <Links currentProject={currentProject} />
        },
    ]

    const [currentTab, setCurrentTab] = useState(tabs[0]);

    return (
        <div className='bg-white'>
            <div className="text-sm font-medium text-center text-gray-700 border-b border-gray-200 mb-3">
                <ul className="flex flex-wrap">
                    {
                        tabs?.map(tab => <li className="mr-2" onClick={() => setCurrentTab(tab)}>
                            {
                                tab.name === currentTab.name
                                    ? <span className="inline-block p-4 pb-3.5 border-b-2 rounded-t-lg active text-blue-500 border-blue-500" aria-current="page">{tab.name}</span>
                                    : <span className="inline-block p-4 pb-3.5 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 cursor-pointer">{tab.name}</span>
                            }
                        </li>)
                    }
                </ul>
            </div>

            {currentTab?.element}
        </div>
    );
};

export default ProjectDemos;

const Media = ({ currentProject }) => {
    return (
        <>
            <div className="flex flex-wrap gap-2 overflow-hidden p-5 pt-0">
                {
                    currentProject?.project_demos?.map(demo => <Demo demo={demo} />)
                }
            </div>
        </>
    );
};

const Docs = () => {
    return (
        <div className="p-5 pt-0 space-y-1">
            {/* <div className='flex items-center gap-2 bg-gray-500/80 text-white p-2 pr-4 w-fit rounded-lg hover:underline cursor-pointer'>
                <ImAttachment />
                <p>Naagin Sauce 1232.pdf</p>
            </div>
            <div className='flex items-center gap-2 bg-gray-500/80 text-white p-2 pr-4 w-fit rounded-lg hover:underline cursor-pointer'>
                <ImAttachment />
                <p>Aastey lyrics rap song final version.pdf</p>
            </div>
            <div className='flex items-center gap-2 bg-gray-500/80 text-white p-2 pr-4 w-fit rounded-lg hover:underline cursor-pointer'>
                <ImAttachment />
                <p>Tim song.pdf</p>
            </div> */}
        </div>
    );
};

const Links = () => {
    return (
        <div className="p-5 pt-0 space-y-2">
            {/* <div className='p-2 pr-4 bg-gray-100 w-fit rounded-lg border'>
                <div className='flex items-center gap-1'>
                    <BsLink45Deg size={20} />
                    <p>client status</p>
                </div>
                <a className="text-blue-500 hover:underline cursor-pointer">https://docs.google.com/spreadsheets/d/16oM-ZFd53g8Qkt4Ovr4i8x5SPWwzM5PY4PoImIQa55I/edit</a>
            </div>
            <div className='p-2 pr-4 bg-gray-100 w-fit rounded-lg border'>
                <div className='flex items-center gap-1'>
                    <BsLink45Deg size={20} />
                    <p>client status</p>
                </div>
                <a className="text-blue-500 hover:underline cursor-pointer">https://docs.google.com/spreadsheets/d/16oM-ZFd53g8Qkt4Ovr4i8x5SPWwzM5PY4PoImIQa55I/edit</a>
            </div>
            <div className='p-2 pr-4 bg-gray-100 w-fit rounded-lg border'>
                <div className='flex items-center gap-1'>
                    <BsLink45Deg size={20} />
                    <p>client status</p>
                </div>
                <a className="text-blue-500 hover:underline cursor-pointer">https://docs.google.com/spreadsheets/d/16oM-ZFd53g8Qkt4Ovr4i8x5SPWwzM5PY4PoImIQa55I/edit</a>
            </div> */}
        </div>
    );
};