import { Helmet } from "react-helmet-async";
import { TbEye, TbEyeClosed } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from '../../providers/AuthProvider';
import Swal from "sweetalert2";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Login = () => {

    const { user, emailLogin } = useContext(AuthContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [eyeClose, setEyeClose] = useState(true);

    const location = useLocation();
    const destination = location.state?.from?.pathname || "/";
    const navigate = useNavigate();

    useEffect(() => {
        if (user && location?.pathname === "/login") {
            Swal.fire({
                position: "center",
                icon: "info",
                title: "Already Logged In !!",
                text: `Hey ${user?.displayName}, you already logged in`,
                showConfirmButton: false,
                timer: 1500
            });
            navigate("/", { replace: true });
        }
    }, [location, navigate, user]);

    const handleEmailLogin = (data) => {
        const email = data.email;
        const password = data.password;
        emailLogin(email, password)
            .then(result => {
                console.log(result);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Logged In !!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(destination, { replace: true });
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: `${error.message.slice(9,)}`,
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    }

    return (
        <div>
            <br /><br />
            <Helmet>
                <title>Login || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
            <div className="min-h-screen hero">
                <div className="p-10 mx-auto my-auto shadow-2xl rounded-3xl md:w-6/12 hero-content">
                    <div className="mx-auto md:w-10/12">
                        <form onSubmit={handleSubmit(handleEmailLogin)}>
                            <div className="text-center">
                                <h3 className="text-2xl font-semibold">Login</h3>
                            </div>
                            <br />
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email", { required: true })} type="email" placeholder="email" name="email" className="input input-bordered" />
                                {errors.email?.type === 'required' && <span className="text-error">Email is required !!</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="relative flex items-center">
                                    <input {...register("password", { required: true })} type={(eyeClose) ? 'password' : 'text'} placeholder="password" name="password" className="w-full input input-bordered" />
                                    <p onClick={() => setEyeClose(!eyeClose)} className="absolute right-2 btn btn-xs">
                                        {
                                            (eyeClose) ?
                                                <TbEyeClosed className="text-2xl" /> : <TbEye className="text-2xl" />
                                        }
                                    </p>
                                </div>
                                {errors.password?.type === 'required' && <span className="text-error">Password is required !!</span>}
                            </div>
                            <div className="mt-6 form-control">
                                <button className="btn btn-neutral" type="submit">Login</button>
                            </div>
                        </form>
                        <div className="flex items-center justify-center mt-3">
                            <label className="label"><span className="mr-2 text-sm">New here ?</span>
                                <Link to="/register" className="text-sm font-medium text-primary label-text-alt link link-hover">
                                    Create a new account
                                </Link>
                            </label>
                        </div>
                        <div className="divider">or</div>
                        <div className="flex justify-center">
                            <label className="label">
                                <span className="font-medium label-text">Login with</span>
                            </label>
                        </div>
                        <SocialLogin message={"Logged In !"}></SocialLogin>
                    </div>
                </div>
            </div>
            <br /><br />
        </div >
    );
};

export default Login;