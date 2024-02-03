import { Helmet } from "react-helmet-async";

const Home = () => {
    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Home || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
        </div>
    );
};

export default Home;