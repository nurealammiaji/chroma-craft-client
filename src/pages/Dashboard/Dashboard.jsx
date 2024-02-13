import { Helmet } from "react-helmet-async";
import { TbChecklist, TbHome, TbHome2, TbList, TbListCheck, TbX } from "react-icons/tb";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
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
                    <label htmlFor="my-drawer-2" className="absolute top-0 left-0 rounded-none btn btn-primary btn-xs drawer-button lg:hidden"><TbHome className="text-xl" /></label>
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
                        <li><NavLink to={"/dashboard/admin"}><TbHome2 className="text-2xl" /> Admin Home</NavLink></li>
                        <li><NavLink to={"/dashboard/instructor"}><TbHome2 className="text-2xl" /> Instructor Home</NavLink></li>
                        <li><NavLink to={"/dashboard/student"}><TbHome2 className="text-2xl" /> Student Home</NavLink></li>
                        <li><NavLink to={"/dashboard/selected"}><TbList className="text-2xl" /> Selected Class</NavLink></li>
                        <li><NavLink to={"/dashboard/enrolled"}><TbListCheck className="text-2xl" /> Enrolled Class</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;