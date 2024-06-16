import { TbCircleArrowRight } from "react-icons/tb";
import { Link } from "react-router-dom";
import shape from "../../../assets/shapes/art-protrait-03.png"
import useClasses from "../../../hooks/useClasses";

const PopularInstructor = ({ item }) => {

    const { _id, instructor_id, instructor, instructor_email, instructor_image, total_classes, classes_name, category_name, category_id } = item;

    const [classes] = useClasses();

    let instructorClasses;
    if (classes) {
        instructorClasses = classes.filter(item => item.instructor_email === instructor_email && item.status === "approved");
    }

    let instructorCategories;
    if (instructorClasses) {
        instructorCategories = instructorClasses.map(item => item.category_name);
        instructorCategories = [...new Set(instructorCategories)]
        instructorCategories = instructorCategories.join(", ");
    }

    return (
        <div className="border shadow-xl hover:motion-safe:animate-pulse hover:border-neutral rounded-2xl">
            <div style={{ background: `url(${shape}) bottom right no-repeat` }} className="w-full h-full card glass">
                <figure>
                    <img className="w-full h-[240px]" src={instructor_image} alt={`Image of ${instructor}`} />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{instructor}</h2>
                    <p className="my-3">{instructor_email}</p>
                    <p><span className="font-medium">Expertise:</span> <span className="text-accent">{instructorCategories}</span></p>
                    <div className="justify-start mt-10 card-actions">
                        <Link to={`/instructors/${instructor_id}`}>
                            <button className="btn btn-primary btn-outline">More Info <TbCircleArrowRight className="text-xl" /></button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopularInstructor;