import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import avatar from '../../assets/placeholders/avatar.png';
import { useRootContext } from '../../contexts/RootProvider';
import useYoutubeEmbaded from '../../hooks/useYoutubeEmbaded';
import { GiCheckMark } from 'react-icons/gi';
import FeedCardSkeleton from '../../Components/Skeleton/FeedCardSkeleton';
import { FaRegEnvelope } from 'react-icons/fa';
import { HiPhone } from 'react-icons/hi';
import { IoLanguageSharp, IoLocationSharp } from 'react-icons/io5';

const Feed = () => {
    const { searchText = "", demoType, checkedSkills, handleShortlist, checkedGenres, checkedLocations, shortlistedArtist, viewAs } = useRootContext();

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

    console.log(artists)

    let content;
    if (viewAs === "large") {
        content = (
            loading
                ? <FeedCardSkeleton />
                : <>
                    {
                        artists?.map((artist, idx) => (
                            <div key={`artistFeed${idx}`} className='mb-5 p-5 bg-white rounded-lg shadow-md'>
                                <div className='flex items-center gap-2 mb-3'>
                                    <Link to={`/artist/${artist.owner_id}`}>
                                        <img className='w-12 h-12' src={artist.profile_pic || avatar} alt="" />
                                    </Link>
                                    <div className='text-sm'>
                                        <Link to={`/artist/${artist.owner_id}`}><span className='font-medium'>{artist.owner_name}</span></Link>
                                        <p>
                                            {
                                                artist.skills.join(", ").length >= 40
                                                    ? artist.skills.join(", ").slice(0, 41) + '...'
                                                    : artist.skills.join(", ")
                                            }
                                        </p>
                                    </div>
                                    {
                                        shortlistedArtist?.includes(artist.owner_id)
                                            ? <button className='ml-auto text-green-600 border-2 bg-sky-100 border-sky-100 py-2.5 px-4 rounded-lg font-medium'><GiCheckMark /></button>
                                            : <button onClick={() => handleShortlist(artist.owner_id, artist.owner_name, artist.profile_pic)} className='ml-auto text-blue-500 border-2 border-blue-500 hover:bg-sky-100 hover:border-sky-100 py-2.5 px-4 rounded-lg font-medium'>Shortlist</button>
                                    }
                                </div>
                                <div>
                                    {/* <p className='text-sm mb-2'>
                                {artist.details}
                                <a className='text-blue-500' href="#">see more...</a>
                                </p> */}
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
                </>
        )
    }
    else if (viewAs === "details") {
        content = (
            loading
                ? <FeedCardSkeleton />
                : <>
                    {
                        artists?.map((artist, idx) => (
                            <div key={`artistFeed${idx}`} className='bg-white border flex gap-3 p-3 rounded-lg'>
                                <div className='w-1/6'>
                                    <img className='w-16 border p-0.5 bg-white rounded-full' src={artist.profile_pic || avatar} alt="" />
                                </div>
                                <div>
                                    <Link className='hover:underline' to={`/artist/${artist.owner_id}`}><p className='font-medium'>{artist.owner_name}</p></Link>
                                    <p className='text-xs mb-2'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur, aliquida dipisicing elit. Consequuntur, aliquid?</p>
                                    <div className='text-xs mb-2'>
                                        {artist.email && <p className='flex items-center gap-2'><FaRegEnvelope />{artist.email}</p>}
                                        {artist.phone && <p className='flex items-center gap-2'><HiPhone />{artist.phone}</p>}
                                        {
                                            artist.languages &&
                                            <p className='flex items-center gap-2'><IoLanguageSharp /> {artist.languages.join(", ")}</p>
                                        }
                                        <p className='flex items-center gap-2'><IoLocationSharp /> Test {artist.location}</p>
                                    </div>
                                    <div className='text-xs flex flex-wrap gap-2'>
                                        {
                                            artist?.skills?.map((skill, idx) => <div key={idx} className='bg-sky-400 p-1 rounded text-white'>{skill}</div>)
                                        }
                                    </div>
                                </div>
                            </div>
                        ))
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
                        artists?.map((artist, idx) => (
                            <div key={`artistFeed${idx}`} className="bg-white border flex flex-col items-center p-3 text-center rounded-lg">
                                <img className='w-24 h-24 border bg-white p-1 rounded-full' src={artist.profile_pic || avatar} alt="" />
                                <p className='mt-2 font-medium'>{artist.owner_name}</p>
                                <div className='text-xs mb-2 flex flex-col items-center'>
                                    {artist.email && <p className='flex items-center gap-1'><FaRegEnvelope />{artist.email}</p>}
                                    {artist.phone && <p className='flex items-center gap-1'><HiPhone />{artist.phone}</p>}
                                    {
                                        artist.languages &&
                                        <p className='flex items-center gap-1'><IoLanguageSharp /> {artist.languages.join(", ")}</p>
                                    }
                                    <p className='flex items-center gap-1'><IoLocationSharp /> {artist.location} Test</p>
                                </div>
                                <div className='text-xs flex justify-center flex-wrap gap-1 mb-4'>
                                    {
                                        artist?.skills?.map((skill, idx) => <div key={idx} className='bg-sky-400 p-1 rounded text-white'>{skill}</div>)
                                    }
                                </div>
                                <Link className='mt-auto w-full' to={`/artist/${artist.owner_id}`}>
                                    <button className='w-full border-2 border-sky-100 hover:border-blue-500 font-medium bg-sky-100 text-blue-500 py-2 rounded-lg'>View Profile</button>
                                </Link>
                            </div>
                        ))
                    }
                </div>
        )
    }

    const [toggleProjects, settoggleProjects] = useState(false);

    return (
        <InfiniteScroll
            dataLength={artists.length}
            next={fetchMoreData}
            hasMore={hasNext}
            loader={<FeedCardSkeleton />}
        >
            {/* <div className='bg-white shadow p-2 mb-2 rounded-lg flex justify-between items-center'>
                <div className='text-sm'>
                    <button onClick={() => settoggleProjects(true)} className={`border px-3 py-1 rounded-full ${toggleProjects && 'bg-blue-400 text-white'}  mr-2`}>View Projects</button>
                    <button onClick={() => settoggleProjects(false)} className={`border px-3 py-1 rounded-full ${toggleProjects || 'bg-blue-400 text-white'}`}>View Artists</button>
                </div>
                <div>
                    <select onChange={handleViewAs} className='text-sm p-1 rounded border outline-gray-100'>
                        <option value="large">Large</option>
                        <option value="details">Details</option>
                        <option value="small">Small</option>
                    </select>
                </div>
            </div> */}
            {
                toggleProjects
                    ? <FeedProjectCard />
                    : content
            }
        </InfiniteScroll>
    );
};

export default Feed;

const FeedProjectCard = () => {
    const artist = {};
    return (
        <div className='mb-5 p-5 bg-white rounded-lg shadow-md'>
            <div className='flex items-center gap-2 mb-3'>
                <Link>
                    <img className='w-12 h-12' src={artist.profile_pic || avatar} alt="" />
                </Link>
                <div className='text-sm'>
                    <Link><span className='font-medium'>Project Title</span></Link>
                    <p>
                        Voice Over Artist, Singing, Dancing
                    </p>
                </div>
                <button className='ml-auto text-green-600 border-2 bg-sky-100 border-sky-100 py-2.5 px-4 rounded-lg font-medium'>
                    80$
                </button>
            </div>
            <p className='text-sm mb-2'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, eaque. Lorem ipsum dolor sit amet...
                <a className='text-blue-500 ml-1' href="#">see more</a>
            </p>
            <div>
                {
                    <div className='h-[270px] 2xl:h-[350px]'>
                        {useYoutubeEmbaded('https://www.youtube.com/watch?v=WvN1hAZFzFg', 'rounded-lg')}
                    </div>
                }
            </div>
        </div>
    )
}