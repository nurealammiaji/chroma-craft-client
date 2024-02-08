import { Helmet } from "react-helmet-async";
import Slider from "./Slider/Slider";
import TopCategories from "./TopCategories/TopCategories";

const Home = () => {
    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Home || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
            <div>
                <Slider></Slider>
            </div>
            <br /><br />
            <div>
                <TopCategories></TopCategories>
            </div>
        </div>
    );
};

export default Home;