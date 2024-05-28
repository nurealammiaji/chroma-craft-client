import { Link } from "react-router-dom";

const ClassRow = ({ item, index, handleEditClassModal, handleDeleteClass }) => {

    const { _id, title, price, image, duration, category_name, category_id, instructor, instructor_id, instructor_email, status } = item;

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
                <button onClick={() => handleDeleteClass(_id)} className="btn btn-error btn-xs">Delete</button>
            </th>
        </tr>
    );
};

export default ClassRow;