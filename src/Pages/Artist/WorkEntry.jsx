import { Link, useParams } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import Container from '../../Components/Container/Container';
import WorkLinkTable from './Components/WorkLinkTable';

const WorkEntry = () => {
    const { artistId } = useParams();

    return (
        <Container className="p-4 flex flex-col">
            <h4 className='my-4 font-hero font-semibold text-lg text-blue-600/80'>Add work link</h4>
            <WorkLinkTable artistId={artistId} />
            <Link to={`/artists/edit-artist/${artistId}`} className="block ml-auto mt-5"><Button type="button" variant="secondary">Done</Button></Link>
        </Container>
    );
};

export default WorkEntry;