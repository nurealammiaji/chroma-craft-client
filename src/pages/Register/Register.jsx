import { Helmet } from "react-helmet-async";
import { TbBrandFacebook, TbBrandGithub, TbBrandGoogle } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const Register = () => {

    const { emailRegister, googleLogin } = useContext(AuthContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const emailRegisterHandler = (data) => {
        console.log(data);
    }

    return (
        <div>
            <Helmet>
                <title>Register || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
            <div className="min-h-screen hero">
                <div className="p-10 mx-auto my-auto shadow-2xl md:w-6/12 hero-content rounded-3xl">
                    <div className="mx-auto md:w-10/12">
                        <form onSubmit={handleSubmit(emailRegisterHandler)}>
                            <div className="text-center">
                                <h3 className="text-2xl font-semibold">Register</h3>
                            </div>
                            <br />
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input {...register("name", { required: true })}
                                    type="text"
                                    placeholder="name"
                                    name="name"
                                    className="input input-bordered"
                                />
                                {errors.name && <label className="label">
                                    <span className="text-error">This Field is required !!</span>
                                </label>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input {...register("photo", { required: true })}
                                    type="url"
                                    placeholder="https://"
                                    name="photo"
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email", { required: true })}
                                    type="email"
                                    placeholder="email"
                                    name="email"
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("password", { required: true })}
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="mt-6 form-control">
                                <button className="btn btn-neutral" type="submit">Register</button>
                            </div>
                        </form>
                        <div className="flex items-center justify-center mt-3">
                            <label className="label"><span className="mr-2 text-sm">Already have an account ?</span>
                                <Link to="/login" className="text-sm font-medium text-primary label-text-alt link link-hover">
                                    Login
                                </Link>
                            </label>
                        </div>
                        <div className="divider">or</div>
                        <div className="flex justify-center">
                            <label className="label">
                                <span className="font-medium label-text">Register with</span>
                            </label>
                        </div>
                        <div className="flex items-center justify-center mt-3">
                            <button className="btn btn-outline btn-circle btn-success btn-sm"><TbBrandGoogle className="text-2xl" /></button>
                            <button className="mx-5 btn-sm btn btn-outline btn-circle text-black hover:text-white hover:bg-black"><TbBrandGithub className="text-2xl" /></button>
                            <button className="btn btn-outline btn-circle btn-info btn-sm"><TbBrandFacebook className="text-2xl" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;