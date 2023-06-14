import { useSelector } from 'react-redux';
import { useGetCurrentProjectsQuery } from '../../features/project/projectApi';
import ProjectCard from './ProjectCard';

const MyProjects = () => {
    const { user } = useSelector(state => state.auth);
    const { data: projects, isSuccess } = useGetCurrentProjectsQuery(null, { skip: !user?.email });

    return (
        <section className="stream">
            {
                isSuccess &&
                projects.map(project => <ProjectCard key={project.pk} projectId={project.pk} />)
            }
        </section>
    );
};

export default MyProjects;