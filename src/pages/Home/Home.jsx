import { Helmet } from "react-helmet-async";
import Slider from "./Slider/Slider";
import TopCategories from "./TopCategories/TopCategories";
import PopularClasses from './PopularClasses/PopularClasses';
import PopularInstructors from "./PopularInstructors/PopularInstructors";

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
            <div className="w-11/12 mx-auto">
                <TopCategories></TopCategories>
            </div>
            <br /><br />
            <div className="w-11/12 mx-auto">
                <PopularClasses></PopularClasses>
            </div>
            <br /><br />
            <div className="w-11/12 mx-auto">
                <PopularInstructors></PopularInstructors>
            </div>
        </div>
    );
};

export default Home;