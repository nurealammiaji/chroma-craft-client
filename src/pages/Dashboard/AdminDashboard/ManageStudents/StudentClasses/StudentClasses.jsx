import { Helmet } from "react-helmet-async";
import { useLoaderData, useParams } from "react-router-dom";
import Class from "./Class";
import { DNA } from "react-loader-spinner";

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
            <div>
                <br /><br />
                <div className="w-11/12 mx-auto">
                    {
                        (classes) ?
                            <div className="grid gap-5 md:grid-cols-2">
                                {
                                    (classes) &&
                                    classes.map(item => <Class key={item._id} item={item}></Class>)
                                }
                            </div> : <>
                                <div className="flex items-center justify-center">
                                    <DNA
                                        visible={true}
                                        height="80"
                                        width="80"
                                        ariaLabel="dna-loading"
                                        wrapperStyle={{}}
                                        wrapperClass="dna-wrapper"
                                    />
                                </div>
                            </>

                    }
                </div>
            </div>
        </div>
    );
};

export default StudentClasses;