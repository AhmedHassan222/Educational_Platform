import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import NavbarAdmin from './NavbarAdmin';
import NavbarSuperAdmin from './NavbarSuperAdmin';
import NavbarGuest from "./NavbarGuest";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
export default function LayoutWithNavbar({ children }) {
    const [Classes, setClasses] = useState([1, 2, 3, 4, 5, 6]);
    const [role, setRole] = useState(null)
    useEffect(() => {
        if (Cookies.get('token'))
            setRole(jwtDecode(Cookies.get('token'))?.role)
    }, [Cookies.get('token')])
    return <>
        {!Cookies.get('token') ? <NavbarGuest /> : ''}
        {role === "User" ? <Navbar /> : ''}
        {role === "Admin" ? <NavbarAdmin /> : ''}
        {role === "Super Admin" ? <NavbarSuperAdmin /> : ''}
        {children}
        <Footer />
    </>
};

