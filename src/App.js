import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from './Pages/AdminPage';
import SuperAdminPage from './Pages/SuperAdminPage';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import PrivateRoute from './Components/PrivateRoute';
import NotfoundPage from './Pages/NotfoundPage';
import Cources from './Pages/Cources';
import Register from './Pages/Register';
import CourceDetails from './Pages/CourseDetails';
import HomeLayoutPage from './Pages/HomeLayoutPage';
import ResetPassword from './Pages/ResetPassword';
import LayoutWithNavbar from './Components/LayoutWithNavbar';
export default function App() {
  return <>
    <Router>
      <Routes>

        {/* component with navbar */}
        <Route path="/" element={<LayoutWithNavbar><HomePage /></LayoutWithNavbar>} />
        <Route path="/cources" element={<LayoutWithNavbar><Cources /></LayoutWithNavbar>} />
        <Route path="/cources/:id" element={<LayoutWithNavbar><CourceDetails /></LayoutWithNavbar>} />
        <Route path="/admin" element={<PrivateRoute roles={['admin', 'super-admin']} element={<LayoutWithNavbar><AdminPage /></LayoutWithNavbar>} />} />
        <Route path="/super-admin" element={<PrivateRoute roles={['super-admin']} element={<LayoutWithNavbar><SuperAdminPage /></LayoutWithNavbar>} />} />
        <Route path="/home" element={<PrivateRoute roles={['user', 'admin', 'super-admin']} element={<LayoutWithNavbar><HomeLayoutPage /></LayoutWithNavbar>} />} />

        {/* component withou navbar */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NotfoundPage />} />
      </Routes>
    </Router>
  </>
}
