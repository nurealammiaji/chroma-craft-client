import { Link } from "react-router-dom";
import shape1 from "../../../assets/shapes/shape-10-2.png"
import shape2 from "../../../assets/shapes/shape-12-2.png"

const ClassItem = ({ item }) => {

    const { _id, title, image, description, instructor, duration, price, reviews, seat_capacity, category_name, category_id, level, rating } = item;

    return (
        <div style={{ background: `url(${shape1}) no-repeat bottom right` }} className="hover:motion-safe:animate-pulse border hover:border-neutral rounded-tl-[150px] rounded-br-[150px] shadow-xl">
                <div className="w-full rounded-tl-[150px] rounded-br-[150px]">
                    <figure>
                        <img className="h-[250px] w-full md:w-11/12 rounded-tl-[150px] rounded-br-[150px] shadow-xl" src={image} alt={`Image of ${title}`} />
                    </figure>
                    <div style={{ background: `url(${shape2}) no-repeat right` }} className="card-body">
                        <div className="flex items-center justify-evenly">
                            <span className="text-xs badge badge-accent">{category_name}</span>
                            <span className="text-xs badge badge-outline badge-primary">{level}</span>
                        </div>
                        <h2 className="my-2 card-title">{title}</h2>
                        <p>Rating: {rating}</p>
                        <p>Price: $ {price}</p>
                        <p>Seats: {seat_capacity}</p>
                        <div className="justify-start card-actions">
                            <Link to={`/classes/${_id}`}><button className="mt-5 btn btn-neutral btn-sm">Details</button></Link>
                            <button className="mt-5 btn btn-secondary btn-sm">Enroll</button>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default ClassItem;