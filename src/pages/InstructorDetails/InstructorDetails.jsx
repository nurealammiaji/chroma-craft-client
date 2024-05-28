import { Helmet } from "react-helmet-async";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { DNA } from "react-loader-spinner";
import { useEffect, useState } from "react";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import { TbCategory, TbListDetails, TbMail, TbUsersGroup } from "react-icons/tb";
import ClassCard from "../../components/ClassCard/ClassCard";

const InstructorDetails = () => {

    const params = useParams();
    const classes = useLoaderData();
    const [instructor, setInstructor] = useState(null);

    let approvedClasses;
    if (classes) {
        approvedClasses = classes.filter(item => item.status === "approved");
    }

    let enrolledStudents = 0;
    if (approvedClasses) {
        const total = approvedClasses.reduce((total, item) => total + item.enrolled, 0);
        enrolledStudents = parseInt(total);
    }

    useEffect(() => {
        fetch(`https://chroma-craft-server.vercel.app/instructors/${params?.id}`)
            .then(res => res.json())
            .then(data => setInstructor(data))
            .catch(error => console.log(error))
    }, [params])

    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Instructor Details || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
            <div>
                <div className="w-11/12 mx-auto">
                    {
                        (instructor) ?
                            <div className="md:h-[350px] grid-cols-2 shadow-xl md:grid card lg:card-side bg-base-100">
                                <figure>
                                    <img className="w-full h-full" src={instructor?.instructor_image} alt="Instructor Image" />
                                </figure>
                                <div className="card-body">
                                    <h2 className="text-3xl card-title">{instructor?.instructor}</h2>
                                    <br />
                                    <div className="flex items-center mt-8">
                                        <TbMail className="mr-2 text-xl" />
                                        <p>{instructor?.instructor_email}</p>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <TbCategory className="mr-2 text-xl" />
                                        <p><span className="font-medium">Category:</span> <Link to={`/categories/${instructor?.category_id}`}><span className="text-base badge badge-accent badge-outline">{instructor?.category_name}</span></Link></p>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <TbListDetails className="mr-2 text-xl" />
                                        <p><span className="font-medium">Total Classes:</span> <span className="text-base badge">{approvedClasses?.length}</span></p>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <TbUsersGroup className="mr-2 text-xl" />
                                        <p><span className="font-medium">Enrolled Students:</span> <span className="text-base badge">{enrolledStudents}</span></p>
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
                    <SectionHeader title={"Instructor's Classes"} ></SectionHeader>
                </div>
                <br /><br />
                <div className="w-11/12 mx-auto">
                    {
                        (classes) ?
                            <div className="grid gap-5 md:grid-cols-3">
                                {
                                    (approvedClasses) &&
                                    approvedClasses.map(item => <ClassCard key={item._id} item={item}></ClassCard>)
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

export default InstructorDetails;