import { Link } from "react-router-dom";

const StudentRow = ({ item, index }) => {

    const { name, email, image, gender, dob } = item;

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
                            <img src={image} alt={`Student Image`} />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{name}</div>
                        <div className="text-sm opacity-50">{gender}</div>
                    </div>
                </div>
            </td>
            <td>
                <span className="text-xs">DOB:</span>
                <span className="ml-2 badge badge-ghost badge-sm">{dob}</span>
                <br />
                <span className="text-xs text-neutral">{email}</span>
            </td>
            <td>
                <Link to={"/dashboard/admin/instructor-details"} className="btn btn-xs btn-neutral">Edit</Link>
            </td>
            <th>
                <button className="btn btn-error btn-xs">Delete</button>
            </th>
        </tr>
    );
};

export default StudentRow;