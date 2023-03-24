import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRootContext } from '../../contexts/RootProvider';
import FeedCardSkeleton from '../../Components/Skeleton/FeedCardSkeleton';
import { CiCircleRemove } from 'react-icons/ci';
import ArtistWorkView from '../Artist/Components/View/ArtistWorkView';
import ArtistSquareView from '../Artist/Components/View/ArtistSquareView';
import ArtistRowView from '../Artist/Components/View/ArtistRowView';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../../features/filter/filterSlice';
import { showLogin } from '../../features/dropdown/dropdownSlice';
import NothingFound from '../../Components/NotFound/NothingFound';
import FullPageLoader from '../../Components/Loader/PageLoader';

const Feed = () => {
    const { demoType, checkedSkills, checkedGenres, checkedLocations, viewAs } = useRootContext();

    const { user } = useSelector(state => state.auth);
    const { searchText } = useSelector(state => state.filter);
    const dispatch = useDispatch();

    const skillQuery = checkedSkills?.map(skill => `&owner__skill=${skill}`).join('');
    const genreQuery = checkedGenres?.map(genre => `&owner__skill_genres=${genre}`).join('');
    const checkedLocationQuery = checkedLocations?.map(location => `&owner__location=${location}`).join('');

    const [page, setPage] = useState(1);
    const [hasNext, setHasNext] = useState(true);

    const [artists, setArtists] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const url = `https://dev.nsnco.in/api/v1/get_feed/?${searchText && `search=${searchText}`}${demoType && `&demo_type=${demoType}`}${skillQuery && skillQuery}${genreQuery && genreQuery}${checkedLocationQuery && checkedLocationQuery}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                // this solved the problem of repeating first 10 feeds on first render
                setPage(2);
                setArtists(data.results)
                setHasNext(data.next)
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.log(err)
            })
    }, [searchText, demoType, checkedSkills, checkedGenres, checkedLocations])

    const fetchMoreData = () => {
        // restric unauthenticated users from seeing more than 10 posts
        if (artists.length === 10 && !user?.email) {
            console.log("you must have to login");
            dispatch(showLogin());
            return;
        }

        const url = `https://dev.nsnco.in/api/v1/get_feed/?page=${page}&${searchText && `search=${searchText}`}${demoType && `&demo_type=${demoType}`}${skillQuery && skillQuery}${genreQuery && genreQuery}${checkedLocationQuery && checkedLocationQuery}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setArtists(artists.concat(data.results))
                setHasNext(data.next)
                setPage(page + 1)
            })
            .catch(err => console.log(err))
    };

    let content;
    if (viewAs === "large") {
        content = (
            loading
                ? <FeedCardSkeleton />
                : <>
                    {
                        searchText &&
                        <div className='flex items-center gap-2'>
                            <h1 className='text-xl md:text-2xl my-3 font-medium text-gray-500'>Results for "{searchText}"</h1>
                            <button className='bg-sky-500 text-white p-1 pr-3 rounded-md text-xs flex items-center gap-1 whitespace-nowrap' onClick={() => dispatch(setSearch(""))}><CiCircleRemove size={20} /> Clear search</button>
                        </div>
                    }
                    {
                        artists?.map((artist, idx) => <ArtistWorkView key={idx} artist={artist} />)
                    }
                </>
        )
    }
    else if (viewAs === "details") {
        content = (
            loading
                ? <FeedCardSkeleton />
                : <>
                    {
                        artists?.map((artist, idx) => <ArtistRowView key={idx} artist={artist} />)
                    }
                </>
        )
    }
    else if (viewAs === "small") {
        content = (
            loading
                ? <FeedCardSkeleton />
                : <div className='grid grid-cols-2 gap-5'>
                    {
                        artists?.map((artist, idx) => <ArtistSquareView key={idx} artist={artist} />)
                    }
                </div>
        )
    }

    if(loading){
        return <h2 className=''>Loading...</h2>
    }

    if(!artists.length){
        return <NothingFound />
    }

    return (
        <div className='relative'>
            <InfiniteScroll
                dataLength={artists.length}
                next={fetchMoreData}
                hasMore={hasNext}
                loader={<FeedCardSkeleton />}
            >
                {content}
            </InfiniteScroll>
        </div>
    );
};

export default Feed;