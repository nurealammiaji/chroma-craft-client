import { Helmet } from "react-helmet-async";
import { TbHome, TbHome2, TbInfoHexagon, TbList, TbListCheck, TbListDetails, TbListLetters, TbLogout, TbPhoneCall, TbUserEdit, TbUsers, TbUsersGroup, TbUsersPlus, TbWallet, TbX } from "react-icons/tb";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "/logo.png";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useUser from "../../hooks/useUser";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const Dashboard = () => {

    const { user, logout } = useContext(AuthContext);
    const [userData, refetchUserData] = useUser();

    const { register: register1, handleSubmit: handleSubmit1, watch: watch1, reset: reset1, formState: { errors: errors1 } } = useForm();

    const logoutHandler = () => {
        logout()
            .then(result => {
                console.log(result);
                localStorage.removeItem('chromaCraft-userToken');
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Logged Out !!",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    const updateUser = (data) => {
        const user = {
            name: data.name1,
            email: data.email1,
            phone: data.phone1,
            image: data.image1,
            gender: data.gender1,
            dob: data.dob1,
            role: userData?.role
        }
        fetch(`https://chroma-craft-server.vercel.app/users/${userData._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(result => {
                console.log(result);
                Swal.fire({
                    target: document.getElementById("edit_user"),
                    position: "center",
                    icon: "success",
                    title: "Updated Successfully !!",
                    showConfirmButton: false,
                    timer: 1500
                });
                refetchUserData();
                reset1();
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div>
            <Helmet>
                <title>Dashboard || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="relative flex flex-col items-center justify-center drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="absolute top-0 left-0 rounded-none btn btn-primary btn-xs drawer-button lg:hidden"><TbHome2 className="text-xl" /></label>
                    {
                        <Outlet></Outlet>
                    }

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="relative min-h-full p-4 pt-10 text-lg menu w-80 bg-base-200">
                        {/* Sidebar content here */}
                        <div>
                            <label htmlFor="my-drawer-2" className="absolute top-0 right-0 rounded-none btn btn-primary btn-xs drawer-button lg:hidden"><TbX className="text-xl" /></label>
                        </div>
                        <div className="mb-10">
                            <figure className="w-5/6 mx-auto">
                                <img className="w-full h-full" src={logo} alt="" />
                            </figure>
                        </div>
                        {
                            (user && userData?.role === "admin") &&
                            <>
                                <li><NavLink to={"/dashboard/admin"}><TbHome2 className="text-2xl" /> Admin Home</NavLink></li>
                                <li><NavLink to={"/dashboard/users"}><TbUsersPlus className="text-2xl" />Manage Users</NavLink></li>
                                <li><NavLink to={"/dashboard/classes"}><TbListDetails className="text-2xl" />Manage Classes</NavLink></li>
                                <li><NavLink to={"/dashboard/students"}><TbUsersGroup className="text-2xl" />Manage Students</NavLink></li>
                                <li><NavLink to={"/dashboard/instructors"}><TbUsers className="text-2xl" />Manage Instructors</NavLink></li>
                                <li><NavLink to={"/dashboard/payments"}><TbWallet className="text-2xl" />Manage Payments</NavLink></li>
                            </>
                        }
                        {
                            (user && userData?.role === "instructor") && <>
                                <li><NavLink to={"/dashboard/instructor"}><TbHome2 className="text-2xl" /> Instructor Home</NavLink></li>
                                <li><NavLink to={"/dashboard/add"}><TbListLetters className="text-2xl" /> Add New Class</NavLink></li>
                                <li><NavLink to={"/dashboard/added"}><TbListCheck className="text-2xl" /> Added Classes</NavLink></li>
                            </>
                        }
                        {
                            (user && userData?.role === "student") &&
                            <>
                                <li><NavLink to={"/dashboard/student"}><TbHome2 className="text-2xl" /> Student Home</NavLink></li>
                                <li><NavLink to={"/dashboard/selected"}><TbList className="text-2xl" /> Selected Classes</NavLink></li>
                                <li><NavLink to={"/dashboard/enrolled"}><TbListCheck className="text-2xl" /> Enrolled Classes</NavLink></li>
                            </>
                        }
                        <div className="my-5 divider"></div>
                        <li><Link to={"/"}><TbHome className="text-2xl" />Home</Link></li>
                        <li><Link to={"/about"}><TbInfoHexagon className="text-2xl" />About</Link></li>
                        <li><Link to={"/classes"}><TbListDetails className="text-2xl" /> Classes</Link></li>
                        <li><Link to={"/instructors"}><TbUsers className="text-2xl" /> Instructors</Link></li>
                        <li><Link to={"/contact"}><TbPhoneCall className="text-2xl" /> Contact</Link></li>
                        {
                            (user && userData) &&
                            <div className="flex items-center justify-center w-5/12 py-2 mx-auto mt-10 border rounded-full border-neutral">
                                <div className="mr-3 avatar tooltip" data-tip={`${userData?.name}`}>
                                    <div className="w-6 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2">
                                        <button onClick={() => document.getElementById('edit_user').showModal()}>
                                            <img src={userData?.image} />
                                        </button>
                                    </div>
                                </div>
                                <div className="mr-3">||</div>
                                <button onClick={logoutHandler} className="p-1 btn-circle btn btn-sm tooltip btn-neutral" data-tip="Logout"><TbLogout className="text-2xl" /></button>
                            </div>
                        }
                    </ul>
                </div>
                <dialog id="edit_user" className="modal">
                    <div className="modal-box">
                        <div className="flex items-center">
                            <span><TbUserEdit className="text-2xl font-bold" /></span>
                            <h3 className="ml-3 text-xl font-bold"> Edit Profile</h3>
                        </div>
                        <form method="dialog">
                            <button className="absolute btn btn-sm btn-circle btn-error right-2 top-2">✕</button>
                        </form>
                        <form onSubmit={handleSubmit1(updateUser)}>
                            <label className="flex items-center gap-2 input input-bordered">
                                <span className="w-full font-semibold md:w-fit">Name : </span>
                                <input defaultValue={userData?.name} {...register1("name1", { required: true })} type="text" name="name1" className="w-full grow bg-base-100 md:w-fit" placeholder={userData?.name} />
                            </label>
                            {errors1.name1?.type === 'required' && <label className="label">
                                <span className="text-error">Name is required !!</span>
                            </label>}
                            <br />
                            <label className="flex items-center gap-2 input input-bordered">
                                <span className="w-full font-semibold md:w-fit">Email : </span>
                                <input type="email" name="email1" className="w-full grow bg-base-100 md:w-fit" placeholder={userData?.email} defaultValue={userData?.email} {...register1("email1", { required: true })} />
                            </label>
                            {errors1.email1?.type === 'required' && <label className="label">
                                <span className="text-error">Email is required !!</span>
                            </label>}
                            <br />
                            <label className="flex items-center gap-2 input input-bordered">
                                <span className="w-full font-semibold md:w-fit">Phone : </span>
                                <input type="text" name="phone1" className="w-full grow bg-base-100 md:w-fit" placeholder={userData?.phone} defaultValue={userData?.phone} {...register1("phone1", { required: true })} />
                            </label>
                            {errors1.phone1?.type === 'required' && <label className="label">
                                <span className="text-error">Phone is required !!</span>
                            </label>}
                            <br />
                            <label className="flex items-center gap-2 input input-bordered">
                                <span className="w-full font-semibold md:w-fit">Image : </span>
                                <input type="url" name="image1" className="w-full grow bg-base-100 md:w-fit" placeholder={userData?.image} defaultValue={userData?.image} {...register1("image1", { required: true })} />
                            </label>
                            {errors1.image1?.type === 'required' && <label className="label">
                                <span className="text-error">Image is required !!</span>
                            </label>}
                            <br />
                            <label className="flex items-center gap-2 input input-bordered">
                                <span className="w-full font-semibold md:w-fit">Gender : (<span className="text-warning">{userData?.gender}</span>)</span>
                                <select name="gender1" defaultValue={userData?.gender} className="w-full grow bg-base-100 md:w-fit" {...register1("gender1", { required: true })}>
                                    <option value="">select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="third">Third</option>
                                </select>
                            </label>
                            {errors1.gender1?.type === 'required' && <label className="label">
                                <span className="text-error">Gender is required !!</span>
                            </label>}
                            <br />
                            <label className="flex items-center gap-2 input input-bordered">
                                <span className="w-full font-semibold md:w-fit">DOB : </span>
                                <input type="date" name="dob1" className="w-full grow bg-base-100 md:w-fit" defaultValue={userData?.dob ? userData?.dob : false} {...register1("dob1", { required: true })} />
                            </label>
                            {errors1.dob1?.type === 'required' && <label className="label">
                                <span className="text-error">DOB is required !!</span>
                            </label>}
                            <br /><br />
                            <div className="text-center">
                                <button type="submit" className="btn btn-success">Update</button>
                            </div>
                        </form>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default Dashboard;