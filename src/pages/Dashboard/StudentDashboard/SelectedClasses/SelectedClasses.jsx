import { Helmet } from "react-helmet-async";
import { DNA } from "react-loader-spinner";
import { Link } from "react-router-dom";
import SectionHeader from "../../../../components/SectionHeader/SectionHeader";
import shape from "../../../../assets/6.png"
import ClassRow from './ClassRow';
import useSelected from "../../../../hooks/useSelected";

const SelectedClass = () => {

    const [selected] = useSelected();
    let totalAmount = selected?.reduce((total, item) => total + item.class_price, 0);
    console.log(totalAmount.toFixed(2));

    return (
        <div>
            <Helmet>
                <title>Selected Classes || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
            <div className="w-screen min-h-screen mx-auto md:w-11/12">
                <div className="mt-5">
                    <SectionHeader title={"Selected Classes"} background={shape}></SectionHeader>
                </div>
                <br /><br />
                <div className="overflow-x-auto">
                    {
                        (selected) ?
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
                                        (selected) &&
                                        selected.map((item, index) => <ClassRow key={item._id} index={index + 1} item={item}></ClassRow>)
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
                    <h4 className="p-4 font-medium text-neutral badge badge-outline">Selected Class: {selected?.length}</h4>
                    <h4 className="p-4 font-medium text-neutral badge badge-success badge-outline">Total: $ {totalAmount.toFixed(2)}</h4>
                    <Link to={"/payment"} className="mt-5 md:mt-0 btn btn-sm btn-secondary">Pay Now</Link>
                </div>
            </div>
        </div>
    );
};

export default SelectedClass;