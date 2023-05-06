import { Link } from "react-router-dom";
import { Spotify } from "react-spotify-embed";
import { useRootContext } from "../../contexts/RootProvider";
import { useGetProjectQuery } from "../../features/project/projectApi";
import useYoutubeEmbaded from "../../hooks/useYoutubeEmbaded";

const ProjectCard = ({ projectId }) => {
    const { avatar } = useRootContext();
    const { data: project = {} } = useGetProjectQuery(projectId);
    const artist = {};

    const thumbnail = project?.reference_links && JSON.parse(project?.reference_links)[0]

    let thumbnailEle;
    if (thumbnail && thumbnail.includes("youtu")) {
        thumbnailEle = <div className='aspect-video'>
            {useYoutubeEmbaded(thumbnail)}
        </div>
    } else if (thumbnail && thumbnail.includes("spotify")) {
        thumbnailEle = <div className="flex justify-center bg-black pt-6">
            <Spotify link="https://open.spotify.com/track/1i6LMHYCn5hQE6G8HCjcf2" />
        </div>
    } else {
        thumbnailEle = <img className="w-full" src="https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder.png" alt="" />
    }

    return (
        <div className='mb-5 p-5 bg-white rounded-lg shadow-md'>
            <div className='flex items-center justify-between gap-2 mb-3'>
                <div className="flex items-center gap-3">
                    <Link to={`/projects/${project.pk}`}>
                        <img className='w-12 h-12 rounded-full' src={artist.profile_pic || avatar} alt="" />
                    </Link>
                    <div className='text-sm'>
                        <Link to={`/projects/${project.pk}`}>
                            <span className='font-medium'>{project?.title}</span>
                        </Link>
                        <p>
                            Musical
                        </p>
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
            {
                thumbnail ? thumbnailEle : <img className="w-full" src="https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder.png" alt="" />
            }
        </div>
    )
}

export default ProjectCard;