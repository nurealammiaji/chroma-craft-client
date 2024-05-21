import { Helmet } from "react-helmet-async";
import { useLoaderData, useParams } from "react-router-dom";
import Class from "./Class";
import { DNA } from "react-loader-spinner";
import { TbList } from "react-icons/tb";
import { useForm } from "react-hook-form";
import useClasses from '../../../../../hooks/useClasses';
import { useState } from "react";
import useStudents from "../../../../../hooks/useStudents";
import SectionHeader from "../../../../../components/SectionHeader/SectionHeader";

const StudentClasses = () => {

    const enrolledClasses = useLoaderData();
    const studentEmail = useParams();

    const [classes] = useClasses();
    const [students] = useStudents();
    const [studentInfo, setStudentInfo] = useState(null);

    const { register: register, handleSubmit, watch, reset, formState: { errors } } = useForm();

    const handleAddClassModal = () => {
        const clickedUser = students.find(item => item.email === studentEmail);
        setStudentInfo(clickedUser);
        document.getElementById('add_class').showModal();
    }

    const addClass = (data) => {
        // fetch(`https://chroma-craft-server.vercel.app/students/${studentInfo.email}`, {
        //     method: "PATCH",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(student)
        // })
        //     .then(result => {
        //         console.log(result);
        //         Swal.fire({
        //             position: "center",
        //             icon: "success",
        //             title: "Updated Successfully !!",
        //             showConfirmButton: false,
        //             timer: 1500
        //         });
        //         reset1();
        //         refetchStudents();
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     })
    };

    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Student Classes || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
            <div className="w-11/12 min-h-screen mx-auto">
                <br /><br />
                <SectionHeader title={"Student's Enrolled Classes"}></SectionHeader>
                <br /><br />
                <div>
                    {
                        (enrolledClasses) ?
                            <div className="grid gap-10 md:grid-cols-2">
                                {
                                    (enrolledClasses) &&
                                    enrolledClasses.map(item => <Class key={item._id} item={item}></Class>)
                                }
                            </div> : <>
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
                <dialog id="add_class" className="modal">
                    <div className="modal-box">
                        <div className="flex items-center">
                            <span><TbList className="text-2xl font-bold" /></span>
                            <h3 className="ml-3 text-xl font-bold">Add Class</h3>
                        </div>
                        <form method="dialog">
                            <button className="absolute btn btn-sm btn-circle btn-error right-2 top-2">✕</button>
                        </form>
                        <form onSubmit={handleSubmit(addClass)}>
                            <label className="flex items-center gap-2 input input-bordered">
                                <span className="font-semibold">Title :</span>
                                <select {...register("title", { required: true })} type="text" name="title" className="grow bg-base-100" >
                                    {
                                        (classes) &&
                                        classes.map(item => <option key={item._id} value={item}>{item.title}</option>)
                                    }
                                </select>
                            </label>
                            <br /><br />
                            <div className="text-center">
                                <button type="submit" className="btn btn-success">Add</button>
                            </div>
                        </form>
                    </div>
                </dialog>
                <br /><br />
                <div className="text-center">
                    <button onClick={handleAddClassModal} className="btn btn-secondary">Add New</button>
                </div>
                <br /><br />
            </div>
        </div>
    );
};

export default StudentClasses;