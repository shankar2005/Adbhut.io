import { useRootContext } from '../../../../contexts/RootProvider';
import useYoutubeEmbaded from '../../../../hooks/useYoutubeEmbaded';
import { GiCheckMark } from "react-icons/gi";
import { useSelector } from 'react-redux';
import gdrive from "../../../../assets/placeholders/gdrive-folder.jpg";
import { BsBoxArrowUpRight } from 'react-icons/bs';
import { Spotify } from 'react-spotify-embed';

const ArtistWorkView = ({ artist = {} }) => {
    const { handleShortlist, avatar, setArtistProfile } = useRootContext();
    const { shortlistedArtists } = useSelector(state => state.project);

    console.log(artist.weblink, artist.demo_type);

    return (
        <div className='mb-5 p-5 bg-white rounded-lg shadow-md'>
            <div className='flex items-center gap-2 mb-3'>
                <button onClick={() => setArtistProfile(artist.owner_id)}>
                    <img className='w-12 h-12 rounded-full' src={artist.profile_pic || avatar} alt="" />
                </button>
                <div className='text-sm'>
                    <button onClick={() => setArtistProfile(artist.owner_id)}><span className='font-medium'>{artist.owner_name}</span></button>
                    <p>
                        {
                            artist.skills.join(", ").length >= 40
                                ? artist.skills.join(", ").slice(0, 41) + '...'
                                : artist.skills.join(", ")
                        }
                    </p>
                </div>
                {
                    shortlistedArtists?.includes(artist.owner_id)
                        ? <button className='ml-auto text-green-600 border-2 bg-sky-100 border-sky-100 py-2.5 px-4 rounded-lg font-medium'><GiCheckMark /></button>
                        : <button onClick={() => handleShortlist(artist.owner_id, artist.owner_name, artist.profile_pic)} className='ml-auto text-blue-500 border-2 border-blue-500 hover:bg-sky-100 hover:border-sky-100 py-2.5 px-4 rounded-lg font-medium'>Shortlist</button>
                }
            </div>
            <div>
                {
                    artist.demo_type === "Youtube"
                    && <div className='aspect-video'>
                        {useYoutubeEmbaded(artist.weblink, 'rounded-lg')}
                    </div>
                }
                {
                    artist.demo_type === "Instagram"
                    && <div className='border rounded-lg bg-gray-200 overflow-hidden'>
                        <iframe src={artist.weblink} className="mx-auto border-l border-r -mt-14" height="430" frameBorder="0" scrolling="no" allowtransparency="true"></iframe>
                    </div>
                }
                {
                    artist.demo_type === "Soundcloud"
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
                {
                    artist.demo_type === "Google Drive"
                    && <a href={artist.weblink} className='hover:underline block bg-gray-100 py-10 rounded-lg' target="_blank">
                        <img className="mx-auto w-40" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Google_Drive_logo.png/1024px-Google_Drive_logo.png" alt="" />
                        <p className='font-medium text-blue-700 flex justify-center gap-2'>Open in drive <BsBoxArrowUpRight /></p>
                    </a>
                }
                {
                    artist.demo_type === "Behance"
                    && <a href={artist.weblink} className='hover:underline block bg-gray-100 py-10 rounded-lg' target="_blank">
                        <img className="mx-auto w-56" src="https://www.nickfrank.de/assets/Behance-1648045377.jpg" alt="" />
                        <p className='font-medium text-blue-700 flex justify-center gap-2 mt-2'>Open in behance <BsBoxArrowUpRight /></p>
                    </a>
                }
                {
                    artist.demo_type === "Imdb"
                    && <a href={artist.weblink} className='hover:underline block bg-gray-100 py-10 rounded-lg' target="_blank">
                        <img className="mx-auto w-56" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png" alt="" />
                        <p className='font-medium text-blue-700 flex justify-center gap-2 mt-2'>Open in Imdb <BsBoxArrowUpRight /></p>
                    </a>
                }
                {
                    artist.demo_type === "Drop Box"
                    && <a href={artist.weblink} className='hover:underline block bg-gray-100 py-10 rounded-lg' target="_blank">
                        <img className="mx-auto w-40" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Dropbox_Icon.svg/1101px-Dropbox_Icon.svg.png" alt="" />
                        <p className='font-medium text-blue-700 flex justify-center gap-2 mt-2'>Open in DropBox <BsBoxArrowUpRight /></p>
                    </a>
                }
                {
                    artist.demo_type === "Spotify"
                    && <div className="flex justify-center bg-black pt-6">
                        <Spotify link={artist.weblink} />
                    </div>
                }
            </div>
        </div>
    );
};

export default ArtistWorkView;