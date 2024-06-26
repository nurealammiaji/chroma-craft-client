import { Helmet } from "react-helmet-async";
import useStudents from '../../../../hooks/useStudents';
import SectionHeader from "../../../../components/SectionHeader/SectionHeader";
import { DNA } from "react-loader-spinner";
import StudentRow from './StudentRow';
import { TbUser, TbUserEdit } from "react-icons/tb";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ManageStudents = () => {

    const [students, refetchStudents] = useStudents();
    const [studentInfo, setStudentInfo] = useState({});

    const axiosSecure = useAxiosSecure();

    const { register: register1, handleSubmit: handleSubmit1, watch: watch1, reset: reset1, formState: { errors: errors1 } } = useForm();

    const { register: register2, handleSubmit: handleSubmit2, watch: watch2, reset: reset2, formState: { errors: errors2 } } = useForm();

    const deleteStudent = (email) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to delete this user",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ff675b",
            cancelButtonColor: "#16a34a",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/students/${email}`)
                console.log(res.data);
                if (res.data) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Deleted Successfully !!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetchStudents();
                }
            }
        });
    }

    const updateStudent = async (data) => {
        const student = {
            name: data.name1,
            email: data.email1,
            phone: data.phone1,
            image: data.image1,
            gender: data.gender1,
            dob: data.dob1,
            role: data.role1
        }
        console.log("update", student);
        const res = await axiosSecure.patch(`/students/${studentInfo._id}`, student)
        console.log(res.data);
        if (res.data) {
            Swal.fire({
                target: document.getElementById("edit_student"),
                position: "center",
                icon: "success",
                title: "Updated Successfully !!",
                showConfirmButton: false,
                timer: 1500
            });
            reset1();
            refetchStudents();
        }
    };

    const addStudent = async (data) => {
        const student = {
            name: data.name2,
            email: data.email2,
            phone: data.phone2,
            image: data.image2,
            gender: data.gender2,
            dob: data.dob2,
            role: data.role2
        }
        console.log(student);
        const res = await axiosSecure.post('/students', student)
        console.log(res.data);
        if (res.data) {
            Swal.fire({
                target: document.getElementById("add_student"),
                position: "center",
                icon: "success",
                title: "Added Successfully !!",
                showConfirmButton: false,
                timer: 1500
            });
            reset2();
            refetchStudents();
        }
    };

    const handleEditStudentModal = (email) => {
        const clickedUser = students.find(item => item.email === email);
        setStudentInfo(clickedUser);
        document.getElementById('edit_student').showModal()
    }

    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Manage Students || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
            <div className="w-screen p-5 md:w-full">
                <div className="mt-5">
                    <SectionHeader title={"Manage Students"} ></SectionHeader>
                </div>
                <br /><br />
                <div className="overflow-x-auto">
                    {
                        (students) ?
                            <table className="table bg-white">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>SN</th>
                                        <th>Student</th>
                                        <th>Information</th>
                                        <th>Action</th>
                                        <th>Action</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row */}
                                    {
                                        (students) &&
                                        students.map((item, index) => <StudentRow key={item._id} index={index + 1} item={item} deleteStudent={deleteStudent} handleEditStudentModal={handleEditStudentModal} ></StudentRow>)
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
                <div>
                    <dialog id="edit_student" className="modal">
                        <div className="modal-box">
                            <div className="flex items-center">
                                <span><TbUserEdit className="text-2xl font-bold" /></span>
                                <h3 className="ml-3 text-xl font-bold"> Edit Student</h3>
                            </div>
                            <form method="dialog">
                                <button className="absolute btn btn-sm btn-circle btn-error right-2 top-2">✕</button>
                            </form>
                            <form onSubmit={handleSubmit1(updateStudent)}>
                                <label className="flex items-center gap-2 input input-bordered">
                                    <span className="w-full font-semibold md:w-fit">Name :</span>
                                    <input defaultValue={studentInfo.name} {...register1("name1", { required: true })} type="text" name="name1" className="w-full grow bg-base-100 md:w-fit" placeholder={studentInfo.name} />
                                </label>
                                <br />
                                <label className="flex items-center gap-2 input input-bordered">
                                    <span className="w-full font-semibold md:w-fit">Email :</span>
                                    <input type="email" name="email1" className="w-full grow bg-base-100 md:w-fit" placeholder={studentInfo.email} defaultValue={studentInfo.email} {...register1("email1", { required: true })} />
                                </label>
                                <br />
                                <label className="flex items-center gap-2 input input-bordered">
                                    <span className="w-full font-semibold md:w-fit">Phone :</span>
                                    <input type="text" name="phone1" className="w-full grow bg-base-100 md:w-fit" placeholder={studentInfo.phone} defaultValue={studentInfo.phone} {...register1("phone1", { required: true })} />
                                </label>
                                <br />
                                <label className="flex items-center gap-2 input input-bordered">
                                    <span className="w-full font-semibold md:w-fit">Image :</span>
                                    <input type="url" name="image1" className="w-full grow bg-base-100 md:w-fit" placeholder={studentInfo.image} defaultValue={studentInfo.image} {...register1("image1", { required: true })} />
                                </label>
                                <br />
                                <label className="flex items-center gap-2 input input-bordered">
                                    <span className="w-full font-semibold md:w-fit">Gender :</span>
                                    <select name="gender1" defaultValue={studentInfo.gender ? studentInfo.gender : false} className="w-full grow bg-base-100 md:w-fit" {...register1("gender1", { required: true })}>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="third">Third</option>
                                    </select>
                                </label>
                                <br />
                                <label className="flex items-center gap-2 input input-bordered">
                                    <span className="w-full font-semibold md:w-fit">DOB :</span>
                                    <input type="date" name="dob1" className="w-full grow bg-base-100 md:w-fit" defaultValue={studentInfo?.dob ? studentInfo?.dob : false} {...register1("dob1", { required: true })} />
                                </label>
                                <br />
                                <label className="flex items-center gap-2 input input-bordered">
                                    <span className="w-full font-semibold md:w-fit">Role :</span>
                                    <select name="role1" defaultValue={studentInfo.role} className="w-full grow bg-base-100 md:w-fit" {...register1("role1", { required: true })}>
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
                    <dialog id="add_student" className="modal">
                        <div className="modal-box">
                            <div className="flex items-center">
                                <span><TbUser className="text-2xl font-bold" /></span>
                                <h3 className="ml-3 text-xl font-bold">Add Student</h3>
                            </div>
                            <form method="dialog">
                                <button className="absolute btn btn-sm btn-circle btn-error right-2 top-2">✕</button>
                            </form>
                            <form onSubmit={handleSubmit2(addStudent)}>
                                <label className="flex items-center gap-2 input input-bordered">
                                    <span className="w-full font-semibold md:w-fit">Name :</span>
                                    <input {...register2("name2", { required: true })} type="text" name="name2" className="w-full grow bg-base-100 md:w-fit" placeholder="type name here" />
                                </label>
                                <br />
                                <label className="flex items-center gap-2 input input-bordered">
                                    <span className="w-full font-semibold md:w-fit">Email :</span>
                                    <input type="email" name="email2" className="w-full grow bg-base-100 md:w-fit" placeholder="type email here" {...register2("email2", { required: true })} />
                                </label>
                                <br />
                                <label className="flex items-center gap-2 input input-bordered">
                                    <span className="w-full font-semibold md:w-fit">Phone :</span>
                                    <input type="text" name="phone2" className="w-full grow bg-base-100 md:w-fit" placeholder="type phone here" {...register2("phone2", { required: true })} />
                                </label>
                                <br />
                                <label className="flex items-center gap-2 input input-bordered">
                                    <span className="w-full font-semibold md:w-fit">Image :</span>
                                    <input type="url" name="image2" className="w-full grow bg-base-100 md:w-fit" placeholder="type image url here" {...register2("image2", { required: true })} />
                                </label>
                                <br />
                                <label className="flex items-center gap-2 input input-bordered">
                                    <span className="w-full font-semibold md:w-fit">Gender :</span>
                                    <select name="gender2" className="w-full grow bg-base-100 md:w-fit" {...register2("gender2", { required: true })}>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="third">Third</option>
                                    </select>
                                </label>
                                <br />
                                <label className="flex items-center gap-2 input input-bordered">
                                    <span className="w-full font-semibold md:w-fit">DOB :</span>
                                    <input type="date" name="dob2" className="w-full grow bg-base-100 md:w-fit" defaultValue={studentInfo.dob ? studentInfo.dob : false} {...register2("dob2", { required: true })} />
                                </label>
                                <br />
                                <label className="flex items-center gap-2 input input-bordered">
                                    <span className="w-full font-semibold md:w-fit">Role :</span>
                                    <select name="role2" className="w-full grow bg-base-100 md:w-fit" {...register2("role2", { required: true })} >
                                        <option value="student">Student</option>
                                    </select>
                                </label>
                                <br /><br />
                                <div className="text-center">
                                    <button type="submit" className="btn btn-success">Add</button>
                                </div>
                            </form>
                        </div>
                    </dialog>
                </div>
                <div className="flex-row items-center justify-between text-center md:flex">
                    <h4 className="p-4 font-medium text-neutral badge badge-outline">Students: {students?.length}</h4>
                    <button onClick={() => document.getElementById('add_student').showModal()} className="mt-5 md:mt-0 btn btn-sm btn-secondary">Add Student</button>
                </div>
            </div>
        </div>
    );
};

export default ManageStudents;