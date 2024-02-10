import { useEffect, useState } from "react";
import shape from "../../../assets/6.png";
import InstructorItem from './InstructorItem';
import { DNA } from "react-loader-spinner";


const PopularInstructors = () => {

    const [instructors, setInstructors] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/instructors')
            .then(res => res.json())
            .then(data => setInstructors(data))
    }, [])

    return (
        <div>
            <div>
                <div className="text-center" style={{ background: `url(${shape}) center no-repeat` }}>
                    <h3 className="py-5 text-4xl font-semibold text-white">Popular Instructors</h3>
                </div>
                <br /><br />
                <div>
                    {
                        (instructors) ?
                            <div className="grid gap-5 md:grid-cols-3">
                                {
                                    (instructors) &&
                                    instructors.slice(0, 6).map(item => <InstructorItem key={item._id} item={item}></InstructorItem>)
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