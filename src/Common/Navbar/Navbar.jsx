import { useContext, useEffect, useState } from "react";
import { AuthContext } from '../../providers/AuthProvider';
import { Link, NavLink } from "react-router-dom";
import { TbLogin, TbLogout, TbSearch, TbShoppingBag, TbMenu2, TbUserEdit, TbX } from "react-icons/tb";
import Swal from "sweetalert2";
import logo from "/logo.png";
import shape1 from "../../assets/shapes/art-protrait-01.png";
import useSelected from '../../hooks/useSelected';
import { useForm } from "react-hook-form";
import useUser from '../../hooks/useUser';


const Navbar = () => {

    const { user, logout } = useContext(AuthContext);
    const [userData, refetchUserData] = useUser();
    const [selected] = useSelected();
    const [searchResult, setSearchResult] = useState();

    const { register: register1, handleSubmit: handleSubmit1, watch: watch1, reset: reset1, formState: { errors: errors1 } } = useForm();

    const { register: register2, handleSubmit: handleSubmit2, watch: watch2, reset: reset2, formState: { errors: errors2 } } = useForm();

    const searchText = watch2("searchText");

    useEffect(() => {
        if (searchText?.length <= 0) {
            setSearchResult(null);
        }
    }, [searchText?.length])

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
        console.log({ user });
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

    const handleSearch = (data) => {
        console.log(data);
        fetch(`https://chroma-craft-server.vercel.app/search?text=${data.searchText}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setSearchResult(data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const links = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/instructors">Instructors</NavLink></li>
        <li><NavLink to="/classes">Classes</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
        {
            (user && userData?.role === "admin") &&
            <li><NavLink to="/dashboard/admin">Dashboard</NavLink></li>
        }
        {
            (user && userData?.role === "instructor") &&
            <li><NavLink to="/dashboard/instructor">Dashboard</NavLink></li>
        }
        {
            (user && userData?.role === "student") &&
            <li><NavLink to="/dashboard/student">Dashboard</NavLink></li>
        }
    </>

    return (
        <nav className="relative">
            <div style={{ background: `url(${shape1}) center no-repeat` }} className="fixed z-10 max-w-screen-xl font-semibold text-pink-800 border rounded-full shadow-md px-auto navbar border-primary top-1">
                <div className="navbar-start">
                    <details className="dropdown">
                        <summary tabIndex={0} className="mr-2 btn btn-sm lg:hidden">
                            <TbMenu2 className="text-2xl" />
                        </summary>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {links}
                        </ul>
                    </details>
                    <Link to="/">
                        <img className="md:h-[60px]" src={logo} alt="Chroma Craft" />
                    </Link>
                </div>
                <div className="hidden navbar-center lg:flex">
                    <ul className="p-3 menu menu-horizontal z-[1] bg-primary bg-opacity-20 rounded-full font-medium text-base">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end [&>*]:ml-1 hover:[&>*]:text-purple-700 text-base">
                    <div className="mr-1 drawer-content tooltip" data-tip="Search">
                        <label htmlFor="search" className="relative drawer-button">
                            <TbSearch className="text-xl md:text-2xl" />
                        </label>
                    </div>
                    {
                        <div className="mr-3 drawer-content tooltip" data-tip="Cart">
                            <Link to="/dashboard/selected">
                                <TbShoppingBag className="text-xl md:text-2xl" />
                                <span className="absolute p-1 left-3 top-3 badge badge-secondary badge-sm">
                                    {
                                        (selected) ?
                                            selected?.length : 0
                                    }
                                </span>
                            </Link>
                        </div>
                    }
                    {
                        (user && userData) ?
                            <>
                                <div className="mr-1 avatar tooltip" data-tip={`${userData?.name}`}>
                                    <div className="w-4 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <button onClick={() => document.getElementById('edit_user').showModal()}>
                                            <img src={userData?.image} />
                                        </button>
                                    </div>
                                </div>
                                <button onClick={logoutHandler} className="tooltip" data-tip="Logout"><TbLogout className="text-lg md:text-2xl" /></button>
                            </> :
                            <>
                                <button className="tooltip" data-tip="Login"><Link to="/login"><TbLogin className="text-lg md:text-2xl" /></Link></button>
                            </>
                    }
                </div>
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
            <div style={{ zIndex: 1000 }} className="drawer drawer-end">
                <input id="search" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                </div>
                <div className="drawer-side">
                    <label htmlFor="search" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="min-h-full p-4 menu w-80 bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <form onSubmit={handleSubmit2(handleSearch)} className="my-0 mb-4">
                            <label className="flex items-center gap-2 input input-bordered">
                                <input type="text" className="bg-transparent grow" placeholder="Search" name="searchText" {...register2("searchText", { required: true })} />
                                <button type="submit" className="tooltip tooltip-bottom" data-tip="Search"><TbSearch className="text-xl" /></button>
                            </label>
                            {errors2.searchText?.type === 'required' && <label className="mt-3 label">
                                <span className="text-error">Please type keyword !!</span>
                            </label>}
                            {
                                (searchResult) &&
                                <label className="mt-3 label">
                                    <span className="text-success">Found {searchResult?.length} {searchResult.length <= 1 ? "Result" : "Results"} !!</span>
                                </label>
                            }
                        </form>
                        {
                            (searchResult) &&
                            searchResult.map((item, index) => <li key={item._id}><Link to={`/classes/${item?._id}`}>{index + 1}. {item?.title}</Link></li>)
                        }
                    </ul>
                </div>
            </div>
            <br /><br />
        </nav>
    );
};

export default Navbar;