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
import InstructorDetails from '../pages/InstructorDetails/InstructorDetails';
import Payment from '../pages/Dashboard/StudentDashboard/Payment/Payment';
import CategoryDetails from '../pages/CategoryDetails/CategoryDetails';
import ClassDetails from '../pages/ClassDetails/ClassDetails';
import AddClass from '../pages/Dashboard/InstructorDashboard/AddClass/AddClass';
import AddedClasses from '../pages/Dashboard/InstructorDashboard/AddedClasses/AddedClasses';
import ManageUsers from '../pages/Dashboard/AdminDashboard/ManageUsers/ManageUsers';

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
                path: "categories/:id",
                element: <CategoryDetails></CategoryDetails>,
                loader: ({ params }) => fetch(`https://chroma-craft-server.vercel.app/categories/classes/${params.id}`)
            },
            {
                path: "classes",
                element: <Classes></Classes>
            },
            {
                path: "classes/:id",
                element: <ClassDetails></ClassDetails>,
                loader: ({ params }) => fetch(`https://chroma-craft-server.vercel.app/classes/${params.id}`)
            },
            {
                path: "instructors",
                element: <Instructors></Instructors>
            },
            {
                path: "instructors/:id",
                element: <InstructorDetails></InstructorDetails>,
                loader: ({ params }) => fetch(`https://chroma-craft-server.vercel.app/instructors/classes/${params.id}`)
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
                path: "users",
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: "classes",
                element: <AdminRoute><ManageClasses></ManageClasses></AdminRoute>
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
                path: "payments",
                element: <AdminRoute><ManagePayments></ManagePayments></AdminRoute>
            },
            {
                path: "instructor",
                element: <InstructorRoute><InstructorDashboard></InstructorDashboard></InstructorRoute>
            },
            {
                path: "add",
                element: <InstructorRoute><AddClass></AddClass></InstructorRoute>
            },
            {
                path: "added",
                element: <InstructorRoute><AddedClasses></AddedClasses></InstructorRoute>
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
            },
            {
                path: "payment",
                element: <StudentRoute><Payment></Payment></StudentRoute>
            }
        ]
    }
])

export default Routes;