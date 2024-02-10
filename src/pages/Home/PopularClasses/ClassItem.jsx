import { Link } from "react-router-dom";
import shape from "../../../assets/shapes/shape-10-2.png"

const ClassItem = ({ item }) => {

    const { _id, title, image, description, instructor, duration, price, reviews, seat_capacity, category_name, category_id, level, rating } = item;
    console.log(item);

    return (
        <div style={{ background: `url(${shape}) no-repeat bottom right` }} className="border border-neutral rounded-tl-[150px] rounded-br-[150px] shadow-xl">
            <div className="w-full rounded-tl-[150px] rounded-br-[150px]">
                <figure>
                    <img className="h-[250px] w-full rounded-tl-[150px] rounded-br-[150px]" src={image} alt={`Image of ${title}`} />
                </figure>
                <div className="card-body">
                    <div className="flex items-center justify-between">
                        <p className="badge badge-info text-xs">{category_name}</p>
                        <p className="badge badge-success text-xs">{level}</p>
                    </div>
                    <h2 className="card-title my-2">{title}</h2>
                    <p>Rating: {rating}</p>
                    <p>Price: $ {price}</p>
                    <p>Seats: {seat_capacity}</p>
                    <div className="justify-start card-actions">
                        <Link to={`/classes/${_id}`}><button className="btn btn-neutral btn-sm mt-5">Details</button></Link>
                        <button className="btn btn-secondary btn-sm mt-5">Enroll</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassItem;