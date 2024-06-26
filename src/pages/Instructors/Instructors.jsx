import { Helmet } from "react-helmet-async";
import image from "../../assets/headers/instructors.jpg";
import useInstructors from "../../hooks/useInstructors";
import { DNA } from "react-loader-spinner";
import Instructor from "./Instructor";
import PageHeader from '../../components/PageHeader/PageHeader';

const Instructors = () => {

    const [instructors] = useInstructors();

    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Instructors || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
            <div>
                <PageHeader background={image} title={"Instructors"} subTitle={"Awesome Instructors"}></PageHeader>
            </div>
            <br /><br />
            <div className="w-11/12 mx-auto">
                {
                    (instructors) ?
                        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
                            {
                                (instructors) &&
                                instructors.map(item => <Instructor key={item._id} item={item}></Instructor>)
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
    );
};

export default Instructors;