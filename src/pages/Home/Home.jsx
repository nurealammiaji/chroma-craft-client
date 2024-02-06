import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import Slider from "./Slider/Slider";

const Home = () => {
    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Home || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
            {/* <div>
                <Banner></Banner>
            </div> */}
            <div>
                <Slider></Slider>
            </div>
        </div>
    );
};

export default Home;