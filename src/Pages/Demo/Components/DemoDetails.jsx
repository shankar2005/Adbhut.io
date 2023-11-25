import { RxCross1 } from "react-icons/rx";
import { Link, useParams } from "react-router-dom";
import Badge from "../../../Components/Badge/Badge";
import Button from "../../../Components/Button/Button";
import Spinner from "../../../Components/Loader/Spinner";
import { useRootContext } from "../../../contexts/RootProvider";
import { useAssignArtistToDemoMutation, useGenerateLablesMutation, useGetDemoByIdQuery, useUnassignArtistFromDemoMutation } from "../../../features/demo/demoApi";
import WorkDemo from "../../Artist/Components/View/WorkDemo";
import AssignArtistToDemo from "./AssignArtistToDemo";
import AssignDemoToProject from "./AssignProjectToDemo";

const DemoDetails = () => {
    const demoId = useParams().id;
    const { setArtistProfile } = useRootContext();
    const { data: demo } = useGetDemoByIdQuery(demoId);
    const [unassignArtistFromDemo] = useUnassignArtistFromDemoMutation();
    const [assignArtistToDemo] = useAssignArtistToDemoMutation();
    const [generateLables, { isLoading }] = useGenerateLablesMutation();

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

    const handleGenerateLables = () => {
        generateLables({
            id: demo.id,
            type: demo?.demo_type === "mp4" ? "Video" : "Image",
            url: demo?.document
        })
    }

    function replaceSingleQuotes(str) {
        return str.replace(/'/g, '"');
    }

    return (
        <section className="font-hero w-11/12 mx-auto p-3 relative">
            <Link to="/projects/artist-requirement"><Button>Back</Button></Link>
            <div className="w-4/6 my-3">
                <WorkDemo demo_type={demo?.demo_type} demo_link={demo?.link || demo?.document} />
            </div>
            <Button onClick={handleGenerateLables} variant="secondary" size="sm">Generate</Button>

            {isLoading ? (
                <div className="mt-4">
                    <Spinner />
                </div>
            ) : (
                <div className="flex-1 my-3">
                    <div className="flex flex-wrap gap-1 font-semibold text-lg bg-gray-200 roundd-xl p-3 shadow-lg">
                        {(demo?.comment !== "Add your comment here") && demo?.comment?.slice(1, -1)}
                        {/* Keywords: {demo?.comment && JSON.parse(replaceSingleQuotes(demo.comment))?.map(keyword => (
                            <span className="flex items-center bg-gray-200 rounded-full px-2 py-1 text-sm">{keyword}</span>
                        ))} */}
                    </div>
                    {demo?.comment && <small className="text-yellow-600">*Keywords would be mapped to the client briefs</small>}
                </div>
            )}

            <p className="font-semibold mt-4">{demo?.Title}</p>
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
        </section >
    )
}

export default DemoDetails;