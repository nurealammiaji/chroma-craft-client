import { TbHome, TbX } from "react-icons/tb";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="relative flex flex-col items-center justify-center drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="absolute top-0 left-0 rounded-none btn btn-primary btn-xs drawer-button lg:hidden"><TbHome className="text-xl" /></label>
                    {
                        <Outlet></Outlet>
                    }

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="relative min-h-full p-4 pt-10 menu w-80 bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <div>
                            <label htmlFor="my-drawer-2" className="absolute top-0 right-0 rounded-none btn btn-primary btn-xs drawer-button lg:hidden"><TbX className="text-xl" /></label>
                        </div>
                        <li><NavLink to={"/dashboard/admin"}>Admin</NavLink></li>
                        <li><NavLink to={"/dashboard/instructor"}>Instructor</NavLink></li>
                        <li><NavLink to={"/dashboard/student"}>Student</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;