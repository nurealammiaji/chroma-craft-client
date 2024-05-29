import { Helmet } from "react-helmet-async";
import SectionHeader from "../../../../components/SectionHeader/SectionHeader";
import { DNA } from "react-loader-spinner";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useUser from '../../../../hooks/useUser';

const AddedClasses = () => {

    const [userData] = useUser();
    const [instructorClasses, setInstructorClasses] = useState();
    const [classInfo, setClassInfo] = useState({});
    const [categoryInfo, setCategoryInfo] = useState({});

    useEffect(() => {
        if (userData && userData.role === 'instructor') {
            fetch(`https://chroma-craft-server.vercel.app/classes/${userData?.email}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setClassInfo(data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [userData])

    const handleEditClass = (data) => {
        const editClass = {
            course_id: classInfo?.course_id,
            title: data?.title1,
            description: data?.description1,
            instructor: classInfo?.instructor,
            instructor_id: classInfo?.instructor_id,
            instructor_email: classInfo?.instructor_email,
            instructor_image: classInfo?.instructor_image,
            duration: data?.duration1,
            price: parseFloat(data?.price1),
            seat_capacity: parseInt(data?.seat1),
            enrolled: classInfo?.enrolled,
            level: data?.level1,
            rating: parseFloat(classInfo?.rating),
            image: data?.image1,
            category_id: categoryInfo?.category_id,
            category_name: categoryInfo?.name,
            reviews: classInfo?.reviews,
            status: data?.status1
        };
        console.log(editClass);
        fetch(`https://chroma-craft-server.vercel.app/classes/${classInfo?._id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(editClass)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                Swal.fire({
                    target: document.getElementById('edit_class'),
                    position: "center",
                    icon: "success",
                    title: "Updated Successfully !!",
                    showConfirmButton: false,
                    timer: 1500
                });
                refetchClasses();
                reset1();
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Added Class || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
            <div className="w-screen p-5 md:w-full">
                <div className="mt-5">
                    <SectionHeader title={"Added Class"}></SectionHeader>
                </div>
                <br /><br />
                <div className="overflow-x-auto">
                    {
                        (classes) ?
                            <table className="table bg-white">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>SN</th>
                                        <th>Class</th>
                                        <th>Information</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row */}
                                    {
                                        (classes) &&
                                        classes.map((item, index) => <ClassRow key={item._id} index={index + 1} item={item} handleEditClassModal={handleEditClassModal} handleDeleteClass={handleDeleteClass} ></ClassRow>)
                                    }
                                </tbody>
                            </table> :
                            <>
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

export default AddedClasses;