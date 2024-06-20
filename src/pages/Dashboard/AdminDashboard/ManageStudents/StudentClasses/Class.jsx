import { Link, useNavigate } from "react-router-dom";
import shape1 from "../../../../../assets/shapes/shape-10-2.png"
import shape2 from "../../../../../assets/shapes/shape-12-2.png"
import Swal from "sweetalert2";

const Class = ({ item }) => {

    const { _id, class_id, class_image, class_title, class_price, class_duration, instructor_name, category_name, student_name, student_email } = item;

    const navigate = useNavigate();

    const handleDeleteClass = (_id) => {
        console.log("Delete: ", _id);
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to delete this class",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ff675b",
            cancelButtonColor: "#16a34a",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://chroma-craft-server.vercel.app/enrolled/${_id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Deleted Successfully !!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate(`/dashboard/student-classes/${student_email}`, { replace: true });
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        });
    }

    return (
        <div className="relative hover:motion-safe:animate-pulse border border-transparent hover:border-neutral rounded-tl-[150px] rounded-br-[150px] shadow-xl">
            <button onClick={() => handleDeleteClass(_id)} data-tip="Delele" className="absolute tooltip btn btn-error btn-sm btn-circle">X</button>
            <div style={{ background: `url(${shape1}) no-repeat bottom right` }} className="w-full h-full rounded-tl-[150px] rounded-br-[150px]">
                <figure>
                    <img className="h-[250px] w-full md:w-11/12 rounded-tl-[150px] rounded-br-[150px] shadow-xl" src={class_image} alt={`Image of ${class_title}`} />
                </figure>
                <div style={{ background: `url(${shape2}) no-repeat right` }} className="card-body">
                    <div className="flex justify-center">
                        <span className="text-xs badge badge-accent">{category_name}</span>
                    </div>
                    <h2 className="my-2 card-title">{class_title}</h2>
                    <p className="mb-2 font-semibold">Price: $ {class_price}</p>
                    <p>Instructor: {instructor_name}</p>
                    <p>Student: {student_name}</p>
                    <div className="justify-start card-actions">
                        <Link to={`/classes/${class_id}`} className="mt-5 btn btn-neutral btn-sm">Details</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Class;