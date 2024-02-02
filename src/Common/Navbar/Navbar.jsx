import { PiHeart, PiListBold, PiShoppingCart, PiSignIn, PiSignOut } from "react-icons/pi";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from '../../providers/AuthProvider';
import Swal from "sweetalert2";

const Navbar = () => {

    const { user, logout } = useContext(AuthContext);

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
        <li><NavLink to="/shop">Our Shop</NavLink></li>
        <li><NavLink to="/contact">Contact Us</NavLink></li>
        {
            (user) ?
                (user) ?
                    <li><NavLink to="/dashboard/user-home">User Dashboard</NavLink></li> :
                    <li><NavLink to="/dashboard/admin-home">Admin Dashboard</NavLink></li> : null
        }
    </>;

    return (
        <div className="relative">
            <div className="z-10 font-semibold text-white bg-black shadow px-auto navbar bg-opacity-30">
                <div className="navbar-start">
                    <details className="dropdown">
                        <summary tabIndex={0} className="btn btn-ghost lg:hidden">
                            <PiListBold className="text-lg" />
                        </summary>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black">
                            {links}
                        </ul>
                    </details>
                    <Link to="/">
                        <img className="md:h-[60px]" src={""} alt="Tasty Food Logo" />
                    </Link>
                </div>
                <div className="hidden navbar-center lg:flex">
                    <ul className="px-1 menu menu-horizontal z-[1]">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end [&>*]:ml-1 hover:[&>*]:text-red-600">
                    {/* <div className="mr-1 drawer-content tooltip" data-tip="Wishlist">
                        <label htmlFor="wishlist-drawer" className="relative drawer-button">
                            <PiHeart className="text-xl md:text-2xl" />
                            <span className="absolute left-0 p-1 top-2 badge badge-primary badge-sm">
                                {
                                    (user && cart) && 0
                                }
                            </span>
                        </label>
                    </div> */}
                    {
                        <div className="mr-3 md:mr-5 drawer-content tooltip" data-tip="Cart">
                            <Link to="/dashboard/my-cart">
                                <PiShoppingCart className="text-xl md:text-2xl" />
                                <span className="absolute p-1 left-4 bottom-4 badge badge-primary badge-sm">
                                    {
                                        (user) &&
                                        0
                                    }
                                </span>
                            </Link>
                        </div>
                    }
                    {(user) ?
                        <>
                            <div className="mr-1 avatar tooltip" data-tip={`${user.displayName}`}>
                                <div className="w-4 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <Link to="/profile">
                                        <img src={user.photoURL} />
                                    </Link>
                                </div>
                            </div>
                            <button onClick={logoutHandler} className="tooltip" data-tip="Logout"><PiSignOut className="text-lg md:text-2xl" /></button>
                        </> :
                        <>
                            <button className="tooltip" data-tip="Login"><Link to="/login"><PiSignIn className="text-lg md:text-2xl" /></Link></button>
                        </>}
                </div>
            </div>
        </div>
    );
};

export default Navbar;