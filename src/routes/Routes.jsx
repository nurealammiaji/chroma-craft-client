import App from '../App';
import {
    createBrowserRouter,
} from "react-router-dom";
import Error from '../pages/Error/Error';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Contact from '../pages/Contact/Contact';
import About from '../pages/About/About';
import Home from '../pages/Home/Home';
import Instructors from '../pages/Instructors/Instructors';
import Classes from '../pages/Classes/Classes';
import Dashboard from '../pages/Dashboard/Dashboard';
import AdminDashboard from '../pages/Dashboard/AdminDashboard/AdminDashboard';
import InstructorDashboard from '../pages/Dashboard/InstructorDashboard/InstructorDashboard';
import StudentDashboard from '../pages/Dashboard/StudentDashboard/StudentDashboard';
import EnrolledClass from '../pages/Dashboard/StudentDashboard/EnrolledClass/EnrolledClass';
import SelectedClass from '../pages/Dashboard/StudentDashboard/SelectedClass /SelectedClass';
import ManageInstructors from '../pages/Dashboard/AdminDashboard/ManageInstructors';
import ManageStudents from '../pages/Dashboard/AdminDashboard/ManageStudents';
import ManageClasses from '../pages/Dashboard/AdminDashboard/ManageClasses';
import ManagePayments from '../pages/Dashboard/AdminDashboard/ManagePayments';

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        errorElement: <Error></Error>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "about",
                element: <About></About>
            },
            {
                path: "classes",
                element: <Classes></Classes>
            },
            {
                path: "instructors",
                element: <Instructors></Instructors>
            },
            {
                path: "contact",
                element: <Contact></Contact>
            },
        ]
    },
    {
        path: "login",
        element: <Login></Login>
    },
    {
        path: "register",
        element: <Register></Register>
    },
    {
        path: "dashboard",
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: "admin",
                element: <AdminDashboard></AdminDashboard>
            },
            {
                path: "instructors",
                element: <ManageInstructors></ManageInstructors>
            },
            {
                path: "students",
                element: <ManageStudents></ManageStudents>
            },
            {
                path: "classes",
                element: <ManageClasses></ManageClasses>
            },
            {
                path: "payments",
                element: <ManagePayments></ManagePayments>
            },
            {
                path: "instructor",
                element: <InstructorDashboard></InstructorDashboard>
            },
            {
                path: "student",
                element: <StudentDashboard></StudentDashboard>
            },
            {
                path: "selected",
                element: <SelectedClass></SelectedClass>
            },
            {
                path: "enrolled",
                element: <EnrolledClass></EnrolledClass>
            }
        ]
    }
])

export default Routes;