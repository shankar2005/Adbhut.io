import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Inbox from "../Pages/Admins/Inbox/Inbox";
import ProjectManagement from "../Pages/Admins/ProductionManager/ProjectManagement";
import ArtistEntry from "../Pages/Artist/ArtistEntry";
import ShortlistedArtists from "../Pages/Artist/ShortlistedArtists";
import Feed from "../Pages/Home/Feed";
import Home from "../Pages/Home/Home";
import LeftAside from "../Pages/Home/LeftAside";
import CreateProject from "../Pages/Project/CreateProject";
import Docusign from "../Pages/Project/Docusign";
import MyProjects from "../Pages/Project/MyProjects";
import ProjectDemos from "../Pages/Project/ProjectDemos";
import ProjectDone from "../Pages/Project/ProjectDone";
import ProjectRequirement from "../Pages/Admins/ArtistManager/ProjectRequirement";
import Projects from "../Pages/Project/Projects";
import LeftToRight from "./PageTransitions/LeftToRight";
import RightToLeft from "./PageTransitions/RightToLeft";
import ProjectRequirementDetails from "../Pages/Admins/ArtistManager/ProjectRequirementDetails";
import Artists from "../Pages/Artist/Artists";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/projects',
        element: <Root />,
        children: [
            {
                path: '/projects',
                element: <Projects />,
            },
            {
                path: '/projects/myprojects',
                element: <MyProjects />,
            },
            {
                path: '/projects/demos/:id',
                element: <ProjectDemos />,
            },
            {
                path: '/projects/:id',
                element: <ProjectManagement />,
            },
            {
                path: '/projects/create-project',
                element: <CreateProject />,
            },
            {
                path: '/projects/sign-project',
                element: <Docusign />,
            },
            {
                path: '/projects/completed',
                element: <ProjectDone />,
            },
            {
                path: '/projects/chat',
                element: <LeftToRight>
                    <div className="md:hidden"><LeftAside /></div>
                </LeftToRight>
            },
            {
                path: '/projects/shortlisted-artists',
                element: <ShortlistedArtists />,
            },
            {
                path: '/projects/inbox',
                element: <Inbox />,
            },
            {
                path: '/projects/project-requirement',
                element: <ProjectRequirement />,
            },
            {
                path: '/projects/project-requirement/:id',
                element: <ProjectRequirementDetails />,
            },
        ]
    },
    {
        path: '/artists',
        element: <Root />,
        children: [
            {
                path: '/artists',
                element: <RightToLeft><Feed /></RightToLeft>
            },
            {
                path: '/artists/artist-list',
                element: <RightToLeft><Artists /></RightToLeft>
            },
            {
                path: '/artists/artist-list/:projectId',
                element: <Artists />
            },
            {
                path: '/artists/artist-entry',
                element: <ArtistEntry />
            },
            {
                path: '/artists/edit-artist/:artistId',
                element: <ArtistEntry />
            },
        ]
    }
]);

export default router;