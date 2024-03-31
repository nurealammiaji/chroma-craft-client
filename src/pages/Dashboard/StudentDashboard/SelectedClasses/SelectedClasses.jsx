import { Helmet } from "react-helmet-async";
import { DNA } from "react-loader-spinner";
import { Link } from "react-router-dom";
import shape from "../../../../assets/6.png"
import SelectedRow from './SelectedRow';
import useSelected from "../../../../hooks/useSelected";
import SectionHeader from '../../../../components/SectionHeader/SectionHeader';

const SelectedClass = () => {

    const [selected] = useSelected();
    let totalAmount = 0;

    if (selected) {
        totalAmount = parseFloat(selected?.reduce((total, item) => total + item.class_price, 0).toFixed(2));
    }

    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Selected Classes || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
            <div className="w-screen p-5 md:w-full">
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
                                        selected.map((item, index) => <SelectedRow key={item._id} index={index + 1} item={item}></SelectedRow>)
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
                        <h4 className="p-4 font-medium text-neutral badge badge-outline">Selected Class: {selected?.length}</h4>
                    </div>
                    <div className="my-5 md:my-0">
                        <h4 className="p-4 font-medium text-neutral badge badge-success badge-outline">Total: $ {totalAmount}</h4>
                    </div>
                    <div>
                        {
                            (selected?.length === 0) ?
                                <Link to={"/classes"}>
                                    <button className="mt-5 md:mt-0 btn btn-sm btn-secondary">Select Class</button>
                                </Link> :
                                <Link to={"/dashboard/payment"}>
                                    <button className="mt-5 md:mt-0 btn btn-sm btn-secondary" disabled={(selected?.length === 0) ? true : false}>Pay Now</button>
                                </Link>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectedClass;