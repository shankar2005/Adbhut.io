// import NothingFound from '../../Components/NotFound/NothingFound';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProjectQuery } from '../../features/project/projectApi';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-photo-view/dist/react-photo-view.css';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { ImAttachment } from 'react-icons/im';
import { BsLink45Deg, BsMusicNoteBeamed, BsPlayCircle } from 'react-icons/bs';
import { IoMdVideocam } from 'react-icons/io';

const ProjectDemos = () => {
    const { id } = useParams();
    const { data: currentProject = {} } = useGetProjectQuery(id);

    const tabs = [
        {
            name: "Media",
            element: <Media />
        },
        {
            name: "Docs",
            element: <Docs />
        },
        {
            name: "Links",
            element: <Links />
        },
    ]

    const [currentTab, setCurrentTab] = useState(tabs[0]);

    return (
        <div className='bg-white'>
            <div class="text-sm font-medium text-center text-gray-700 border-b border-gray-200 mb-3">
                <ul class="flex flex-wrap">
                    {
                        tabs?.map(tab => <li class="mr-2" onClick={() => setCurrentTab(tab)}>
                            {
                                tab.name === currentTab.name
                                    ? <span class="inline-block p-4 pb-3.5 border-b-2 rounded-t-lg active text-blue-500 border-blue-500" aria-current="page">{tab.name}</span>
                                    : <span class="inline-block p-4 pb-3.5 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 cursor-pointer">{tab.name}</span>
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

const Media = () => {
    return (
        <PhotoProvider>
            <div className="flex flex-wrap gap-2 overflow-hidden p-5 pt-0">
                <PhotoView src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI-SaYWlXmVicHWYEEpRgrmFir507tWQk3pA&usqp=CAU">
                    <img className="w-32 h-32 p-2 bg-gray-300 rounded-lg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI-SaYWlXmVicHWYEEpRgrmFir507tWQk3pA&usqp=CAU" alt="" />
                </PhotoView>
                <PhotoView src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI-SaYWlXmVicHWYEEpRgrmFir507tWQk3pA&usqp=CAU">
                    <img className="w-32 h-32 p-2 bg-gray-300 rounded-lg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI-SaYWlXmVicHWYEEpRgrmFir507tWQk3pA&usqp=CAU" alt="" />
                </PhotoView>
                <PhotoView src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI-SaYWlXmVicHWYEEpRgrmFir507tWQk3pA&usqp=CAU">
                    <img className="w-32 h-32 p-2 bg-gray-300 rounded-lg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI-SaYWlXmVicHWYEEpRgrmFir507tWQk3pA&usqp=CAU" alt="" />
                </PhotoView>

                {/* <div className="w-60 rounded-lg p-2 bg-gray-300">
                    <Video autoPlay={false} loop={false}
                        controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                        onCanPlayThrough={() => { }}>
                        <source src="https://res.cloudinary.com/djqnk6djr/video/upload/v1681813785/aastey_Tribe_gbr8as.mp4" type="video/webm" />
                    </Video>
                </div> */}

                <div className='relative'>
                    <img className="w-32 h-32 p-2 bg-gray-300 rounded-lg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO45C5bfZ4pz2OXyyIpO-tGWvL0_Beead3g9gdEIuEAg&s" alt="" />
                    <div className='text-white/90 absolute bottom-3 left-3 flex items-center gap-1'>
                        <IoMdVideocam />
                        <p className="text-xs">0:10</p>
                    </div>
                </div>

                <PhotoView src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI-SaYWlXmVicHWYEEpRgrmFir507tWQk3pA&usqp=CAU">
                    <img className="w-32 h-32 p-2 bg-gray-300 rounded-lg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI-SaYWlXmVicHWYEEpRgrmFir507tWQk3pA&usqp=CAU" alt="" />
                </PhotoView>

                <div className='relative w-32 h-32 p-2 bg-gray-200  border rounded-lg'>
                    <div className='bg-gray-50 h-full flex items-center justify-center'>
                        <BsMusicNoteBeamed className='text-red-400' size={30} />
                    </div>
                </div>
            </div>
        </PhotoProvider>
    );
};

const Docs = () => {
    return (
        <div className="p-5 pt-0 space-y-1">
            <div className='flex items-center gap-2 bg-gray-500/80 text-white p-2 pr-4 w-fit rounded-lg hover:underline cursor-pointer'>
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
            </div>
        </div>
    );
};

const Links = () => {
    return (
        <div className="p-5 pt-0 space-y-2">
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
            </div>
            <div className='p-2 pr-4 bg-gray-100 w-fit rounded-lg border'>
                <div className='flex items-center gap-1'>
                    <BsLink45Deg size={20} />
                    <p>client status</p>
                </div>
                <a className="text-blue-500 hover:underline cursor-pointer">https://docs.google.com/spreadsheets/d/16oM-ZFd53g8Qkt4Ovr4i8x5SPWwzM5PY4PoImIQa55I/edit</a>
            </div>
        </div>
    );
};