import { Helmet } from "react-helmet-async";

const About = () => {
    return (
        <div className="min-h-screen">
            <Helmet>
                <title>About || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
        </div>
    );
};

export default About;