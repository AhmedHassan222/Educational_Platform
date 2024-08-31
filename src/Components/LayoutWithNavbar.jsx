import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import NavbarAdmin from './NavbarAdmin';
import NavbarSuperAdmin from './NavbarSuperAdmin';
import NavbarGuest from "./NavbarGuest";

export default function LayoutWithNavbar({ children }) {
    return <>
        {!localStorage.getItem('user') ? <NavbarGuest /> : ''}
        {JSON.parse(localStorage.getItem('user'))?.role === "user" ? <Navbar /> : ''}
        {JSON.parse(localStorage.getItem('user'))?.role === "admin" ? <NavbarAdmin /> : ''}
        {JSON.parse(localStorage.getItem('user'))?.role === "super-admin" ? <NavbarSuperAdmin /> : ''}
        {children}
        <Footer/>
    </>
};

