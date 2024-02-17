import { Link } from "react-router-dom";

const InstructorRow = ({ item, index }) => {

    const { instructor, instructor_id, instructor_image, instructor_email, category_name, total_classes } = item;

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
                            <img src={instructor_image} alt={`Instructor Image`} />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{instructor}</div>
                        <div className="text-sm opacity-50">Classes: {total_classes}</div>
                    </div>
                </div>
            </td>
            <td>
                <span className="text-xs">Expertise:</span>
                <span className="ml-2 badge badge-ghost badge-sm">{category_name}</span>
                <br />
                <span className="text-xs text-neutral">{instructor_email}</span>
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

export default InstructorRow;