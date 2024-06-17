import { Helmet } from "react-helmet-async";
import { TbHome, TbHome2, TbInfoHexagon, TbList, TbListCheck, TbListDetails, TbListLetters, TbLogout, TbPhoneCall, TbUsers, TbUsersGroup, TbUsersPlus, TbWallet, TbX } from "react-icons/tb";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "/logo.png";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useUser from "../../hooks/useUser";
import Swal from "sweetalert2";

const Dashboard = () => {

    const { user, logout } = useContext(AuthContext);
    const [userData] = useUser();

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
                            (user) &&
                            <div className="flex items-center justify-center w-5/12 py-2 mx-auto mt-10 border-2 rounded-full border-neutral">
                                <div className="mr-3 avatar tooltip" data-tip={`${userData?.name}`}>
                                    <div className="w-6 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <button>
                                            <img src={userData?.image} />
                                        </button>
                                    </div>
                                </div>
                                <div className="mr-3 text-xl">||</div>
                                <button onClick={logoutHandler} className="p-1 btn btn-sm btn-circle tooltip btn-primary" data-tip="Logout"><TbLogout className="text-2xl" /></button>
                            </div>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;