import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import NavbarAdmin from './NavbarAdmin';
import NavbarSuperAdmin from './NavbarSuperAdmin';
import NavbarGuest from "./NavbarGuest";
import { jwtDecode } from "jwt-decode";

export default function LayoutWithNavbar({ children }) {
    return <>
        {!localStorage.getItem('user') ? <NavbarGuest /> : ''}
        {jwtDecode(localStorage.getItem('user'))?.role === "User" ? <Navbar /> : ''}
        {jwtDecode(localStorage.getItem('user'))?.role === "Admin" ? <NavbarAdmin /> : ''}
        {jwtDecode(localStorage.getItem('user'))?.role === "Super Admin" ? <NavbarSuperAdmin /> : ''}
        {children}
        <Footer/>
    </>
};

