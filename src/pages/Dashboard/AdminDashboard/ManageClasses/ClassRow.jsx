import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useClasses from "../../../../hooks/useClasses";

const ClassRow = ({ item, index, handleEditClassModal }) => {

    const { _id, title, price, image, duration, category_name, category_id, instructor, instructor_id, instructor_email, status } = item;

    const [, refetchClasses] = useClasses();

    const handleDelete = (_id) => {
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
                fetch(`https://chroma-craft-server.vercel.app/classes/${_id}`, {
                    method: "DELETE",
                })
                    .then(result => {
                        console.log(result);
                        refetchClasses();
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
                            <img src={image} alt={`Class Image`} />
                        </div>
                    </div>
                    <div>
                        <Link to={`/classes/${_id}`} className="font-bold">{title}</Link>
                        <div className="text-sm opacity-50">Price: $ {price}</div>
                    </div>
                </div>
            </td>
            <td>
                <span className="text-xs">Category:</span>
                <Link to={`/categories/${category_id}`} className="ml-1 badge badge-ghost badge-sm">{category_name}</Link>
                <br />
                <span className="text-xs">Instructor:</span>
                <Link to={`/instructors/${instructor_id}`} className="ml-1 text-xs text-neutral">{instructor}</Link>
            </td>
            <td>
                <button className="btn btn-xs btn-info">{status}</button>
            </td>
            <td>
                <button onClick={() => handleEditClassModal(_id)} className="btn btn-xs btn-neutral">Edit</button>
            </td>
            <th>
                <button onClick={() => handleDelete(_id)} className="btn btn-error btn-xs">Delete</button>
            </th>
        </tr>
    );
};

export default ClassRow;