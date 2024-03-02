import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { TbBrandFacebook, TbBrandGithub, TbBrandGoogle } from "react-icons/tb";

const SocialLogin = ({ message }) => {

    const { googleLogin, githubLogin, facebookLogin } = useContext(AuthContext);

    const location = useLocation();
    const destination = location.state?.from?.pathname || "/";
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                console.log(result);
                const currentUser = result?.user;
                const user = {
                    name: currentUser?.displayName,
                    email: currentUser?.email,
                    phone: "",
                    image: currentUser?.photoURL,
                    gender: "",
                    dob: "",
                    role: "student",
                };
                fetch('https://chroma-craft-server.vercel.app/users', {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                    .then(res => res.json())
                    .then(data => console.log(data))
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${message}`,
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
                    title: `${error?.message.slice(9,)}`,
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    }

    const handleGithubLogin = () => {
        githubLogin()
            .then(result => {
                console.log(result);
                const currentUser = result?.user;
                const user = {
                    name: currentUser?.displayName,
                    email: currentUser?.email,
                    phone: "",
                    image: currentUser?.photoURL,
                    gender: "",
                    dob: "",
                    role: "student",
                };
                fetch('https://chroma-craft-server.vercel.app/users', {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                    .then(res => res.json())
                    .then(data => console.log(data))
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${message}`,
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
                    title: `${error?.message.slice(9,)}`,
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    }

    const handleFacebookLogin = () => {
        facebookLogin()
            .then(result => {
                console.log(result);
                const currentUser = result?.user;
                const user = {
                    name: currentUser?.displayName,
                    email: currentUser?.email,
                    phone: "",
                    image: currentUser?.photoURL,
                    gender: "",
                    dob: "",
                    role: "student",
                };
                fetch('https://chroma-craft-server.vercel.app/users', {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                    .then(res => res.json())
                    .then(data => console.log(data))
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${message}`,
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
                    title: `${error?.message.slice(9,)}`,
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    }

    return (
        <div>
            <div className="flex items-center justify-center mt-3">
                <button onClick={handleGoogleLogin} className="btn btn-outline btn-circle btn-success btn-sm"><TbBrandGoogle className="text-2xl" /></button>
                <button onClick={handleGithubLogin} className="mx-5 text-black btn-sm btn btn-outline btn-circle hover:text-white hover:bg-black"><TbBrandGithub className="text-2xl" /></button>
                <button onClick={handleFacebookLogin} className="btn btn-outline btn-circle btn-info btn-sm"><TbBrandFacebook className="text-2xl" /></button>
            </div>
        </div>
    );
};

export default SocialLogin;