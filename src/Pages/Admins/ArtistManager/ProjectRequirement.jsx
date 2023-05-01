import { AiOutlineBars, AiOutlineTag } from "react-icons/ai";
import { BiCommentDots } from "react-icons/bi";
import { RiLink } from "react-icons/ri";
import { RxDotsHorizontal } from "react-icons/rx";
import { Link } from "react-router-dom";

const ProjectRequirement = () => {
    return (
        <div className="w-full">
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <p tabIndex={0} className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Artist Requirements</p>
                    <div className="py-3 px-4 flex items-center text-sm font-medium text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
                        <p>Sort By:</p>
                        <select aria-label="select" className="focus:text-sky-600 focus:outline-none bg-transparent ml-1">
                            <option className="text-sm text-sky-800">In Progress</option>
                            <option className="text-sm text-sky-800">Done</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="bg-white overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                    <tbody>
                        {
                            [...Array(3).keys()].map(i =>
                                <tr tabIndex={0} className="focus:outline-none h-16 border border-gray-100 rounded">
                                    <td className>
                                        <div className="flex items-center pl-5">
                                            <Link to="/projects/project-requirement/test">
                                                <p className="text-sm font-medium text-gray-700 mr-2 hover:underline cursor-pointer">Marketing Keynote Presentation</p>
                                            </Link>
                                        </div>
                                    </td>
                                    <td className="pl-24">
                                        <div className="flex items-center">
                                            <AiOutlineTag />
                                            <p className="text-sm text-gray-600 ml-2">In Progress</p>
                                        </div>
                                    </td>
                                    <td className="pl-5">
                                        <div className="flex items-center">
                                            <AiOutlineBars />
                                            <p className="text-sm text-gray-600 ml-2">04/07</p>
                                        </div>
                                    </td>
                                    <td className="pl-5">
                                        <div className="flex items-center">
                                            <BiCommentDots />
                                            <p className="text-sm text-gray-600 ml-2">23</p>
                                        </div>
                                    </td>
                                    <td className="pl-5">
                                        <div className="flex items-center">
                                            <RiLink />
                                            <p className="text-sm text-gray-600 ml-2">04/07</p>
                                        </div>
                                    </td>
                                    <td className="pl-5">
                                        {/* <button className="py-3 px-3 text-sm focus:outline-none text-red-700 bg-red-100 rounded">Due today at 18:00</button> */}
                                        {/* if the delivery is not today */}
                                        <button className="py-3 px-6 focus:outline-none text-sm text-gray-700 bg-gray-100 rounded">Due on 21.02.21</button>
                                    </td>
                                    <td>
                                        <div className="relative px-5 pt-2">
                                            <button className="focus:ring-2 rounded-md focus:outline-none" onclick="dropdownFunction(this)" role="button" aria-label="option">
                                                <RxDotsHorizontal />
                                            </button>
                                            <div className="dropdown-content bg-white shadow w-24 absolute z-30 right-0 mr-6 hidden">
                                                <div tabIndex={0} className="focus:outline-none focus:text-sky-600 text-xs w-full hover:bg-sky-700 py-4 px-4 cursor-pointer hover:text-white">
                                                    <p>Edit</p>
                                                </div>
                                                <div tabIndex={0} className="focus:outline-none focus:text-sky-600 text-xs w-full hover:bg-sky-700 py-4 px-4 cursor-pointer hover:text-white">
                                                    <p>Delete</p>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProjectRequirement;