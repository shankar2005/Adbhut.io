import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";

const ProjectRequirementDetails = () => {
    return (
        <section>
            <div className="p-4">
                <ul className="flex gap-2 text-sm">
                    <li>
                        <Link to="/projects/project-requirement" className="flex items-center gap-2">
                            <p>All</p>
                            <SlArrowRight />
                        </Link>
                    </li>
                    <li className="flex items-center gap-2 font-medium">
                        <p>Marketing Keynote Presentation</p>
                    </li>
                </ul>
            </div>
            <div className='bg-white shadow-sm text-sm grid grid-cols-2'>

                <div className="space-y-4 border-r p-4">
                    <div>
                        <div className="text-gray-500 font-medium">Skill</div>
                        Foriegn Key - Skill - Multiple
                    </div>
                    <div>
                        <div className="text-gray-500 font-medium">Location</div>
                        Foriegn Key
                    </div>
                    <div>
                        <div className="text-gray-500 font-medium">Genre</div>
                        Table (Multiple)
                    </div>
                    <div>
                        <div className="text-gray-500 font-medium">Language</div>
                        Table (Multiple)
                    </div>
                    <div>
                        <div className="text-gray-500 font-medium">Other Performing Art Details</div>
                        Text
                    </div>
                    <div>
                        <div className="text-gray-500 font-medium">Budget Range</div>
                        (min-max)
                    </div>
                    <div>
                        <div className="text-gray-500 font-medium">Budget Idea</div>
                        Text
                    </div>
                    <div>
                        <div className="text-gray-500 font-medium">Production Hiring</div>
                        Number
                    </div>
                    <div>
                        <div className="text-gray-500 font-medium">Servicing Hiring</div>
                        Number
                    </div>
                    <div>
                        <div className="text-gray-500 font-medium">Target</div>
                        number
                    </div>
                    <div>
                        <div className="text-gray-500 font-medium">Comments</div>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit debitis maxime temporibus, odit labore reiciendis totam iusto tenetur inventore mollitia exercitationem saepe. In, blanditiis. Maxime ut rem laboriosam placeat dolores.
                        </p>
                    </div>
                    <div>
                        <div className="text-gray-500 font-medium">Hiring Status</div>
                        In-Progress/ Done
                    </div>
                </div>
                <div className="space-y-4 p-4">
                    <div>
                        <div className="text-gray-500 font-medium">Shortlisted artist</div>
                        <div>
                            <div className="flex items-center gap-2 border-b py-1.5">
                                <img className="w-10 rounded-full" src="https://i.pravatar.cc/100" alt="" />
                                <p>Maruf Hossain</p>
                            </div>
                            <div className="flex items-center gap-2 border-b py-1.5">
                                <img className="w-10 rounded-full" src="https://i.pravatar.cc/100" alt="" />
                                <p>Maruf Hossain</p>
                            </div>
                            <div className="flex items-center gap-2 border-b py-1.5">
                                <img className="w-10 rounded-full" src="https://i.pravatar.cc/100" alt="" />
                                <p>Maruf Hossain</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="text-gray-500 font-medium">Selected artists</div>
                        <div>
                            <div className="flex items-center gap-2 border-b py-1.5">
                                <img className="w-10 rounded-full" src="https://i.pravatar.cc/100" alt="" />
                                <p>Maruf Hossain</p>
                            </div>
                            <div className="flex items-center gap-2 border-b py-1.5">
                                <img className="w-10 rounded-full" src="https://i.pravatar.cc/100" alt="" />
                                <p>Maruf Hossain</p>
                            </div>
                            <div className="flex items-center gap-2 border-b py-1.5">
                                <img className="w-10 rounded-full" src="https://i.pravatar.cc/100" alt="" />
                                <p>Maruf Hossain</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="text-gray-500 font-medium">Rejected Artists</div>
                        <div>
                            <div className="flex items-center gap-2 border-b py-1.5">
                                <img className="w-10 rounded-full" src="https://i.pravatar.cc/100" alt="" />
                                <p>Maruf Hossain</p>
                            </div>
                            <div className="flex items-center gap-2 border-b py-1.5">
                                <img className="w-10 rounded-full" src="https://i.pravatar.cc/100" alt="" />
                                <p>Maruf Hossain</p>
                            </div>
                            <div className="flex items-center gap-2 border-b py-1.5">
                                <img className="w-10 rounded-full" src="https://i.pravatar.cc/100" alt="" />
                                <p>Maruf Hossain</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectRequirementDetails;