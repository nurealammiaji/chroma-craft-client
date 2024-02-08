import { Link } from "react-router-dom";

const Category = ({ category }) => {

    const { name, image, icon, category_id, description } = category;

    return (
        <div className="border border-neutral hover:bg-secondary hover:bg-opacity-30 rounded-t-full rounded-bl-full">
            <Link to={`/categories/${category_id}`}>
                <div className="card card-side w-full rounded-t-full rounded-bl-full glass md:h-[180px]">
                    <figure className="max-w-[150px]">
                        <img className="w-full h-full" src={image} alt={`Photo of ${name}`} />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title justify-center">{name}</h2>
                        <div className="card-actions justify-center mt-10">
                            <button className="btn btn-xs btn-neutral">See Classes</button>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Category;