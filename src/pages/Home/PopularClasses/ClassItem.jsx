import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import shape1 from "../../../assets/shapes/shape-10-2.png"
import shape2 from "../../../assets/shapes/shape-12-2.png"
import useUsers from '../../../hooks/useUsers';
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useSelected from "../../../hooks/useSelected";

const ClassItem = ({ item }) => {

    const { _id, title, image, description, instructor, instructor_id, instructor_email, instructor_image, duration, price, reviews, seat_capacity, enrolled, category_name, category_id, level, rating } = item;

    const { user } = useContext(AuthContext);
    const [userData] = useUsers();
    const [, refetch] = useSelected();
    const location = useLocation();
    const navigate = useNavigate();

    const selectHandler = () => {
        if (user) {
            const order = {
                class_id: _id,
                class_title: title,
                class_price: price,
                class_duration: duration,
                class_image: image,
                class_description: description,
                category_id: category_id,
                category_name: category_name,
                instructor_id: instructor_id,
                instructor_name: instructor,
                instructor_email: instructor_email,
                instructor_image: instructor_image,
                student_name: userData?.name,
                student_email: userData?.email,
                student_phone: userData?.phone,
                student_image: userData?.image,
            };
            console.log("Selected: ", order);
            fetch("http://localhost:5000/selected", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(order)
            })
                .then(res => res.json())
                .then(data => {
                    if (data?.acknowledged === true) {
                        refetch();
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Selected Successfully !!",
                            text: `${userData?.name}, you selected the class successfully`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                    else {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: `${data?.message}`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
                .catch(error => {
                    console.log("error: ", error.message);
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: `${error?.message}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                })
        }
        else {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Please Login first !!",
                showConfirmButton: false,
                timer: 1500
            });
            navigate("/login", { state: { from: location } }, { replace: true });
        }
    }

    return (
        <div style={{ background: `${(seat_capacity - enrolled) <= 0 ? 'rgb(252, 165, 165)' : null}` }} className="relative hover:motion-safe:animate-pulse border border-transparent hover:border-neutral rounded-tl-[150px] rounded-br-[150px] shadow-xl">
            <div style={{ background: `url(${shape1}) no-repeat bottom right` }} className="w-full h-full rounded-tl-[150px] rounded-br-[150px]">
                <figure>
                    <img className="h-[250px] w-11/12 rounded-tl-[150px] rounded-br-[150px] shadow-xl" src={image} alt={`Image of ${title}`} />
                </figure>
                {
                    (seat_capacity - enrolled) <= 0 ? <> <span className="absolute border border-black animate-pulse top-5 left-5 badge badge-error">No Seat</span> <span className="absolute border border-black right-5 bottom-5 badge badge-error animate-pulse">No Seat</span></> : null
                }
                <div style={{ background: `url(${shape2}) no-repeat right` }} className="card-body">
                    <div className="flex items-center justify-evenly">
                        <span className="text-xs badge badge-accent">{category_name}</span>
                        <span className="text-xs badge badge-outline badge-info">{level}</span>
                    </div>
                    <h2 className="my-2 card-title">{title}</h2>
                    <p>Rating: {rating}</p>
                    <p>Price: $ {price}</p>
                    <p>Seats: {seat_capacity}</p>
                    <p>Enrolled: {enrolled}</p>
                    <div className="justify-start card-actions">
                        <Link to={`/classes/${_id}`} className="mt-5 btn btn-neutral btn-sm">Details</Link>
                        <button onClick={selectHandler} disabled={seat_capacity - enrolled <= 0 || userData?.role === "admin" ? true : false || userData?.role === "instructor" ? true : false} className="mt-5 btn btn-secondary btn-sm">Select</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassItem;