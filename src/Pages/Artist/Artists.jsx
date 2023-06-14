import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../Components/Loader/Spinner";
import NothingFound from "../../Components/NotFound/NothingFound";
import { useRootContext } from "../../contexts/RootProvider";
import { useGetArtistsQuery } from "../../features/artist/artistApi";
import { setSearch } from "../../features/filter/filterSlice";
import SearchInfo from "./Components/SearchInfo";
import ArtistRowView from "./Components/View/ArtistRowView";

const Artists = () => {
    const { setArtists, artists, page, setPage } = useRootContext();
    const { searchText } = useSelector(state => state.filter);
    const dispatch = useDispatch();

    const [hasNext, setHasNext] = useState(true);
    const { data, isLoading } = useGetArtistsQuery({ page, search: searchText });

    const fetchMoreData = () => {
        setPage(page + 1);
    };

    useEffect(() => {
        setArtists([]);
        setPage(1);
    }, [])

    useEffect(() => {
        if (data?.results?.length) {
            setArtists(prevState => [...prevState, ...data.results]);
            setHasNext(data.next);
        }
    }, [data])

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
            loader={<>Loading...</>}
            className="stream-lg min-h-[50vh]"
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