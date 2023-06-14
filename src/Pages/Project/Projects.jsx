import InfiniteScroll from 'react-infinite-scroll-component';
import FeedCardSkeleton from '../../Components/Skeleton/FeedCardSkeleton';
import { useGetDreamProjectsQuery } from '../../features/project/projectApi';
import ProjectCard from './ProjectCard';

const Projects = () => {
    const { data: projects, isSuccess } = useGetDreamProjectsQuery();

    const fetchMoreData = () => { }

    return (
        <InfiniteScroll
            dataLength={projects?.length || 0}
            next={fetchMoreData}
            hasMore={true}
            loader={<FeedCardSkeleton />}
            className="stream"
        >
            {
                isSuccess &&
                projects.map(project => <ProjectCard projectId={project.pk} />)
            }
        </InfiniteScroll>
    );
};

export default Projects;