import { AiOutlineBars, AiOutlineTag } from "react-icons/ai";
import { BiCommentDots } from "react-icons/bi";
import { RiLink } from "react-icons/ri";
import { RxDotsHorizontal } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useGetArtistRequestsQuery } from "../../../features/project/projectApi";

const ProjectRequirement = () => {
    const { data } = useGetArtistRequestsQuery();

    return (
        <div>
            {data?.map(requirement => <Row requirement={requirement} />)}
        </div>
    );
};

export default ProjectRequirement;

const Row = ({ requirement }) => {
    const { project_details, skills_details, hiring_status, budget_range, production_hiring, service_hiring, target } = requirement;

    return (
        <div className='bg-white border-b p-3 text-sm'>
            <p className='font-medium flex items-center gap-1'>
                {project_details.project}
                <span>&#9679;</span>
                <span className='w-fit my-1 px-0.5 text-sm font-normal font-sans italic text-gray-700 bg-yellow-100'>{hiring_status}</span>
            </p>

            <div className='text-xs flex flex-wrap gap-1 my-1'>
                {
                    skills_details?.map((skill, idx) => <div key={idx} className='bg-sky-400 p-1 px-2 rounded-full text-white'>{skill}</div>)
                }
            </div>
            <p>
                <span className="font-medium">Budget Range: </span>
                {budget_range}
            </p>
            <p>
                <span className="font-medium">Production Hiring: </span>
                {production_hiring}
            </p>
            <p>
                <span className="font-medium">Service Hiring: </span>
                {service_hiring}
            </p>
            <p>
                <span className="font-medium">Target: </span>
                {target}
            </p>
        </div>
    )
}