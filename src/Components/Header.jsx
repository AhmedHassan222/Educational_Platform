import headerImage from "./../../src/Assets/Images/header-image.png"
import style from "../../src/Styles/Header.module.css"
import { Link } from "react-router-dom"
export default function Header(){
    return <>
    <header className="w-100 vh-100 d-flex align-items-center" style={{ backgroundImage: `url("${headerImage}")` }}>
        <div className="container">
            <h3 className="text-white h1">Live it online</h3>
            <p className="text-white fs-5 my-3 ">A specialized and integrated educational experience <br /> that helps the student advance his educational level to another level.</p>
            <div className="d-felx mt-4">
                <Link to={'/register'}  className="btn btn-primary py-2 px-4  me-2">Register Now</Link>
                <Link to={'/cources'} className="btn btn-outline-primary py-2 px-4 ">Browse courses</Link>
            </div>
        </div>
    </header>
    </>
}