import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import ArtistAdmin from "../Pages/Admins/ArtistAdmin/ArtistAdmin";
import ProjectManagement from "../Pages/Admins/ProductionManager/ProjectManagement";
import ArtistEntry from "../Pages/Artist/ArtistEntry";
import ArtistProfile from "../Pages/Artist/ArtistProfile";
import ShortlistedArtists from "../Pages/Artist/ShortlistedArtists";
import Feed from "../Pages/Home/Feed";
import Home from "../Pages/Home/Home";
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
                        path: '/project',
                        element: <ProjectManagement />,
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
]);

export default router;