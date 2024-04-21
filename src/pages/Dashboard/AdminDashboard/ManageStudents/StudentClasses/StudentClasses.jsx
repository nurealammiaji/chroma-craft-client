import { Helmet } from "react-helmet-async";
import { useLoaderData, useParams } from "react-router-dom";

const StudentClasses = () => {
    const classes = useLoaderData();
    const parameter = useParams();
    console.log(classes, parameter.email);

    return (
        <div>
            <Helmet>
                <title>Enrolled || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
            <h1>{classes.length}</h1>
        </div>
    );
};

export default StudentClasses;