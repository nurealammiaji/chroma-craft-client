import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import useUser from "../hooks/useUser";
import { DNA } from "react-loader-spinner";

const AdminRoute = ({ children }) => {

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

    if (userData?.role === "admin") {
        return children;
    }

    else {
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "Access Denied !!",
            text: `${userData?.name}, you are not an "Admin"`,
            showConfirmButton: false,
            timer: 1500
        });
    }

    return <Navigate to={"/"} replace></Navigate>
};

export default AdminRoute;