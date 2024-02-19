import { Helmet } from "react-helmet-async";
import { DNA } from "react-loader-spinner";
import { Link } from "react-router-dom";
import SectionHeader from "../../../../components/SectionHeader/SectionHeader";
import useStudents from "../../../../hooks/useStudents";
import shape from "../../../../assets/6.png"
import ClassRow from './ClassRow';

const SelectedClass = () => {

    const [students] = useStudents();

    return (
        <div>
            <Helmet>
                <title>Selected Classes || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
            <div className="w-screen min-h-screen md:w-full">
                <div className="mt-5">
                    <SectionHeader title={"Manage Students"} background={shape}></SectionHeader>
                </div>
                <br /><br />
                <div className="overflow-x-auto">
                    {
                        (students) ?
                            <table className="table bg-white">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>SN</th>
                                        <th>Student</th>
                                        <th>Information</th>
                                        <th>Action</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row */}
                                    {
                                        (students) &&
                                        students.map((item, index) => <ClassRow key={item._id} index={index + 1} item={item}></ClassRow>)
                                    }
                                </tbody>
                            </table> :
                            <>
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
                </div>
                <br /><br />
                <div className="flex-row items-center justify-between text-center md:flex">
                    <h4 className="p-4 font-medium text-neutral badge badge-outline">Students: {students?.length}</h4>
                    <Link to={"/dashboard/admin/add-student"} className="mt-5 md:mt-0 btn btn-sm btn-secondary">Add Student</Link>
                </div>
            </div>
        </div>
    );
};

export default SelectedClass;