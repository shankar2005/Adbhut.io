import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRootContext } from '../../contexts/RootProvider';
import FeedCardSkeleton from '../../Components/Skeleton/FeedCardSkeleton';
import ArtistWorkView from '../Artist/Components/View/ArtistWorkView';
import ArtistSquareView from '../Artist/Components/View/ArtistSquareView';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../../features/filter/filterSlice';
import { showLogin } from '../../features/dropdown/dropdownSlice';
import NothingFound from '../../Components/NotFound/NothingFound';
import ArtistRowViewSkeleton from '../../Components/Skeleton/ArtistRowViewSkeleton';
import Artists from '../Artist/Artists';
import SearchInfo from '../Artist/Components/SearchInfo';
import FilterArtist from '../Artist/FilterArtist';
import { Link, useLocation } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';

const Feed = () => {
    return
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
                        artists?.map((artist, idx) => <ArtistWorkView key={idx} artist={artist} />)
                    }
                </>
        )
    }
    else if (viewAs === "details") {
        content = (
            loading
                ? <ArtistRowViewSkeleton />
                : <Artists />
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

    return (
        <section className='stream mt-5 relative'>

            {/* <Link to="/projects/create-project"><BiArrowBack className='cursor-pointer bg-gray-200 text-gray-700 rounded-full p-1 absolute -left-10 top-0.5' size={30} /></Link>
            <FilterArtist /> */}

            <div className='relative overflow-auto bg-gray-100'>
                {/* {loading && <h2 className=''>Loading...</h2>} */}

                {/* <SearchInfo
                    searchText={searchText}
                    clearSearch={() => dispatch(setSearch(""))}
                /> */}

                {/* {!artists.length && <NothingFound />} */}

                <InfiniteScroll
                    dataLength={artists.length}
                    next={fetchMoreData}
                    hasMore={hasNext}
                    loader={<FeedCardSkeleton />}
                >
                    {content}
                </InfiniteScroll>
            </div>
        </section>
    );
};

export default Feed;