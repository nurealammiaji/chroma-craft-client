import { Helmet } from "react-helmet-async";
import { Link, useLoaderData } from "react-router-dom";
import { DNA } from "react-loader-spinner";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import bg from "../../assets/6.png"
import { TbCategory, TbClock, TbMessage, TbStar, TbUser, TbUsersGroup } from "react-icons/tb";

import { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './ClassDetails.css';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const ClassDetails = () => {

    const classInfo = useLoaderData();
    const { _id, title, image, reviews, category_name, category_id, enrolled, instructor, instructor_email, instructor_id, seat_capacity, duration, level, rating } = classInfo;

    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };

    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Instructor Details || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
            <div>
                <div className="w-11/12 mx-auto">
                    {
                        (classInfo) ?
                            <div className="md:h-[350px] grid-cols-2 shadow-xl md:grid card lg:card-side bg-base-100">
                                <figure>
                                    <img className="w-full h-full" src={image} alt="Class Image" />
                                </figure>
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
                    <SectionHeader title={"Class Reviews"} background={bg} ></SectionHeader>
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
                                    reviews.map((item) => <SwiperSlide key={item._id}>
                                        <div className="md:h-[350px] w-full md:grid grid-cols-2 shadow-xl card lg:card-side bg-base-100 rounded-lg">
                                            <figure>
                                                <img className="rounded-lg w-full max-h-[300px] min-h-[300px] md:h-full" src={item.user_image} alt="User Image" />
                                            </figure>
                                            <div className="card-body text-left md:mt-8">
                                                <h2 className="text-3xl card-title justify-center">{item.user}</h2>
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
                                                    <p className="mt-5 italic">{`" ${item.comment} "`}</p>
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