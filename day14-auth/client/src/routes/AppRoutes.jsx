import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import MainLayout from '../layout/MainLayout';
import AuthLayout from '../layout/AuthLayout';
import Home from '../pages/home';
import Login from '../components/Login';
import Register from '../components/Register';

const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="/login" replace />,
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'register',
                element: <Register />,
            },
        ],
    },
    {
        path: '/home',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
        ],
    },
]);

const AppRoutes = () => {
    return <RouterProvider router={router} />;
};

export default AppRoutes;
