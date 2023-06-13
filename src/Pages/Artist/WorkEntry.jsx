import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetArtistWrokLinksQuery } from '../../features/artist/artistApi';
import WorkLinkTable from './Components/WorkLinkTable';

const WorkEntry = () => {
    const { artistId } = useParams();
    const { data } = useGetArtistWrokLinksQuery(artistId);

    return (
        <div>
            <h4 className='my-4 font-hero font-semibold text-lg text-blue-700/60'>Add work link</h4>
            <WorkLinkTable works_links={data?.works_links} artistId={artistId} />
        </div>
    );
};

export default WorkEntry;