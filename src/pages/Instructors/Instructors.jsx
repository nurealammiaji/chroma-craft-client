import { Helmet } from "react-helmet-async";
import PageHeader from "../../Common/PageHeader/PageHeader";
import image from "../../assets/headers/instructors.jpg";
import useInstructors from "../../hooks/useInstructors";

const Instructors = () => {

    // const data = useInstructors();
    // console.log(data);

    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Instructors || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
            <div>
                <PageHeader background={image} title={"Instructors"} subTitle={"Awesome Instructors"}></PageHeader>
            </div>
        </div>
    );
};

export default Instructors;