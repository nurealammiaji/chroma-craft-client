import App from '../App';
import {
    createBrowserRouter,
  } from "react-router-dom";
import Error from '../pages/Error/Error';
import Login from '../pages/Login/Login';

const Public = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        errorElement: <Error></Error>
    },
    {
        path: "/login",
        element: <Login></Login>
    }
])

export default Public;