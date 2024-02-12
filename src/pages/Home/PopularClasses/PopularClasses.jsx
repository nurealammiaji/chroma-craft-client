import shape from "../../../assets/6.png";
import { DNA } from "react-loader-spinner";
import ClassItem from "./ClassItem";
import useClasses from "../../../hooks/useClasses";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";

const PopularClasses = () => {

    const [classes] = useClasses();

    return (
        <div>
            <SectionHeader title={"Popular Classes"} background={shape}></SectionHeader>
            <br /><br />
            <div>
                {
                    (classes) ?
                        <div className="grid gap-5 md:grid-cols-3">
                            {
                                (classes) &&
                                classes.slice(0, 6).map(item => <ClassItem key={item._id} item={item}></ClassItem>)
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

export default PopularClasses;