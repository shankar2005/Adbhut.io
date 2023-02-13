import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../../assets/placeholders/avatar.png";
import useYoutubeEmbaded from "../../hooks/useYoutubeEmbaded";

const ProjectCard = ({ projectDetails }) => {
    const [project, setProject] = useState({})
    useEffect(() => {
        fetch(`https://dev.nsnco.in/api/v1/edit_project/${projectDetails?.pk}/`)
            .then(res => res.json())
            .then(data => setProject(data))
    }, [projectDetails])


    const artist = {};
    return (
        <div className='mb-5 p-5 bg-white rounded-lg shadow-md'>
            <div className='flex items-center gap-2 mb-3'>
                <Link to={`/project/${project.pk}/${project.stage}`} className='w-[11%] block'>
                    <img className='w-12 h-12' src={artist.profile_pic || avatar} alt="" />
                </Link>
                <div className='w-[60%] text-sm'>
                    <Link to={`/project/${project.pk}/${project.stage}`}>
                        <span className='font-medium'>{project?.title}</span>
                    </Link>
                    {/* <p>
                        Voice Over Artist, Singing, Dancing
                    </p> */}
                </div>
                <Link to={`/project/${project.pk}/${project.stage}`} className='w-[29%] ml-auto'>
                    <button className='text-blue-600 border-2 bg-sky-100 border-blue-100 py-2.5 px-4 rounded-lg font-medium'>
                        Get Inspired
                    </button>
                </Link>
            </div>
            <p className='text-sm mb-2'>
                {project?.production_solution}
                {/* <a className='text-blue-500 ml-1' href="#">see more</a> */}
            </p>
            <div>
                {
                    project?.reference_links &&
                    <>
                        {
                            project.reference_links?.includes("youtu") ?
                                <div className='h-[270px] 2xl:h-[350px]'>
                                    {useYoutubeEmbaded(project?.reference_links)}
                                </div>
                                : <embed src={project?.reference_links} className="w-full" height="500" />
                        }
                    </>
                }
            </div>
        </div>
    )
}

export default ProjectCard;