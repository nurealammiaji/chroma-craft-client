import { Helmet } from "react-helmet-async";
import useClasses from '../../hooks/useClasses';
import PageHeader from '../../components/PageHeader/PageHeader';
import bg from "../../assets/headers/classes.jpg";
import { DNA } from "react-loader-spinner";
import ClassCard from "../../components/ClassCard/ClassCard";

const Classes = () => {

    const [classes] = useClasses();
    let sortedClasses;

    if (classes) {
        sortedClasses = classes.slice().sort((a, b) => b.enrolled - a.enrolled);
    }

    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Classes || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
            <div>
                <PageHeader title={"Classes"} subTitle={"Awesome Classes"} background={bg}></PageHeader>
                <br /><br />
                <div className="w-11/12 mx-auto">
                    {
                        (classes) ?
                            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
                                {
                                    (sortedClasses) &&
                                    sortedClasses.map(item => <ClassCard key={item._id} item={item}></ClassCard>)
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

export default Classes;