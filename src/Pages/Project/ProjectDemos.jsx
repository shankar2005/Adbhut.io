import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import FeedCardSkeleton from '../../Components/Skeleton/FeedCardSkeleton';
import { useGetProjectQuery } from '../../features/project/projectApi';
import ArtistWorkView from '../Artist/Components/View/ArtistWorkView';

const ProjectDemos = () => {
    const { id } = useParams();
    const { data: currentProject = {} } = useGetProjectQuery(id);
    const demos = currentProject.project_demos;

    const fetchMoreData = () => { }

    if(!demos?.length){
        return <div className='flex flex-col items-center'>
            <img className='w-36' src="https://cdn-icons-png.flaticon.com/512/6598/6598519.png" alt="" />
            <h1 className='text-xl font-mono'>Nothing found!</h1>
        </div>
    }

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