import { DNA } from 'react-loader-spinner';
import useUsers from '../hooks/useUsers';
import Swal from "sweetalert2";
import { Navigate } from 'react-router-dom';

const Student = ({ children }) => {

    const [userData, userLoading] = useUsers();

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

    if (userData?.role === "student") {
        return children;
    }

    else {
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "Access Denied !!",
            text: `${userData.name}, you are not a "Student"`,
            showConfirmButton: false,
            timer: 1500
        });
    }

    return <Navigate to={"/"} replace></Navigate>

};

export default Student;