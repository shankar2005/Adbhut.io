import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import FeedCardSkeleton from '../../Components/Skeleton/FeedCardSkeleton';
import { useGetCurrentProjectsQuery } from '../../features/project/projectApi';
import ProjectCard from './ProjectCard';

const MyProjects = () => {
    const { user } = useSelector(state => state.auth);
    const { data: projects, isSuccess } = useGetCurrentProjectsQuery(null, { skip: !user?.email });

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
                projects.map(project => <ProjectCard key={project.pk} projectId={project.pk} />)
            }
        </InfiniteScroll>
    );
};

export default MyProjects;