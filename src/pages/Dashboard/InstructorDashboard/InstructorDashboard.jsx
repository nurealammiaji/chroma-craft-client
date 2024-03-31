import { Helmet } from 'react-helmet-async';

const InstructorDashboard = () => {
    return (
        <div>
            <Helmet>
                <title>Instructor Dashboard || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
            <div className="min-h-screen">
                <div>Welcome, Instructor !!</div>
            </div>
        </div>
    );
};

export default InstructorDashboard;