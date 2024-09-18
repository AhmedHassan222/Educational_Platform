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
import { HashRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProtectedRoute from './Components/ProtectedRoute';
import CRUDContextProvide from './Contexts/CRUDContext';
import UpdatedCategory from './Pages/UpdatedCategory';
import AddSubCategory from './Pages/AddSubCategory';
import GetAllSubCategory from './Pages/GetAllSubCategory';
import UpdateSubCategory from './Pages/UpdateSubCategory';
import UpdateCourse from './Pages/UpdateCourse';
import UpdateVideos from './Pages/UpdateVideos';
import Lectures from './Pages/Lectures';
import MyCoursesProvide from './Contexts/MyCoursesContext';
export default function App() {
  const [token, setToken] = useState(Cookies.get('token') ? Cookies.get('token') : null);
  useEffect(() => {
    setToken(Cookies.get('token'))
  }, [Cookies.get('token')])


  // return (
  //   <Router>
  //     <Routes>
  //       {/* Guest Routes */}
  //       <Route path="/login" element={<LoginPage />} />
  //       <Route path="/register" element={<Register />} />
  //       <Route path="/reset-password" element={< ResetPassword />} />
  //       <Route path="/" element={<HomePage />} />
  //       {/* User Routes */}
  //       <ProtectedRoute path="/cources" roles={['User']} component={Cources} />
  //       <ProtectedRoute path="/cources/:id" roles={['User']} component={CourceDetails} />
  //       <ProtectedRoute path="/profile" roles={['User']} component={Profile} />
  //       <ProtectedRoute path="/mycources" roles={['User']} component={MyCources} />
  //       <ProtectedRoute path="/teachers" roles={['User']} component={Teachers} />
  //       <ProtectedRoute path="/teachers/:id" roles={['User']} component={TeacherDetails} />
  //       <ProtectedRoute path="/myexam" roles={['User']} component={MyExams} />
  //       <ProtectedRoute path="/wallet" roles={['User']} component={Wallet} />
  //       {/* Admin Routes */}
  //       <ProtectedRoute path="/admin" roles={['Admin']} component={AdminPage} />
  //       <ProtectedRoute path="/addVideo" roles={['Admin']} component={AddVideo} />
  //       <ProtectedRoute path="/allVideos" roles={['Admin']} component={GetAllVideos} />
  //       {/* Super Admin Routes */}
  //       <ProtectedRoute path="/super-admin" roles={['Super Admin']} component={SuperAdminPage} />
  //       <ProtectedRoute path="addTeacher" roles={['Super Admin']} component={AddTeacher} />
  //       <ProtectedRoute path="addCategory" roles={['Super Admin']} component={AddCategory} />
  //       <ProtectedRoute path="addCourse" roles={['Super Admin']} component={AddCourse} />
  //       <ProtectedRoute path="generateCode" roles={['Super Admin']} component={GenerateCode} />
  //       <ProtectedRoute path="allCodes" roles={['Super Admin']} component={GetAllCodes} />
  //       <ProtectedRoute path="allTeachers" roles={['Super Admin']} component={GetAllTeachers} />
  //       <ProtectedRoute path="allCources" roles={['Super Admin']} component={GetAllCources} />
  //       <ProtectedRoute path="allCategories" roles={['Super Admin']} component={GetAllCategories} />
  //       <Route path="*" element={<NotfoundPage />} />
  //     </Routes>
  //   </Router>
  // )










  return (
    <MyCoursesProvide>
      <Router>
        <Routes>
          {/* User Routes */}
          {token && (jwtDecode(token).role === "User" && (<>
            <Route path="/cources" element={token && jwtDecode(token).role === "User" ? <LayoutWithNavbar><Cources /></LayoutWithNavbar> : ''} />
            <Route path="/cources/:id" element={<LayoutWithNavbar><CourceDetails /></LayoutWithNavbar>} />
            <Route path="/profile" element={<LayoutWithNavbar><Profile /></LayoutWithNavbar>} />
            <Route path="/mycources" element={<LayoutWithNavbar><MyCources /></LayoutWithNavbar>} />
            <Route path="/lectures:id" element={<LayoutWithNavbar><Lectures /></LayoutWithNavbar>} />
            <Route path="/teachers" element={<LayoutWithNavbar><Teachers /></LayoutWithNavbar>} />
            <Route path="/teacher/:id" element={<LayoutWithNavbar><TeacherDetails /></LayoutWithNavbar>} />
            <Route path="/myexam" element={<LayoutWithNavbar><MyExams /></LayoutWithNavbar>} />
            <Route path="/wallet" element={<LayoutWithNavbar><Wallet /></LayoutWithNavbar>} />
          </>))}


          {/* Admin Routes */}
          {token && (jwtDecode(token).role === "Teacher" && (<Route path="/teacherAdmin" element={<LayoutWithNavbar><Outlet /></LayoutWithNavbar>}>
            <Route index element={<AdminPage />} />
            <Route path="addVideo" element={<AddVideo />} />
            <Route path="allVideos" element={<GetAllVideos />} />
            <Route path="updateVideos/:title/:id" element={<UpdateVideos />} />
          </Route>))}


          {/* Super Admin Routes */}
          {token && (jwtDecode(token).role === "Admin" && (<Route path="/admin" element={<LayoutWithNavbar><Outlet /></LayoutWithNavbar>}>
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
          </Route>))}
          {/* Public Routes */}
          {!token && (<>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={< ResetPassword />} /></>)}
          <Route path="/" element={<LayoutWithNavbar><HomePage /></LayoutWithNavbar>} />
          <Route path="*" element={<LayoutWithNavbar><NotfoundPage /></LayoutWithNavbar>} />
        </Routes>
      </Router>
    </MyCoursesProvide>
  );
}