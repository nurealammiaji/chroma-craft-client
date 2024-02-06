import { Helmet } from "react-helmet-async";
import { TbBrandFacebook, TbBrandGithub, TbBrandGoogle } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { updateProfile } from "firebase/auth";

const Register = () => {

    const { emailRegister, googleLogin, githubLogin, facebookLogin } = useContext(AuthContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const handleEmailRegister = (data) => {
        console.log(data);
        const email = data.email;
        const password = data.password;
        const name = data.name;
        const photo = data.photo;
        emailRegister(email, password)
            .then(result => {
                console.log(result);
                const currentUser = result.user;
                updateProfile(currentUser, {
                    displayName: name,
                    photoURL: photo,

                })
                    .then(result => {
                        console.log(result);
                    })
                    .catch(error => {
                        console.log(error);
                    })
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Registered Successfully !",
                    showConfirmButton: false,
                    timer: 1500
                });

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

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                console.log(result);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Logged in Successfully !",
                    showConfirmButton: false,
                    timer: 1500
                });
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

    const handleGithubLogin = () => {
        githubLogin()
            .then(result => {
                console.log(result);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Logged in Successfully !",
                    showConfirmButton: false,
                    timer: 1500
                });
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

    const handleFacebookLogin = () => {
        facebookLogin()
            .then(result => {
                console.log(result);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Logged in Successfully !",
                    showConfirmButton: false,
                    timer: 1500
                });
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
                <title>Register || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
            <div className="min-h-screen hero">
                <div className="p-10 mx-auto my-auto shadow-2xl md:w-6/12 hero-content rounded-3xl">
                    <div className="mx-auto md:w-10/12">
                        <form onSubmit={handleSubmit(handleEmailRegister)}>
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
                                {errors.name?.type === 'required' && <label className="label">
                                    <span className="text-error">Name is required !!</span>
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
                                {errors.photo?.type === 'required' && <label className="label">
                                    <span className="text-error">Photo URL is required !!</span>
                                </label>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email", {
                                    required: true
                                })}
                                    type="email"
                                    placeholder="email"
                                    name="email"
                                    className="input input-bordered"
                                />
                                {errors.email?.type === 'required' && <label className="label">
                                    <span className="text-error">Email is required !!</span>
                                </label>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("password", { required: true, minLength: 6, pattern: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6}$/ })}
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    className="input input-bordered"
                                />
                                {errors.password?.type === 'required' && <span className="text-error">Password is required !!</span>}
                                {errors.password?.type === 'minLength' && <span className="text-error">Password must be 6 character !!</span>}
                                {errors.password?.type === 'pattern' && <span className="text-error">At least one upper case, one lower case, one number and one special character is required !!</span>}
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
                            <button onClick={handleGoogleLogin} className="btn btn-outline btn-circle btn-success btn-sm"><TbBrandGoogle className="text-2xl" /></button>
                            <button onClick={handleGithubLogin} className="mx-5 text-black btn-sm btn btn-outline btn-circle hover:text-white hover:bg-black"><TbBrandGithub className="text-2xl" /></button>
                            <button onClick={handleFacebookLogin} className="btn btn-outline btn-circle btn-info btn-sm"><TbBrandFacebook className="text-2xl" /></button>
                        </div>
                    </div>
                </div>
            </div>
            <br /><br />
        </div>
    );
};

export default Register;