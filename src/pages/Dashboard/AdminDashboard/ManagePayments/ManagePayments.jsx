import { Helmet } from 'react-helmet-async';
import usePayments from '../../../../hooks/usePayments';
import SectionHeader from '../../../../components/SectionHeader/SectionHeader';
import PaymentRow from './PaymentRow';
import { DNA } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ManagePayments = () => {

    const [payments, refetchPayments] = usePayments();

    const handleDeletePayment = (id) => {
        console.log("delete", id);
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to delete this payment",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ff675b",
            cancelButtonColor: "#16a34a",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://chroma-craft-server.vercel.app/payments/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(result => {
                        console.log(result);
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Deleted Successfully !!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetchPayments();
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        });
    }

    return (
        <div>
            <Helmet>
                <title>Manage Payments || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
            <div className="w-screen p-5 md:w-full">
                <div className="mt-5">
                    <SectionHeader title={"Manage Payments"} ></SectionHeader>
                </div>
                <br /><br />
                <div className="overflow-x-auto">
                    {
                        (payments) ?
                            <table className="table bg-white">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>SN</th>
                                        <th>Method</th>
                                        <th>Status</th>
                                        <th>Information</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row */}
                                    {
                                        (payments) &&
                                        payments.map((item, index) => <PaymentRow key={item._id} index={index + 1} item={item} handleDeletePayment={handleDeletePayment}></PaymentRow>)
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
                    <h4 className="p-4 font-medium text-neutral badge badge-outline">Payments: {payments?.length}</h4>
                    <Link to={"/dashboard/admin/add-instructor"} className="mt-5 md:mt-0 btn btn-sm btn-secondary">Add Payment</Link>
                </div>
            </div>
        </div>
    );
};

export default ManagePayments;