import { Link } from "react-router-dom";

export default function NotfoundPage() {
    return <>
        <section class="d-flex justify-content-center vh-100 align-items-center">
            <div class="col-md-12 text-center">
                <h1>404</h1>
                <h2 className="h1 my-2">Page Not Found</h2>
                <p className="h5 text-muted my-2">
                    Sorry, the page you are looking
                    for does not exist.
                </p>
                <Link className=" btn btn-primary my-2 py-2 px-4" to={'/'}>Back Home</Link>
            </div>
        </section>
    </>
}