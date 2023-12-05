import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import ProjectDashboard from "../Pages/Admins/ProductionManager/ProjectDashboard";
import ArtistEntry from "../Pages/Artist/ArtistEntry";
import ShortlistedArtists from "../Pages/Artist/ShortlistedArtists";
import Home from "../Pages/Home/Home";
import LeftAside from "../Pages/Home/LeftAside";
import CreateProject from "../Pages/Project/CreateProject";
import ProjectDemos from "../Pages/Project/ProjectDemos";
import ArtistRequirement from "../Pages/Admins/ArtistManager/ArtistRequirement";
import Projects from "../Pages/Project/Projects";
import LeftToRight from "./PageTransitions/LeftToRight";
import ArtistRequirementDetails from "../Pages/Admins/ArtistManager/ArtistRequirementDetails";
import Artists from "../Pages/Artist/Artists";
import EditProject from "../Pages/Admins/ProductionManager/EditProject";
import ErrorPage from "../Components/Error/ErrorPage";
import ReadyDemos from "../Pages/Demo/ReadyDemos";
import EditArtist from "../Pages/Artist/EditArtist";
import WorkEntry from "../Pages/Artist/WorkEntry";
import ArtistAccount, { DemoInfo, PersonalInfo } from "../Pages/Artist/ArtistAccount";
import ArtistsList from "../Pages/Artist/ArtistsList";
import DreamProjects from "../Pages/Project/DreamProjects";
import ArtistDashboard from "../Pages/Demo/ArtistDashboard";
import DemoDetails from "../Pages/Demo/Components/DemoDetails";
import ArtistLandingPage from "../Pages/Artist/ArtistLandingPage";
import ArtistDashboardTest from "../Pages/Artist/ArtistDashboard";

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
                path: '/projects/dreamprojects',
                element: <DreamProjects />,
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
                element: <Artists />
            },
            {
                path: '/artists/artist-list',
                element: <ArtistsList />
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
                        element: <PersonalInfo />
                    },
                    {
                        path: '/artists/account/demo-info',
                        element: <DemoInfo />
                    },
                ]
            },
            {
                path: '/artists/demos',
                element: <ArtistDashboard />
            },
            {
                path: '/artists/demos/:id',
                element: <DemoDetails />
            },
        ],
    },
    {
        path: '/CreatorFellowship',
        element: <ArtistLandingPage />
    },
    {
        path: '/artist/dashboard',
        element: <ArtistDashboardTest />
    },
    // {
    //     path: '/about',
    //     element: <iframe
    //         title="GitHub Pages"
    //         src="https://shankar2005.github.io/nsnco.github.io/"
    //         width="100%"
    //         className="h-screen"
    //         frameBorder="0"
    //         allowFullScreen
    //     />
    // }
]);

export default router;