import shape from "../../../assets/6.png";
import { DNA } from "react-loader-spinner";
import useInstructors from "../../../hooks/useInstructors";
import SectionHeader from '../../../components/SectionHeader/SectionHeader';
import PopularInstructor from './PopularInstructor';


const PopularInstructors = () => {

    const [instructors] = useInstructors();

    return (
        <div>
            <div>
                <SectionHeader title={"Popular Instructors"} background={shape}></SectionHeader>
                <br /><br />
                <div>
                    {
                        (instructors) ?
                            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
                                {
                                    (instructors) &&
                                    instructors.slice(0, 6).map(item => <PopularInstructor key={item._id} item={item}></PopularInstructor>)
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

export default PopularInstructors;