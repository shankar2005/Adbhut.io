import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Inbox from "../Pages/Admins/Inbox/Inbox";
import ProjectDashboard from "../Pages/Admins/ProductionManager/ProjectDashboard";
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
import ArtistRequirement from "../Pages/Admins/ArtistManager/ArtistRequirement";
import Projects from "../Pages/Project/Projects";
import LeftToRight from "./PageTransitions/LeftToRight";
import RightToLeft from "./PageTransitions/RightToLeft";
import ArtistRequirementDetails from "../Pages/Admins/ArtistManager/ArtistRequirementDetails";
import Artists from "../Pages/Artist/Artists";
import EditProject from "../Pages/Admins/ProductionManager/EditProject";
import ErrorPage from "../Components/Error/ErrorPage";
import ReadyDemos from "../Pages/Demo/ReadyDemos";
import EditArtist from "../Pages/Artist/EditArtist";
import WorkEntry from "../Pages/Artist/WorkEntry";
import ArtistAccount, { DemoInfo, PersonalInfo, UserInfo } from "../Pages/Artist/ArtistAccount";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <ErrorPage />
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
                element: <ProjectDashboard />,
            },
            {
                path: '/projects/edit-project/:id',
                element: <EditProject />,
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
                path: '/projects/artist-requirement',
                element: <ArtistRequirement />,
            },
            {
                path: '/projects/artist-requirement/:id',
                element: <ArtistRequirementDetails />,
            },
            {
                path: '/projects/readydemos',
                element: <ReadyDemos />,
            },
        ],
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
                path: '/artists/artist-list',
                element: <Artists />
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
                path: '/artists/artist-entry/works/:artistId',
                element: <WorkEntry />
            },
            {
                path: '/artists/edit-artist/:artistId',
                element: <EditArtist />
            },
            {
                path: '/artists/account',
                element: <ArtistAccount />,
                children: [
                    {
                        path: '/artists/account',
                        element: <UserInfo />
                    },
                    {
                        path: '/artists/account/personal-info',
                        element: <PersonalInfo />
                    },
                    {
                        path: '/artists/account/demo-info',
                        element: <DemoInfo />
                    },
                ]
            },
        ],
    },
]);

export default router;