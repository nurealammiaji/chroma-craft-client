import { useEffect, useState } from "react";
import Category from "./Category";
import { DNA } from "react-loader-spinner";
import shape2 from "../../../assets/6.png"

const Categories = () => {

    const [categories, setCategories] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [])

    console.log(categories);

    return (
        <div >
            <div className="text-center" style={{ background: `url(${shape2}) center no-repeat` }}>
                <h3 className="text-4xl font-semibold py-5 text-white">Top Categories</h3>
            </div>
            <br /><br />
            <div>
                {
                    (categories) ?
                        <div className="grid gap-5 md:grid-cols-3">
                            {
                                categories.map(category => <Category key={category._id} category={category}></Category>)
                            }
                        </div> : <>
                            <div className="flex items-center justify-center">
                                <DNA
                                    visible={true}
                                    height="80"
                                    width="80"
                                    ariaLabel="dna-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="dna-wrapper"
                                />
                            </div>
                        </>
                }
            </div>
        </div>
    );
};

export default Categories;