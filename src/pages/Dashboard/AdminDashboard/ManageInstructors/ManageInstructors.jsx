import { Helmet } from "react-helmet-async";
import useInstructors from '../../../../hooks/useInstructors';
import InstructorRow from "./InstructorRow";
import { DNA } from "react-loader-spinner";
import SectionHeader from '../../../../components/SectionHeader/SectionHeader';
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { TbUser, TbUserEdit } from "react-icons/tb";
import { useState } from "react";

const ManageInstructors = () => {

    const axiosSecure = useAxiosSecure();
    const [instructors, refetchInstructors] = useInstructors();
    const [instructorInfo, setInstructorInfo] = useState({});

    const { register: register1, handleSubmit: handleSubmit1, watch: watch1, reset: reset1, formState: { errors: errors1 } } = useForm();

    const { register: register2, handleSubmit: handleSubmit2, watch: watch2, reset: reset2, formState: { errors: errors2 } } = useForm();

    const deleteInstructor = (email) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to delete this instructor",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ff675b",
            cancelButtonColor: "#16a34a",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/instructors/${email}`)
                console.log(res.data);
                if (res.data) {
                    refetchInstructors();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Deleted Successfully !!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        });
    }

    const updateInstructor = (data) => {
        const instructor = {
            instructor_id: instructorInfo?.instructor_id,
            instructor: data.name1,
            instructor_email: data.email1,
            instructor_image: data.image1
        }
        fetch('https://chroma-craft-server.vercel.app/instructors', {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(instructor)
        })
            .then(result => {
                console.log(result);
                Swal.fire({
                    target: document.getElementById("edit_instructor"),
                    position: "center",
                    icon: "success",
                    title: "Updated Successfully !!",
                    showConfirmButton: false,
                    timer: 1500
                });
                refetchInstructors();
                reset1();
            })
            .catch(error => {
                console.log(error);
            })
    }

    const addInstructor = (data) => {
        const instructor = {
            instructor_id: instructors?.length + 1,
            instructor: data.name2,
            instructor_email: data.email2,
            instructor_image: data.image2
        }
        fetch('https://chroma-craft-server.vercel.app/instructors', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(instructor)
        })
            .then(result => {
                console.log(result);
                Swal.fire({
                    target: document.getElementById("add_instructor"),
                    position: "center",
                    icon: "success",
                    title: "Added Successfully !!",
                    showConfirmButton: false,
                    timer: 1500
                });
                refetchInstructors();
                reset2();
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleEditInstructorModal = (email) => {
        const clickedInstructor = instructors.find(item => item.instructor_email === email);
        console.log(clickedInstructor);
        setInstructorInfo(clickedInstructor);
        document.getElementById('edit_instructor').showModal()
    }

    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Manage Instructors || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
            <div className="w-screen p-5 md:w-full">
                <div className="mt-5">
                    <SectionHeader title={"Manage Instructors"} ></SectionHeader>
                </div>
                <br /><br />
                <div className="overflow-x-auto">
                    {
                        (instructors) ?
                            <table className="table bg-white">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>SN</th>
                                        <th>Instructor</th>
                                        <th>Information</th>
                                        <th>Action</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row */}
                                    {
                                        (instructors) &&
                                        instructors.map((item, index) => <InstructorRow key={item._id} index={index + 1} item={item} deleteInstructor={deleteInstructor} handleEditInstructorModal={handleEditInstructorModal} ></InstructorRow>)
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
                    <h4 className="p-4 font-medium text-neutral badge badge-outline">Instructors: {instructors?.length}</h4>
                    <button onClick={() => document.getElementById('add_instructor').showModal()} className="mt-5 md:mt-0 btn btn-sm btn-secondary">Add Instructor</button>
                </div>
                <dialog id="edit_instructor" className="modal">
                    <div className="modal-box">
                        <div className="flex items-center">
                            <span><TbUserEdit className="text-2xl font-bold" /></span>
                            <h3 className="ml-3 text-xl font-bold"> Edit Instructor</h3>
                        </div>
                        <form method="dialog">
                            <button className="absolute btn btn-sm btn-circle btn-error right-2 top-2">✕</button>
                        </form>
                        <form onSubmit={handleSubmit1(updateInstructor)}>
                            <label className="flex items-center gap-2 input input-bordered">
                                <span className="w-full font-semibold md:w-fit">Name : </span>
                                <input defaultValue={instructorInfo?.instructor} {...register1("name1", { required: true })} type="text" name="name1" className="w-full grow bg-base-100 md:w-fit" placeholder={instructorInfo?.instructor} />
                            </label>
                            {errors1.name1?.type === 'required' && <label className="label">
                                <span className="text-error">Name is required !!</span>
                            </label>}
                            <br />
                            <label className="flex items-center gap-2 input input-bordered">
                                <span className="w-full font-semibold md:w-fit">Email : </span>
                                <input type="email" name="email1" className="w-full grow bg-base-100 md:w-fit" placeholder={instructorInfo.instructor_email} defaultValue={instructorInfo.instructor_email} {...register1("email1", { required: true })} />
                            </label>
                            {errors1.email1?.type === 'required' && <label className="label">
                                <span className="text-error">Email is required !!</span>
                            </label>}
                            <br />
                            <label className="flex items-center gap-2 input input-bordered">
                                <span className="w-full font-semibold md:w-fit">Image : </span>
                                <input type="url" name="image1" className="w-full grow bg-base-100 md:w-fit" placeholder={instructorInfo?.instructor_image} defaultValue={instructorInfo?.instructor_image} {...register1("image1", { required: true })} />
                            </label>
                            {errors1.image1?.type === 'required' && <label className="label">
                                <span className="text-error">Image is required !!</span>
                            </label>}
                            <br /><br />
                            <div className="text-center">
                                <button type="submit" className="btn btn-success">Update</button>
                            </div>
                        </form>
                    </div>
                </dialog>
                <dialog id="add_instructor" className="modal">
                    <div className="modal-box">
                        <div className="flex items-center">
                            <span><TbUser className="text-2xl font-bold" /></span>
                            <h3 className="ml-3 text-xl font-bold">Add Instructor</h3>
                        </div>
                        <form method="dialog">
                            <button className="absolute btn btn-sm btn-circle btn-error right-2 top-2">✕</button>
                        </form>
                        <form onSubmit={handleSubmit2(addInstructor)}>
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
                                <span className="w-full font-semibold md:w-fit">Image : </span>
                                <input type="url" name="image2" className="w-full grow bg-base-100 md:w-fit" placeholder="type image url here" {...register2("image2", { required: true })} />
                            </label>
                            {errors2.image2?.type === 'required' && <label className="label">
                                <span className="text-error">Image is required !!</span>
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

export default ManageInstructors;