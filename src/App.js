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
import AddTeacher from './Pages/AddTeacher';
import AddCategory from './Pages/AddCategory';
import AddCourse from './Pages/AddCourse';
import GenerateCode from './Pages/GenerateCode';
import AddVideo from './Pages/AddVideo';
import GetAllCodes from './Pages/GetAllCodes';
import GetAllTeachers from './Pages/GetAllTeachers';
import GetAllCources from './Pages/GetAllCources';
import GetAllCategories from './Pages/GetAllCategories';
import GetAllVideos from './Pages/GetAllVideos';

const checkRole = (allowedRoles) => {
  // var x = {
  //   role: "user"
  // }
  // localStorage.setItem('user', JSON.stringify(x))
  const user = JSON.parse(localStorage.getItem('user'))
  return user && allowedRoles.includes(user?.role);
};

const router = createHashRouter([
  {
    path: '/login',
    element: localStorage.getItem('user') ? <Navigate to="/" replace /> : <LoginPage />,
  },
  {
    path: '/register',
    element: localStorage.getItem('user') ? <Navigate to="/" replace /> : <Register />,
  },
  {
    path: '/reset-password',
    element: localStorage.getItem('user') ? <Navigate to="/" replace /> : <ResetPassword />,
  },
  {
    path: '/',
    element: <LayoutWithNavbar><HomePage/></LayoutWithNavbar>,

  },
  {
    path: '/cources',
    element: checkRole(['user']) ? <LayoutWithNavbar><Cources /></LayoutWithNavbar> : <Navigate to="/" replace />,
  },
  {
    path: '/cources/:id',
    element: checkRole(['user']) ? <LayoutWithNavbar><CourceDetails /></LayoutWithNavbar> : <Navigate to="/" replace />,
  },
  {
    path: '/admin',
    element: checkRole(['admin']) ? <LayoutWithNavbar> <Outlet /></LayoutWithNavbar> : <Navigate to="/" replace />,
    children: [
      //admin children here
      { index: true, element: <AdminPage /> },
      {path:'addVideo', element:<AddVideo/>},
      {path:'allVideos', element:<GetAllVideos/>}
    ]
  },
  {
    path: '/super-admin',
    element: checkRole(['super-admin']) ? <LayoutWithNavbar> <Outlet /></LayoutWithNavbar> : <Navigate to="/" replace />,
    children: [
      //super-admin children here
      { index: true, element: <SuperAdminPage /> },
      { path: 'addTeacher', element: <AddTeacher /> },
      { path: 'addCategory', element: <AddCategory /> },
      { path: 'addCourse', element: <AddCourse /> },
      { path: 'generateCode', element: <GenerateCode /> },
      { path: 'allCodes', element: <GetAllCodes /> },
      { path: 'allTeachers', element: <GetAllTeachers /> },
      { path: 'allCources', element: <GetAllCources /> },
      {path:'allCategories',element: <GetAllCategories/>}
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