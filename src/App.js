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
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const checkRole = (allowedRoles) => {
  const user = Cookies.get('token');
  console.log(" token => " ,Cookies.get('token'))
  if (user)
    return allowedRoles.includes(jwtDecode(user)?.role);
  return false;

}

const router = createHashRouter([
  {
    path: '',
    element: <LayoutWithNavbar><HomePage/></LayoutWithNavbar>,
},
  {
    path: 'login',
    element: Cookies.get('token') ? <Navigate to="" replace /> : <LoginPage />,
  },
  {
    path: 'register',
    element: Cookies.get('token') ? <Navigate to="" replace /> : <Register />,
  },
  {
    path: 'reset-password',
    element: Cookies.get('token') ? <Navigate to="" replace /> : <ResetPassword />,
  },
  {
    path: 'cources',
    element: checkRole(['User']) ? <LayoutWithNavbar><Cources /></LayoutWithNavbar> : <Navigate to={'/'}/>,
  },
  {
    path: 'cources/:id',
    element: checkRole(['User']) ? <LayoutWithNavbar><CourceDetails /></LayoutWithNavbar> : <Navigate to={'/'}/>,
  },
  {
    path: 'admin',
    element: checkRole(['Admin']) ? <LayoutWithNavbar> <Outlet /></LayoutWithNavbar> : <Navigate to={'/'}/>,
    children: [
      //admin children here
      { index: true, element: <AdminPage /> },
      { path: 'addVideo', element: <AddVideo /> },
      { path: 'allVideos', element: <GetAllVideos /> }
    ]
  },
  {
    path: 'super-admin',
    element: checkRole(['Super Admin']) ? <LayoutWithNavbar> <Outlet /></LayoutWithNavbar> : <Navigate to={'/'}/>,
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
      { path: 'allCategories', element: <GetAllCategories /> }
    ]
  },
  {
    path: "profile",
    element: checkRole(['User']) ? <LayoutWithNavbar><Profile /></LayoutWithNavbar> : <Navigate to={'/'}/>
  },
  {
    path: "mycources",
    element: checkRole(['User']) ? <LayoutWithNavbar> <MyCources /></LayoutWithNavbar> : <Navigate to={'/'}/>
  },
  {
    path: "teachers",
    element: checkRole(['User']) ? <LayoutWithNavbar> <Teachers /></LayoutWithNavbar> : <Navigate to={'/'}/>
  },
  {
    path: 'teacher/:id',
    element: checkRole(['User']) ? <LayoutWithNavbar><TeacherDetails /></LayoutWithNavbar> : <Navigate to={'/'}/>,
  },
  {
    path: "myexam",
    element: checkRole(['User']) ? <LayoutWithNavbar> <MyExams /> </LayoutWithNavbar> : <Navigate to={'/'}/>,
  },
  {
    path: "wallet",
    element: checkRole(['User']) ? <LayoutWithNavbar><Wallet /></LayoutWithNavbar> : <Navigate to={'/'}/>,
  },
  {
    path: '*',
    element: <LayoutWithNavbar><NotfoundPage/></LayoutWithNavbar>,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}