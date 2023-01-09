import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../Pages/Home/Home";
import Invite from "../Pages/Invite/Invite";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/invite',
                element: <Invite />
            },
        ]
    }
]);

export default router;