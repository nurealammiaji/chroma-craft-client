import Category from "./Category";
import { DNA } from "react-loader-spinner";
import shape from "../../../assets/6.png";
import SectionHeader from '../../../components/SectionHeader/SectionHeader';
import useCategories from '../../../hooks/useCategories';


const TopCategories = () => {

    const [categories] = useCategories();

    return (
        <div>
            <SectionHeader title={"Top Categories"} background={shape}></SectionHeader>
            <br /><br />
            <div>
                {
                    (categories) ?
                        <div className="grid gap-5 md:grid-cols-2">
                            {
                                (categories) &&
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

export default TopCategories;