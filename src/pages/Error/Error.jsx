import { Link, useRouteError } from "react-router-dom";
import error_image from "../../assets/404_Error.png";
import { Helmet } from "react-helmet-async";
import { TbCircleArrowLeftFilled } from "react-icons/tb";

const Error = () => {

    const error = useRouteError();
    console.log(error);

    return (
        <div>
            <Helmet>
                <title>Error || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
            <br />
            <figure className="w-full mx-auto md:w-4/12">
                <img src={error_image} alt="" />
            </figure>
            {
                (error.status === 404) &&
                <>
                    <br /><br />
                    <div className="flex items-center justify-center text-3xl text-red-600">
                        <h3>{error.status}</h3>
                        <h2 className="mx-3 text-4xl text-black">||</h2>
                        <h3>{error.statusText}</h3>
                    </div>
                    <br />
                    <div className="text-center">
                        <p className="text-2xl text-purple-700">{error.data}</p>
                    </div>
                </>
            }
            <br /><br />
            <div className="mt-3 text-center">
                <Link to={"/"}>
                    <button className="btn btn-secondary"><TbCircleArrowLeftFilled className="text-xl" /> Back to Home</button>
                </Link>
            </div>
        </div>
    );
};

export default Error;