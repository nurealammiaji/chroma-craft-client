import { TbCircleArrowRight } from "react-icons/tb";
import { Link } from "react-router-dom";
import shape from "../../assets/shapes/art-protrait-03.png"

const Instructor = ({ item }) => {

    const { _id, instructor_id, instructor, instructor_email, instructor_image, total_classes, classes_name, category_name, category_id } = item;

    return (
        <div className="border shadow-xl hover:motion-safe:animate-pulse hover:border-neutral rounded-2xl">
            <div style={{ background: `url(${shape}) bottom right no-repeat` }} className="w-full h-full card glass">
                <figure className="shadow-xl">
                    <img className="w-full h-[240px]" src={instructor_image} alt={`Image of ${instructor}`} />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{instructor}</h2>
                    <p className="my-3">{instructor_email}</p>
                    <p>Expertise: <span className="badge badge-accent">{category_name}</span></p>
                    <p className="mt-2">Classes Taken: {total_classes}</p>
                    <div className="justify-start mt-10 card-actions">
                        <Link to={`/instructors/${instructor_id}`}>
                            <button className="btn btn-primary btn-outline">See Classes <TbCircleArrowRight className="text-xl" /></button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Instructor;