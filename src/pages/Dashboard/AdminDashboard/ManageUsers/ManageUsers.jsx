import { Helmet } from "react-helmet-async";
import SectionHeader from "../../../../components/SectionHeader/SectionHeader";
import { DNA } from "react-loader-spinner";
import UserRow from "./UserRow";
import { useState } from "react";
import { TbUser, TbUserEdit } from 'react-icons/tb';
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useUsers from '../../../../hooks/useUsers';
import useInstructors from "../../../../hooks/useInstructors";

const ManageUsers = () => {

    const { register: register1, handleSubmit: handleSubmit1, watch: watch1, reset: reset1, formState: { errors: errors1 } } = useForm();

    const { register: register2, handleSubmit: handleSubmit2, watch: watch2, reset: reset2, formState: { errors: errors2 } } = useForm();

    const [users, refetchUsers] = useUsers();
    const [userInfo, setUserInfo] = useState({});
    const [instructors, refetchInstructors] = useInstructors();

    const role = watch1("role1");

    const deleteUser = (_id) => {
        console.log("delete", _id);
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to delete this user",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ff675b",
            cancelButtonColor: "#16a34a",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://chroma-craft-server.vercel.app/users/${_id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(result => {
                        console.log(result);
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Deleted Successfully !!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetchUsers();
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        });
    }

    const updateUser = (data) => {
        const user = {
            name: data.name1,
            email: data.email1,
            phone: data.phone1,
            image: data.image1,
            gender: data.gender1,
            dob: data.dob1,
            role: data.role1
        }
        console.log({ user });
        if (role === 'instructor') {
            const instructor = {
                instructor_id: instructors?.length + 1,
                instructor: data.name1,
                instructor_email: data.email1,
                instructor_image: data.image1
            }
            console.log({ instructor });
            fetch('https://chroma-craft-server.vercel.app/instructors', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(instructor)
            })
                .then(result => {
                    console.log(result);
                    refetchInstructors();
                })
                .catch(error => {
                    console.log(error);
                })
            fetch(`https://chroma-craft-server.vercel.app/users/${userInfo._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
                .then(result => {
                    console.log(result);
                    Swal.fire({
                        target: document.getElementById("edit_user"),
                        position: "center",
                        icon: "success",
                        title: "Updated Successfully !!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetchUsers();
                    reset1();
                })
                .catch(error => {
                    console.log(error);
                })
        } else {
            fetch(`https://chroma-craft-server.vercel.app/users/${userInfo._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
                .then(result => {
                    console.log(result);
                    Swal.fire({
                        target: document.getElementById("edit_user"),
                        position: "center",
                        icon: "success",
                        title: "Updated Successfully !!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetchUsers();
                    reset1();
                })
                .catch(error => {
                    console.log(error);
                })
        }
    };

    const addUser = (data) => {
        const user = {
            name: data.name2,
            email: data.email2,
            phone: data.phone2,
            image: data.image2,
            gender: data.gender2,
            dob: data.dob2,
            role: data.role2
        }
        fetch('https://chroma-craft-server.vercel.app/users', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(result => {
                console.log(result);
                Swal.fire({
                    target: document.getElementById("add_user"),
                    position: "center",
                    icon: "success",
                    title: "Added Successfully !!",
                    showConfirmButton: false,
                    timer: 1500
                });
                refetchUsers();
                reset2();
            })
            .catch(error => {
                console.log(error);
            })
    };

    const handleEditUserModal = (email) => {
        const clickedUser = users.find(item => item.email === email);
        setUserInfo(clickedUser);
        document.getElementById('edit_user').showModal()
    }

    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Manage Users || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
            <div className="w-screen p-5 md:w-full">
                <div className="mt-5">
                    <SectionHeader title={"Manage Users"} ></SectionHeader>
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
                                        users.map((item, index) => <UserRow key={item._id} index={index + 1} item={item} handleEditUser={handleEditUserModal} deleteUser={deleteUser} ></UserRow>)
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
                            <span><TbUserEdit className="text-2xl font-bold" /></span>
                            <h3 className="ml-3 text-xl font-bold"> Edit User</h3>
                        </div>
                        <form method="dialog">
                            <button className="absolute btn btn-sm btn-circle btn-error right-2 top-2">✕</button>
                        </form>
                        <form onSubmit={handleSubmit1(updateUser)}>
                            <label className="flex items-center gap-2 input input-bordered">
                                <span className="w-full font-semibold md:w-fit">Name : </span>
                                <input defaultValue={userInfo.name} {...register1("name1", { required: true })} type="text" name="name1" className="w-full grow bg-base-100 md:w-fit" placeholder={userInfo.name} />
                            </label>
                            {errors1.name1?.type === 'required' && <label className="label">
                                <span className="text-error">Name is required !!</span>
                            </label>}
                            <br />
                            <label className="flex items-center gap-2 input input-bordered">
                                <span className="w-full font-semibold md:w-fit">Email : </span>
                                <input type="email" name="email1" className="w-full grow bg-base-100 md:w-fit" placeholder={userInfo?.email} defaultValue={userInfo?.email} {...register1("email1", { required: true })} />
                            </label>
                            {errors1.email1?.type === 'required' && <label className="label">
                                <span className="text-error">Email is required !!</span>
                            </label>}
                            <br />
                            <label className="flex items-center gap-2 input input-bordered">
                                <span className="w-full font-semibold md:w-fit">Phone : </span>
                                <input type="text" name="phone1" className="w-full grow bg-base-100 md:w-fit" placeholder={userInfo?.phone} defaultValue={userInfo?.phone} {...register1("phone1", { required: true })} />
                            </label>
                            {errors1.phone1?.type === 'required' && <label className="label">
                                <span className="text-error">Phone is required !!</span>
                            </label>}
                            <br />
                            <label className="flex items-center gap-2 input input-bordered">
                                <span className="w-full font-semibold md:w-fit">Image : </span>
                                <input type="url" name="image1" className="w-full grow bg-base-100 md:w-fit" placeholder={userInfo?.image} defaultValue={userInfo?.image} {...register1("image1", { required: true })} />
                            </label>
                            {errors1.image1?.type === 'required' && <label className="label">
                                <span className="text-error">Image is required !!</span>
                            </label>}
                            <br />
                            <label className="flex items-center gap-2 input input-bordered">
                                <span className="w-full font-semibold md:w-fit">Gender : (<span className="text-warning">{userInfo?.gender}</span>)</span>
                                <select name="gender1" defaultValue={userInfo?.gender} className="w-full grow bg-base-100 md:w-fit" {...register1("gender1", { required: true })}>
                                    <option value="">select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="third">Third</option>
                                </select>
                            </label>
                            {errors1.gender1?.type === 'required' && <label className="label">
                                <span className="text-error">Gender is required !!</span>
                            </label>}
                            <br />
                            <label className="flex items-center gap-2 input input-bordered">
                                <span className="w-full font-semibold md:w-fit">DOB : </span>
                                <input type="date" name="dob1" className="w-full grow bg-base-100 md:w-fit" defaultValue={userInfo?.dob ? userInfo?.dob : false} {...register1("dob1", { required: true })} />
                            </label>
                            {errors1.dob1?.type === 'required' && <label className="label">
                                <span className="text-error">DOB is required !!</span>
                            </label>}
                            <br />
                            <label className="flex items-center gap-2 input input-bordered">
                                <span className="w-full font-semibold md:w-fit">Role : (<span className="text-warning">{userInfo?.role}</span>)</span>
                                <select name="role1" defaultValue={userInfo?.role} className="w-full grow bg-base-100 md:w-fit" {...register1("role1", { required: true })}>
                                    <option value="">select role</option>
                                    <option value="admin">Admin</option>
                                    <option value="instructor">Instructor</option>
                                    <option value="student">Student</option>
                                </select>
                            </label>
                            {errors1.role1?.type === 'required' && <label className="label">
                                <span className="text-error">Role is required !!</span>
                            </label>}
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
                            <h3 className="ml-3 text-xl font-bold">Add User</h3>
                        </div>
                        <form method="dialog">
                            <button className="absolute btn btn-sm btn-circle btn-error right-2 top-2">✕</button>
                        </form>
                        <form onSubmit={handleSubmit2(addUser)}>
                            <label className="flex items-center gap-2 input input-bordered">
                                <span className="w-full font-semibold md:w-fit">Name : </span>
                                <input {...register2("name2", { required: true })} type="text" name="name2" className="w-full grow bg-base-100 md:w-fit" placeholder="type name here" />
                            </label>
                            {errors2.name2?.type === 'required' && <label className="label">
                                <span className="text-error">Name is required !!</span>
                            </label>}
                            <br />
                            <label className="flex items-center gap-2 input input-bordered">
                                <span className="w-full font-semibold md:w-fit">Email : </span>
                                <input type="email" name="email2" className="w-full grow bg-base-100 md:w-fit" placeholder="type email here" {...register2("email2", { required: true })} />
                            </label>
                            {errors2.email2?.type === 'required' && <label className="label">
                                <span className="text-error">Email is required !!</span>
                            </label>}
                            <br />
                            <label className="flex items-center gap-2 input input-bordered">
                                <span className="w-full font-semibold md:w-fit">Phone : </span>
                                <input type="text" name="phone2" className="w-full grow bg-base-100 md:w-fit" placeholder="type phone here" {...register2("phone2", { required: true })} />
                            </label>
                            {errors2.phone2?.type === 'required' && <label className="label">
                                <span className="text-error">Phone is required !!</span>
                            </label>}
                            <br />
                            <label className="flex items-center gap-2 input input-bordered">
                                <span className="w-full font-semibold md:w-fit">Image : </span>
                                <input type="url" name="image2" className="w-full grow bg-base-100 md:w-fit" placeholder="type image url here" {...register2("image2", { required: true })} />
                            </label>
                            {errors2.image2?.type === 'required' && <label className="label">
                                <span className="text-error">Image is required !!</span>
                            </label>}
                            <br />
                            <label className="flex items-center gap-2 input input-bordered">
                                <span className="w-full font-semibold md:w-fit">Gender : </span>
                                <select name="gender2" className="w-full grow bg-base-100 md:w-fit" {...register2("gender2", { required: true })}>
                                    <option value="">select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="third">Third</option>
                                </select>
                            </label>
                            {errors2.gender2?.type === 'required' && <label className="label">
                                <span className="text-error">Gender is required !!</span>
                            </label>}
                            <br />
                            <label className="flex items-center gap-2 input input-bordered">
                                <span className="w-full font-semibold md:w-fit">DOB : </span>
                                <input type="date" name="dob2" className="w-full grow bg-base-100 md:w-fit" defaultValue={userInfo.dob ? userInfo.dob : false} {...register2("dob2", { required: true })} />
                            </label>
                            {errors2.dob2?.type === 'required' && <label className="label">
                                <span className="text-error">DOB is required !!</span>
                            </label>}
                            <br />
                            <label className="flex items-center gap-2 input input-bordered">
                                <span className="w-full font-semibold md:w-fit">Role : </span>
                                <select name="role2" className="w-full grow bg-base-100 md:w-fit" {...register2("role2", { required: true })} >
                                    <option value="">select role</option>
                                    <option value="admin">Admin</option>
                                    <option value="instructor">Instructor</option>
                                    <option value="student">Student</option>
                                </select>
                            </label>
                            {errors2.role2?.type === 'required' && <label className="label">
                                <span className="text-error">Role is required !!</span>
                            </label>}
                            <br /><br />
                            <div className="text-center">
                                <button type="submit" className="btn btn-success">Add</button>
                            </div>
                        </form>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default ManageUsers;