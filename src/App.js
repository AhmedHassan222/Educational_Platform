import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from './Pages/AdminPage';
import SuperAdminPage from './Pages/SuperAdminPage';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import PrivateRoute from './Components/PrivateRoute';
import NotfoundPage from './Pages/NotfoundPage';
import Navbar from './Components/Nabar';
import Footer from './Components/Footer';
import Cources from './Pages/Cources';
import Register from './Pages/Register';
import CourceDetails from './Pages/CourseDetails';
import HomeLayoutPage from './Pages/HomeLayoutPage';
export default function App() {
  return <>
    <Navbar />
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/cources" element={<Cources />} />
        <Route path="/cources/:id" element={<CourceDetails />} />
        <Route path="/admin" element={<PrivateRoute roles={['admin', 'super-admin']} element={<AdminPage />} />} />
        <Route path="/super-admin" element={<PrivateRoute roles={['super-admin']} element={<SuperAdminPage />} />} />
        <Route path="/home" element={<PrivateRoute roles={['user', 'admin', 'super-admin']} element={<HomeLayoutPage />} />} />
        <Route path="*" element={<NotfoundPage />} />
      </Routes>
    </Router>
    <Footer />
  </>
}
