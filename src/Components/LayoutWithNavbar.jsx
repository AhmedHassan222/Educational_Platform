import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import NavbarAdmin from './NavbarAdmin';
import NavbarSuperAdmin from './NavbarSuperAdmin';

export default function LayoutWithNavbar({ children }) {
    return <>
        {JSON.parse(localStorage.getItem('user'))?.role === "user" ? <Navbar /> : ''}
        {JSON.parse(localStorage.getItem('user'))?.role === "admin" ? <NavbarAdmin /> : ''}
        {JSON.parse(localStorage.getItem('user'))?.role === "super-admin" ? <NavbarSuperAdmin /> : ''}
        {children}
        {JSON.parse(localStorage.getItem('user'))?.role === "user" ? <Footer /> : ''}
    </>
};

