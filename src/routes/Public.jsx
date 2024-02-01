import App from '../App';
import {
    createBrowserRouter,
  } from "react-router-dom";

const Public = createBrowserRouter([
    {
        path: "/",
        element: <App></App>
    }
])

export default Public;