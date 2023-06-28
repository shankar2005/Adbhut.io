import { GiCheckMark } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { useDeclineArtistMutation, useShortlistArtistMutation } from "../../../features/artist/artistApi";
import { addArtist, removeArtist } from "../../../features/project/projectSlice";

const ShortlistArtistBtn = ({ artistId }) => {
    const { user } = useSelector(state => state.auth);
    if (user?.role !== "Artist") {
        // check if the user isn't artist // artists can't shortlist themselves
        const { pk: currentProjectId, shortlistedArtists } = useSelector(state => state.project);
        const [shortlistArtist] = useShortlistArtistMutation();
        const [declineArtist] = useDeclineArtistMutation();
        const dispatch = useDispatch();

        const handleShortlist = (artistID) => {
            console.log('object');
            dispatch(addArtist(artistID));
            if (currentProjectId) {
                shortlistArtist({
                    projectId: currentProjectId,
                    artistId: artistID
                })
            }
        }

        const handleDecline = (artistID) => {
            dispatch(removeArtist(artistID));
            if (currentProjectId) {
                declineArtist({
                    projectId: currentProjectId,
                    artistId: artistID
                })
            }
        }

        return (
            shortlistedArtists?.includes(artistId)
                ? <button onDoubleClick={() => handleDecline(artistId)} className='bg-blue-500 py-2.5 px-4 text-white rounded text-sm font-hero'><GiCheckMark /></button>
                : <button onClick={() => handleShortlist(artistId)} className='bg-blue-500 py-1.5 px-4 text-white rounded text-sm font-hero'>Shortlist</button>
        );
    }
};

export default ShortlistArtistBtn;