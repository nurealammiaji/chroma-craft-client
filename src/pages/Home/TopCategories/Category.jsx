import { Link } from "react-router-dom";
import shape from "../../../assets/shapes/shape-10-2.png"

const Category = ({ category }) => {

    const { name, image, icon, category_id, description } = category;

    return (
        <div className="hover:animate-pulse border rounded-tl-full rounded-br-full shadow-xl border-neutral hover:bg-pink-500 hover:bg-opacity-30">
            <div style={{ background: `url(${shape}) top right no-repeat` }} className="card card-side w-full h-[150px] rounded-br-full rounded-tl-full glass">
                <figure className="rounded-br-full rounded-tl-full h-[150px] shadow-xl">
                    <img className="w-[200px] h-full" src={image} alt={`Photo of ${name}`} />
                </figure>
                <div className="card-body">
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