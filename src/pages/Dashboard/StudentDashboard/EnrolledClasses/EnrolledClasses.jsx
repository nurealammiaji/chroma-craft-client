import { Helmet } from "react-helmet-async";
import { DNA } from "react-loader-spinner";
import { Link } from "react-router-dom";
import shape from "../../../../assets/6.png"
import EnrolledRow from './EnrolledRow';
import SectionHeader from '../../../../components/SectionHeader/SectionHeader';
import useEnrolled from '../../../../hooks/useEnrolled';

const EnrolledClass = () => {

    const [enrolled] = useEnrolled();
    let totalAmount = 0;

    if (enrolled) {
        totalAmount = enrolled?.reduce((total, item) => total + item.class_price, 0);
    }

    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Enrolled Classes || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
            <div className="w-screen p-5 md:w-full">
                <div className="mt-5">
                    <SectionHeader title={"Enrolled Classes"} background={shape}></SectionHeader>
                </div>
                <br /><br />
                <div className="overflow-x-auto">
                    {
                        (enrolled) ?
                            <table className="table bg-white">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>SN</th>
                                        <th>Student</th>
                                        <th>Information</th>
                                        <th>Action</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row */}
                                    {
                                        (enrolled) &&
                                        enrolled.map((item, index) => <EnrolledRow key={item._id} index={index + 1} item={item}></EnrolledRow>)
                                    }
                                </tbody>
                            </table> :
                            <>
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
                <br /><br />
                <div className="flex-row items-center justify-between text-center md:flex">
                    <div>
                        <h4 className="p-4 font-medium text-neutral badge badge-outline">Enrolled Class: {enrolled?.length}</h4>
                    </div>
                    <div className="my-5 md:my-0">
                        <h4 className="p-4 font-medium text-neutral badge badge-success badge-outline">Total: $ {totalAmount.toFixed(2)}</h4>
                    </div>
                    <div>
                        <Link to={"/dashboard/start"} className="mt-5 md:mt-0 btn btn-sm btn-secondary">Start Now</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnrolledClass;