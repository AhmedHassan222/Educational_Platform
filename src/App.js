import React from 'react';
import { HashRouter as Router, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute'; // Import the ProtectedRoute component
import LayoutWithNavbar from './Components/LayoutWithNavbar';

// Pages
import AdminPage from './Pages/AdminPage';
import SuperAdminPage from './Pages/SuperAdminPage';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import NotfoundPage from './Pages/NotfoundPage';
import Cources from './Pages/Cources';
import Register from './Pages/Register';
import CourceDetails from './Pages/CourseDetails';
import ResetPassword from './Pages/ResetPassword';
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
import UpdatedCategory from './Pages/UpdatedCategory';
import AddSubCategory from './Pages/AddSubCategory';
import GetAllSubCategory from './Pages/GetAllSubCategory';
import UpdateSubCategory from './Pages/UpdateSubCategory';
import UpdateCourse from './Pages/UpdateCourse';
import UpdateVideos from './Pages/UpdateVideos';
import Lectures from './Pages/Lectures';
import Cookies from 'js-cookie';
// Contexts
import MyCoursesProvide from './Contexts/MyCoursesContext';
import FilterContextProvide from './Contexts/FilterContext';

export default function App() {
  return (
    <FilterContextProvide>
      <MyCoursesProvide>
        <Router>
          <Routes>


            {/* User routes */}
            <Route element={<ProtectedRoute allowedRoles={['User']} />}>
              <Route path="/cources" element={<LayoutWithNavbar><Cources /></LayoutWithNavbar>} />
              <Route path="/cources/:id" element={<LayoutWithNavbar><CourceDetails /></LayoutWithNavbar>} />
              <Route path="/profile" element={<LayoutWithNavbar><Profile /></LayoutWithNavbar>} />
              <Route path="/mycources" element={<LayoutWithNavbar><MyCources /></LayoutWithNavbar>} />
              <Route path="/lectures/:id" element={<LayoutWithNavbar><Lectures /></LayoutWithNavbar>} />
              <Route path="/teachers" element={<LayoutWithNavbar><Teachers /></LayoutWithNavbar>} />
              <Route path="/teacher/:id" element={<LayoutWithNavbar><TeacherDetails /></LayoutWithNavbar>} />
              <Route path="/myexam" element={<LayoutWithNavbar><MyExams /></LayoutWithNavbar>} />
              <Route path="/wallet" element={<LayoutWithNavbar><Wallet /></LayoutWithNavbar>} />
            </Route>

            {/* Teacher routes */}
            <Route element={<ProtectedRoute allowedRoles={['Teacher']} />}>
              <Route path="/teacherAdmin" element={<LayoutWithNavbar><Outlet /></LayoutWithNavbar>}>
                <Route index element={<AdminPage />} />
                <Route path="addVideo" element={<AddVideo />} />
                <Route path="allVideos" element={<GetAllVideos />} />
                <Route path="updateVideos/:title/:id" element={<UpdateVideos />} />
              </Route>
            </Route>

            {/* Admin routes */}
            <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
              <Route path="/admin" element={<LayoutWithNavbar><Outlet /></LayoutWithNavbar>}>
                <Route index element={<SuperAdminPage />} />
                <Route path="addTeacher" element={<AddTeacher />} />
                <Route path="addCategory" element={<AddCategory />} />
                <Route path="addCourse" element={<AddCourse />} />
                <Route path="generateCode" element={<GenerateCode />} />
                <Route path="allCodes" element={<GetAllCodes />} />
                <Route path="allTeachers" element={<GetAllTeachers />} />
                <Route path="updatecategory/:name/:id" element={<UpdatedCategory />} />
                <Route path="updatesubcategory/:name/:id" element={<UpdateSubCategory />} />
                <Route path="updatecourse/:nameCourse/:id" element={<UpdateCourse />} />
                <Route path="allCources" element={<GetAllCources />} />
                <Route path="allCategories" element={<GetAllCategories />} />
                <Route path="addSubCategory" element={<AddSubCategory />} />
                <Route path="allSubCategories" element={<GetAllSubCategory />} />
              </Route>
            </Route>


            {/* Public routes */}
            <Route path="/" element={<LayoutWithNavbar><HomePage /></LayoutWithNavbar>} />
            <Route path="/login" element={Cookies.get('token')? <Navigate to={'/'}/> : <LoginPage />} />
            <Route path="/register" element={Cookies.get('token')? <Navigate to={'/'}/> : <Register />} />
            <Route path="/reset-password" element={Cookies.get('token')? <Navigate to={'/'}/> : <ResetPassword />} />
            <Route path="*" element={<LayoutWithNavbar><NotfoundPage /></LayoutWithNavbar>} />


          </Routes>
        </Router>
      </MyCoursesProvide>
    </FilterContextProvide>
  );
}
