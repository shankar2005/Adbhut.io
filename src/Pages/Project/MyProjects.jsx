import InfiniteScroll from 'react-infinite-scroll-component';
import FeedCardSkeleton from '../../Components/Skeleton/FeedCardSkeleton';
import { useGetCurrentProjectsQuery } from '../../features/project/projectApi';
import ProjectCard from './ProjectCard';

const MyProjects = () => {
    const { data: projects, isSuccess } = useGetCurrentProjectsQuery();

    const fetchMoreData = () => { }

    return (
        <InfiniteScroll
            dataLength={projects?.length || 0}
            next={fetchMoreData}
            hasMore={true}
            loader={<FeedCardSkeleton />}
        >
            {
                isSuccess &&
                projects.map(project => <ProjectCard projectId={project.pk} />)
            }
        </InfiniteScroll>
    );
};

export default MyProjects;