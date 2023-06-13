import { Link, useParams } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import { useGetArtistWrokLinksQuery } from '../../features/artist/artistApi';
import WorkLinkTable from './Components/WorkLinkTable';

const WorkEntry = () => {
    const { artistId } = useParams();
    const { data } = useGetArtistWrokLinksQuery(artistId);

    return (
        <section className="flex flex-col">
            <h4 className='my-4 font-hero font-semibold text-lg text-blue-600/80'>Add work link</h4>
            <WorkLinkTable works_links={data?.works_links} artistId={artistId} />
            <Link to={`/artists/edit-artist/${artistId}`} className="block ml-auto mt-5"><Button type="button" variant="secondary">Done</Button></Link>
        </section>
    );
};

export default WorkEntry;