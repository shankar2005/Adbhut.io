import React from 'react';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import { Spotify } from 'react-spotify-embed';
import useYoutubeEmbaded from '../../../../hooks/useYoutubeEmbaded';

const WorkDemo = ({ demo_type, demo_link }) => {
    function extractFolderId(driveLink) {
        const regex = /\/folders\/([^/?]+)/;
        const matches = driveLink.match(regex);
        if (matches && matches.length > 1) {
            return matches[1];
        }
        return null;
    }

    return (
        <>
            {
                demo_type === "Youtube"
                && <div className='aspect-video'>
                    {useYoutubeEmbaded(demo_link, 'rounded-lg')}
                </div>
            }
            {
                demo_type === "Instagram"
                && <div className='border rounded-lg bg-gray-200 overflow-hidden'>
                    <iframe src={demo_link} className="mx-auto border-l border-r -mt-14" height="430" frameBorder="0" scrolling="no" allowtransparency="true"></iframe>
                </div>
            }
            {
                demo_type === "Soundcloud"
                && <div className='border rounded-lg'>
                    <iframe width="100%" height="166" scrolling="no" frameBorder="no" src={`https://w.soundcloud.com/player/?url=${demo_link};auto_play=false&amp;show_artwork=true`}></iframe>
                </div>
            }
            {
                demo_type === "Image"
                && <div className='bg-black'>
                    <img className='w-1/2 mx-auto bg-white' src={demo_link} alt="" />
                </div>
            }
            {
                demo_type === "Video"
                && <div className='border rounded-lg'>
                    <video controls autoPlay width="300" className='mx-auto'>
                        <source src={demo_link} type="video/mp4" />
                    </video>
                </div>
            }
            {
                demo_type === "Other Document"
                && <div className='bg-black '>
                    <iframe src={demo_link} className="mx-auto" height="430" frameBorder="0" scrolling="no" allowtransparency="true"></iframe>
                </div>
            }
            {
                demo_type === "Google Drive"
                && <>
                    {
                        (demo_link?.includes("drive.google.com") && demo_link?.includes("/folders/"))
                            ? <iframe className="border bg-gray-100" src={`https://drive.google.com/embeddedfolderview?id=${extractFolderId(demo_link)}#grid`} width="100%" height={260} scrolling="no"></iframe>
                            : <iframe src={demo_link.replace("/view", "/preview")} width="100%" height={265} allow="autoplay"></iframe>
                    }
                </>
            }
            {
                demo_type === "Behance"
                && <a href={demo_link} className='hover:underline block bg-gray-100 py-10 rounded-lg' target="_blank">
                    <img className="mx-auto w-56" src="https://www.nickfrank.de/assets/Behance-1648045377.jpg" alt="" />
                    <p className='font-medium text-blue-700 flex justify-center gap-2 mt-2'>Open in behance <BsBoxArrowUpRight /></p>
                </a>
            }
            {
                demo_type === "Imdb"
                && <div className='bg-black '>
                    <iframe src={demo_link} className="mx-auto" height="430" frameBorder="0" scrolling="no" allowtransparency="true"></iframe>
                </div>
            }
            {
                demo_type === "Drop Box"
                && <a href={demo_link} className='hover:underline block bg-gray-100 py-10 rounded-lg' target="_blank">
                    <img className="mx-auto w-40" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Dropbox_Icon.svg/1101px-Dropbox_Icon.svg.png" alt="" />
                    <p className='font-medium text-blue-700 flex justify-center gap-2 mt-2'>Open in DropBox <BsBoxArrowUpRight /></p>
                </a>
            }
            {
                demo_type === "Spotify"
                && <div className="flex justify-center bg-black pt-6">
                    <Spotify link={demo_link} />
                </div>
            }
            {
                demo_type === "Wixsite"
                && <div className='bg-black '>
                    <iframe src={demo_link} className="mx-auto" height="430" frameBorder="0" scrolling="no" allowtransparency="true"></iframe>
                </div>
            }
        </>
    );
};

export default WorkDemo;