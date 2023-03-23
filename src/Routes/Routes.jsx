import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import ArtistAdmin from "../Pages/Admins/ArtistAdmin/ArtistAdmin";
import ProjectManagement from "../Pages/Admins/ProductionManager/ProjectManagement";
import ArtistEntry from "../Pages/Artist/ArtistEntry";
import ShortlistedArtists from "../Pages/Artist/ShortlistedArtists";
import Feed from "../Pages/Home/Feed";
import Home from "../Pages/Home/Home";
import LeftAside from "../Pages/Home/LeftAside";
import Invite from "../Pages/Invite/Invite";
import CreateProject from "../Pages/Project/CreateProject";
import Docusign from "../Pages/Project/Docusign";
import MyProjects from "../Pages/Project/MyProjects";
import ProjectDemos from "../Pages/Project/ProjectDemos";
import ProjectDone from "../Pages/Project/ProjectDone";
import Projects from "../Pages/Project/Projects";
import LeftToRight from "./PageTransitions/LeftToRight";
import RightToLeft from "./PageTransitions/RightToLeft";

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
                path: '/projects/:id/:stage',
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
                path: '/artists/artist-admin',
                element: <ArtistAdmin />,
            },
            {
                path: '/artists/artist-entry',
                element: <ArtistEntry />
            },
        ]
    },
    {
        path: '/invite',
        element: <Invite />
    }
]);

export default router;