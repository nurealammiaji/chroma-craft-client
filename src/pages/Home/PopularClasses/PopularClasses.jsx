import { DNA } from "react-loader-spinner";
import useClasses from "../../../hooks/useClasses";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";
import PopularClass from "./PopularClass";

const PopularClasses = () => {

    const [classes] = useClasses();
    let sortedClasses;

    if (classes) {
        sortedClasses = classes.slice().sort((a, b) => b.enrolled - a.enrolled);
    }

    return (
        <div>
            <SectionHeader title={"Popular Classes"} ></SectionHeader>
            <br /><br />
            <div>
                {
                    (classes) ?
                        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
                            {
                                (sortedClasses) &&
                                sortedClasses.slice(0, 6).map(item => <PopularClass key={item._id} item={item}></PopularClass>)
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