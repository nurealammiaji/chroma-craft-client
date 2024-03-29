import { Helmet } from "react-helmet-async";

const StudentDashboard = () => {
    return (
        <div>
            <Helmet>
                <title>Student Dashboard || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
            <div className="min-h-screen">
                <div>Welcome, Student !!</div>
            </div>
        </div>
    );
};

export default StudentDashboard;