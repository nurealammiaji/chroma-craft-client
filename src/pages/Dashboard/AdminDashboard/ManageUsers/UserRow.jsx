const UserRow = ({ item, index, handleEditUser, deleteUser }) => {

    const { _id, name, email, image, gender, dob, role } = item;

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
                <p className="badge badge-accent">{role}</p>
            </td>
            <td>
                <button onClick={() => handleEditUser(email)} className="btn btn-xs btn-neutral">Edit</button>
            </td>
            <td>
                <button onClick={() => deleteUser(_id)} className="btn btn-error btn-xs">Delete</button>
            </td>
        </tr>
    );
};

export default UserRow;