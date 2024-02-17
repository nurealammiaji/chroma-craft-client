import { Link } from "react-router-dom";
import shape from "../../../assets/shapes/shape-10-2.png"

const Category = ({ category }) => {

    const { name, image, icon, category_id, description } = category;

    return (
        <div className="border border-transparent rounded-lg shadow-lg hover:animate-pulse hover:bg-pink-500 hover:bg-opacity-30 hover:border-neutral">
            <div style={{ background: `url(${shape}) top right no-repeat` }} className="grid h-full grid-cols-3 rounded-lg glass">
                <figure>
                    <img className="w-full h-full mr-auto rounded-l-lg shadow-xl" src={image} alt={`Photo of ${name}`} />
                </figure>
                <div className="col-span-2 card-body">
                    <h2 className="justify-start font-semibold card-title tex-lg">{name}</h2>
                    <div className="justify-start mt-5 card-actions">
                        <Link to={`/categories/${category_id}`}>
                            <button className="btn btn-xs btn-neutral">See Classes</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Category;