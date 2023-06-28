import { Link } from "react-router-dom";
import { useGetArtistRequestsQuery, useGetTotalArtistQuery } from "../../../features/artist/artistApi";
import { useGetArtistCountBySkillsQuery } from "../../../features/utils/utilsApi";
import { useState } from "react";
import { useGetDemosQuery } from "../../../features/demo/demoApi";
import { useSelector } from "react-redux";
import DemoDetails from "../../Demo/Components/DemoDetails";
import AddNewDemo from "../../Demo/AddNewDemo";

const ArtistRequirement = () => {
    const { data } = useGetArtistRequestsQuery();
    const { data: skills } = useGetArtistCountBySkillsQuery();
    const { data: totalArtist } = useGetTotalArtistQuery();
    const [isDemoShown, setIsDemoShown] = useState(false);
    const closeDemo = () => setIsDemoShown(false);
    const [sorted, setSorted] = useState(false);
    const toggleSort = () => setSorted(prev => !prev);
    const { user } = useSelector(state => state.auth);
    const { data: demos } = useGetDemosQuery(null, { skip: !user?.email });

    return (
        <section className="w-11/12 mx-auto font-hero mb-5">
            {/* <div className="mt-5 mb-8 border-b pb-8">
                <h1 className="text-3xl">Hi <strong>{user?.name?.split(" ")[0]}</strong>🙂,</h1>
                <p className="text-xl mt-2">It's <span className="text-blue-600">{new Date().getDate()} June 2023</span>, and you've got <span className="text-3xl font-bold text-red-500">100</span> Artist targets for today. Best of Luck! 🎉</p>
                <div className="w-full overflow-x-auto bg-white mt-8">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-md text-left">
                                <th className="px-4 py-1 border-t">Date</th>
                                <th className="px-4 py-1 border-t">Target</th>
                                <th className="px-4 py-1 border-t">Details</th>
                                <th className="px-4 py-1 border-t">Spanshot</th>
                                <th className="px-4 py-1 border-t">Target Filled</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-4 py-1 border-t">12 June 2023</td>
                                <td className="px-4 py-1 border-t">100</td>
                                <td className="px-4 py-1 border-t">Please Try to fill the artist required for project "Demo"</td>
                                <td className="px-4 py-1 border-t">672</td>
                                <td className="px-4 py-1 border-t">
                                    <input className="border w-16 pl-1" type="number" placeholder="Filled" />
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-1 border-t">12 June 2023</td>
                                <td className="px-4 py-1 border-t">100</td>
                                <td className="px-4 py-1 border-t">Please Try to fill the artist required for project "Demo"</td>
                                <td className="px-4 py-1 border-t">672</td>
                                <td className="px-4 py-1 border-t">
                                    <input className="border w-16 pl-1" type="number" placeholder="Filled" />
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-1 border-t">12 June 2023</td>
                                <td className="px-4 py-1 border-t">100</td>
                                <td className="px-4 py-1 border-t">Please Try to fill the artist required for project "Demo"</td>
                                <td className="px-4 py-1 border-t">672</td>
                                <td className="px-4 py-1 border-t">
                                    <input className="border w-16 pl-1" type="number" placeholder="Filled" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div> */}

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
                    <h2 className="text-4xl font-bold text-center pt-5 pb-8">{demos?.length}</h2>
                </div>
            </div>

            <div className="bg-white w-full border my-3 flex">
                <div className="flex-1 p-3 flex flex-col">
                    <div className="flex items-center gap-2 mb-2 border-b pb-3">
                        <h3 className="text-lg font-semibold">Demos</h3>
                        <AddNewDemo />
                    </div>

                    <ul className="my-2">
                        {demos?.map(demo => <li onClick={() => setIsDemoShown(demo.id)} className="text-blue-600 hover:underline underline-offset-2 cursor-pointer w-fit">{demo.Title}</li>)}
                    </ul>
                    <div className="mt-auto border-t pt-2">
                        <Link to="/projects/readydemos" className="text-blue-600 hover:underline underline-offset-2">View All</Link>
                    </div>
                </div>

                {isDemoShown && <DemoDetails demoId={isDemoShown} closeDemo={closeDemo} />}
            </div>

            {/* <div className="mb-2 w-full overflow-hidden flex">
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
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div> */}

            <div className='bg-white'>
                <h1 className="p-4 text-base font-bold border-b">Artist Requirements</h1>
                {data?.map((
                    {
                        id,
                        project_details,
                        hiring_status,
                    }
                ) => (
                    <div key={id} className="flex items-center justify-between p-4 bg-white border-b">
                        <div className='font-medium space-x-2'>
                            <Link to={`/projects/artist-requirement/${id}`} className="text-blue-700 hover:underline underline-offset-2">{project_details?.name}</Link>
                        </div>
                    </div>))}
            </div>
        </section >
    );
};

export default ArtistRequirement;