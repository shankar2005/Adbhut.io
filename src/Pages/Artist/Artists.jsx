import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../Components/Loader/Spinner";
import NothingFound from "../../Components/NotFound/NothingFound";
import { useGetArtistsQuery } from "../../features/artist/artistApi";
import { setSearch } from "../../features/filter/filterSlice";
import SearchInfo from "./Components/SearchInfo";
import ArtistRowView from "./Components/View/ArtistRowView";

const Artists = () => {
    const { searchText } = useSelector(state => state.filter);
    const dispatch = useDispatch();

    const [page, setPage] = useState(1);
    const [hasNext, setHasNext] = useState(true);
    const { data, refetch, isLoading } = useGetArtistsQuery({ page, name: searchText });
    const [artists, setArtists] = useState([]);

    const fetchMoreData = () => {
        setPage(page + 1);
    };

    useEffect(() => {
        if (data?.results?.length) {
            if (searchText) {
                setArtists(data.results);
            } else {
                setArtists(prevState => [...prevState, ...data.results]);
            }
            setHasNext(data.next);
        } else {
            setArtists([]);
        }
    }, [data, searchText])

    useEffect(() => {
        if (!searchText) {
            setPage(1); // Reset page when search text is cleared
            setArtists([]); // Clear artists when search text is cleared
            refetch();
        }
    }, [searchText])

    if (isLoading) {
        return <div className="flex items-center justify-center py-10">
            <Spinner />
        </div>
    }

    return (
        <InfiniteScroll
            dataLength={artists?.length}
            next={fetchMoreData}
            hasMore={hasNext}
            // loader={<FeedCardSkeleton />}
            className="min-h-[50vh]"
        >
            <SearchInfo
                searchText={searchText}
                clearSearch={() => dispatch(setSearch(""))}
            />

            {!artists.length && <NothingFound />}

            {
                artists?.map(artist => <ArtistRowView key={artist?.id} artist={artist} setArtists={setArtists} />)
            }
        </InfiniteScroll>
    );
};

export default Artists;