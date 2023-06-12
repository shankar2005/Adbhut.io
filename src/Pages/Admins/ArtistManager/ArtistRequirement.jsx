import { Link } from "react-router-dom";
import { useGetArtistRequestsQuery, useGetTotalArtistQuery } from "../../../features/artist/artistApi";
import { BsArrowRight } from "react-icons/bs";
import { MdUpload } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import TableRow from "../../../Components/Table/TableRow";
import Charts from "./Charts";
import { useGetArtistCountBySkillsQuery } from "../../../features/utils/utilsApi";
import Badge from "../../../Components/Badge/Badge";
import { DefaultPlayer as Video } from 'react-html5video';
import { useState } from "react";
import FileUpload from "../../Admins/ProductionManager/Components/FileUpload";
import { useGetDemosQuery } from "../../../features/demo/demoApi";
import { useSelector } from "react-redux";

const ArtistRequirement = () => {
    const { data } = useGetArtistRequestsQuery();
    const { data: skills } = useGetArtistCountBySkillsQuery();
    const { data: totalArtist } = useGetTotalArtistQuery();
    const [isDemoShown, setIsDemoShown] = useState(false);
    const closeDemo = () => setIsDemoShown(false);
    const [sorted, setSorted] = useState(false);
    const toggleSort = () => setSorted(prev => !prev);
    const [showUpload, setShowUpload] = useState(null);
    const { user } = useSelector(state => state.auth);
    const { data: demos } = useGetDemosQuery(null, { skip: !user?.email });

    return (
        <section className="font-hero">
            <div className="my-2 grid grid-cols-4 gap-2">
                <div className="p-3 bg-white shadow-sm border-b-4 border-blue-500">
                    <p className="text-sm font-semibold">Total Artists</p>
                    <h2 className="text-4xl font-bold text-center pt-5 pb-8">{totalArtist?.total_count}</h2>
                </div>
                <div className="p-3 bg-white shadow-sm border-b-4 border-blue-500">
                    <p className="text-sm font-semibold">Artist Requirements</p>
                    <h2 className="text-4xl font-bold text-center pt-5 pb-8">{data?.length}</h2>
                </div>
                <div className="p-3 bg-white shadow-sm border-b-4 border-blue-500 relative">
                    <p className="text-sm font-semibold">Ready Demos</p>
                    <h2 className="text-4xl font-bold text-center pt-5 pb-8">4</h2>
                </div>
            </div>

            <div className="bg-white w-full border mb-3 flex">
                <div className="flex-1 p-3 flex flex-col">
                    <div className="flex items-center gap-2 mb-2 border-b pb-3">
                        <h3 className="text-lg font-semibold">Demos</h3>
                        <Badge onClick={() => setShowUpload(!showUpload)} type="success" className="inline-flex items-center justify-between cursor-pointer">Upload demos <MdUpload size={20} /></Badge>
                    </div>

                    {showUpload && <div className="px-4 py-8 relative border-b mb-4">
                        <RxCross1 onClick={() => setShowUpload(null)} size={20} className="absolute top-0 right-0 m-4 cursor-pointer" />
                        <h4 className='font-semibold text-lg'>Upload a demo</h4>
                        <small>The demo can be a <strong>Video, Audio</strong> file. Uploaded demo will be shown in the ready to use demo section. Production manager can easily assign those ready to use demo in any project.</small>
                        <div className="mt-10">
                            <FileUpload setShowUpload={setShowUpload} />
                        </div>
                    </div>}

                    <ul className="my-2">
                        {demos?.map(demo => <li><a href="#" onClick={() => setIsDemoShown(demo)} className="text-blue-600 hover:underline underline-offset-2">{demo.Title}</a></li>)}
                    </ul>
                    <div className="mt-auto border-t pt-2">
                        <Link to="/projects/readydemos" className="text-blue-600 hover:underline underline-offset-2">View All</Link>
                    </div>
                </div>

                {
                    isDemoShown &&
                    <div className="flex-1 border-l p-3 pb-16 relative">
                        <div className="w-4/6">
                            <Video autoPlay={false} loop={false}
                                controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}>
                                <source src="https://res.cloudinary.com/djqnk6djr/video/upload/v1681813785/aastey_Tribe_gbr8as.mp4" type="video/webm" />
                            </Video>
                        </div>
                        <div className="mt-3">
                            <p className="font-semibold">{isDemoShown?.Title}</p>
                            <p>Description: {isDemoShown?.comment}</p>
                        </div>

                        <RxCross1 onClick={closeDemo} className="absolute top-0 right-0 m-3 cursor-pointer" size={25} />
                    </div>
                }
            </div>

            <div className="mb-2 w-full overflow-hidden flex">
                <div className="bg-white p-4">
                    <h3 className="text-xl font-semibold">Skills</h3>
                    <small className="text-sm">Artist's number listed under each skills.</small>
                </div>
                <div className="w-full overflow-x-auto bg-white h-96 border-t">
                    <table className="w-full text-sm">
                        <thead className="sticky top-0">
                            <tr className="text-md text-left bg-gray-100">
                                <th className="px-4 py-1 font-normal">Skills</th>
                                <th onClick={toggleSort} className="px-4 py-1 font-normal cursor-pointer select-none">Artists <span className="sort-by"></span></th>
                                <th className="px-4 py-1 font-normal">Target <span className="sort-by"></span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {skills?.length && [...skills]?.sort((a, b) => {
                                if (sorted) {
                                    return b.artist - a.artist
                                }
                            })?.map(skill => <tr>
                                <td className="px-4 py-1 border-y">
                                    <div className="flex items-center text-sm">
                                        <p>{skill.name}</p>
                                    </div>
                                </td>
                                <td className="px-4 py-1 text-sm border-y whitespace-pre-wrap">
                                    {skill.artist}
                                </td>
                                <td className="px-4 py-1 text-sm border-y whitespace-pre-wrap">
                                    {/* <span className="bg-red-500 text-white font-bold p-0.5 rounded">12</span> */}
                                </td>
                                {/* <td className="px-4 py-1 text-sm border-y whitespace-pre-wrap w-1/6">
                                    <span className="text-blue-700">Complete</span>
                                </td> */}
                            </tr>)}
                        </tbody>
                    </table>
                </div>
                {/* <Charts /> */}
            </div>

            <div className='bg-white'>
                <h1 className="p-4 text-base font-bold border-b">Artist Requirements</h1>
                {data?.map(requirement => <Row requirement={requirement} />)}
            </div>
        </section>
    );
};

const Row = ({ requirement }) => {
    const {
        id,
        project_details,
        hiring_status,
    } = requirement;

    return (

        <div className="flex items-center justify-between p-4 bg-white border-b text-sm">
            <div className='font-medium space-x-2'>
                <Link to={`/projects/artist-requirement/${id}`} className="text-blue-700 underline underline-offset-2">{project_details?.name}</Link>
                <span>&#9679;</span>
                <span className='w-fit my-1 px-0.5 font-sans italic text-gray-700 bg-yellow-100'>{hiring_status || "In Progress"}</span>
            </div>
        </div>

    )
}

export default ArtistRequirement;