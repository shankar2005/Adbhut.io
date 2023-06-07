import { useSelector } from "react-redux";
import Badge from "../../../../Components/Badge/Badge";
import { useRootContext } from "../../../../contexts/RootProvider";
import { useUnAssignArtistMutation } from "../../../../features/artist/artistApi";

const AssignedArtistRow = ({ artist, projectId }) => {
    const { user } = useSelector(state => state.auth);
    const { setArtistProfile } = useRootContext();
    const [unAssignArtist] = useUnAssignArtistMutation();

    const handleUnassignArtist = () => {
        unAssignArtist({ projectId, artistId: artist.id })
    }

    return (
        <tr className="text-gray-700">
            <td className="px-4 py-3 border w-3/5">
                <div className="flex items-center">
                    <p onClick={() => setArtistProfile(artist?.id)} className="text-blue-700">{artist?.name}</p>
                </div>
            </td>
            {user?.email &&
                <td className="px-4 py-3 text-sm border space-x-2">
                    <button type='button' onClick={handleUnassignArtist}>
                        <Badge type="error">Unassigned</Badge>
                    </button>
                </td>
            }
        </tr>
    )
}

export default AssignedArtistRow;