import { RxCross1 } from "react-icons/rx";
import Badge from "../../../Components/Badge/Badge";
import { useRootContext } from "../../../contexts/RootProvider";
import { useAssignArtistToDemoMutation, useGetDemoByIdQuery, useUnassignArtistFromDemoMutation } from "../../../features/demo/demoApi";
import WorkDemo from "../../Artist/Components/View/WorkDemo";
import AssignArtistToDemo from "./AssignArtistToDemo";
import AssignDemoToProject from "./AssignProjectToDemo";

const DemoDetails = ({ closeDemo, demoId }) => {
    const { setArtistProfile } = useRootContext();
    const { data: demo } = useGetDemoByIdQuery(demoId);
    const [unassignArtistFromDemo] = useUnassignArtistFromDemoMutation();
    const [assignArtistToDemo] = useAssignArtistToDemoMutation();
    const handleMakeOwner = (id) => {
        assignArtistToDemo({
            demoId: demo.id,
            artistId: id
        }).then(data => {
            console.log(data);
        })
    }
    const handleUnassign = (id) => {
        unassignArtistFromDemo({
            demoId: demo.id,
            artistId: id
        });
    }

    return (
        <div div className="flex-1 border-l p-3 pb-16 relative">
            <div className="w-4/6 mb-3">
                <WorkDemo demo_type={demo?.demo_type} demo_link={demo?.link || demo?.document} />
            </div>
            <p className="font-semibold">{demo?.Title}</p>
            <p>Description: {demo?.comment || "N/A"}</p>
            <p>Content Product: {demo?.content_product_name || "N/A"}</p>
            <ul className="my-3 space-y-2">
                {demo?.artist && <li className="border-b pb-1">
                    <span className="hover:underline cursor-pointer" onClick={() => setArtistProfile(demo?.artist)}>{demo?.artist_name}</span>
                    <span className="ml-1 bg-gray-100 text-gray-600 px-1 border rounded-full text-sm">owner</span>
                </li>}
                {demo?.collaborators?.map(c => (
                    <li className="border-b pb-2 flex justify-between">
                        <span className="hover:underline cursor-pointer" onClick={() => setArtistProfile(c.id)}>{c.name}</span>
                        <div className="space-x-1">
                            {!demo?.artist && <Badge onClick={() => handleMakeOwner(c.id)} className="cursor-pointer text-sm font-normal border" type="success">make owner</Badge>}
                            <Badge onClick={() => handleUnassign(c.id)} className="cursor-pointer text-sm font-normal border" type="error">remove</Badge>
                        </div>
                    </li>
                ))}
            </ul>

            <AssignArtistToDemo demoId={demo?.id} />
            <AssignDemoToProject demoId={demo?.id} />

            <RxCross1 onClick={closeDemo} className="absolute top-0 right-0 m-3 cursor-pointer" size={25} />
        </div>
    )
}

export default DemoDetails;