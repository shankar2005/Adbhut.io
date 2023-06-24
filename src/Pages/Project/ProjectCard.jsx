import { Link } from "react-router-dom";
import { useRootContext } from "../../contexts/RootProvider";
import { useGetProjectQuery } from "../../features/project/projectApi";
import WorkDemo from "../Artist/Components/View/WorkDemo";

const ProjectCard = ({ projectId }) => {
    const { avatar } = useRootContext();
    const { data: project = {} } = useGetProjectQuery(projectId);
    const artist = {};

    const thumbnail = project.links?.length > 0 && project.links[0];

    return (
        <div className='mb-5 p-5 bg-white rounded-lg shadow-md'>
            <div className='flex items-center justify-between gap-2 mb-3'>
                <div className="flex items-center gap-3">
                    <Link to={`/projects/${project.pk}`}>
                        <img className='w-12 h-12 rounded-full' src={artist.profile_pic || avatar} alt="" />
                    </Link>
                    <div className='text-sm'>
                        <Link to={`/projects/${project.pk}`}><p className='text-sm'><strong>{project?.client_details?.name}</strong> </p></Link>
                        <Link to={`/projects/${project.pk}`}>{project?.title}</Link>
                    </div>
                </div>
                <Link to={`/projects/${project.pk}`}>
                    <button className='text-blue-600 bg-sky-100 py-2.5 px-4 rounded-lg font-medium text-sm md:text-base'>
                        {project.stage === "DreamProject" ? "Get Inspired" : "View Details"}
                    </button>
                </Link>
            </div>
            <p className='text-sm mb-2'>
                {project?.production_solution?.length > 200 ? project?.production_solution?.slice(0, 200) + "..." : project?.production_solution}
            </p>
            <WorkDemo demo_type={thumbnail.link_type} demo_link={thumbnail.link} />
        </div>
    )
}

export default ProjectCard;