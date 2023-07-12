import { useState } from "react";
import { MdUpload } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Badge from "../../Components/Badge/Badge";
import Button from "../../Components/Button/Button";
import Container from "../../Components/Container/Container";
import Modal from "../../Components/Modal/Modal";
import { useGetDemoByArtistQuery, useGetDemosQuery } from "../../features/demo/demoApi";
import FileUpload from "./Components/FileUpload";

const ArtistDashboard = () => {
    const [showUpload, setShowUpload] = useState(null);
    const { user } = useSelector(state => state.auth);
    const { data: myDemos } = useGetDemoByArtistQuery(user?.id, { skip: !user?.email });
    const { data: demos } = useGetDemosQuery();

    return (
        <Container className="font-hero">
            <div className="bg-white w-full border my-3">
                <div className="p-3 flex flex-col">
                    <div className="flex items-center gap-2 mb-2 border-b pb-3">
                        <h3 className="text-lg font-semibold">Upload your customizable demo</h3>
                        <Badge onClick={() => setShowUpload(!showUpload)} type="success" className="inline-flex items-center justify-between cursor-pointer">Upload demos <MdUpload size={20} /></Badge>
                        <Link to="/projects" className="ml-auto"><Badge type="gray" className="inline-flex items-center justify-between cursor-pointer">Apply to project demo</Badge></Link>
                    </div>

                    <ul className="my-2">
                        <li className="font-semibold text-lg">My demos</li>
                        {myDemos?.map(demo => <li className="border p-3 rounded flex items-center mb-2">
                            <div className="flex-1">
                                <span className="flex items-center gap-2">
                                    <Link className="text-blue-600 hover:underline underline-offset-2 cursor-pointer" to={`/artists/demos/${demo.id}`}>{demo.Title}</Link>
                                </span>
                            </div>
                        </li>)}
                    </ul>
                    <ul className="my-2">
                        <li className="font-semibold text-lg">Related demos</li>
                        {demos?.map(demo => <li className="text-blue-600 hover:underline underline-offset-2 cursor-pointer">{demo.Title}</li>)}
                    </ul>
                    <div className="mt-auto border-t pt-2">
                        <Link to="/projects/readydemos" className="text-blue-600 hover:underline underline-offset-2">View All</Link>
                    </div>
                </div>
            </div>

            {
                showUpload &&
                <Modal onClick={() => setShowUpload(false)} className="w-11/12 max-w-2xl">
                    <div className="bg-white px-4 py-8 relative border-b mb-4">
                        <h4 className='font-semibold text-lg'>Upload a demo</h4>
                        <small>The demo can be a <strong>Video, Audio</strong> file. Uploaded demo will be shown in the ready to use demo section. Production manager can easily assign those ready to use demo in any project.</small>
                        <div className="mt-10">
                            <FileUpload setDemoSec={setShowUpload} />
                        </div>
                    </div>
                </Modal>
            }
        </Container>
    );
};

export default ArtistDashboard;