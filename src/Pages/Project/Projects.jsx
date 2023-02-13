import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import FeedCardSkeleton from '../../Components/Skeleton/FeedCardSkeleton';
import ProjectCard from './ProjectCard';

const Projects = () => {
    const [allProject, setAllProject] = useState([]);
    useEffect(() => {
        axios('https://dev.nsnco.in/api/v1/get_dreamproject/')
            .then(response => setAllProject(response.data));
    }, [])

    const fetchMoreData = () => { }

    return (
        <InfiniteScroll
            dataLength={allProject.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<FeedCardSkeleton />}
        >
            {
                allProject.map(project => <ProjectCard projectDetails={project} />)
            }
        </InfiniteScroll>
    );
};

export default Projects;