import { useEffect, useState } from "react";
import shape from "../../../assets/6.png";
import { DNA } from "react-loader-spinner";
import ClassItem from "./ClassItem";

const PopularClasses = () => {

    const [classes, setClasses] = useState();

    useEffect(() => {
        fetch('http://localhost:5000/classes')
            .then(res => res.json())
            .then(data => setClasses(data))
    }, [])

    return (
        <div>
            <div className="text-center" style={{ background: `url(${shape}) center no-repeat` }}>
                <h3 className="py-5 text-4xl font-semibold text-white">Popular Classes</h3>
            </div>
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