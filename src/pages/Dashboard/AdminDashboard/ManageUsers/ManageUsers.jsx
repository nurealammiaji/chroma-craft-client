import { Helmet } from "react-helmet-async";
import SectionHeader from "../../../../components/SectionHeader/SectionHeader";
import shape from "../../../../assets/6.png"
import { DNA } from "react-loader-spinner";
import UserRow from "./UserRow";
import useUsers from "../../../../hooks/useUsers";
import { useState } from "react";

const ManageUsers = () => {

    const [users, refetchUsers] = useUsers();
    const [userInfo, setUserInfo] = useState({});

    const handleUserEditModal = async (email) => {
        document.getElementById('edit_user').showModal()
        await fetch(`https://chroma-craft-server.vercel.app/users/${email}`)
            .then(res => res.json())
            .then(data => setUserInfo(data))
    }

    const handleUpdateUser = async (event) => {
        event.preventDefault();
        const form = event.target;
        console.log(form);
    }

    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Manage Users || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
            <div className="w-screen p-5 md:w-full">
                <div className="mt-5">
                    <SectionHeader title={"Manage Users"} background={shape}></SectionHeader>
                </div>
                <br /><br />
                <div className="overflow-x-auto">
                    {
                        (users) ?
                            <table className="table bg-white">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>SN</th>
                                        <th>User</th>
                                        <th>Information</th>
                                        <th>Role</th>
                                        <th>Action</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row */}
                                    {
                                        (users) &&
                                        users.map((item, index) => <UserRow key={item._id} index={index + 1} item={item} handleUserEdit={handleUserEditModal} ></UserRow>)
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
                    <h4 className="p-4 font-medium text-neutral badge badge-outline">Users: {users?.length}</h4>
                    <button onClick={() => document.getElementById('add_user').showModal()} className="mt-5 md:mt-0 btn btn-sm btn-secondary">Add User</button>
                </div>
                <dialog id="edit_user" className="modal">
                    <div className="modal-box">
                        <h3 className="text-lg font-bold">Edit User !</h3>
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="absolute btn btn-sm btn-circle btn-error right-2 top-2">✕</button>
                        </form>
                        <form onSubmit={handleUpdateUser}>
                            <label className="flex items-center gap-2 input input-bordered">
                                <span className="font-semibold">Name :</span>
                                <input type="text" name="name" className="grow bg-base-100" placeholder={userInfo.name} defaultValue={userInfo.name} />
                            </label>
                            <br />
                            <label className="flex items-center gap-2 input input-bordered">
                                <span className="font-semibold">Email :</span>
                                <input type="email" name="email" className="grow bg-base-100" placeholder={userInfo.email} defaultValue={userInfo.email} />
                            </label>
                            <br />
                            <label className="flex items-center gap-2 input input-bordered">
                                <span className="font-semibold">Photo :</span>
                                <input type="url" name="image" className="grow bg-base-100" placeholder={userInfo.image} defaultValue={userInfo.image} />
                            </label>
                            <br />
                            <label className="flex items-center gap-2 input input-bordered">
                                <span className="font-semibold">DOB :</span>
                                <input type="date" name="dob" className="grow bg-base-100" value={userInfo.dob ? userInfo.dob : false} />
                            </label>
                            <br />
                            <label className="flex items-center gap-2 input input-bordered">
                                <span className="font-semibold">Role :</span>
                                <select name="role" value={userInfo.role} className="grow bg-base-100" id="">
                                    <option value="admin">Admin</option>
                                    <option value="instructor">Instructor</option>
                                    <option value="student">Student</option>
                                </select>
                            </label>
                            <br /><br />
                            <div className="text-center">
                                <button type="submit" className="btn btn-success">Update</button>
                            </div>
                        </form>
                    </div>
                </dialog>
                <dialog id="add_user" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
                        </form>
                        <h3 className="text-lg font-bold">Add User!</h3>
                        <p className="py-4">Press ESC key or click on ✕ button to close</p>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default ManageUsers;