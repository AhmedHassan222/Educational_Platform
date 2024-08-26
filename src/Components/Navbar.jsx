import style from "../Styles/Nav.module.css"
import logo from "../../src/Assets/Images/logo.png"
import { Link } from "react-router-dom"
export default function Navbar() {
    return <>
        <nav className="navbar navbar-expand-lg fixed-top  py-0 ">
            <div className="container">
                <Link className="navbar-brand" to={'/'}>
                <img src={logo} alt="sky academy logo" className={`${style.widthLogo}`} /></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${style.btnOrange} text-white mx-2 px-4 rounded-3`} to={'/login'}>تسجيل الدخول</Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link className={`nav-link ${style.btnOutlinOrange}  mx-2 px-4 rounded-3`} to={'/register'}>حساب جديد</Link>
                        </li>
                        
                    </ul>
                    
                </div>
            </div>
        </nav>
    </>
}