import { Link } from "react-router-dom";
import useClasses from "../../../../hooks/useClasses";

const InstructorRow = ({ item, index, deleteInstructor }) => {

    const { instructor, instructor_id, instructor_image, instructor_email, category_name, total_classes } = item;

    const [classes] = useClasses();

    let instructorClasses;
    if (classes) {
        instructorClasses = classes.filter(item => item.instructor_email === instructor_email && item.status === "approved");
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
                            <img src={instructor_image} alt={`Instructor Image`} />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{instructor}</div>
                    </div>
                </div>
            </td>
            <td>
                <span className="text-xs">Classes: </span>
                <Link to={`/instructors/${instructor_id}`} className="text-sm font-bold opacity-50 badge badge-secondary">{instructorClasses?.length}</Link>
                <br />
                <span className="text-xs text-neutral">{instructor_email}</span>
            </td>
            <td>
                <Link to={"/dashboard/admin/instructor-details"} className="btn btn-xs btn-neutral">Edit</Link>
            </td>
            <th>
                <button onClick={() => deleteInstructor(instructor_email)} className="btn btn-error btn-xs">Delete</button>
            </th>
        </tr>
    );
};

export default InstructorRow;