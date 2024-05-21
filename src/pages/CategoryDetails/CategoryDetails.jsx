import { Helmet } from "react-helmet-async";
import { useLoaderData, useParams } from "react-router-dom";
import { DNA } from "react-loader-spinner";
import { useEffect, useState } from "react";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import { TbListDetails, TbUsersGroup } from "react-icons/tb";
import ClassCard from '../../components/ClassCard/ClassCard';

const CategoryDetails = () => {

    const params = useParams();
    const classes = useLoaderData();
    const [category, setCategory] = useState(null);

    let enrolledStudents = 0;

    if (classes) {
        console.log(classes);
        const total = classes.reduce((total, item) => total + item.enrolled, 0);
        enrolledStudents = parseInt(total);
        console.log(total);
    }

    useEffect(() => {
        fetch(`https://chroma-craft-server.vercel.app/categories/${params?.id}`)
            .then(res => res.json())
            .then(data => setCategory(data))
            .catch(error => console.log(error))
    }, [params])

    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Category Details || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
            <div>
                <div className="w-11/12 mx-auto">
                    {
                        (category) ?
                            <div className="md:h-[350px] grid-cols-2 shadow-xl md:grid card lg:card-side bg-base-100">
                                <figure>
                                    <img className="w-full h-full" src={category?.image} alt="Instructor Image" />
                                </figure>
                                <div className="card-body">
                                    <h2 className="text-4xl card-title">{category?.name}</h2>
                                    <br />
                                    <div className="flex items-center mt-2">
                                        <TbListDetails className="mr-2 text-xl" />
                                        <p><span className="font-medium">Total Classes:</span> <span className="text-base badge">{classes?.length}</span></p>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <TbUsersGroup className="mr-2 text-xl" />
                                        <p><span className="font-medium">Enrolled Students:</span> <span className="text-base badge">{enrolledStudents}</span></p>
                                    </div>
                                    <div className="mt-5">
                                        <p className="text-base-content">{category?.description}</p>
                                    </div>
                                </div>
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
                <br /><br />
                <div>
                    <SectionHeader title={"Category's Classes"} ></SectionHeader>
                </div>
                <br /><br />
                <div className="w-11/12 mx-auto">
                    {
                        (classes) ?
                            <div className="grid gap-5 md:grid-cols-3">
                                {
                                    (classes) &&
                                    classes.map(item => <ClassCard key={item._id} item={item}></ClassCard>)
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
        </div>
    );
};

export default CategoryDetails;