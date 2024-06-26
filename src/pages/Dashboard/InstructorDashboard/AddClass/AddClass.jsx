import { Helmet } from "react-helmet-async";
import SectionHeader from '../../../../components/SectionHeader/SectionHeader';
import { useForm } from "react-hook-form";
import useClasses from '../../../../hooks/useClasses';
import Swal from "sweetalert2";
import useInstructor from '../../../../hooks/useInstructor';

const AddClass = () => {

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const [instructorData] = useInstructor();
    const [classes, refetchClasses] = useClasses();

    const category = watch("category");

    const handleAddClass = (data) => {
        const newClass = {
            course_id: parseInt(classes?.length + 1),
            title: data?.title,
            description: data?.description,
            instructor: instructorData?.instructor,
            instructor_id: instructorData?.instructor_id,
            instructor_email: instructorData?.instructor_email,
            instructor_image: instructorData?.instructor_image,
            duration: parseInt(data?.duration),
            price: parseFloat(data?.price),
            seat_capacity: parseInt(data?.seat),
            enrolled: 0,
            level: data?.level,
            rating: parseFloat(0.0),
            image: data?.image,
            category_id: parseInt(`${category === 'Painting' && 1 || category === 'Drawing' && 2 || category === 'Sculpture' && 3 || category === 'Digital Art' && 4 || category === 'Handmade Crafts' && 5}`),
            category_name: data?.category,
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
                reset();
                refetchClasses();
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Add Class || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
            <div className="w-screen p-5 md:w-full">
                <div className="mt-5">
                    <SectionHeader title={"Add New Class"}></SectionHeader>
                </div>
                <br /><br />
                <div className="min-h-screen">
                    <form onSubmit={handleSubmit(handleAddClass)} className="w-full md:w-screen">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Class Title</span>
                            </label>
                            <input {...register("title", { required: true })}
                                type="text"
                                placeholder="type class title"
                                name="title"
                                className="input input-bordered"
                            />
                            {errors.title?.type === 'required' && <label className="label">
                                <span className="text-error">Class Title is required !!</span>
                            </label>}
                        </div>
                        <br />
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Class Image URL</span>
                            </label>
                            <input {...register("image", { required: true })}
                                type="url"
                                placeholder="https://"
                                name="image"
                                className="input input-bordered"
                            />
                            {errors.image?.type === 'required' && <label className="label">
                                <span className="text-error">Class Image URL is required !!</span>
                            </label>}
                        </div>
                        <br />
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Class Description</span>
                            </label>
                            <textarea {...register("description", { required: true })}
                                type="text"
                                placeholder="type class description"
                                name="description"
                                rows="4"
                                className="textarea textarea-bordered"
                            />
                            {errors.title?.type === 'required' && <label className="label">
                                <span className="text-error">Class Description is required !!</span>
                            </label>}
                        </div>
                        <br />
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Class Price</span>
                            </label>
                            <input {...register("price", { required: true })}
                                type="number"
                                placeholder="type class price"
                                name="price"
                                className="input input-bordered"
                                min="0"
                                step="0.01"
                            />
                            {errors.price?.type === 'required' && <label className="label">
                                <span className="text-error">Class Price is required !!</span>
                            </label>}
                        </div>
                        <br />
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Class Duration (Weeks)</span>
                            </label>
                            <input {...register("duration", { required: true })}
                                type="number"
                                placeholder="type class duration"
                                name="duration"
                                className="input input-bordered"
                                min="0"
                            />
                            {errors.duration?.type === 'required' && <label className="label">
                                <span className="text-error">Class Duration is required !!</span>
                            </label>}
                        </div>
                        <br />
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Seat Capacity</span>
                            </label>
                            <input {...register("seat", { required: true })}
                                type="number"
                                placeholder="Type Seat capacity"
                                name="seat"
                                min="0"
                                className="input input-bordered"
                            />
                            {errors.seat?.type === 'required' && <label className="label">
                                <span className="text-error">Seat Capacity is required !!</span>
                            </label>}
                        </div>
                        <br />
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Class Level</span>
                            </label>
                            <select {...register("level", { required: true })}
                                type="text"
                                placeholder="select class level"
                                name="level"
                                className="select select-bordered"
                            >
                                <option value="">select level</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                                <option value="All Levels">All Levels</option>
                            </select>
                            {errors.level?.type === 'required' && <label className="label">
                                <span className="text-error">Class Level is required !!</span>
                            </label>}
                        </div>
                        <br />
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Class Category</span>
                            </label>
                            <select {...register("category", { required: true })}
                                type="text"
                                placeholder="select class level"
                                name="category"
                                className="select select-bordered"
                            >
                                <option value="">select category</option>
                                <option value="Painting">Painting</option>
                                <option value="Drawing">Drawing</option>
                                <option value="Sculpture">Sculpture</option>
                                <option value="Digital Art">Digital Art</option>
                                <option value="Handmade Crafts">Handmade Crafts</option>
                            </select>
                            {errors.category?.type === 'required' && <label className="label">
                                <span className="text-error">Class Category is required !!</span>
                            </label>}
                        </div>
                        <br />
                        <div className="mt-6 form-control">
                            <button className="btn btn-neutral" type="submit">Add Class</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddClass;