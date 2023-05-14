import { useState } from 'react';
import { FaRegEnvelope } from 'react-icons/fa';
import { HiPhone } from 'react-icons/hi';
import { IoLanguageSharp, IoLocationSharp } from 'react-icons/io5';
import { useRootContext } from '../../../../contexts/RootProvider';
import brokenImage from "../../../../assets/placeholders/broken.jpg";
import { AiOutlineEdit, AiOutlineUserDelete } from 'react-icons/ai';
import { useDeleteArtistMutation, useShortlistArtistMutation } from '../../../../features/artist/artistApi';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const ArtistRowView = ({ artist, setArtists }) => {
    const { projectId } = useParams();
    const [shortlistArtist] = useShortlistArtistMutation();

    const { setArtistProfile } = useRootContext();
    const [deleteArtist] = useDeleteArtistMutation();
    const { user } = useSelector(state => state.auth);

    const [imageSrc, setImageSrc] = useState(artist.profile_image);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const handleImageError = () => {
        setIsImageLoaded(true);
        setImageSrc(brokenImage);
    };

    const handleDelete = () => {
        const isConfirm = confirm("Are you sure want to delete this?");
        if (isConfirm) {
            deleteArtist(artist.id);
        }
    }

    const handleAssign = () => {
        shortlistArtist({
            projectId,
            artistId: artist.id
        })
    }

    console.log(projectId);

    const { shortlistedArtists } = useSelector(state => state.project);

    return (
        <div className='bg-white border-b flex gap-3 p-3 relative'>
            <div className='relative'>
                <img
                    onClick={() => setArtistProfile(artist.id)}
                    className='w-[70px] h-[70px] object-cover object-top rounded-full cursor-pointer placeholder:bg-black'
                    src={imageSrc}
                    alt="Profile Image"
                    onError={handleImageError}
                    onLoad={() => setIsImageLoaded(true)}
                    style={{ display: isImageLoaded ? 'block' : 'none' }}
                />
            </div>
            <div className='flex-1'>
                <div className='flex items-center gap-2 mb-1.5'>
                    <p onClick={() => setArtistProfile(artist.id)} className='font-medium cursor-pointer w-fit '>
                        {artist.name}
                    </p>
                    {
                        user?.role === "AM" && projectId && (
                            shortlistedArtists?.includes(artist.id)
                                ? <button className="bg-green-400 text-white border rounded-full px-1 text-xs" disabled>Assigned</button>
                                : <button onClick={handleAssign} className="bg-gray-100 border rounded-full px-1 text-sm">Assign</button>
                        )
                    }

                </div>

                <div className='flex flex-wrap gap-1 text-xs font-medium mb-1'>
                    {
                        artist?.skill?.map((skill, idx) => <div key={idx} className='px-1 border text-gray-500 border-gray-500 rounded-full'>{skill}</div>)
                    }
                </div>
                {artist.artist_intro && <div className='w-fit my-1 px-0.5 text-sm font-normal font-sans italic text-gray-700 bg-yellow-100'>&#9679; {artist.artist_intro}</div>}
                <div className='text-xs'>
                    {artist.email && <p className='flex items-center gap-2'><FaRegEnvelope />{artist.email}</p>}
                    {artist.phone && <p className='flex items-center gap-2'><HiPhone />{artist.phone}</p>}
                    {
                        artist.languages &&
                        <p className='flex items-center gap-2'><IoLanguageSharp /> {artist.languages.join(", ")}</p>
                    }
                    <p className='flex items-center gap-2'><IoLocationSharp /> {artist.location}</p>
                </div>
            </div>

            {
                user?.role === "AM" &&
                <div className='absolute top-0 right-0 flex m-3 gap-2'>
                    <Link to={`/artists/edit-artist/${artist.id}`}>
                        <AiOutlineEdit className="cursor-pointer hover:text-blue-500" size={20} />
                    </Link>
                    <AiOutlineUserDelete onClick={handleDelete} className="cursor-pointer hover:text-red-400" size={20} />
                </div>
            }
        </div>
    );
};

export default ArtistRowView;