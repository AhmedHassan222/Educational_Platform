import { RouterProvider, Navigate, createHashRouter, Outlet } from 'react-router-dom';
import AdminPage from './Pages/AdminPage';
import SuperAdminPage from './Pages/SuperAdminPage';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
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
const checkRole = (allowedRoles) => {
  // var x = {role: "user"}
  // localStorage.setItem('user', JSON.stringify(x))
  const user = JSON.parse(localStorage.getItem('user'))
  return user && allowedRoles.includes(user?.role);
};

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
    element: checkRole(['user', 'admin', 'super-admin']) ? <LayoutWithNavbar><Cources /></LayoutWithNavbar> : <Navigate to="/" replace />,
  },
  {
    path: '/cources/:id',
    element: checkRole(['user', 'admin', 'super-admin']) ? <LayoutWithNavbar><CourceDetails /></LayoutWithNavbar> : <Navigate to="/" replace />,
  },
  {
    path: '/admin',
    element: checkRole(['admin']) ? <LayoutWithNavbar> <Outlet /></LayoutWithNavbar> : <Navigate to="/" replace />,
    children: [
      //admin children here
      { index: true, element: <AdminPage /> },
    ]
  },
  {
    path: '/super-admin',
    element: checkRole(['super-admin']) ? <LayoutWithNavbar> <Outlet /></LayoutWithNavbar> : <Navigate to="/" replace />,
    children: [
      //super-admin children here
      { index: true, element: <SuperAdminPage /> },

    ]
  },
  {
    path: "profile",
    element: checkRole(['user']) ? <LayoutWithNavbar><Profile /></LayoutWithNavbar> : <Navigate to="/" replace />
  },
  {
    path: "mycources",
    element: checkRole(['user']) ? <LayoutWithNavbar> <MyCources /></LayoutWithNavbar> : <Navigate to="/" replace />
  },
  {
    path: "teachers",
    element: checkRole(['user']) ? <LayoutWithNavbar> <Teachers /></LayoutWithNavbar> : <Navigate to="/" replace />
  },
  {
    path: '/teacher/:id',
    element: checkRole(['user']) ? <LayoutWithNavbar><TeacherDetails /></LayoutWithNavbar> : <Navigate to="/" replace />,
  },
  {
    path: "myexam",
    element: checkRole(['user']) ? <LayoutWithNavbar> <MyExams /> </LayoutWithNavbar> : <Navigate to="/" replace />,
  },
  {
    path: "wallet",
    element: checkRole(['user']) ? <LayoutWithNavbar><Wallet /></LayoutWithNavbar> : <Navigate to="/" replace />,
  },
  {
    path: '*',
    element: <LayoutWithNavbar><NotfoundPage /></LayoutWithNavbar>,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}