import { GiCheckMark } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { useDeclineArtistMutation, useShortlistArtistMutation } from "../../../features/artist/artistApi";
import { addArtist, removeArtist } from "../../../features/project/projectSlice";

const ShortlistArtistBtn = ({ artistId }) => {
    const { user } = useSelector(state => state.auth);
    if (user?.role === "Client" || user?.role === "PM" || user?.role === "AM") {
        // check if the user isn't artist // artists can't shortlist themselves
        const { shortlistedArtists } = useSelector(state => state.project);
        const [shortlistArtist] = useShortlistArtistMutation();
        const [declineArtist] = useDeclineArtistMutation();
        const dispatch = useDispatch();

        const handleShortlist = (artistID) => {
            dispatch(addArtist(artistID));
            if (currentProject?.pk) {
                shortlistArtist({
                    projectId: currentProject.pk,
                    artistId: artistID
                })
            }
        }

        const handleDecline = (artistID) => {
            dispatch(removeArtist(artistID));
            if (currentProject?.pk) {
                declineArtist({
                    projectId: currentProject.pk,
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