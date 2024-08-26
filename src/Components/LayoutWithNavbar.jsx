import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"

export default function LayoutWithNavbar({children}) {
    return (
        <div>
            <Navbar />
            <div className="my-5 py-5">
            {children}
            </div>
            <Footer />
        </div>
    );
};

