import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../Components/Loader/Spinner";
import NothingFound from "../../Components/NotFound/NothingFound";
import { useRootContext } from "../../contexts/RootProvider";
import { useGetArtistsQuery } from "../../features/artist/artistApi";
import { setSearch } from "../../features/filter/filterSlice";
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

    // search
    // search
    // search
    const dispatch = useDispatch();
    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        setArtists([]);
        dispatch(setSearch(e.target.search.value));
        e.target.reset();
    }
    // search
    // search
    // search

    if (isLoading) {
        return <div className="flex items-center justify-center py-10">
            <Spinner />
        </div>
    }


    return (
        <section className='stream mt-3 relative'>
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
                <small className="font-hero font-medium">Artist Manager Search <strong className="text-yellow-800">(*Press Enter for search)</strong></small>
                <form onSubmit={handleSearch} className="relative mb-3 py-1 pl-px">
                    <input type="search" name="search" className='border border-gray-300 py-2 w-72 pl-10 pr-3 outline-0 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm rounded' placeholder='Search your artist here...' required />
                    <AiOutlineSearch className='w-6 h-6 text-gray-500 absolute top-1/2 -translate-y-1/2 left-2' />
                </form>

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