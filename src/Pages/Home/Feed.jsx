import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import avatar from '../../assets/placeholders/avatar.png';
import { useRootContext } from '../../contexts/RootProvider';
import useYoutubeEmbaded from '../../hooks/useYoutubeEmbaded';

const Feed = () => {
    const { searchText = "", demoType, checkedSkills, handleShortlist, checkedGenres } = useRootContext();

    const skillQuery = checkedSkills?.map(skill => `&owner__skill=${skill}`).join('');
    const genreQuery = checkedGenres?.map(genre => `&owner__skill_genres=${genre}`).join('');

    const [page, setPage] = useState(2);
    const [hasNext, setHasNext] = useState(true);

    const [artists, setArtists] = useState([]);

    useEffect(() => {
        const url = `https://dev.nsnco.in/api/v1/get_feed/?${searchText && `search=${searchText}`}${demoType && `&demo_type=${demoType}`}${skillQuery && skillQuery}${genreQuery && genreQuery}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setPage(1);
                setArtists(data.results)
                setHasNext(data.next)
            })
            .catch(err => console.log(err))
    }, [searchText, demoType, checkedSkills])

    const fetchMoreData = () => {
        setPage(page + 1)
        const url = `https://dev.nsnco.in/api/v1/get_feed/?page=${page}&${searchText && `search=${searchText}`}${demoType && `&demo_type=${demoType}`}${skillQuery && skillQuery}${genreQuery && genreQuery}`;
        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setArtists(artists.concat(data.results))
                setHasNext(data.next)
            })
            .catch(err => console.log(err))
    };

    return (
        <InfiniteScroll
            dataLength={artists.length}
            next={fetchMoreData}
            hasMore={hasNext}
            loader={<h4>Loading...</h4>}
        >
            {
                artists?.map((artist, idx) => (
                    <div key={`artistFeed${idx}`} className='mb-5 p-5 bg-white rounded-lg shadow-md'>
                        <div className='flex items-center gap-2 mb-3'>
                            <Link to={`/artist/${artist.owner_id}`}><img className='w-12 h-12' src={artist.profile_pic || avatar} alt="" /></Link>
                            <div className='text-sm'>
                                <Link to={`/artist/${artist.owner_id}`}><p className='font-medium'>{artist.owner_name}</p></Link>
                                <p>{artist.skills.join(", ")}</p>
                            </div>
                            <button onClick={() => handleShortlist(artist.owner_id, artist.owner_name, artist.profile_pic)} className='ml-auto text-blue-500 border-2 border-blue-500 hover:bg-sky-100 hover:border-sky-100 py-2.5 px-4 rounded-lg font-medium'>Shortlist</button>
                        </div>
                        <div>
                            <p className='text-sm mb-2'>
                                {artist.details}
                                {/* <a className='text-blue-500' href="#">see more...</a> */}
                            </p>
                            {
                                artist.demo_type === "Youtube Link"
                                && <div className='h-[270px] 2xl:h-[350px]'>
                                    {useYoutubeEmbaded(artist.weblink, 'rounded-lg')}
                                </div>
                            }
                            {
                                artist.demo_type === "Instagram Link"
                                && <div className='border rounded-lg bg-gray-200 overflow-hidden'>
                                    <iframe src={artist.weblink} className="mx-auto border-l border-r -mt-14" height="430" frameBorder="0" scrolling="no" allowtransparency="true"></iframe>
                                </div>
                            }
                            {
                                artist.demo_type === "Soundcloud Link"
                                && <div className='border rounded-lg'>
                                    <iframe width="100%" height="166" scrolling="no" frameBorder="no" src={`https://w.soundcloud.com/player/?url=${artist.weblink};auto_play=false&amp;show_artwork=true`}></iframe>
                                </div>
                            }
                            {
                                artist.demo_type === "Image"
                                && <div className='bg-black'>
                                    <img className='w-1/2 mx-auto bg-white' src={artist.file} alt="" />
                                </div>
                            }
                            {
                                artist.demo_type === "Video"
                                && <div className='border rounded-lg'>
                                    <video controls autoPlay width="300" className='mx-auto'>
                                        <source src={artist.file} type="video/mp4" />
                                    </video>
                                </div>
                            }
                            {
                                artist.demo_type === "Other Document"
                                && <embed src={artist.file} className="w-full" height="500" />
                            }
                        </div>
                    </div>
                ))
            }
        </InfiniteScroll>
    );
};

export default Feed;