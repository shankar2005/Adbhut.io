import { useGetDreamProjectsQuery } from '../../features/project/projectApi';
import ProjectCard from './ProjectCard';

const Projects = () => {
    const { data: projects, isSuccess } = useGetDreamProjectsQuery();

    return (
        <section className="stream" >
            {
                isSuccess &&
                projects.map(project => <ProjectCard projectId={project.pk} />)
            }
        </section>
    );
};

export default Projects;