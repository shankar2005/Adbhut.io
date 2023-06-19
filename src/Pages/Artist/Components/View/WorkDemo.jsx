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

    function extractShotId(dribbbleLink) {
        // Check if the link matches the shot URL pattern
        const regex = /https:\/\/dribbble\.com\/shots\/(\d+)/;
        const match = dribbbleLink.match(regex);
      
        // If a match is found, return the shot ID
        if (match && match.length > 1) {
          return match[1];
        }
      
        // If no match is found, return null or an appropriate value
        return null;
      }
      

    let content;

    switch (demo_type) {
        case "Youtube":
            content = (
                <div className='aspect-video'>
                    {useYoutubeEmbaded(demo_link, 'rounded-lg')}
                </div>
            )
            break;
        case "Instagram":
            content = (
                <div className='border rounded-lg bg-gray-200 overflow-hidden'>
                    <iframe src={demo_link} className="mx-auto border-l border-r -mt-14" height="430" frameBorder="0" scrolling="no" allowtransparency="true"></iframe>
                </div>
            )
            break;
        case "Soundcloud":
            content = (
                <div className='border rounded-lg'>
                    <iframe width="100%" height="166" scrolling="no" frameBorder="no" src={`https://w.soundcloud.com/player/?url=${demo_link};auto_play=false&amp;show_artwork=true`}></iframe>
                </div>
            )
            break;
        case "Image":
            content = (
                <div className='bg-black'>
                    <img className='w-1/2 mx-auto bg-white' src={demo_link} alt="" />
                </div>
            )
            break;
        case "Video":
            content = (
                <div className='border rounded-lg'>
                    <video controls autoPlay width="300" className='mx-auto'>
                        <source src={demo_link} type="video/mp4" />
                    </video>
                </div>
            )
            break;
        case "Google Drive":
            content = (
                <>
                    {
                        (demo_link?.includes("drive.google.com") && demo_link?.includes("/folders/"))
                            ? <iframe className="border bg-gray-100" src={`https://drive.google.com/embeddedfolderview?id=${extractFolderId(demo_link)}#grid`} width="100%" height={260} scrolling="no"></iframe>
                            : <iframe className="border" src={demo_link.replace("/view", "/preview")} width="100%" height={265} allow="autoplay"></iframe>
                    }
                </>
            )
            break;
        case "Behance":
            content = (
                <a href={demo_link} className='hover:underline block bg-gray-100 py-16 border rounded-lg' target="_blank">
                    <img className="mx-auto w-56" src="https://www.nickfrank.de/assets/Behance-1648045377.jpg" alt="" />
                    <p className='font-medium text-blue-700 flex justify-center gap-2 mt-2'>Open in behance <BsBoxArrowUpRight /></p>
                </a>
            )
            break;
        case "Imdb":
            content = (
                <a href={demo_link} className='hover:underline block bg-black border py-10 rounded-lg' target="_blank">
                    <img className="mx-auto w-56" src="https://assets.stickpng.com/images/613f661716381700041030fc.png" alt="" />
                    <p className='font-medium text-white flex justify-center gap-2 mt-2'>Open in Imdb <BsBoxArrowUpRight /></p>
                </a>
            )
            break;
        case "Drop Box":
            content = (
                <a href={demo_link} className='hover:underline block bg-gray-100 py-10 rounded-lg' target="_blank">
                    <img className="mx-auto w-40" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Dropbox_Icon.svg/1101px-Dropbox_Icon.svg.png" alt="" />
                    <p className='font-medium text-blue-700 flex justify-center gap-2 mt-2'>Open in DropBox <BsBoxArrowUpRight /></p>
                </a>
            )
            break;
        case "Spotify":
            content = (
                <div className="flex justify-center bg-black pt-6">
                    <Spotify link={demo_link} />
                </div>
            )
            break;
        case "Wixsite":
            content = (
                <div className='bg-black'>
                    <iframe src={demo_link} className="mx-auto w-full" height="430" frameBorder="0" scrolling="no" allowtransparency="true"></iframe>
                </div>
            )
            break;
        case "Vimeo":
            content = (
                <div className='bg-black'>
                    <iframe src="https://player.vimeo.com/video/299439811" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                </div>
            )
            break;
        case "Other Document":
            if (demo_link?.includes("mega")) {
                content = (
                    <a href={demo_link} className='hover:underline block bg-white border py-10 rounded-lg' target="_blank">
                        <img className="mx-auto w-56" src="https://download.logo.wine/logo/Mega_(service)/Mega_(service)-Logo.wine.png" alt="" />
                        <p className='font-medium text-blue-700 flex justify-center gap-2 mt-2'>Open in Mega <BsBoxArrowUpRight /></p>
                    </a>
                )
            }
            else if (demo_link?.includes("dropbox")) {
                content = (
                    <a href={demo_link} className='hover:underline block bg-white border py-10 rounded-lg' target="_blank">
                        <img className="mx-auto w-40" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Dropbox_Icon.svg/1101px-Dropbox_Icon.svg.png" alt="" />
                        <p className='font-medium text-blue-700 flex justify-center gap-2 mt-2'>Open in DropBox <BsBoxArrowUpRight /></p>
                    </a>
                )
            }
            else if (demo_link?.includes("dribbble")) {
                content = (
                    <iframe src={`https://dribbble.com/shots/${extractShotId(demo_link)}/embed`} className="border" width="100%" height="300" frameborder="0" scrolling="no" allowfullscreen></iframe>
                )
            }
            else {
                content = (
                    <div className='border'>
                        <iframe src={demo_link} className="mx-auto w-full" height="430" frameBorder="0" scrolling="no" allowtransparency="true"></iframe>
                    </div>
                )
            }
            break;

        default:
            break;
    }

    return content;
};

export default WorkDemo;