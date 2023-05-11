import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetArtistsQuery } from "../../features/artist/artistApi";
import ArtistRowView from "./Components/View/ArtistRowView";

const Artists = () => {
    const [page, setPage] = useState(1);
    const [hasNext, setHasNext] = useState(true);
    const { data } = useGetArtistsQuery(page);
    const [artists, setArtists] = useState([]);

    const fetchMoreData = () => {
        setPage(page + 1);
    };

    useEffect(() => {
        if (data?.results?.length) {
            setArtists([...artists, ...data?.results]);
            setHasNext(data.next);
        }
    }, [data])

    return (
        <InfiniteScroll
            dataLength={artists?.length}
            next={fetchMoreData}
            hasMore={hasNext}
        // loader={<FeedCardSkeleton />}
        >
            {
                artists?.map(artist => <ArtistRowView key={artist?.id} artist={artist} />)
            }
        </InfiniteScroll>
    );
};

export default Artists;