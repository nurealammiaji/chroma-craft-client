import App from '../App';
import {
    createBrowserRouter,
  } from "react-router-dom";
import Error from '../pages/Error/Error';

const Public = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        errorElement: <Error></Error>
    }
])

export default Public;