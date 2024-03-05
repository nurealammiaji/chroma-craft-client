import { Helmet } from "react-helmet-async";
import { useLoaderData, useParams } from "react-router-dom";
import ClassCard from "./ClassCard";
import { DNA } from "react-loader-spinner";
import { useEffect, useState } from "react";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import bg from "../../assets/6.png"
import { TbCategory, TbList, TbMail, TbUsersGroup } from "react-icons/tb";

const InstructorDetails = () => {

    const params = useParams();
    const classes = useLoaderData();
    const [instructor, setInstructor] = useState(null);

    let enrolledStudents = 0;

    if (classes) {
        console.log(classes);
        const total = classes.reduce((total, item) => total + item.enrolled, 0);
        enrolledStudents = parseInt(total);
        console.log(total);
    }

    useEffect(() => {
        fetch(`http://localhost:5000/instructors/${params?.id}`)
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
                                        <p><span className="font-medium">Category:</span> <span className="text-base badge badge-accent badge-outline">{instructor?.category_name}</span></p>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <TbList className="mr-2 text-xl" />
                                        <p><span className="font-medium">Total Classes:</span> <span className="text-base badge">{instructor?.total_classes}</span></p>
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
                    <SectionHeader title={"Instructor's Classes"} background={bg} ></SectionHeader>
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

export default InstructorDetails;