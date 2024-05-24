import { Helmet } from "react-helmet-async";
import SectionHeader from "../../../../components/SectionHeader/SectionHeader";

const AddedClasses = () => {
    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Added Class || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
            <div className="w-screen p-5 md:w-full">
                <div className="mt-5">
                    <SectionHeader title={"Added Class"}></SectionHeader>
                </div>
                <br /><br />
            </div>
        </div>
    );
};

export default AddedClasses;