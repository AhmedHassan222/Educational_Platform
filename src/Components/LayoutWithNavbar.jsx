import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"

export default function LayoutWithNavbar({children}) {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
};

