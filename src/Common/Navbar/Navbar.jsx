import { useContext } from "react";
import { AuthContext } from '../../providers/AuthProvider';
import { Link, NavLink } from "react-router-dom";
import { TbLogin, TbLogout, TbSearch, TbShoppingBag, TbMenu2 } from "react-icons/tb";
import Swal from "sweetalert2";
import logo from "/logo.png";
import shape1 from "../../assets/shapes/art-protrait-01.png";
import useUser from "../../hooks/useUser";
import useSelected from '../../hooks/useSelected';


const Navbar = () => {

    const { user, logout} = useContext(AuthContext);
    const [userData] = useUser();
    const [selected] = useSelected();

    const logoutHandler = () => {
        logout()
            .then(result => {
                console.log(result);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Logged Out !",
                    showConfirmButton: false,
                    timer: 1500
                });
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
    </>;

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
                        <label htmlFor="wishlist-drawer" className="relative drawer-button">
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
                        (user) ?
                            <>
                                <div className="mr-1 avatar tooltip" data-tip={`${user?.displayName}`}>
                                    <div className="w-4 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <Link to="/profile">
                                            <img src={user.photoURL} />
                                        </Link>
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
            <br /><br />
        </nav>
    );
};

export default Navbar;