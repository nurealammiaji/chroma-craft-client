import { Helmet } from "react-helmet-async";
import useInstructors from '../../../../hooks/useInstructors';
import InstructorRow from "./InstructorRow";
import { DNA } from "react-loader-spinner";
import SectionHeader from '../../../../components/SectionHeader/SectionHeader';
import shape from "../../../../assets/6.png"
import { Link } from "react-router-dom";

const ManageInstructors = () => {

    const [instructors] = useInstructors();

    return (
        <div>
            <Helmet>
                <title>Manage Instructors || Chroma Craft</title>
                <link rel="canonical" href="https://chromacraftbd.web.app/" />
            </Helmet>
            <div className="w-screen min-h-screen md:w-full">
                <div className="mt-5">
                    <SectionHeader title={"Manage Instructors"} background={shape}></SectionHeader>
                </div>
                <br /><br />
                <div className="overflow-x-auto">
                    {
                        (instructors) ?
                            <table className="table bg-white">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>SN</th>
                                        <th>Instructor</th>
                                        <th>Information</th>
                                        <th>Action</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row */}
                                    {
                                        (instructors) &&
                                        instructors.map((item, index) => <InstructorRow key={item._id} index={index + 1} item={item}></InstructorRow>)
                                    }
                                </tbody>
                            </table>

                            : <>
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
                    <h4 className="p-4 text-lg font-medium text-secondary badge badge-outline">Instructors: {instructors?.length}</h4>
                    <Link to={"/dashboard/admin/add-instructor"} className="mt-5 md:mt-0 btn btn-sm btn-info">Add Instructor</Link>
                </div>
            </div>
        </div>
    );
};

export default ManageInstructors;