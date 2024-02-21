import { Link, useLocation, useNavigate } from "react-router-dom";
import shape1 from "../../assets/shapes/shape-10-2.png"
import shape2 from "../../assets/shapes/shape-12-2.png"
import useUsers from '../../hooks/useUsers';
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Class = ({ item }) => {

    const { _id, title, image, description, instructor, duration, price, reviews, seat_capacity, enrolled, category_name, category_id, level, rating } = item;

    const { user } = useContext(AuthContext);
    const [userData] = useUsers();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const selectHandler = async () => {
        if (user) {
            console.log("Selected: ", _id);
            await axiosPublic.post('/selected')
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
                    <img className="h-[250px] w-full md:w-11/12 rounded-tl-[150px] rounded-br-[150px] shadow-xl" src={image} alt={`Image of ${title}`} />
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
                    <p className="mb-2 font-semibold">Price: $ {price}</p>
                    <p>Instructor: {instructor}</p>
                    <p>Total Seats: {seat_capacity}</p>
                    <p>Available Seats: {seat_capacity - enrolled}</p>
                    <p>Enrolled Student: {enrolled}</p>
                    <p>Rating: {rating}</p>
                    <div className="justify-start card-actions">
                        <Link to={`/classes/${_id}`} className="mt-5 btn btn-neutral btn-sm">Details</Link>
                        <button onClick={selectHandler} disabled={(seat_capacity - enrolled) <= 0 || userData?.role === "admin" ? true : false} className="mt-5 btn btn-secondary btn-sm">Select</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Class;