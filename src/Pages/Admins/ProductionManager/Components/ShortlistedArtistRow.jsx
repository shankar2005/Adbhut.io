import { useSelector } from 'react-redux';
import Badge from '../../../../Components/Badge/Badge';
import ActionLoader from '../../../../Components/Loader/ActionLoader';
import { useRootContext } from '../../../../contexts/RootProvider';
import { useAssignArtistMutation, useDeclineArtistMutation } from '../../../../features/artist/artistApi';

const ShortlistedArtistRow = ({ artist, projectId }) => {
    const { user } = useSelector(state => state.auth);
    const { setArtistProfile } = useRootContext();

    const [assignArtist, { isLoading: assignLoading }] = useAssignArtistMutation();
    const [declineArtist, { isLoading: rejectLoading }] = useDeclineArtistMutation();

    const handleAssignArtist = () => {
        assignArtist({ projectId, artistId: artist.id })
    }
    const handleRejectArtist = () => {
        declineArtist({ projectId, artistId: artist.id })
    }

    return (
        <tr className="text-gray-700">
            <td className="px-4 py-3 border border-b-0 w-3/5">
                <div className="flex items-center">
                    <p onClick={() => setArtistProfile(artist?.id)} className="text-blue-700 hover:text-red-800 cursor-pointer">{artist?.name}</p>
                </div>
            </td>
            {user.email &&
                <td className="px-4 py-3 text-sm border border-b-0 space-x-2">
                    <button type='button' onClick={handleRejectArtist}>
                        {rejectLoading ?
                            <ActionLoader />
                            : <Badge type="error">Reject</Badge>}
                    </button>
                    <button type='button' onClick={handleAssignArtist}>
                        {assignLoading ?
                            <ActionLoader />
                            : <Badge type="success">Shortlist</Badge>}
                    </button>
                </td>}
        </tr>
    )
}

export default ShortlistedArtistRow;