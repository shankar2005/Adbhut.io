import { BsArrowRightCircle } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import Container from '../../Components/Container/Container';
import WorkLinkTable from './Components/WorkLinkTable';

const WorkEntry = () => {
    const { artistId } = useParams();

    return (
        <Container className="p-4 flex flex-col">
            <div className='flex items-center justify-between mb-5'>
                <h4 className='font-hero font-semibold text-lg text-blue-600/80'>Add work link</h4>
                <Link to={`/artists/edit-artist/${artistId}`} className="text-gray-500">
                    <BsArrowRightCircle size={28} />
                </Link>
            </div>
            <WorkLinkTable artistId={artistId} />
        </Container>
    );
};

export default WorkEntry;