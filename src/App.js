import React from 'react';
import { RouterProvider, Navigate, createHashRouter } from 'react-router-dom';
import AdminPage from './Pages/AdminPage';
import SuperAdminPage from './Pages/SuperAdminPage';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import PrivateRoute from './Components/PrivateRoute';
import NotfoundPage from './Pages/NotfoundPage';
import Cources from './Pages/Cources';
import Register from './Pages/Register';
import CourceDetails from './Pages/CourseDetails';
import ResetPassword from './Pages/ResetPassword';
import LayoutWithNavbar from './Components/LayoutWithNavbar';
import Profile from './Pages/Profile';
import MyCources from './Pages/MyCources';
import Teachers from './Pages/Teachers';
import MyExams from './Pages/MyExams';
import Wallet from './Pages/Wallet';
import TeacherDetails from './Pages/TeacherDetails';
import NavbarAdmin from './Components/NavbarAdmin';
import NavbarSuperAdmin from './Components/NavbarSuperAdmin';
const router = createHashRouter([
  {
    path: '/login',
    element: localStorage.getItem('user') ? <Navigate to="/cources" replace /> : <LoginPage />,
  },
  {
    path: '/register',
    element: localStorage.getItem('user') ? <Navigate to="/cources" replace /> : <Register />,
  },
  {
    path: '/reset-password',
    element: localStorage.getItem('user') ? <Navigate to="/cources" replace /> : <ResetPassword />,
  },
  {
    path: '/',
    element: localStorage.getItem('user') ? <Navigate to="/cources" replace /> : <LayoutWithNavbar><HomePage /></LayoutWithNavbar>,
  },
  {
    path: '/cources',
    element: <LayoutWithNavbar><Cources /></LayoutWithNavbar>,
  },
  {
    path: '/cources/:id',
    element: <LayoutWithNavbar><CourceDetails /></LayoutWithNavbar>,
  },
  {
    path: '/admin',
    element: <PrivateRoute roles={['admin', 'super-admin']} element={<><NavbarAdmin /> <AdminPage /></>} />,
  },
  {
    path: '/super-admin',
    element: <PrivateRoute roles={['super-admin']} element={<><NavbarSuperAdmin /> <SuperAdminPage /></>} />,
  },
  {
    path: "profile",
    element: localStorage.getItem('user') ? <LayoutWithNavbar><Profile /></LayoutWithNavbar> : <Navigate to="/" replace />
  },
  {
    path: "mycources",
    element: localStorage.getItem('user') ? <LayoutWithNavbar> <MyCources /></LayoutWithNavbar> : <Navigate to="/" replace />
  },
  {
    path: "teachers",
    element: localStorage.getItem('user') ? <LayoutWithNavbar> <Teachers /></LayoutWithNavbar> : <Navigate to="/" replace />
  },
  {
    path: '/tacher/:id',
    element: <LayoutWithNavbar><TeacherDetails /></LayoutWithNavbar>,
  },
  {
    path: "myexam",
    element: localStorage.getItem('user') ? <LayoutWithNavbar> <MyExams /> </LayoutWithNavbar> : <Navigate to="/" replace />
  },
  {
    path: "wallet",
    element: localStorage.getItem('user') ? <LayoutWithNavbar><Wallet /></LayoutWithNavbar> : <Navigate to="/" replace />
  },

  {
    path: '*',
    element: <LayoutWithNavbar><NotfoundPage /></LayoutWithNavbar>,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
