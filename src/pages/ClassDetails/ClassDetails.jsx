import { Helmet } from "react-helmet-async";
import { Link, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { DNA } from "react-loader-spinner";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import { TbCategory, TbClock, TbMessage, TbStar, TbUser, TbUsersGroup } from "react-icons/tb";

import { useContext, useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './ClassDetails.css';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Swal from "sweetalert2";
import useUser from "../../hooks/useUser";
import useSelected from "../../hooks/useSelected";
import { AuthContext } from "../../providers/AuthProvider";

const ClassDetails = () => {

    const classInfo = useLoaderData();

    const { _id, title, image, description, instructor, instructor_id, instructor_email, instructor_image, duration, price, reviews, seat_capacity, enrolled, category_name, category_id, level, rating } = classInfo;

    const { user } = useContext(AuthContext);
    const [userData] = useUser();
    const [, refetchSelected] = useSelected();
    const [isSelected, setIsSelected] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };

    const selectHandler = () => {
        if (user) {
            const order = {
                class_id: _id,
                class_title: title,
                class_price: price,
                class_duration: duration,
                class_image: image,
                class_description: description,
                category_id: category_id,
                category_name: category_name,
                instructor_id: instructor_id,
                instructor_name: instructor,
                instructor_email: instructor_email,
                instructor_image: instructor_image,
                enrolled: enrolled,
                student_name: userData?.name,
                student_email: userData?.email,
                student_phone: userData?.phone,
                student_image: userData?.image,
            };
            console.log(order);
            fetch("https://chroma-craft-server.vercel.app/selected", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(order)
            })
                .then(res => res.json())
                .then(data => {
                    if (data?.acknowledged === true) {
                        setIsSelected(true);
                        refetchSelected();
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Selected Successfully !!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                    else {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: `${data?.message}`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
                .catch(error => {
                    console.log("error: ", error.message);
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: `${error?.message}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                })
        }
        else {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Please Login first !!",
                showConfirmButton: false,
                timer: 1500
            });
            navigate("/login", { state: { from: location } }, { replace: true });
        }
    }

    useEffect(() => {
        if (user && userData?.role === "student") {
            fetch(`https://chroma-craft-server.vercel.app/selected/${_id}?email=${userData?.email}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(data => {
                    setIsSelected(data)
                })
                .catch
        }
        else {
            user === null && setIsSelected(false)
        }
    }, [_id, userData, user]);

    useEffect(() => {
        if (user && userData?.role === "student") {
            fetch(`https://chroma-craft-server.vercel.app/enrolled/${_id}?email=${userData?.email}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(data => {
                    setIsEnrolled(data)
                })
                .catch
        }
        else {
            user === null && setIsEnrolled(false)
        }
    }, [_id, userData, user]);

    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Class Details || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
            <div>
                <div className="w-11/12 mx-auto">
                    {
                        (classInfo) ?
                            <div style={{ background: `${(seat_capacity - enrolled) <= 0 ? 'rgb(252, 165, 165)' : '' || (isEnrolled) ? 'rgb(144, 207, 148)' : '' || (isSelected) ? 'rgb(245, 231, 133)' : ''}` }} className="md:min-h-[350px] grid-cols-2 shadow-xl md:grid card lg:card-side bg-base-100">
                                <figure>
                                    <img className="w-full h-full" src={image} alt="Class Image" />
                                </figure>
                                {
                                    (seat_capacity - enrolled) <= 0 ? <> <span className="absolute border border-black top-5 left-5 badge badge-error">No Seat</span> <span className="absolute border border-black right-5 bottom-5 badge badge-error">No Seat</span></> : null || (isEnrolled) ? <> <span className="absolute border border-black top-5 left-5 badge badge-success">Enrolled</span> <span className="absolute border border-black right-5 bottom-5 badge badge-success">Enrolled</span></> : null || (isSelected) ? <> <span className="absolute border border-black top-5 left-5 badge badge-warning">Selected</span> <span className="absolute border border-black right-5 bottom-5 badge badge-warning">Selected</span></> : null
                                }
                                <div className="card-body">
                                    <h2 className="text-3xl card-title">{title}</h2>
                                    <br />
                                    <div className="flex items-center mt-5">
                                        <TbUser className="mr-2 text-xl" />
                                        <p><span className="font-medium">Instructor:</span> <Link to={`/instructors/${instructor_id}`}><span className="text-base badge badge-info">{instructor}</span></Link></p>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <TbCategory className="mr-2 text-xl" />
                                        <p><span className="font-medium">Category:</span> <Link to={`/categories/${category_id}`}><span className="text-base badge badge-accent">{category_name}</span></Link></p>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <TbClock className="mr-2 text-xl" />
                                        <p><span className="font-medium">Class Duration:</span> <span className="text-base badge">{duration}</span></p>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <TbUsersGroup className="mr-2 text-xl" />
                                        <p><span className="font-medium">Enrolled Students:</span> <span className="text-base badge">{enrolled}</span></p>
                                    </div>
                                    <button onClick={selectHandler} disabled={seat_capacity - enrolled <= 0 || userData?.role === "admin" ? true : false || userData?.role === "instructor" ? true : false || isEnrolled ? true : false || isSelected ? true : false} className="w-6/12 mx-auto mt-5 btn btn-secondary btn-sm">Select</button>

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
                    <SectionHeader title={"Class Reviews"} ></SectionHeader>
                </div>
                <br /><br />
                <div className="w-11/12 mx-auto">
                    {
                        (classInfo && reviews) ?
                            <Swiper
                                spaceBetween={30}
                                centeredSlides={true}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                pagination={{
                                    clickable: true,
                                }}
                                navigation={true}
                                modules={[Autoplay, Pagination, Navigation]}
                                onAutoplayTimeLeft={onAutoplayTimeLeft}
                                className="mySwiper"
                            >
                                {
                                    (reviews) &&
                                    reviews.map((item) => <SwiperSlide key={item._id}>
                                        <div className="w-full grid-cols-2 border md:grid card lg:card-side">
                                            <figure className="h-[400px]">
                                                <img className="w-full h-full" src={item.user_image} alt="User Image" />
                                            </figure>
                                            <div className="text-left card-body md:mt-8">
                                                <h2 className="justify-center text-3xl md:justify-start card-title">{item.user}</h2>
                                                <br />
                                                <div className="flex items-center mt-8">
                                                    <TbStar className="mr-2 text-xl" />
                                                    <p><span className="font-medium">User Rating:</span> <span className="text-base badge">{item.user_rating}</span></p>
                                                </div>
                                                <div>
                                                    <div className="flex items-center mt-3">
                                                        <TbMessage className="mr-2 text-xl" />
                                                        <p><span className="font-medium">User Comment:</span></p>
                                                    </div>
                                                    <p className="mt-5 italic">{`"${item.comment}"`}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>)
                                }
                                <div className="autoplay-progress" slot="container-end">
                                    <svg viewBox="0 0 48 48" ref={progressCircle}>
                                        <circle cx="24" cy="24" r="20"></circle>
                                    </svg>
                                    <span ref={progressContent}></span>
                                </div>
                            </Swiper> : <>
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

export default ClassDetails;