import { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../../Components/Loader/Spinner";
import NothingFound from "../../Components/NotFound/NothingFound";
import { useRootContext } from "../../contexts/RootProvider";
import { useGetArtistsQuery } from "../../features/artist/artistApi";
import SearchInfo from "./Components/SearchInfo";
import ArtistWorkView from "./Components/View/ArtistWorkView";
import FilterArtist from "./FilterArtist";

const Artists = () => {
    const { setArtists, artists, page, setPage, handleClearFilter } = useRootContext();
    const { searchText } = useSelector(state => state.filter);

    const { pk: currentProjectId, selectedContentProduct } = useSelector(state => state.project);

    const [hasNext, setHasNext] = useState(true);
    const { data, isLoading, isFetching } = useGetArtistsQuery({ page, search: searchText });

    const fetchMoreData = () => {
        setPage(page + 1);
    };

    useEffect(() => {
        setArtists([]);
        setPage(1);
        // set everything to initial stage when unmount
        return () => {
            setArtists([]);
            setPage(1);
        }
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
        <section className='stream mt-3'>

            <div className="sticky top-16">
                <Link to={
                    currentProjectId
                        ? `/projects/${currentProjectId}`
                        : "/projects/create-project"} className="absolute top-1">
                    <BiArrowBack className='cursor-pointer bg-gray-200 text-gray-700 rounded-full p-1' size={30} />
                </Link>
                {selectedContentProduct && <FilterArtist />}
            </div>

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
                    artists?.map(artist => (artist?.works_links[0]?.weblink && <ArtistWorkView key={artist?.id} artist={artist} />))
                }
            </InfiniteScroll>
        </section>
    );
};

export default Artists;