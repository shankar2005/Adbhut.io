import { Link } from "react-router-dom";
import { Spotify } from "react-spotify-embed";
import avatar from "../../assets/placeholders/avatar.png";
import { useGetProjectQuery } from "../../features/project/projectApi";
import useYoutubeEmbaded from "../../hooks/useYoutubeEmbaded";

const ProjectCard = ({ projectId }) => {
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
        thumbnailEle = <embed src={thumbnail} className="w-full" height="500" />
    }

    return (
        <div className='mb-5 p-5 bg-white rounded-lg shadow-md'>
            <div className='flex items-center justify-between gap-2 mb-3'>
                <div className="flex items-center gap-3">
                    <Link to={`/projects/${project.pk}/${project.stage}`}>
                        <img className='w-12 h-12' src={artist.profile_pic || avatar} alt="" />
                    </Link>
                    <div className='text-sm'>
                        <Link to={`/projects/${project.pk}/${project.stage}`}>
                            <span className='font-medium'>{project?.title}</span>
                        </Link>
                        <p>
                            Voice Over Artist, Singing, Dancing
                        </p>
                    </div>
                </div>
                <Link to={`/projects/${project.pk}/${project.stage}`}>
                    <button className='text-blue-600 border-2 bg-sky-100 border-blue-100 py-2.5 px-4 rounded-lg font-medium'>
                        Get Inspired
                    </button>
                </Link>
            </div>
            <p className='text-sm mb-2'>
                {project?.production_solution}
            </p>
            {thumbnail && thumbnailEle}
        </div>
    )
}

export default ProjectCard;