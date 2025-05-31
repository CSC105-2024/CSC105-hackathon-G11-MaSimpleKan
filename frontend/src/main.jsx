import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import HomePage from "./pages/HomePage.jsx";
// import ProfilePage from "./pages/ProfilePage.jsx";
// import SignUpPage from './pages/SignUpPage';
// import LoginPage from './pages/LoginPage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    // {
    //     path: "/profile",
    //     element: <ProfilePage />,
    // },
    // {
    //     path: "/signup",
    //     element: <SignUpPage />,
    // },
    // {
    //     path: "/login",
    //     element: <LoginPage />,
    // },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)