
const PaymentRow = ({ item, index, handleDeletePayment }) => {

    const { _id, payment_status, payment_trxID, payment_method_id, payment_amount, payment_currency, payment_info, payment_method_type, client_secret, student_name, student_email, paid_classes } = item;

    return (
        <tr>
            <td>
                <label>
                    <p>{index}</p>
                </label>
            </td>
            <td>
                <div className="font-bold uppercase">{payment_info?.brand}</div>
            </td>
            <td>
                <div>
                    <div className="text-success">{payment_status}</div>
                    <div className="text-sm opacity-50"> {payment_amount} <span className="uppercase">{payment_currency}</span></div>
                </div>
            </td>
            <td>
                <span className="text-xs">TrxID:</span>
                <span className="ml-2 badge badge-ghost badge-sm">{payment_trxID}</span>
                <br />
                <span className="text-xs text-neutral">Student Email: {student_email}</span>
            </td>
            <td>
                <button onClick={() => handleDeletePayment(_id)} className="btn btn-error btn-xs">Delete</button>
            </td>
        </tr>
    );
};

export default PaymentRow;