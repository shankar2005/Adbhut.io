import { useSelector } from 'react-redux';
import NothingFound from '../../Components/NotFound/NothingFound';
import { useGetCurrentProjectsQuery } from '../../features/project/projectApi';
import ProjectCard from './ProjectCard';

const Projects = () => {
    const { user } = useSelector(state => state.auth);
    const { data: projects, isSuccess, isFetching } = useGetCurrentProjectsQuery(null, { skip: !user?.email });

    return (
        <section className="stream mt-3">
            {!isFetching && !projects?.length && <NothingFound
                heading="No projects found"
                description="Try creating a new project."
            />}
            {
                isSuccess &&
                projects.map(project => <ProjectCard key={project.pk} projectId={project.pk} />)
            }
        </section>
    );
};

export default Projects;