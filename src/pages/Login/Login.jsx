import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div>
            <Helmet>
                <title>Login || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
            <div className="min-h-screen hero">
                <div className="w-6/12 p-10 mx-auto my-auto shadow-2xl hero-content">
                    <div className="mx-auto md:w-10/12">
                        <form>
                            <div className="text-center">
                                <h3 className="text-2xl font-semibold">Login</h3>
                            </div>
                            <br />
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
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
                                <button className="btn" type="submit">Login</button>
                            </div>
                        </form>
                        <div className="flex items-center justify-center mt-3">
                            <label className="label"><span className="mr-2 text-sm">New here ?</span>
                                <Link to="/register" className="text-sm font-medium label-text-alt link link-hover">
                                    Create a New Account
                                </Link>
                            </label>
                        </div>
                        <div className="flex justify-center">
                            <label className="label">
                                <span className="font-medium label-text">Or login with</span>
                            </label>
                        </div>
                        <div className="flex items-center justify-center mt-3">
                            <button className="btn btn-outline btn-circle btn-success btn-sm">G</button>
                            <button className="mx-5 btn-sm btn btn-outline btn-circle">G</button>
                            <button className="btn btn-outline btn-circle btn-primary btn-sm">F</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Login;