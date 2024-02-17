import { Link } from "react-router-dom";

const StudentRow = ({ item, index }) => {

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
                            <img src={""} alt={`Instructor Image`} />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{}</div>
                        <div className="text-sm opacity-50">Classes: {}</div>
                    </div>
                </div>
            </td>
            <td>
                <span className="text-xs">Expertise:</span>
                <span className="ml-2 badge badge-ghost badge-sm">{}</span>
                <br />
                <span className="text-xs text-neutral">{}</span>
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