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
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { HashRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function App() {
  const [token, setToken] = useState(Cookies.get('token') ? Cookies.get('token') : null);
  useEffect(() => {
    setToken(Cookies.get('token'))
  }, [Cookies.get('token')])



  return (
    <Router>
      <Routes>
        {/* User Routes */}
        {token && (jwtDecode(token).role === "User" && (<>
          <Route path="/cources" element={<LayoutWithNavbar><Cources /></LayoutWithNavbar>} />
          <Route path="/cources/:id" element={<LayoutWithNavbar><CourceDetails /></LayoutWithNavbar>} />
          <Route path="/profile" element={<LayoutWithNavbar><Profile /></LayoutWithNavbar>} />
          <Route path="/mycources" element={<LayoutWithNavbar><MyCources /></LayoutWithNavbar>} />
          <Route path="/teachers" element={<LayoutWithNavbar><Teachers /></LayoutWithNavbar>} />
          <Route path="/teacher/:id" element={<LayoutWithNavbar><TeacherDetails /></LayoutWithNavbar>} />
          <Route path="/myexam" element={<LayoutWithNavbar><MyExams /></LayoutWithNavbar>} />
          <Route path="/wallet" element={<LayoutWithNavbar><Wallet /></LayoutWithNavbar>} />
        </>))}


        {/* Admin Routes */}
        {token && (jwtDecode(token).role === "Admin" && (<Route path="/admin" element={<LayoutWithNavbar><Outlet /></LayoutWithNavbar>}>
          <Route index element={<AdminPage />} />
          <Route path="addVideo" element={<AddVideo />} />
          <Route path="allVideos" element={<GetAllVideos />} />
        </Route>))}


        {/* Super Admin Routes */}
        {token && (jwtDecode(token).role === "Super AdminF" && (<Route path="/super-admin" element={<LayoutWithNavbar><Outlet /></LayoutWithNavbar>}>
          <Route index element={<SuperAdminPage />} />
          <Route path="addTeacher" element={<AddTeacher />} />
          <Route path="addCategory" element={<AddCategory />} />
          <Route path="addCourse" element={<AddCourse />} />
          <Route path="generateCode" element={<GenerateCode />} />
          <Route path="allCodes" element={<GetAllCodes />} />
          <Route path="allTeachers" element={<GetAllTeachers />} />
          <Route path="allCources" element={<GetAllCources />} />
          <Route path="allCategories" element={<GetAllCategories />} />
        </Route>))}
        {/* Public Routes */}
        <Route path="/login" element={token ? <Navigate to={'/'} /> : <LoginPage />} />
        <Route path="/register" element={token ? <Navigate to={'/'} /> : <Register />} />
        <Route path="/reset-password" element={token ? <Navigate to={'/'} /> : < ResetPassword />} />
        <Route path="/" element={<LayoutWithNavbar><HomePage /></LayoutWithNavbar>} />
        <Route path="*" element={<LayoutWithNavbar><NotfoundPage /></LayoutWithNavbar>} />
      </Routes>
    </Router>
  );
}


