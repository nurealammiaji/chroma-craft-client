import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useEnrolled from '../../../../hooks/useEnrolled';

const EnrolledRow = ({ item, index }) => {

    const { _id, class_id, class_title, class_price, class_image, class_duration, category_name, instructor_name, instructor_email } = item;

    const [, refetchEnrolled] = useEnrolled();

    const handleDeleteClass = (_id) => {
        console.log("Delete: ", _id);
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to delete this class",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ff675b",
            cancelButtonColor: "#16a34a",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://chroma-craft-server.vercel.app/enrolled/${_id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        refetchEnrolled();
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Deleted Successfully !!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        });
    }

    return (
        <tr>
            <td>
                <label>
                    <p>{index}</p>
                </label>
            </td>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="w-12 h-12 mask mask-squircle">
                            <img src={class_image} alt={`Class Image`} />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{class_title}</div>
                        <div className="text-sm opacity-50">Price: $ {class_price}</div>
                    </div>
                </div>
            </td>
            <td>
                <span className="text-xs">Category:</span>
                <span className="ml-1 badge badge-ghost badge-sm">{category_name}</span>
                <br />
                <span className="text-xs">Instructor:</span>
                <span className="ml-1 text-xs text-neutral">{instructor_name}</span>
            </td>
            <td>
                <Link to={`/classes/${class_id}`} className="w-auto btn btn-xs btn-info">Start</Link>
            </td>
            <td>
                <button className="w-auto btn btn-xs btn-neutral">Review</button>
            </td>
            <th>
                <button onClick={() => handleDeleteClass(_id)} className="btn btn-error btn-xs">Delete</button>
            </th>
        </tr>
    );
};

export default EnrolledRow;