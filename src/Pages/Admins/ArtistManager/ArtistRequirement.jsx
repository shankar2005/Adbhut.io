import { Link } from "react-router-dom";
import { useGetArtistRequestsQuery, useGetTotalArtistQuery } from "../../../features/artist/artistApi";
import { BsArrowRight } from "react-icons/bs";
import TableRow from "../../../Components/Table/TableRow";
import Charts from "./Charts";
import { useGetArtistCountBySkillsQuery } from "../../../features/utils/utilsApi";

const ArtistRequirement = () => {
    const { data } = useGetArtistRequestsQuery();
    const { data: skills } = useGetArtistCountBySkillsQuery();
    const { data: totalArtist } = useGetTotalArtistQuery();

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
            </div>

            <div class="mb-2 w-full overflow-hidden flex">
                <div className="bg-white p-4">
                    <h3 className="text-xl font-semibold">Skills</h3>
                    <small className="text-sm">Artist's number listed under each skills.</small>
                </div>
                <div class="w-full overflow-x-auto bg-white p-3">
                    <table class="w-full text-sm">
                        <thead>
                            <tr class="text-md text-left bg-gray-100">
                                <th class="px-4 py-1 font-normal">Skills</th>
                                <th class="px-4 py-1 font-normal">Artists</th>
                                <th class="px-4 py-1 font-normal">Target</th>
                            </tr>
                        </thead>
                        <tbody>
                            {skills?.map(skill => <tr>
                                <td class="px-4 py-1 border-y">
                                    <div class="flex items-center text-sm">
                                        <p>{skill.name}</p>
                                    </div>
                                </td>
                                <td class="px-4 py-1 text-sm border-y whitespace-pre-wrap">
                                    {skill.artist}
                                </td>
                                <td class="px-4 py-1 text-sm border-y whitespace-pre-wrap">
                                    <span className="bg-red-500 text-white font-bold p-0.5 rounded">12</span>
                                </td>
                                <td class="px-4 py-1 text-sm border-y whitespace-pre-wrap w-1/6">
                                    <span className="text-blue-700">Complete</span>
                                </td>
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