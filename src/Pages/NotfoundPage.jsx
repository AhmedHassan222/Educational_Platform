import { Link } from "react-router-dom";
import style from "../../src/Styles/Teacher.module.css"
export default function NotfoundPage() {
    return <>
        <section class="d-flex justify-content-center vh-100 align-items-center">
            <div class=" text-center">
                <h1>404</h1>
                <h2 className="h1 my-2">Page Not Found</h2>
                <p className="h5 text-muted my-2">
                    Sorry, the page you are looking
                    for does not exist.
                </p>
                <div className="d-flex justify-content-center">
                    <Link className={` nav-link  fitContent my-2 py-2 px-4 ${style.btnOrange} rounded-2 text-white`} to={'/'}>Back Home</Link>

                </div>
            </div>
        </section>
    </>
}