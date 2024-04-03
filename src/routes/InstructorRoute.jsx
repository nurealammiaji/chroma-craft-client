import { DNA } from "react-loader-spinner";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import useUser from "../hooks/useUser";

const InstructorRoute = ({ children }) => {

    const [userData, userLoading] = useUser();

    if (userLoading) {
        return <>
            <div className="flex items-center justify-center">
                <DNA
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                />
            </div>
        </>
    }

    if (userData?.role === "instructor") {
        return children;
    }

    else {
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "Access Denied !!",
            text: `${userData?.name}, you are not an "Instructor"`,
            showConfirmButton: false,
            timer: 1500
        });
    }

    return <Navigate to={"/"} replace></Navigate>
};

export default InstructorRoute;