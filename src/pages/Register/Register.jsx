import { Helmet } from "react-helmet-async";
import { TbEye, TbEyeClosed } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { updateProfile } from "firebase/auth";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Register = () => {

    const { user, emailRegister } = useContext(AuthContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [eyeCloseOne, setEyeCloseOne] = useState(true);
    const [eyeCloseTwo, setEyeCloseTwo] = useState(true);

    const pwd = watch("password");
    const rePwd = watch("confirmPassword");

    const location = useLocation();
    const destination = location.state?.from?.pathname || "/";
    const navigate = useNavigate();

    useEffect(() => {
        if (user && location?.pathname === "/register") {
            Swal.fire({
                position: "center",
                icon: "info",
                title: "Already Registered !!",
                text: `Hey "${user?.displayName}", you already registered`,
                showConfirmButton: false,
                timer: 1500
            });
            navigate("/", { replace: true });
        }
    }, [location, navigate, user]);

    const handleEmailRegister = (data) => {
        console.log(data);
        const name = data.name;
        const photo = data.photo;
        const gender = data.gender;
        const dob = data.dob;
        const email = data.email;
        const phone = data.phone;
        const password = data.password;
        const user = {
            name: name,
            email: email,
            phone: phone,
            image: photo,
            gender: gender,
            dob: dob,
            role: "student",
        };
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
                        fetch('https://chroma-craft-server.vercel.app/users', {
                            method: "POST",
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(user)
                        })
                            .then(res => res.json())
                            .then(data => console.log(data))
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
                                    <span className="label-text">Date of Birth</span>
                                </label>
                                <input {...register("dob", { required: true })}
                                    type="date"
                                    placeholder="date of birth"
                                    name="dob"
                                    pattern="\d{4}-\d{2}-\d{2}"
                                    className="input input-bordered"
                                />
                                {errors.dob?.type === 'required' && <label className="label">
                                    <span className="text-error">Date of Birth is required !!</span>
                                </label>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Gender</span>
                                </label>
                                <select {...register("gender", { required: true })}
                                    type="text"
                                    placeholder="gender"
                                    name="gender"
                                    className="select select-bordered"
                                >
                                    <option value="">select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="third">Third</option>
                                </select>
                                {errors.gender?.type === 'required' && <label className="label">
                                    <span className="text-error">Gender is required !!</span>
                                </label>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Phone</span>
                                </label>
                                <input {...register("phone", {
                                    required: true
                                })}
                                    type="text"
                                    placeholder="phone"
                                    name="phone"
                                    className="input input-bordered"
                                />
                                {errors.phone?.type === 'required' && <label className="label">
                                    <span className="text-error">Phone is required !!</span>
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
                                <div className="relative flex items-center">
                                    <input {...register("password", { required: true, minLength: 6, pattern: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,}$/ })}
                                        type={(eyeCloseOne) ? 'password' : 'text'}
                                        placeholder="password"
                                        name="password"
                                        className="w-full input input-bordered"
                                    />
                                    <p onClick={() => setEyeCloseOne(!eyeCloseOne)} className="absolute right-2 btn btn-xs">
                                        {
                                            (eyeCloseOne) ?
                                                <TbEyeClosed className="text-2xl" /> : <TbEye className="text-2xl" />
                                        }
                                    </p>
                                </div>
                                {errors.password?.type === 'required' && <span className="text-error">Password is required !!</span>}
                                {errors.password?.type === 'minLength' && <span className="text-error">Password must be 6 character !!</span>}
                                {errors.password?.type === 'pattern' && <span className="text-error">At least one upper case, one lower case, one number and one special character is required !!</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <div className="relative flex items-center">
                                    <input {...register("confirmPassword", { required: true })}
                                        type={(eyeCloseTwo) ? 'password' : 'text'}
                                        placeholder="confirm password"
                                        name="confirmPassword"
                                        className="w-full input input-bordered"
                                    />
                                    <p onClick={() => setEyeCloseTwo(!eyeCloseTwo)} className="absolute right-2 btn btn-xs">
                                        {
                                            (eyeCloseTwo) ?
                                                <TbEyeClosed className="text-2xl" /> : <TbEye className="text-2xl" />
                                        }
                                    </p>
                                </div>
                                {errors.confirmPassword?.type === 'required' && <span className="text-error">Confirm Password is required !!</span>}
                                {pwd == rePwd || <span className="text-error">Password is not matched !!</span>}
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
                        <SocialLogin message={"Registered !"}></SocialLogin>
                    </div>
                </div>
            </div>
            <br /><br />
        </div>
    );
};

export default Register;