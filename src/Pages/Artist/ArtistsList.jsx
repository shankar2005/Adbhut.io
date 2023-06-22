import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../../Components/Loader/Spinner";
import NothingFound from "../../Components/NotFound/NothingFound";
import { useRootContext } from "../../contexts/RootProvider";
import { useGetArtistsQuery } from "../../features/artist/artistApi";
import SearchInfo from "./Components/SearchInfo";
import ArtistRowView from "./Components/View/ArtistRowView";
import FilterArtist from "./FilterArtist";

const ArtistsList = () => {
    const { setArtists, artists, page, setPage, handleClearFilter } = useRootContext();
    const { searchText } = useSelector(state => state.filter);

    const { selectedContentProduct } = useSelector(state => state.project);

    const [hasNext, setHasNext] = useState(true);
    const { data, isLoading, isFetching } = useGetArtistsQuery({ page, search: searchText });

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
        <section className='stream mt-5 relative'>
            {
                selectedContentProduct && <>
                    <Link to="/projects/create-project"><BiArrowBack className='cursor-pointer bg-gray-200 text-gray-700 rounded-full p-1 absolute -left-10 top-0.5' size={30} /></Link>
                    <FilterArtist />
                </>
            }

            <InfiniteScroll
                dataLength={artists?.length}
                next={fetchMoreData}
                hasMore={hasNext}
                className="stream min-h-[50vh]"
            >
                <SearchInfo
                    searchText={searchText}
                    clearSearch={handleClearFilter}
                />

                {!isFetching && !artists.length && <NothingFound />}

                {
                    artists?.map(artist => <ArtistRowView key={artist?.id} artist={artist} />)
                }
            </InfiniteScroll>
        </section>
    );
};

export default ArtistsList;