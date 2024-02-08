import { Helmet } from "react-helmet-async";
import Slider from "./Slider/Slider";
import Categories from "./Categories/Categories";

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
            <div>
                <Categories></Categories>
            </div>
        </div>
    );
};

export default Home;