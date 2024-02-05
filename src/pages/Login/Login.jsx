import { Helmet } from "react-helmet-async";
import { TbBrandFacebook, TbBrandGithub, TbBrandGoogle } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from '../../providers/AuthProvider';

const Login = () => {

    const { googleLogin, emailLogin } = useContext(AuthContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const handleLogin = (data) => {
        console.log(data);
    }

    const handleGoogleLogin = () => {
        googleLogin()
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <div>
            <Helmet>
                <title>Login || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
            <div className="min-h-screen hero">
                <div className="p-10 mx-auto my-auto shadow-2xl rounded-3xl md:w-6/12 hero-content">
                    <div className="mx-auto md:w-10/12">
                        <form onSubmit={handleSubmit(handleLogin)}>
                            <div className="text-center">
                                <h3 className="text-2xl font-semibold">Login</h3>
                            </div>
                            <br />
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email")}
                                    type="email"
                                    placeholder="email"
                                    name="email"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    className="input input-bordered"
                                    required
                                />
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
                        <div className="flex items-center justify-center mt-3">
                            <button onClick={handleGoogleLogin} className="btn btn-outline btn-circle btn-success btn-sm"><TbBrandGoogle className="text-2xl" /></button>
                            <button className="mx-5 btn-sm btn btn-outline btn-circle text-black hover:text-white hover:bg-black"><TbBrandGithub className="text-2xl" /></button>
                            <button className="btn btn-outline btn-circle btn-info btn-sm"><TbBrandFacebook className="text-2xl" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Login;