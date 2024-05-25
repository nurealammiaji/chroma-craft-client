import { Helmet } from "react-helmet-async";
import { DNA } from "react-loader-spinner";
import SectionHeader from '../../../../components/SectionHeader/SectionHeader';
import useClasses from '../../../../hooks/useClasses';
import ClassRow from './ClassRow';
import Swal from "sweetalert2";
import { TbList, TbListCheck } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useInstructors from '../../../../hooks/useInstructors';

const ManageClasses = () => {

    const { register: register1, handleSubmit: handleSubmit1, watch: watch1, reset: reset1, formState: { errors: errors1 } } = useForm();

    const { register: register2, handleSubmit: handleSubmit2, watch: watch2, reset: reset2, formState: { errors: errors2 } } = useForm();

    const [instructors, refetchInstructors] = useInstructors();
    const [classes, refetchClasses] = useClasses();
    const [instructorInfo, setInstructorInfo] = useState({});
    const [classInfo, setClassInfo] = useState({});

    const category1 = watch1("category1");
    const category2 = watch2("category2");

    const handleEditClassModal = (id) => {
        const clickedClass = classes.find(item => item._id === id);
        console.log(clickedClass);
        setClassInfo(clickedClass);
        document.getElementById('edit_class').showModal()
    }

    const handleEditClass = (data) => {
        const editClass = {
            _id: classInfo?._id,
            course_id: classInfo?.course_id,
            title: data?.title1,
            description: data?.description1,
            instructor: classInfo?.instructor,
            instructor_id: classInfo?.instructor_id,
            instructor_email: classInfo?.instructor_email,
            instructor_image: classInfo?.instructor_image,
            duration: parseInt(data?.duration1),
            price: parseFloat(data?.price1),
            seat_capacity: parseInt(data?.seat1),
            enrolled: classInfo?.enrolled,
            level: data?.level1,
            rating: parseFloat(classInfo?.rating),
            image: data?.image1,
            category_id: parseInt(`${category1 === 'Painting' && 1 || category1 === 'Drawing' && 2 || category1 === 'Sculpture' && 3 || category1 === 'Digital Art' && 4 || category1 === 'Handmade Crafts' && 5}`),
            category_name: data?.category1,
            reviews: classInfo?.reviews,
            status: data?.status
        };
        console.log(editClass);
        fetch(`https://chroma-craft-server.vercel.app/classes/${classInfo?._id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(editClass)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Updated Successfully !!",
                    showConfirmButton: false,
                    timer: 1500
                });
                reset1();
                refetchClasses();
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleAddClass = (data) => {
        const newClass = {
            course_id: parseInt(classes?.length + 1),
            title: data?.title2,
            description: data?.description2,
            instructor: instructorInfo?.name,
            instructor_id: instructorInfo?._id,
            instructor_email: instructorInfo?.email,
            instructor_image: instructorInfo?.image,
            duration: parseInt(data?.duration2),
            price: parseFloat(data?.price2),
            seat_capacity: parseInt(data?.seat2),
            enrolled: 0,
            level: data?.level2,
            rating: parseFloat(0.0),
            image: data?.image2,
            category_id: parseInt(`${category2 === 'Painting' && 1 || category2 === 'Drawing' && 2 || category2 === 'Sculpture' && 3 || category2 === 'Digital Art' && 4 || category2 === 'Handmade Crafts' && 5}`),
            category_name: data?.category2,
            reviews: [],
            status: "pending"
        };
        console.log(newClass);
        fetch('https://chroma-craft-server.vercel.app/classes', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newClass)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Added Successfully !!",
                    showConfirmButton: false,
                    timer: 1500
                });
                reset2();
                refetchClasses();
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Manage Classes || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
            <div className="w-screen p-5 md:w-full">
                <div className="mt-5">
                    <SectionHeader title={"Manage Classes"} ></SectionHeader>
                </div>
                <br /><br />
                <div className="overflow-x-auto">
                    {
                        (classes) ?
                            <table className="table bg-white">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>SN</th>
                                        <th>Class</th>
                                        <th>Information</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row */}
                                    {
                                        (classes) &&
                                        classes.map((item, index) => <ClassRow key={item._id} index={index + 1} item={item} handleEditClassModal={handleEditClassModal}></ClassRow>)
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
                    <div>
                        <h4 className="p-4 font-medium text-neutral badge badge-outline">Classes: {classes?.length}</h4>
                    </div>
                    <div className="my-5 md:my-0">
                        <button onClick={() => document.getElementById('add_class').showModal()} className="p-4 font-medium badge badge-secondary">Add Class</button>
                    </div>
                </div>
                <dialog id="edit_class" className="modal">
                    <div className="modal-box">
                        <div className="flex items-center">
                            <span><TbListCheck className="text-2xl font-bold" /></span>
                            <h3 className="ml-3 text-xl font-bold"> Edit Class</h3>
                        </div>
                        <form method="dialog">
                            <button className="absolute btn btn-sm btn-circle btn-error right-2 top-2">✕</button>
                        </form>
                        <form onSubmit={handleSubmit1(handleEditClass)} className="w-full">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Class Title</span>
                                </label>
                                <input {...register1("title1", { required: true })}
                                    type="text"
                                    placeholder="type class title"
                                    name="title1"
                                    className="input input-bordered"
                                    defaultValue={classInfo?.title}
                                />
                                {errors1.title1?.type === 'required' && <label className="label">
                                    <span className="text-error">Class Title is required !!</span>
                                </label>}
                            </div>
                            <br />
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Class Image URL</span>
                                </label>
                                <input {...register1("image1", { required: true })}
                                    type="url"
                                    placeholder="https://"
                                    name="image1"
                                    className="input input-bordered"
                                    defaultValue={classInfo.image}
                                />
                                {errors1.image1?.type === 'required' && <label className="label">
                                    <span className="text-error">Class Image URL is required !!</span>
                                </label>}
                            </div>
                            <br />
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Class Description</span>
                                </label>
                                <textarea {...register1("description1", { required: true })}
                                    type="text"
                                    placeholder="type class description"
                                    name="description1"
                                    rows="4"
                                    defaultValue={classInfo.description}
                                    className="textarea textarea-bordered"
                                />
                                {errors1.description1?.type === 'required' && <label className="label">
                                    <span className="text-error">Class Description is required !!</span>
                                </label>}
                            </div>
                            <br />
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Class Price</span>
                                </label>
                                <input {...register1("price21", { required: true })}
                                    type="number"
                                    placeholder="type class price"
                                    name="price1"
                                    className="input input-bordered"
                                    min="0"
                                    step="0.01"
                                    defaultValue={classInfo.price}
                                />
                                {errors1.price1?.type === 'required' && <label className="label">
                                    <span className="text-error">Class Price is required !!</span>
                                </label>}
                            </div>
                            <br />
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Class Duration (Weeks)</span>
                                </label>
                                <input {...register1("duration1", { required: true })}
                                    type="text"
                                    placeholder="type class duration"
                                    name="duration1"
                                    className="input input-bordered"
                                    defaultValue={classInfo.duration}
                                />
                                {errors1.duration1?.type === 'required' && <label className="label">
                                    <span className="text-error">Class Duration is required !!</span>
                                </label>}
                            </div>
                            <br />
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Seat Capacity</span>
                                </label>
                                <input {...register1("seat1", { required: true })}
                                    type="number"
                                    placeholder="Type Seat capacity"
                                    name="seat1"
                                    min="0"
                                    defaultValue={classInfo.seat_capacity}
                                    className="input input-bordered"
                                />
                                {errors1.seat1?.type === 'required' && <label className="label">
                                    <span className="text-error">Seat Capacity is required !!</span>
                                </label>}
                            </div>
                            <br />
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Class Level (<span className="text-warning">{classInfo.level}</span>)</span>
                                </label>
                                <select {...register1("level1", { required: true })}
                                    type="text"
                                    placeholder="select class level"
                                    name="level1"
                                    defaultValue={classInfo.level}
                                    className="select select-bordered"
                                >
                                    <option value="">select level</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                    <option value="All Levels">All Levels</option>
                                </select>
                                {errors1.level1?.type === 'required' && <label className="label">
                                    <span className="text-error">Class Level is required !!</span>
                                </label>}
                            </div>
                            <br />
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Class Category (<span className="text-warning">{classInfo.category_name}</span>)</span>
                                </label>
                                <select {...register1("category1", { required: true })}
                                    type="text"
                                    placeholder="select class level"
                                    name="category1"
                                    defaultValue={classInfo.category_name}
                                    className="select select-bordered"
                                >
                                    <option value="">select category</option>
                                    <option value="Painting">Painting</option>
                                    <option value="Drawing">Drawing</option>
                                    <option value="Sculpture">Sculpture</option>
                                    <option value="Digital Art">Digital Art</option>
                                    <option value="Handmade Crafts">Handmade Crafts</option>
                                </select>
                                {errors1.category1?.type === 'required' && <label className="label">
                                    <span className="text-error">Class Category is required !!</span>
                                </label>}
                            </div>
                            <br />
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Class Status (<span className="text-warning">{classInfo.status}</span>)</span>
                                </label>
                                <select {...register1("status1", { required: true })}
                                    type="text"
                                    placeholder="select class level"
                                    name="status1"
                                    defaultValue={classInfo.level}
                                    className="select select-bordered"
                                >
                                    <option value="">select status</option>
                                    <option value="approved">Approved</option>
                                    <option value="pending">Pending</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                                {errors1.status1?.type === 'required' && <label className="label">
                                    <span className="text-error">Class Status is required !!</span>
                                </label>}
                            </div>
                            <br />
                            <div className="mt-6 form-control">
                                <button className="btn btn-neutral" type="submit">Add Class</button>
                            </div>
                        </form>
                    </div>
                </dialog>
                <dialog id="add_class" className="modal">
                    <div className="modal-box">
                        <div className="flex items-center">
                            <span><TbList className="text-2xl font-bold" /></span>
                            <h3 className="ml-3 text-xl font-bold"> Add Class</h3>
                        </div>
                        <form method="dialog">
                            <button className="absolute btn btn-sm btn-circle btn-error right-2 top-2">✕</button>
                        </form>
                        <form onSubmit={handleSubmit2(handleAddClass)} className="w-full">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Class Title</span>
                                </label>
                                <input {...register2("title2", { required: true })}
                                    type="text"
                                    placeholder="type class title"
                                    name="title2"
                                    className="input input-bordered"
                                />
                                {errors2.title2?.type === 'required' && <label className="label">
                                    <span className="text-error">Class Title is required !!</span>
                                </label>}
                            </div>
                            <br />
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Class Image URL</span>
                                </label>
                                <input {...register2("image2", { required: true })}
                                    type="url"
                                    placeholder="https://"
                                    name="image2"
                                    className="input input-bordered"
                                />
                                {errors2.image2?.type === 'required' && <label className="label">
                                    <span className="text-error">Class Image URL is required !!</span>
                                </label>}
                            </div>
                            <br />
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Class Description</span>
                                </label>
                                <textarea {...register2("description2", { required: true })}
                                    type="text"
                                    placeholder="type class description"
                                    name="description2"
                                    rows="4"
                                    className="textarea textarea-bordered"
                                />
                                {errors2.description2?.type === 'required' && <label className="label">
                                    <span className="text-error">Class Description is required !!</span>
                                </label>}
                            </div>
                            <br />
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Class Price</span>
                                </label>
                                <input {...register2("price2", { required: true })}
                                    type="number"
                                    placeholder="type class price"
                                    name="price2"
                                    className="input input-bordered"
                                    min="0"
                                    step="0.01"
                                />
                                {errors2.price2?.type === 'required' && <label className="label">
                                    <span className="text-error">Class Price is required !!</span>
                                </label>}
                            </div>
                            <br />
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Class Duration (Weeks)</span>
                                </label>
                                <input {...register2("duration2", { required: true })}
                                    type="number"
                                    placeholder="type class duration"
                                    name="duration2"
                                    className="input input-bordered"
                                    min="0"
                                />
                                {errors2.duration2?.type === 'required' && <label className="label">
                                    <span className="text-error">Class Duration is required !!</span>
                                </label>}
                            </div>
                            <br />
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Seat Capacity</span>
                                </label>
                                <input {...register2("seat2", { required: true })}
                                    type="number"
                                    placeholder="Type Seat capacity"
                                    name="seat2"
                                    min="0"
                                    className="input input-bordered"
                                />
                                {errors2.seat2?.type === 'required' && <label className="label">
                                    <span className="text-error">Seat Capacity is required !!</span>
                                </label>}
                            </div>
                            <br />
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Class Level</span>
                                </label>
                                <select {...register2("level2", { required: true })}
                                    type="text"
                                    placeholder="select class level"
                                    name="level2"
                                    className="select select-bordered"
                                >
                                    <option value="">select level</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                    <option value="All Levels">All Levels</option>
                                </select>
                                {errors2.level2?.type === 'required' && <label className="label">
                                    <span className="text-error">Class Level is required !!</span>
                                </label>}
                            </div>
                            <br />
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Class Category</span>
                                </label>
                                <select {...register2("category2", { required: true })}
                                    type="text"
                                    placeholder="select class level"
                                    name="category2"
                                    className="select select-bordered"
                                >
                                    <option value="">select category</option>
                                    <option value="Painting">Painting</option>
                                    <option value="Drawing">Drawing</option>
                                    <option value="Sculpture">Sculpture</option>
                                    <option value="Digital Art">Digital Art</option>
                                    <option value="Handmade Crafts">Handmade Crafts</option>
                                </select>
                                {errors2.category2?.type === 'required' && <label className="label">
                                    <span className="text-error">Class Category is required !!</span>
                                </label>}
                            </div>
                            <br />
                            <div className="mt-6 form-control">
                                <button className="btn btn-neutral" type="submit">Add Class</button>
                            </div>
                        </form>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default ManageClasses;