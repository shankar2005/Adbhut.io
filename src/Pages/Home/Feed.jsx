import React, { useEffect, useState } from 'react';
import avatar from '../../assets/placeholders/avatar.png';
import useYoutubeEmbaded from '../../hooks/useYoutubeEmbaded';
import ViewArtistModal from '../Artist/ViewArtistModal';

const Feed = ({ searchText, demoType, checkedSkills }) => {
    const [artistModal, setArtistModal] = useState();
    const [viewArtist, setviewArtist] = useState();

    const skillQuery = checkedSkills?.map(skill => `&skill=${skill}`).join('');

    const [artists, setArtists] = useState([]);
    useEffect(() => {
        fetch(`https://dev.nsnco.in/api/v1/get_feed/?search=${searchText}&demo_type=${demoType}${skillQuery}`)
            .then(res => res.json())
            .then(data => {
                setArtists(data);
            })
            .catch(err => console.log(err));
    }, [searchText, demoType, checkedSkills]);

    const handlesetViewArtist = id => {
        setArtistModal(true);
        fetch(`https://dev.nsnco.in/api/v1/get_artist/${id}/`)
            .then(res => res.json())
            .then(data => {
                setviewArtist(data);
            })
            .catch(err => console.log(err));
    }

    return (
        <>
            {
                artists?.map(artist => (
                    <div className='mb-5 p-5 bg-white rounded-lg shadow-md'>
                        <div className='flex items-center gap-2 mb-3'>
                            <img className='w-12 h-12' src={avatar} alt="" />
                            <div className='text-sm'>
                                <p className='font-medium'>{artist.owner_name}</p>
                                <p>2022-11-05</p>
                            </div>
                            <button onClick={() => handlesetViewArtist(artist.owner_id)} className='ml-auto text-blue-500 text-sm font-medium'>View Profile</button>
                        </div>
                        <div>
                            <p className='text-sm mb-2'>
                                {artist.details}
                                {/* <a className='text-blue-500' href="#">see more...</a> */}
                            </p>
                            {
                                artist.demo_type === "Youtube Link"
                                && <div className='h-[350px]'>
                                    {useYoutubeEmbaded(artist.weblink)}
                                </div>
                            }
                            {
                                artist.demo_type === "Instagram Link"
                                && <div className='border rounded-lg bg-gray-200'>
                                    <iframe src={artist.weblink} className="mx-auto border-l border-r" height="550" frameborder="0" scrolling="no" allowtransparency="true"></iframe>
                                </div>
                            }
                            {
                                artist.demo_type === "Soundcloud Link"
                                && <div className='border rounded-lg'>
                                    <iframe width="100%" height="166" scrolling="no" frameborder="no" src={`https://w.soundcloud.com/player/?url=${artist.weblink};auto_play=false&amp;show_artwork=true`}></iframe>
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

            {
                viewArtist &&
                <ViewArtistModal
                    modal={artistModal}
                    setModal={setArtistModal}
                    viewArtist={viewArtist}
                    setviewArtist={setviewArtist}
                />
            }

        </>
    );
};

export default Feed;