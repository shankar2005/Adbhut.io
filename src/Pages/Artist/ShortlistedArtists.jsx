import { useSelector } from 'react-redux';
import NothingFound from '../../Components/NotFound/NothingFound';
import { useGetShortlistedArtistsQuery } from '../../features/artist/artistApi';
import ArtistSquareView from './Components/View/ArtistSquareView';

const ShortlistedArtists = () => {
    const { shortlistedArtists } = useSelector(state => state.project);
    const { data } = useGetShortlistedArtistsQuery(shortlistedArtists.join(","));

    if(!shortlistedArtists.length){
        return <NothingFound />
    }

    return (
        <div className='grid grid-cols-2 gap-2'>
            {
                data?.artists?.map(({ name, id, skills, email, phone, languages, locaiton }) => <ArtistSquareView key={id} artist={{
                    owner_name: name,
                    owner_id: id,
                    skills,
                    email,
                    phone: phone || "N/A",
                    languages,
                    location: location?.name,
                }} />)
            }
        </div>
    );
};

export default ShortlistedArtists;