import { Helmet } from "react-helmet-async";
import SectionHeader from '../../../../components/SectionHeader/SectionHeader';
import { useForm } from "react-hook-form";

const AddClass = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

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
    }

    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Add Class || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
            <div className="w-screen p-5 md:w-full">
                <div className="mt-5">
                    <SectionHeader title={"Add New Class"}></SectionHeader>
                </div>
                <br /><br />
                <div className="w-11/12 min-h-screen mx-auto">
                    <form onSubmit={handleSubmit(handleEmailRegister)} className="w-full md:w-96 lg:w-[30rem]">
                        <div className="min-w-full form-control">
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
                                    placeholder="password"
                                    name="password"
                                    className="w-full input input-bordered"
                                />
                            </div>
                            {errors.password?.type === 'required' && <span className="text-error">Password is required !!</span>}
                            {errors.password?.type === 'minLength' && <span className="text-error">Password must be 6 character !!</span>}
                            {errors.password?.type === 'pattern' && <span className="text-error">At least one upper case, one lower case, one number and one special character is required !!</span>}
                        </div>
                        <div className="mt-6 form-control">
                            <button className="btn btn-neutral" type="submit">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddClass;