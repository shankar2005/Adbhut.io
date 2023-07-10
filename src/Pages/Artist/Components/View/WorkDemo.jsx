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

    function extractLinkedInPostId(url) {
        const pattern = /activity-(\d+)/i;
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
        return null;
    }

    function extractVimeoId(url) {
        console.log(url);
        if (url.includes('vimeo.com')) {
            var idIndex = url.lastIndexOf('/') + 1;
            return url.substring(idIndex);
        } else {
            return null;
        }
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
                <a target="_blank" href={demo_link}>
                    <div className="aspect-video flex flex-col items-center justify-center border rounded-lg bg-white gap-y-3">
                        <img className="w-12" src="https://cdn-icons-png.flaticon.com/512/87/87390.png" alt="" />
                        <strong className="text-blue-700">View this post on Instagram</strong>
                    </div>
                </a>
            )
            break;
        case "Linkedin":
            content = (
                <iframe className="aspect-video border-y rounded-lg" src={`https://www.linkedin.com/embed/feed/update/${extractLinkedInPostId(demo_link)}/`} width="100%" frameborder="0" scrolling="no" allowfullscreen></iframe>
            )
            break;
        case "Soundcloud":
            content = (
                <iframe className='aspect-video border rounded-lg' width="100%" scrolling="no" frameBorder="no" src={`https://w.soundcloud.com/player/?url=${demo_link};auto_play=false&amp;show_artwork=true`}></iframe>
            )
            break;
        // image
        case "webp":
            content = (
                <img className='w-full aspect-video object-contain bg-black' src={demo_link} alt="" />
            )
            break;
        case "png":
            content = (
                <img className='w-full aspect-video object-contain bg-black' src={demo_link} alt="" />
            )
            break;
        case "jpg":
            content = (
                <img className='w-full aspect-video object-contain bg-black' src={demo_link} alt="" />
            )
            break;
        case "jpeg":
            content = (
                <img className='w-full aspect-video object-contain bg-black' src={demo_link} alt="" />
            )
            break;
        // image
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
                            ? <iframe className="w-full aspect-video border bg-gray-100" src={`https://drive.google.com/embeddedfolderview?id=${extractFolderId(demo_link)}#grid`} scrolling="no"></iframe>
                            : <iframe className="w-full aspect-video border" src={demo_link.replace("/view", "/preview")} allow="autoplay"></iframe>
                    }
                </>
            )
            break;
        case "Behance":
            content = (
                <a href={demo_link} className='aspect-video bg-black flex flex-col items-center justify-center border rounded-lg' target="_blank">
                    <img className="mx-auto w-32" src="data:image/png;base64,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" alt="" />
                    <p className='font-medium text-white flex justify-center gap-2'>Open in behance <BsBoxArrowUpRight /></p>
                </a>
            )
            break;
        case "Imdb":
            content = (
                <a href={demo_link} className='aspect-video hover:underline bg-black flex flex-col items-center justify-center border rounded-lg' target="_blank">
                    <img className="mx-auto w-40" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/575px-IMDB_Logo_2016.svg.png" alt="" />
                    <p className='font-medium text-white flex justify-center gap-2 mt-4'>Open in Imdb <BsBoxArrowUpRight /></p>
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
                <div className="aspect-video flex justify-center items-center bg-black pt-6">
                    <Spotify link={demo_link} />
                </div>
            )
            break;
        case "Wixsite":
            content = (
                <div className='bg-black'>
                    <iframe src={demo_link} className="aspect-video w-full" frameBorder="0" scrolling="no" allowtransparency="true"></iframe>
                </div>
            )
            break;
        case "Vimeo":
            content = (
                <iframe className="aspect-video w-full border rounded-lg" src={`https://player.vimeo.com/video/${extractVimeoId(demo_link)}`} frameborder="0"></iframe>
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
                    <a href={demo_link} className='hover:underline block bg-white border py-16 rounded-lg' target="_blank">
                        <img className="mx-auto w-32" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Dropbox_Icon.svg/1101px-Dropbox_Icon.svg.png" alt="" />
                        <p className='font-medium text-blue-700 flex justify-center gap-2 mt-2'>Open in DropBox <BsBoxArrowUpRight /></p>
                    </a>
                )
            }
            else if (demo_link?.includes("dribbble")) {
                content = (
                    <iframe src={`https://dribbble.com/shots/${extractShotId(demo_link)}/embed`} className="aspect-video border" width="100%" frameborder="0" scrolling="no" allowfullscreen></iframe>
                )
            }
            else {
                content = (
                    <div className='border'>
                        <iframe src={demo_link} className="aspect-video w-full" frameBorder="0" scrolling="no" allowtransparency="true"></iframe>
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