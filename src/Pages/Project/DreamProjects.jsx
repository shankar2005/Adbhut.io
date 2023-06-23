import { useGetDreamProjectsQuery } from '../../features/project/projectApi';
import ProjectCard from './ProjectCard';

const DreamProjects = () => {
    const { data: projects, isSuccess } = useGetDreamProjectsQuery();

    return (
        <section className="stream mt-3" >
            {
                isSuccess &&
                projects.map(project => <ProjectCard projectId={project.pk} />)
            }
        </section>
    );
};

export default DreamProjects;