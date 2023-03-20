import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import FeedCardSkeleton from '../../Components/Skeleton/FeedCardSkeleton';
import { useGetProjectQuery } from '../../features/project/projectApi';
import ArtistWorkView from '../Artist/Components/View/ArtistWorkView';
import ProjectCard from './ProjectCard';

const ProjectDemos = () => {
    const { id } = useParams();
    const { data: currentProject = {} } = useGetProjectQuery(id);
    const demos = currentProject.project_demos;

    const fetchMoreData = () => { }

    return (
        <InfiniteScroll
            dataLength={demos?.length || 0}
            next={fetchMoreData}
            hasMore={true}
            loader={<FeedCardSkeleton />}
        >
            {
                demos?.length > 0 &&
                demos.map(demo => <ArtistWorkView key={demo.pk} artist={demo} />)
            }
        </InfiniteScroll>
    );
};

export default ProjectDemos;