import { createBrowserRouter } from "react-router-dom";
import useAuthToken from "../hooks/useAuthToken";
import Root from "../layouts/Root";
import ArtistAdmin from "../Pages/Admins/ArtistAdmin/ArtistAdmin";
import ProjectManagement from "../Pages/Admins/ProductionManager/ProjectManagement";
import ArtistEntry from "../Pages/Artist/ArtistEntry";
import ArtistProfile from "../Pages/Artist/ArtistProfile";
import Feed from "../Pages/Home/Feed";
import Home from "../Pages/Home/Home";
import HomeContent from "../Pages/Home/HomeContent";
import Invite from "../Pages/Invite/Invite";
import RequiredAuth from "./AuthRoutes/RequiredAuth";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <Home />,
                children: [
                    {
                        path: '/',
                        element: <Feed />
                    },
                    {
                        path: '/project/:id/:stage',
                        element: <ProjectManagement />,
                        loader: ({ params }) => {
                            const url = `https://dev.nsnco.in/api/v1/edit_project/${params.id}/`;
                            if (params.stage === "DreamProject") {
                                return fetch(url)
                            }
                            return fetch(url, { headers: { Authorization: `token ${useAuthToken()}` } });
                        }
                    },
                    {
                        path: '/artist-admin',
                        element: <ArtistAdmin />,
                    },
                    {
                        path: '/artist-entry',
                        element: <RequiredAuth><ArtistEntry /></RequiredAuth>,
                    }
                ]
            },
            {
                path: '/artist/:id',
                loader: ({ params }) => fetch(`https://dev.nsnco.in/api/v1/get_artist/${params.id}/`),
                element: <ArtistProfile />
            },
        ]
    },
    {
        path: '/invite',
        element: <Invite />
    },
    {
        path: '/home',
        element: <HomeContent />
    }
]);

export default router;