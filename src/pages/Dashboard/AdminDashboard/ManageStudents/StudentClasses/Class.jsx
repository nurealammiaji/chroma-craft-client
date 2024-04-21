import { Link } from "react-router-dom";
import shape1 from "../../../../../assets/shapes/shape-10-2.png"
import shape2 from "../../../../../assets/shapes/shape-12-2.png"

const Class = ({ item }) => {

    const { _id, class_id, class_image, class_title, class_price, class_duration, instructor_name, category_name, student_name } = item;

    return (
        <div className="relative hover:motion-safe:animate-pulse border border-transparent hover:border-neutral rounded-tl-[150px] rounded-br-[150px] shadow-xl">
            <button data-tip="Delele" className="tooltip absolute btn btn-error btn-sm btn-circle">X</button>
            <div style={{ background: `url(${shape1}) no-repeat bottom right` }} className="w-full h-full rounded-tl-[150px] rounded-br-[150px]">
                <figure>
                    <img className="h-[250px] w-full md:w-11/12 rounded-tl-[150px] rounded-br-[150px] shadow-xl" src={class_image} alt={`Image of ${class_title}`} />
                </figure>
                <div style={{ background: `url(${shape2}) no-repeat right` }} className="card-body">
                    <div className="flex items-start">
                        <span className="text-xs badge badge-accent">{category_name}</span>
                    </div>
                    <h2 className="my-2 card-title">{class_title}</h2>
                    <p className="mb-2 font-semibold">Price: $ {class_price}</p>
                    <p>Instructor: {instructor_name}</p>
                    <p>Class Duration: {class_duration}</p>
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