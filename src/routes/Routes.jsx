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
import EnrolledClasses from '../pages/Dashboard/StudentDashboard/EnrolledClasses/EnrolledClasses';
import SelectedClasses from '../pages/Dashboard/StudentDashboard/SelectedClasses/SelectedClasses';
import ManageInstructors from '../pages/Dashboard/AdminDashboard/ManageInstructors/ManageInstructors';
import ManageStudents from '../pages/Dashboard/AdminDashboard/ManageStudents/ManageStudents';
import ManageClasses from '../pages/Dashboard/AdminDashboard/ManageClasses/ManageClasses';
import ManagePayments from '../pages/Dashboard/AdminDashboard/ManagePayments/ManagePayments';
import PrivateRoute from './PrivateRoute';
import StudentRoute from './StudentRoute';
import AdminRoute from './AdminRoute';
import InstructorRoute from './InstructorRoute';

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
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: "admin",
                element: <AdminRoute><AdminDashboard></AdminDashboard></AdminRoute>
            },
            {
                path: "instructors",
                element: <AdminRoute><ManageInstructors></ManageInstructors></AdminRoute>
            },
            {
                path: "students",
                element: <AdminRoute><ManageStudents></ManageStudents></AdminRoute>
            },
            {
                path: "classes",
                element: <AdminRoute><ManageClasses></ManageClasses></AdminRoute>
            },
            {
                path: "payments",
                element: <AdminRoute><ManagePayments></ManagePayments></AdminRoute>
            },
            {
                path: "instructor",
                element: <InstructorRoute><InstructorDashboard></InstructorDashboard></InstructorRoute>
            },
            {
                path: "student",
                element: <StudentRoute><StudentDashboard></StudentDashboard></StudentRoute>
            },
            {
                path: "selected",
                element: <StudentRoute><SelectedClasses></SelectedClasses></StudentRoute>
            },
            {
                path: "enrolled",
                element: <StudentRoute><EnrolledClasses></EnrolledClasses></StudentRoute>
            }
        ]
    }
])

export default Routes;