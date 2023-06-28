import { useState } from "react";
import { MdUpload } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
import Badge from "../../Components/Badge/Badge";
import Container from "../../Components/Container/Container";
import Modal from "../../Components/Modal/Modal";
import { useGetDemoByArtistQuery } from "../../features/demo/demoApi";
import DemoDetails from "./Components/DemoDetails";
import FileUpload from "./Components/FileUpload";

const ArtistDashboard = () => {
    const [isDemoShown, setIsDemoShown] = useState(false);
    const closeDemo = () => setIsDemoShown(false);
    const [showUpload, setShowUpload] = useState(null);
    const { user } = useSelector(state => state.auth);
    const { data: demos } = useGetDemoByArtistQuery(user?.id, { skip: !user?.email });

    return (
        <Container className="font-hero">
            <div className="bg-white w-full border my-3">
                <div className="flex">
                    <div className="flex-1 p-3 flex flex-col">
                        <div className="flex items-center gap-2 mb-2 border-b pb-3">
                            <h3 className="text-lg font-semibold">Upload your customizable demo</h3>
                            <Badge onClick={() => setShowUpload(!showUpload)} type="success" className="inline-flex items-center justify-between cursor-pointer">Upload demos <MdUpload size={20} /></Badge>
                        </div>

                        <ul className="my-2">
                            {demos?.map(demo => <li onClick={() => setIsDemoShown(demo.id)} className="text-blue-600 hover:underline underline-offset-2 cursor-pointer">{demo.Title}</li>)}
                        </ul>
                    </div>

                    {isDemoShown && <DemoDetails demoId={isDemoShown} closeDemo={closeDemo} />}
                </div>
            </div>

            {
                showUpload &&
                <Modal onClick={() => setShowUpload(false)} className="w-11/12 max-w-2xl">
                    <div className="bg-white px-4 py-8 relative border-b mb-4">
                        <RxCross1 onClick={() => setShowUpload(null)} size={20} className="absolute top-0 right-0 m-4 cursor-pointer" />
                        <h4 className='font-semibold text-lg'>Upload a demo</h4>
                        <small>The demo can be a <strong>Video, Audio</strong> file. Uploaded demo will be shown in the ready to use demo section. Production manager can easily assign those ready to use demo in any project.</small>
                        <div className="mt-10">
                            <FileUpload setShowUpload={setShowUpload} />
                        </div>
                    </div>
                </Modal>
            }
        </Container>
    );
};

export default ArtistDashboard;