import { Helmet } from "react-helmet-async";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import Class from "./Class";
import { DNA } from "react-loader-spinner";
import { TbList } from "react-icons/tb";
import { useForm } from "react-hook-form";
import useClasses from '../../../../../hooks/useClasses';
import { useEffect, useState } from "react";
import useStudents from "../../../../../hooks/useStudents";
import SectionHeader from "../../../../../components/SectionHeader/SectionHeader";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";

const StudentClasses = () => {

    const { register: register, handleSubmit, watch, reset, formState: { errors } } = useForm();

    const enrolledClasses = useLoaderData();
    const navigate = useNavigate();
    const { email } = useParams();
    const axiosSecure = useAxiosSecure();
    const [classes] = useClasses();
    const [students] = useStudents();
    const [studentInfo, setStudentInfo] = useState(null);

    const handleAddClassModal = () => {
        document.getElementById('add_class').showModal();
    }

    const classTitle = watch("title");

    useEffect(() => {
        if (students && email) {
            const studentData = students.find(student => student.email === email);
            setStudentInfo(studentData);
        }
    }, [students, email])

    const addClass = async () => {
        const classData = JSON.parse(classTitle);
        const newClass = {
            class_id: classData?._id,
            class_title: classData?.title,
            class_image: classData?.image,
            class_price: classData?.price,
            category_id: classData?.category_id,
            category_name: classData?.category_name,
            instructor_id: classData?.instructor_id,
            instructor_name: classData?.instructor,
            instructor_email: classData?.instructor_email,
            student_name: studentInfo?.name,
            student_email: studentInfo?.email,
            payment_status: "",
            payment_trxID: ""
        };
        console.log(newClass);
        await axiosSecure.post('/enrolled', [newClass])
            .then(result => {
                console.log(result.data);
                Swal.fire({
                    target: document.getElementById('add_class'),
                    position: "center",
                    icon: "success",
                    title: "Added Successfully !!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(`/dashboard/student-classes/${email}`, { replace: true });
            })
            .catch(error => {
                console.log(error);
            })
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
                                    <option value="">Select Class</option>
                                    {
                                        (classes) &&
                                        classes.filter(item => item.status === "approved").map(item => <option key={item._id} value={JSON.stringify(item)}>{item.title}</option>)
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