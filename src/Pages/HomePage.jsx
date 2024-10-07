import { useEffect } from "react";
import Explore from "../Components/Explore";
import Header from "../Components/Header";
import Swapper from "../Components/Swapper";
import WhyChooseUs from "../Components/WhyChooceUs";
import { Helmet } from "react-helmet";
export default function HomePage() {
    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    return <>
        <Helmet>
            <title>Home Page - Sky Online Acadimy</title>
        </Helmet>
        <Header />
        <Explore />
        <WhyChooseUs />
        <Swapper />
    </>
}