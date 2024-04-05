import { Helmet } from "react-helmet-async";
import SectionHeader from "../../../../components/SectionHeader/SectionHeader";
import shape from "../../../../assets/6.png"
import { DNA } from "react-loader-spinner";
import UserRow from "./UserRow";
import useUsers from "../../../../hooks/useUsers";
import { useState } from "react";
import { TbUser } from 'react-icons/tb';

const ManageUsers = () => {

    const [users, refetchUsers] = useUsers();
    const [userInfo, setUserInfo] = useState({});

    const handleEditUserModal = async (email) => {
        const clickedUser = users.find(item => item.email === email);
        setUserInfo(clickedUser);
        document.getElementById('edit_user').showModal()
    }

    const handleUpdateUser = async (event) => {
        event.preventDefault();
        const form = event.target;
        const currentUser = {
            name: form.name.value,
            email: form.email.value,
            phone: form.phone.value,
            image: form.image.value,
            gender: form.gender.value,
            dob: form.dob.value,
            role: form.role.value
        }
        console.log(currentUser);
    }

    const handleAddUser = async (event) => {
        event.preventDefault();
        const form = event.target;
        const currentUser = {
            name: form.name.value,
            email: form.email.value,
            phone: form.phone.value,
            image: form.image.value,
            gender: form.gender.value,
            dob: form.dob.value,
            role: form.role.value
        }
        console.log(currentUser);
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
                                        users.map((item, index) => <UserRow key={item._id} index={index + 1} item={item} handleUserEdit={handleEditUserModal} ></UserRow>)
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
                        <div className="flex items-center">
                            <span><TbUser className="text-2xl font-bold" /></span>
                            <h3 className="ml-3 text-xl font-bold"> Edit User</h3>
                        </div>
                        <form method="dialog">
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
                                <span className="font-semibold">Phone :</span>
                                <input type="text" name="phone" className="grow bg-base-100" placeholder={userInfo.phone} defaultValue={userInfo.phone} />
                            </label>
                            <br />
                            <label className="flex items-center gap-2 input input-bordered">
                                <span className="font-semibold">Image :</span>
                                <input type="url" name="image" className="grow bg-base-100" placeholder={userInfo.image} defaultValue={userInfo.image} />
                            </label>
                            <br />
                            <label className="flex items-center gap-2 input input-bordered">
                                <span className="font-semibold">Gender :</span>
                                <select name="gender" value={userInfo.gender ? userInfo.gender : false} className="grow bg-base-100">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="third">Third</option>
                                </select>
                            </label>
                            <br />
                            <label className="flex items-center gap-2 input input-bordered">
                                <span className="font-semibold">DOB :</span>
                                <input type="date" name="dob" className="grow bg-base-100" value={userInfo.dob ? userInfo.dob : false} />
                            </label>
                            <br />
                            <label className="flex items-center gap-2 input input-bordered">
                                <span className="font-semibold">Role :</span>
                                <select name="role" value={userInfo.role} className="grow bg-base-100">
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
                        <div className="flex items-center">
                            <span><TbUser className="text-2xl font-bold" /></span>
                            <h3 className="ml-3 text-xl font-bold"> Add User</h3>
                        </div>
                        <form method="dialog">
                            <button className="absolute btn btn-sm btn-circle btn-error right-2 top-2">✕</button>
                        </form>
                        <form onSubmit={handleAddUser}>
                            <label className="flex items-center gap-2 input input-bordered">
                                <span className="font-semibold">Name :</span>
                                <input type="text" name="name" className="grow bg-base-100" placeholder="type name here" />
                            </label>
                            <br />
                            <label className="flex items-center gap-2 input input-bordered">
                                <span className="font-semibold">Email :</span>
                                <input type="email" name="email" className="grow bg-base-100" placeholder="type email here" />
                            </label>
                            <br />
                            <label className="flex items-center gap-2 input input-bordered">
                                <span className="font-semibold">Phone :</span>
                                <input type="text" name="phone" className="grow bg-base-100" placeholder="type phone here" />
                            </label>
                            <br />
                            <label className="flex items-center gap-2 input input-bordered">
                                <span className="font-semibold">Image :</span>
                                <input type="url" name="image" className="grow bg-base-100" placeholder="type image url here" />
                            </label>
                            <br />
                            <label className="flex items-center gap-2 input input-bordered">
                                <span className="font-semibold">Gender :</span>
                                <select name="gender" className="grow bg-base-100">
                                    <option disabled selected>Please Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="third">Third</option>
                                </select>
                            </label>
                            <br />
                            <label className="flex items-center gap-2 input input-bordered">
                                <span className="font-semibold">DOB :</span>
                                <input type="date" name="dob" className="grow bg-base-100" value={userInfo.dob ? userInfo.dob : false} />
                            </label>
                            <br />
                            <label className="flex items-center gap-2 input input-bordered">
                                <span className="font-semibold">Role :</span>
                                <select name="role" className="grow bg-base-100">
                                    <option disabled selected>Please Select</option>
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
            </div>
        </div>
    );
};

export default ManageUsers;