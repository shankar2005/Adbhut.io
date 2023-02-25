import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import ArtistAdmin from "../Pages/Admins/ArtistAdmin/ArtistAdmin";
import ProjectManagement from "../Pages/Admins/ProductionManager/ProjectManagement";
import ArtistEntry from "../Pages/Artist/ArtistEntry";
import ArtistProfile from "../Pages/Artist/ArtistProfile";
import Feed from "../Pages/Home/Feed";
import Home from "../Pages/Home/Home";
import Invite from "../Pages/Invite/Invite";
import CreateProject from "../Pages/Project/CreateProject";
import Docusign from "../Pages/Project/Docusign";
import ProjectDone from "../Pages/Project/ProjectDone";
import Projects from "../Pages/Project/Projects";
import RequiredAuth from "./AuthRoutes/RequiredAuth";

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
            }
        ]
    },
    {
        path: '/artists',
        element: <Root />,
        children: [
            {
                path: '/artists',
                element: <Feed />
            },
            {
                path: '/artists/:id',
                loader: ({ params }) => fetch(`https://dev.nsnco.in/api/v1/get_artist/${params.id}/`),
                element: <ArtistProfile />
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