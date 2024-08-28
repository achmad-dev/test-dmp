import { createBrowserRouter } from "react-router-dom";
import Auth from "@/view/auth/auth";
import Dashboard from "@/view/dashboard/dashboard";
import App from "@/App";
import JobDetail from "@/view/detail/jobDetail";
import NotFound from "@/view/404";
import UseNavigationGuard from "./useNavGuard";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/login",
                element: (
                    <UseNavigationGuard to="login">
                        <Auth />
                    </UseNavigationGuard>
                ),
            },
            {
                path: "/",
                element: (
                    <UseNavigationGuard to="/">
                        <Dashboard />
                    </UseNavigationGuard>
                ),
            },
            {
                path: "/jobs/:id",
                element: (
                    <UseNavigationGuard to="/">
                        <JobDetail />
                    </UseNavigationGuard>
                ),
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    }
]);

export default routes;