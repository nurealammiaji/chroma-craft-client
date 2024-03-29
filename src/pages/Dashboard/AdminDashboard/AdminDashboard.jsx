import { Helmet } from "react-helmet-async";

const AdminDashboard = () => {
    return (
        <div>
            <Helmet>
                <title>Admin Dashboard || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
            <div className="min-h-screen">
                <div>Welcome, Admin !!</div>
            </div>
        </div>
    );
};

export default AdminDashboard;