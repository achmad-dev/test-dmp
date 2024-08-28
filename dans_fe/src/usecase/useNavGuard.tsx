import { FC } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

type NavigationGuardProps = {
    to: string;
    children: JSX.Element | JSX.Element[];
};

const UseNavigationGuard: FC<NavigationGuardProps> = ({ to, children }) => {
    const token = Cookies.get("access_token");

    if (to === "login" && token) {
        // If trying to access login page while logged in, redirect to home
        return <Navigate to="/" replace />;
    } else if (to !== "login" && !token) {
        // If trying to access a protected route while not logged in, redirect to login
        return <Navigate to="/login" replace />;
    }

    // Otherwise, allow rendering the children
    return children;
};

export default UseNavigationGuard;